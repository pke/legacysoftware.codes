
module.exports = function allow(methods, handler) {
  return function(req, res) {
    const { method } = req
    if (-1 === methods.indexOf(method)) {
      res.setHeader('Allow', methods)
      return res.status(405).end(`Method ${method} Not Allowed`)
    }
    return handler(req, res)
  }
}
