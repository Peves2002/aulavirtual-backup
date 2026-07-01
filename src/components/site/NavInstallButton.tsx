'use client'

import { useState } from 'react'

import { Download, Monitor, Smartphone } from 'lucide-react'

import AppModal from '@/utils/components/AppModal'
import { usePWAInstall } from '@/utils/hooks/usePWAInstall'

interface NavInstallButtonProps {
  className?: string
  onAction?: () => void
}

export default function NavInstallButton({ className, onAction }: NavInstallButtonProps) {
  const { canInstall, hasNativePrompt, install } = usePWAInstall()
  const [showTip, setShowTip] = useState(false)

  if (!canInstall) return null

  const handleClick = async () => {
    if (hasNativePrompt) {
      await install()
      onAction?.()
    } else {
      setShowTip(true)
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={
          className ??
          'flex items-center justify-center gap-2 w-full font-bold text-[16px] rounded-[24px] py-4 transition-all duration-300 shadow-xl'
        }
        style={{ background: '#A8E060', color: '#0A1A04' }}
      >
        <Download size={18} />
        Instalar APP
      </button>

      <AppModal open={showTip} handleClose={() => setShowTip(false)}>
        <p className="font-bold text-lg mb-4" style={{ color: '#1A3A0A' }}>
          ¿Cómo instalar la app?
        </p>

        <div className="flex items-start gap-3 mb-4 pb-4 border-b border-[#F7FBF0]">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'rgba(168,224,96,0.2)' }}
          >
            <Monitor size={18} color="#5A9020" />
          </div>
          <div>
            <p className="font-bold text-sm mb-1" style={{ color: '#1A3A0A' }}>
              En Chrome o Edge (PC)
            </p>
            <p className="text-sm text-[#5A6B4A]">
              Busca el ícono <strong>⊕</strong> o <strong>⬇</strong> en la barra de direcciones y haz clic en{' '}
              <strong>&quot;Instalar&quot;</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'rgba(168,224,96,0.2)' }}
          >
            <Smartphone size={18} color="#5A9020" />
          </div>
          <div>
            <p className="font-bold text-sm mb-1" style={{ color: '#1A3A0A' }}>
              En móvil
            </p>
            <p className="text-sm text-[#5A6B4A] mb-1">
              <strong>Chrome Android:</strong> menú <strong>⋮</strong> → <strong>&quot;Añadir a pantalla de inicio&quot;</strong>
            </p>
            <p className="text-sm text-[#5A6B4A]">
              <strong>Safari iOS:</strong> botón <strong>Compartir ↑</strong> → <strong>&quot;Agregar a inicio&quot;</strong>
            </p>
          </div>
        </div>
      </AppModal>
    </>
  )
}
