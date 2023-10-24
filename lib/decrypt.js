import bcrypt from 'bcrypt'

export default async function encrypt (password, hash) {
  return await bcrypt.compare(password, hash)
}
