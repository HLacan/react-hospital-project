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
import { ModalContext } from 'context/ModalContext'
import useForm from 'hooks/useForm'
import queryClient from 'queryClient'
import { useContext, useEffect } from 'react'
import { useMutation } from 'react-query'

export default function DoctorFormModal() {
  const { openModal, setOpenModal, editingValue } = useContext(ModalContext)

  const { values, handleChange, handleSubmit, updateValues } = useForm({
    dpi: '',
    name: '',
    lastName: '',
    phoneNumber: '',
  })

  const { mutate, isLoading } = useMutation(saveDoctor, {
    onSuccess: () => {
      queryClient.invalidateQueries('doctors')
      console.log('yuju')
      setOpenModal()
    },
  })

  const onClose = () => {
    setOpenModal()
  }

  useEffect(() => {
    if (editingValue) {
      updateValues(editingValue)
    }
  }, [editingValue, updateValues])

  return (
    <Modal isOpen={openModal === 'doctors'} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(mutate)}>
          <ModalHeader>Agregar Doctor {isLoading && <Spinner />}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              name='dpi'
              label='DPI'
              autoFocus
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
              label='Teléfono'
              onChange={handleChange}
              value={values.phoneNumber}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' type='submit' disabled={isLoading}>
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
