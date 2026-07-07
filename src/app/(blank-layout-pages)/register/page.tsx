import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Registro',
  description: 'Crea tu cuenta en el Campus Digital Azul',
}

type Props = {
  searchParams: { callbackUrl?: string }
}

export default function RegisterPage({ searchParams }: Props) {
  const params = new URLSearchParams({ auth: 'register' })

  if (searchParams.callbackUrl) {
    params.set('callbackUrl', searchParams.callbackUrl)
  }

  redirect(`/campus?${params.toString()}`)
}
