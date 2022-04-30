import { createContext, useState } from 'react'

export const ModalContext = createContext({})

export const ModalProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState()
  const [editingValue, setEditingValue] = useState()

  const isPatientModalOpen = openModal === 'patients'

  const openPatientModal = value => {
    setEditingValue(value)
    setOpenModal('patients')
  }

  const closeModal = () => {
    setEditingValue({})
    setOpenModal()
  }

  return (
    <ModalContext.Provider
      value={{
        editingValue,
        isPatientModalOpen,
        openPatientModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
