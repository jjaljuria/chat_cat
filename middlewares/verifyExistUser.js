export default function (req, res, next) {
  if (!req.session.idUser) {
    return res.status(401).end('user not authorizated')
  }
  return next()
}
