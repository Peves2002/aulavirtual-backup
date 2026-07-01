export const getBaseURL = () => {
  if (typeof window === 'undefined') {
    // En el servidor: siempre usar NEXT_PUBLIC_APP_URL, con localhost como fallback
    return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  }

  // En el cliente siempre usar URL relativa para que funcione desde cualquier origen
  return ''
}
