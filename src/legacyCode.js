
module.exports.parts = [
  {
    name: "ownership",
    title: "Ownership",
    items: [
      ["O++", "Public Domain | MIT | Apache"],
      ["O+", "Copyleft"],
      ["O", "We own it. But if we go under you get the source code."],
      ["O-", "We own it. You get a license we can revoke at any time."],
      ["O--", "We own it. We don't sell it. You can only rent it."],
      ["!O", "You use our appliance / cloud service."],
    ],
  }, {
    name: "sourcecode",
    title: "Source Code",
    items: [
      ["S++", "The source code is public and you can change it."],
      ["S+", "The source code is public."],
      ["S", "The source code leaked a while ago."],
      ["S-", "We let your government view the source code."],
      ["S--", "The source code is secret."],
      ["!S", "We lost the source code."],
    ],
  }, {
    name: "intent",
    title: "Intent, Confidence",
    items: [
      ["I+++", "I make actual guarantees."],
      ["I++", "I have done this multiple times before. I know what I am doing."],
      ["I+", "I had to adopt the design a bit over time."],
      ["I", "I tried to avoid security bugs while writing this."],
      ["I-", "Look, they paid me to do this."],
      ["I--", "The guy left. Code now maintained by a team in India."],
      ["!I", "I have no idea what I'm doing."],
    ],
  }, {
    name: "correctness",
    title: "Correctness",
    items: [
      ["C+++", "We have a correctness proof and you can understand/verify it."],
      ["C++", "We have a correctness proof."],
      ["C+", "No open bugs, 100% test coverage and we do regular code audits."],
      ["C", "We try to fix bugs that our users tell us about."],
      ["C-", "We have a bug backlog."],
      ["C--", "At some point we are planning to have a bug tracking system."],
      ["!C", "That's not really a bug, that's just a crash!"],
    ],
  }, {
    name: "engineering",
    title: "Engineering / Design",
    items: [
      ["E+++", "Least Privilege, Privilege Separation, TCB minimised."],
      ["E++", "We sandbox ourselves away so nothing bad can happen."],
      ["E", "We try to detect bad arguments"],
      ["E-", "Well..., we fix bugs. That's good, right?"],
      ["E--", "We just do what we are told. You call us wrong, that's on you!"],
      ["E---", "We run as root / in the kernel."],
      ["E----", "We sell it as appliance so you don't see how bad it is."],
      ["!E", "We do a daily AI malware scan of our blockchain."],
    ],
  }, {
    name: "maintenance",
    title: "Maintenance",
    items: [
      ["M!", "Author is Don Knuth / Dan Bernstein. Makes no mistakes."],
      ["M+", "Project ist feature complete, gets occasional security updates."],
      ["M", "Project gets updated regularly."],
      ["M-", "People send pull requests / patches to mailing list."],
      ["M--", "Vendor publishes quarterly patch roundup with 512 fixes each."],
      ["M---", "Author killed project. Unofficial forks / backups still around."],
      ["!M", "Author left / dead, project abandoned."],
    ],
  }, {
    name: "volatility",
    title: "Volatility",
    items: [
      ["V!", "Software is perfect, needed no updates since 1993."],
      ["V++", "Like V+ but has a way to notify you of new versions."],
      ["V+", "Regular patches and updates but you can't tell the difference."],
      ["V-", "Updating is such a hassle that back-porting patches is a thing."],
      ["V--", "The new version broke so much, most people use the old one."],
      ["V---", "Agile. 5 updates/day, half of them break production."],
      ["!V", "Support ended."],
    ],
  }, {
    name: "spec",
    title: "Protocol / Spec",
    items: [
      ["PS++", "The spec is public, short and precise."],
      ["PS", "The spec is OK but interoperability is a bitch."],
      ["PS-", "The spec is so large, nobody implemented all of it."],
      ["PS--", "The spec cannot be implemented securely."],
      ["PS---", "There is a spec but it's paywalled."],
      ["!PS", "The author made it up as he went."],
    ],
  }, {
    name: "dependencies",
    title: "Dependencies",
    items: [
      ["!D", "No dependencies. You boot your image directly."],
      ["D++", "We depend only on things that come with the system."],
      ["D+", "We depend on sqlite and libz."],
      ["D", "We use somebody's Docker image from the Internet."],
      ["D-", "We don't even have a list of the dependencies."],
      ["D--", "We load extensions dynamically from the Internet."],
      ["D---", "Uses vendor specific lock-in APIs/features."],
    ],
  },
]

const keyToPart = {}

const codeToDesc = module.exports.parts.reduce((result, part) => {
  const key = /\w{1,2}/.exec(part.items[0])[0];
  keyToPart[key] = part
  return part.items.reduce((result, [name, desc]) => {
    result[name] = { desc, part }
    return result
  }, result)
}, {})


// /!?(?:O|S|I|C|E|M|V|PS|D)(?:(?:\+|-){1,3})?/gm
const regex = new RegExp(`!?(?:${Object.keys(keyToPart).join("|")})(?:\\+{1,3}|-{1,3}|!{1})?`, "gm")

module.exports.descriptor = function description(codePart) {
  codePart = codePart.toUpperCase()
  const result = []
  let m
  while ((m = regex.exec(codePart)) !== null) {
    m.forEach((match) => {
      const code = codeToDesc[match]
      result.push({
        code: match,
        title: code.part.title,
        description: code.desc
      })
    })
  }
  return result
}

module.exports.description = function description(codePart, join) {
  return module.exports.descriptor(codePart).map(({title, description}) => `${title}: ${description}`).join(join)
}
