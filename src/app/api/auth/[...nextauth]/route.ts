import NextAuth from 'next-auth'

import { getAuthOptions } from '@/utils/configs/auth'

const handler = async (req: Request, res: any) => {
  const options = await getAuthOptions()

  // En el App Router, NextAuth con opciones dinámicas se debe invocar así:
  return NextAuth(options)(req, res)
}

export { handler as GET, handler as POST }
