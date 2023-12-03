export default function (req, res, next) {
  const user = req.session.user ?? null

  if (!user) return res.status(401).end()

  return next()
}
