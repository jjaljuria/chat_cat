export default function (req, res, next) {
  const user = req.session.user ?? null
  console.log(user)
  if (!user) return res.status(401).redirect('/login')

  return next()
}
