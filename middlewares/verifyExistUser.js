import jwt from 'jsonwebtoken'

export default function (req, res, next) {
  const token = req.headers.authorization

  console.log({ token })
  if (!token) return res.status(401).end()

  const user = jwt.verify(token, 'secret')

  req.session.user = user
  return next()
}
