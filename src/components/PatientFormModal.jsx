import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from '@chakra-ui/react'
import { savePatient } from 'api/patientApi'
import Input from 'components/Input'
import useForm from 'hooks/useForm'
import useModalContext from 'hooks/useModalContext'
import queryClient from 'queryClient'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

export default function PatientFormModal() {
  const { isPatientModalOpen, editingValue, closeModal } = useModalContext()

  const { values, handleChange, handleSubmit, updateValues } = useForm({
    name: '',
    lastName: '',
    dpi: '',
    birthday: '',
    phoneNumber: '',
  })

  const { mutate, isLoading } = useMutation(savePatient, {
    onSuccess: data => {
      queryClient.invalidateQueries('patients')
      queryClient.invalidateQueries(['patients', String(data.id)])
      closeModal()
    },
  })

  useEffect(() => {
    if (editingValue) {
      updateValues(editingValue)
    }
  }, [editingValue, updateValues])

  return (
    <Modal isOpen={isPatientModalOpen} onClose={closeModal}>
      <ModalOverlay />

      <ModalContent>
        <form onSubmit={handleSubmit(mutate)}>
          <ModalHeader>Crear Paciente {isLoading && <Spinner />}</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <Input
              autoFocus
              name='name'
              label='Nombre'
              onChange={handleChange}
              value={values.name}
            />

            <Input
              name='lastName'
              label='Apellido'
              onChange={handleChange}
              value={values.lastName}
            />

            <Input
              name='dpi'
              label='DPI'
              onChange={handleChange}
              value={values.dpi}
            />

            <Input
              name='birthday'
              label='Apellido'
              onChange={handleChange}
              value={values.birthday}
              type='date'
            />

            <Input
              name='phoneNumber'
              label='Teléfono'
              onChange={handleChange}
              value={values.phoneNumber}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' disabled={isLoading} type='submit'>
              Guardar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
