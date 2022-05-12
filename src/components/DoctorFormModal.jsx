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
import { saveDoctor } from 'api/doctorApi'
import Input from 'components/Input'
import useForm from 'hooks/useForm'
import useModalContext from 'hooks/useModalContext'
import queryClient from 'queryClient'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

export default function DoctorFormModal() {
  const { isDoctorModalOpen, editingValue, closeModal } = useModalContext()

  const { values, handleChange, handleSubmit, updateValues } = useForm({
    dpi: '',
    name: '',
    lastName: '',
    phoneNumber: '',
  })

  const { mutate, isLoading } = useMutation(saveDoctor, {
    onSuccess: data => {
      queryClient.invalidateQueries('doctors')
      queryClient.invalidateQueries(['areas', String(data.id)])
      closeModal()
    },
  })

  useEffect(() => {
    if (editingValue) {
      updateValues(editingValue)
    }
  }, [editingValue, updateValues])

  return (
    <Modal isOpen={isDoctorModalOpen} onClose={closeModal}>
      <ModalOverlay />

      <ModalContent>
        <form onSubmit={handleSubmit(mutate)}>
          <ModalHeader>Doctores {isLoading && <Spinner />}</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <Input
              autoFocus
              name='dpi'
              label='DPI'
              onChange={handleChange}
              value={values.dpi}
            />

            <Input
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
              name='phoneNumber'
              label='Telefono'
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

// const onSubmit = () => {
//   console.log('doctor', values)
//   createDoctor(values)
//     .then(result => console.log({ result }))
//     .catch(err => console.log(err))
// }
