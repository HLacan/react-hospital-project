import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

export default function DoctorFormModal() {
  const onClose = () => {}

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar Doctor</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <h1>Hola</h1>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' onClick={onClose}>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
