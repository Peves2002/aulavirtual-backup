import HomePage from '@/features/web/atd/pages/Home'
import { AxiosWebCursos } from '@/features/web/cursos/http/axiosWebCursos'
import { getAuthSession } from '@/utils/libs/auth-helpers'

async function getFeaturedCourses() {
  try {
    const session = await getAuthSession()
    const token = session?.user?.accessToken ?? null
    const axiosWebCursos = new AxiosWebCursos({ getAuthToken: () => token })
    const { courses } = await axiosWebCursos.getCatalog()

    return courses.slice(0, 6)
  } catch (error) {
    console.error('Error fetching cursos destacados:', error)

    return []
  }
}

export default async function Page() {
  const courses = await getFeaturedCourses()

  return <HomePage courses={courses} />
}
