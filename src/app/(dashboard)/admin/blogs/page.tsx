'use client'

import React, { useState, useEffect } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Card, CardContent, CardHeader, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material'

interface Blog {
  id: string
  titulo: string
  slug: string
  estado: string
  fecha_publicacion: string | null
  creado_en: string
  categoria?: { nombre: string }
  autor?: { nombre: string; apellido: string }
}

export default function BlogsAdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/admin/blogs')
      const data = await res.json()

      if (data.data) {
        setBlogs(data.data)
      }
    } catch (error) {
      console.error('Error cargando blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este blog?')) return

    try {
      await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' })
      fetchBlogs()
    } catch (error) {
      console.error('Error eliminando blog:', error)
    }
  }

  return (
    <Card>
      <CardHeader
        title="Gestión de Blogs / Noticias"
        action={
          <Button variant="contained" component={Link} href="/admin/blogs/crear" color="primary">
            Nuevo Artículo
          </Button>
        }
      />
      <CardContent>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <TableContainer component={Paper} elevation={0} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell>Categoría</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No hay artículos creados</TableCell>
                  </TableRow>
                ) : (
                  blogs.map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell className="font-medium">{blog.titulo}</TableCell>
                      <TableCell>{blog.categoria?.nombre || '-'}</TableCell>
                      <TableCell>
                        <Chip
                          label={blog.estado}
                          color={blog.estado === 'PUBLICADO' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(blog.creado_en).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="right">
                        <Button size="small" onClick={() => router.push(`/admin/blogs/${blog.id}`)}>Editar</Button>
                        <Button size="small" onClick={() => router.push(`/blogs/${blog.slug}`)}>Ver</Button>
                        <Button size="small" color="error" onClick={() => handleDelete(blog.id)}>Eliminar</Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  )
}
