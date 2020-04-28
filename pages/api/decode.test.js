const http = require("http")
const request = require("supertest")

const { apiResolver } = require("next/dist/next-server/server/api-utils")

const handler = require("./decode")

describe("Description API endpoint tests", function() {
  const server = request(http.createServer((req, res) => apiResolver(req, res, undefined, handler)))

  describe("Failures", function() {
    it("should return 405 for anything but GET method", async function() {
      await server.post("/").expect(405)
      await server.put("/").expect(405)
      await server.delete("/").expect(405)
      await server.patch("/").expect(405)
    })
  
    it("should respond with 406 when no query given", async function() {
      await server.get("/").expect(406, "No code given")
    })

    it("should respond with 404 for unknown code", async function() {
      await server.get("/?q=X++").expect(404, "")
    })
  
    it("should respond with 404 and body for unknown code in verbose mode", async function() {
      await server.get("/?q=X++&v").expect(404, "Description for X++ not found")
    })
  })
  
  describe("Successes", function() {
  
    it("should respond with 200 and no body to HEAD", async function() {
      await server.head("/?q=S++").expect(200, undefined)
      await server.head("/?q=S%2f%2f").expect(200, undefined)
    })

    it("should respond with 200 to valid code", async function() {
      await server.get("/?q=S++").expect(200, "Source Code: The source code is public and you can change it.")
      await server.get(`/?q=${encodeURIComponent("S++")}`).expect(200, "Source Code: The source code is public and you can change it.")
    })

    describe("YAML responses", function() {
      it("should respond with YAML", async function() {
        await server
          .get("/?q=E+++")
          .accept("text/yaml")
          .expect("Content-Type", "text/yaml")
          .expect(200, "- code: E+++\n  title: Engineering / Design\n  description: Least Privilege, Privilege Separation, TCB minimised.\n")
      })
    })

    describe("CSV responses", function() {
      it("should respond with 200 to valid code", async function() {
        await server
          .get("/?q=S++")
          .accept("text/csv")
          .expect("Content-Type", "text/csv")
          .expect(200, "code,title,description\nS++,Source Code,The source code is public and you can change it.\n")
      })  

      it("should handle comma in CSV", async function() {
        await server
          .get("/?q=E+++")
          .accept("text/csv")
          .expect("Content-Type", "text/csv")
          .expect(200, "code,title,description\nE+++,Engineering / Design,\"Least Privilege, Privilege Separation, TCB minimised.\"\n")
      })  
    })
    
    it("should respond with 200 to valid multiple codes with default delimiter", async function() {
      await server
        .get("/?q=O++S++")
        .expect("Content-Type", "text/plain")
        .expect(200, 
          "Ownership: Public Domain | MIT | Apache\n" +
          "Source Code: The source code is public and you can change it."
        )
    })

    it("should respond with 200 to valid multiple codes with custom delimiter", async function() {
      await server
        .get("/?q=O++S++&d=;")
        .accept("text/plain")
        .expect("Content-Type", "text/plain")
        .expect(200, 
          "Ownership: Public Domain | MIT | Apache;" +
          "Source Code: The source code is public and you can change it."
        )
    })
  })
})