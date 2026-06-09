'use client'

import type { Receta } from '../entity/Receta'
import { CreateRecetaModal } from './CreateRecetaModal'
import { EditRecetaModal } from './EditRecetaModal'
import { DeleteRecetaModal } from './DeleteRecetaModal'

type ModalConfig = {
  isOpen: boolean
  closeHandler: () => void
}

interface RecetasActionsProps {
  recetaClicked: Receta | null
  addReceta: ModalConfig
  editReceta: ModalConfig
  deleteReceta: ModalConfig
  onSuccess?: () => void
}

export const RecetasActions = ({ recetaClicked, addReceta, editReceta, deleteReceta, onSuccess }: RecetasActionsProps) => {
  return (
    <>
      <CreateRecetaModal open={addReceta.isOpen} handleClose={addReceta.closeHandler} onSuccess={onSuccess} />

      <EditRecetaModal
        open={editReceta.isOpen}
        handleClose={editReceta.closeHandler}
        receta={editReceta.isOpen ? recetaClicked : null}
        onSuccess={onSuccess}
      />

      <DeleteRecetaModal
        open={deleteReceta.isOpen}
        handleClose={deleteReceta.closeHandler}
        receta={recetaClicked ? { id: recetaClicked.id, nombre: recetaClicked.nombre, slug: recetaClicked.slug } : null}
        onSuccess={onSuccess}
      />
    </>
  )
}
