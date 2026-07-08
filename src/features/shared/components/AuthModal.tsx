'use client'

import { Dialog, DialogContent, Box, IconButton } from '@mui/material'

import AuthFormPanel, { type AuthFormMode } from './AuthFormPanel'

export type Mode = AuthFormMode

interface AuthModalProps {
  open: boolean
  mode: Mode
  callbackUrl?: string
  onSuccess?: () => void
  onClose: () => void
  onSwitchMode: (mode: Mode) => void
}

const AuthModal = ({ open, mode, callbackUrl, onSuccess, onClose, onSwitchMode }: AuthModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      scroll="paper"
      disableScrollLock
      PaperProps={{
        sx: {
          borderRadius: { xs: '16px', sm: '24px' },
          p: 2,
          overflowX: 'hidden',
          maxHeight: { xs: '92dvh', sm: '90vh' },
          mx: { xs: 2, sm: 'auto' },
        },
      }}
    >
      <Box sx={{ position: 'absolute', right: 16, top: 16, zIndex: 1 }}>
        <IconButton onClick={onClose} aria-label="Cerrar">
          <i className="tabler-x" />
        </IconButton>
      </Box>

      <DialogContent sx={{ overflowX: 'hidden', overflowY: 'auto' }}>
        <AuthFormPanel
          active={open}
          mode={mode}
          onSwitchMode={onSwitchMode}
          callbackUrl={callbackUrl}
          onSuccess={onSuccess}
          onClose={onClose}
          showLogo
          showDemoAccount
        />
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal
