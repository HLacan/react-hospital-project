import { createContext, useState } from 'react'

export const ModalContext = createContext({})

export const ModalProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState()
  const [editingValue, setEditingValue] = useState()

  const isDoctorModalOpen = openModal === 'doctors'
  const isPatientModalOpen = openModal === 'patients'
  const isAreaModalOpen = openModal === 'areas'
  const isBedModalOpen = openModal === 'beds'
  const isVisitModalOpen = openModal === 'visits'
  const isAdmissionModalOpen = openModal === 'admissions'

  const openDoctorModal = value => {
    setEditingValue(value)
    setOpenModal('doctors')
  }

  const openPatientModal = value => {
    setEditingValue(value)
    setOpenModal('patients')
  }

  const openAreaModal = value => {
    setEditingValue(value)
    setOpenModal('areas')
  }

  const openBedModal = value => {
    setEditingValue(value)
    setOpenModal('beds')
  }

  const openVisitModal = value => {
    setEditingValue(value)
    setOpenModal('visits')
  }

  const openAdmissionModal = value => {
    setEditingValue(value)
    setOpenModal('admissions')
  }

  const closeModal = () => {
    setEditingValue({})
    setOpenModal()
  }

  return (
    <ModalContext.Provider
      value={{
        isVisitModalOpen,
        editingValue,
        isPatientModalOpen,
        isAreaModalOpen,
        isBedModalOpen,
        isAdmissionModalOpen,
        isDoctorModalOpen,
        openDoctorModal,
        openPatientModal,
        openAreaModal,
        openBedModal,
        openVisitModal,
        openAdmissionModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
