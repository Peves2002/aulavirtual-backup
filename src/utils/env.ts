export const getBaseURL = () => {
  if (typeof window === 'undefined') {
    // En el servidor: usa INTERNAL_API_URL si está definida, sino localhost como fallback
    return process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  }

  // En el cliente siempre usar URL relativa para que funcione desde cualquier origen
  return ''
}
