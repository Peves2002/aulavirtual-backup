import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Iniciar sesión',
  description: 'Accede al Campus Digital Azul',
}

type Props = {
  searchParams: { callbackUrl?: string; error?: string }
}

export default function LoginPage({ searchParams }: Props) {
  const params = new URLSearchParams({ auth: 'login' })

  if (searchParams.callbackUrl) {
    params.set('callbackUrl', searchParams.callbackUrl)
  }

  if (searchParams.error) {
    params.set('error', searchParams.error)
  }

  redirect(`/campus?${params.toString()}`)
}
