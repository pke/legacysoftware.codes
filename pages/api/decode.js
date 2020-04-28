const { description, descriptor } = require("../../src/legacyCode")

const YAML = require('yaml')
const csv = require('csv-stringify/lib/sync')

const allow = require("./_middleware/allow")
const accepts = require("accepts")

/**
 * /?q=code
 * /?v verbose
 * /?d delimiter char
 */
const handler = (req,res) => {
  const {
    method,
    query: { q = "", v, d = "\n" },
  } = req
  //console.log("query", req.query)
  // Cope with "+" signs in query string, that are converted to spaces
  const sq = q.replace(/ /g, "+").trim()
  //console.log(" q", q + "<")
  //console.log("sq", sq + "<")

  //console.log("v", v)

  const accept = accepts(req)

  if (!sq) {
    return res.status(406).end("No code given")
  }

  let body
  switch (accept.type(["text/plain", "text/yaml", "text/csv"])) {
    case "text/yaml": {
        res.setHeader("Content-Type", "text/yaml")
        body = YAML.stringify(descriptor(sq))
      }
      break
    case "text/csv": {
      res.setHeader("Content-Type", "text/csv")
      body = csv(descriptor(sq), {
        header: true,
        columns: "code,title,description".split(",")
      })
      }
      break;
    default:
      res.setHeader("Content-Type", "text/plain")
      body = description(sq, d)
  }
  if (body) {
    res.status(200)
  } else {
    res.status(404)
    body = (v !== undefined && `Description for ${sq} not found`)
  }  
  res.end(body)
}

module.exports = allow(["GET", "HEAD"], handler)