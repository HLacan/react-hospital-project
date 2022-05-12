import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VisuallyHidden,
} from '@chakra-ui/react'
import { saveBed } from 'api/bedApi'
import Input from 'components/Input'
import Select from 'components/Select'
import useForm from 'hooks/useForm'
import useModalContext from 'hooks/useModalContext'
import queryClient from 'queryClient'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

export default function BedFormModal() {
  const { isBedModalOpen, editingValue, closeModal } = useModalContext()

  const { values, handleChange, handleSubmit, updateValues } = useForm({
    status: '',
    areaId: 0,
  })

  const list = [
    {
      value: 'libre',
      label: 'Libre',
    },
    {
      value: 'ocupado',
      label: 'Ocupado',
    },
  ]

  const { mutate } = useMutation(saveBed, {
    onSuccess: data => {
      queryClient.invalidateQueries('beds')
      queryClient.invalidateQueries(['beds', String(data.id)])
      closeModal()
    },
  })

  useEffect(() => {
    if (editingValue) {
      updateValues(editingValue)
    }
  }, [editingValue, updateValues])

  return (
    <Modal isOpen={isBedModalOpen} onClose={closeModal}>
      <ModalOverlay />

      <ModalContent>
        <form onSubmit={handleSubmit(mutate)}>
          <ModalHeader>Crear Cama</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <Select
              name='status'
              label='Estado'
              onChange={handleChange}
              options={list}
              value={values.status}
            ></Select>

            <VisuallyHidden>
              <Input
                isDisabled={true}
                name='areaId'
                label='Area'
                onChange={handleChange}
                value={values.areaId}
              />
            </VisuallyHidden>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' type='submit'>
              Guardar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
