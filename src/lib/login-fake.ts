export function fakeLogin({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(email === 'douglas@ticketflow.com' && password === 'admin1234')
    }, 3000)
  })
}
