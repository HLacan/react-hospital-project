import { ModalContext } from 'context/ModalContext'
import { useContext } from 'react'

export default function useModalContext() {
  const value = useContext(ModalContext)

  if (!value) {
    console.error(
      'El contexto ModalContext solo se puede usar dentro del ModalProvider'
    )
  }

  return value
}
