const { assert } = require("chai")
const { description } = require("./legacyCode")

describe("Convert to string", function() {
  it("should return description", function() {
    assert.equal(description("O++"), "Ownership: Public Domain | MIT | Apache")
    assert.equal(description("O++ S++", "\n"), "Ownership: Public Domain | MIT | Apache\nSource Code: The source code is public and you can change it.")
    assert.equal(description("O++ S++", "\n"), "Ownership: Public Domain | MIT | Apache\nSource Code: The source code is public and you can change it.")
    assert.equal(description("V!"), "Volatility: Software is perfect, needed no updates since 1993.")
  })
})