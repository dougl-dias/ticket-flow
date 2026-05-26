import 'dotenv/config'

import { hash } from 'bcryptjs'

import { prisma } from '../src/lib/prisma'

const email = process.env.USER_EMAIL!
const password = process.env.USER_PASSWORD!
const name = process.env.USER_NAME!

async function main() {
  const passwordHash = await hash(password, 10)

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      name,
      password: passwordHash
    },
    create: {
      email,
      name,
      password: passwordHash
    }
  })

  console.log(`Usuário pronto para login: ${user.email}`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
