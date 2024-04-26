import { compare, hash as bcryptHash } from 'bcrypt';

async function hashPassword(password: string) {
  return await bcryptHash(password, 12);
}

async function comparePassword(password: string, hash: string) {
  return await compare(password, hash);
}

export { hashPassword, comparePassword };
