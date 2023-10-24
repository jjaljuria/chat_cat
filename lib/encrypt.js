import bcrypt from 'bcrypt'

export default async function encrypt (password) {
  const encryptPassword = await bcrypt.hash(password, 10)
  return encryptPassword
}
