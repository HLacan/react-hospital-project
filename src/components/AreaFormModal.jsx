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
import { saveArea } from 'api/areaApi'
import Input from 'components/Input'
import useForm from 'hooks/useForm'
import useModalContext from 'hooks/useModalContext'
import queryClient from 'queryClient'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

export default function AreaFormModal() {
  const { isAreaModalOpen, editingValue, closeModal } = useModalContext()

  const { values, handleChange, handleSubmit, updateValues } = useForm({
    name: '',
  })

  const { mutate, isLoading } = useMutation(saveArea, {
    onSuccess: data => {
      queryClient.invalidateQueries('areas')
      queryClient.invalidateQueries(['areas', String(data.id)])
      closeModal()
    },
  })

  useEffect(() => {
    if (editingValue) {
      updateValues(editingValue)
    } else {
    }
  }, [editingValue, updateValues])

  return (
    <Modal isOpen={isAreaModalOpen} onClose={closeModal}>
      <ModalOverlay />

      <ModalContent>
        <form onSubmit={handleSubmit(mutate)}>
          <ModalHeader>Crear Area {isLoading && <Spinner />}</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <Input
              autoFocus
              name='name'
              label='Nombre'
              onChange={handleChange}
              value={values.name}
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
