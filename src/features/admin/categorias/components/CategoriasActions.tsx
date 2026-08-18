'use client'

import type { Categoria } from '../entity/Categoria'
import { CreateCategoriaModal } from './CreateCategoriaModal'
import { EditCategoriaModal } from './EditCategoriaModal'
import { DeleteCategoriaModal } from './DeleteCategoriaModal'
import { ReorderCategoriasModal } from './ReorderCategoriasModal'

type ModalConfig = {
  isOpen: boolean
  closeHandler: () => void
}

interface CategoriasActionsProps {
  categoriaClicked: Categoria | null
  addCategoria: ModalConfig
  editCategoria: ModalConfig
  deleteCategoria: ModalConfig
  reorderCategoria: ModalConfig
  onSuccess?: () => void
}

export const CategoriasActions = ({
  categoriaClicked,
  addCategoria,
  editCategoria,
  deleteCategoria,
  reorderCategoria,
  onSuccess
}: CategoriasActionsProps) => {
  return (
    <>
      {/* Modal Crear Categoría */}
      <CreateCategoriaModal
        open={addCategoria.isOpen}
        handleClose={addCategoria.closeHandler}
        onSuccess={onSuccess}
      />

      {/* Modal Editar Categoría */}
      <EditCategoriaModal
        open={editCategoria.isOpen}
        handleClose={editCategoria.closeHandler}
        categoriaId={categoriaClicked?.id || null}
        onSuccess={onSuccess}
      />

      {/* Modal Eliminar Categoría */}
      <DeleteCategoriaModal
        open={deleteCategoria.isOpen}
        handleClose={deleteCategoria.closeHandler}
        categoria={
          categoriaClicked
            ? {
              id: categoriaClicked.id,
              nombre: categoriaClicked.nombre,
              slug: categoriaClicked.slug
            }
            : null
        }
        onSuccess={onSuccess}
      />

      {/* Modal Reordenar Categorías Principales */}
      <ReorderCategoriasModal
        open={reorderCategoria.isOpen}
        handleClose={reorderCategoria.closeHandler}
        onSuccess={onSuccess}
      />
    </>
  )
}
