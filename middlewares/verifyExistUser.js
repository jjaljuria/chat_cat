import jwt from 'jsonwebtoken'

export default function (req, res, next) {
  const token = req.headers.authorization

  if (!token) return res.status(401).end('not authorization token')

  const user = jwt.verify(token, 'secret')

  req.session.user = user
  return next()
}
