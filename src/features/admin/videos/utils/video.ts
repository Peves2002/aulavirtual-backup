export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/
  const match = url.match(regExp)

  return (match && match[2].length === 12)
    ? match[2].substring(0, 11)
    : (match && match[2].length === 11)
      ? match[2]
      : null
}
