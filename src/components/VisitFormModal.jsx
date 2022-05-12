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
  VisuallyHidden,
} from '@chakra-ui/react'
import { getDoctors } from 'api/doctorApi'
import { saveVisit } from 'api/visitApi'
import Input from 'components/Input'
import ObjSelect from 'components/ObjSelect'
import useForm from 'hooks/useForm'
import useModalContext from 'hooks/useModalContext'
import queryClient from 'queryClient'
import { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'

export default function VisitFormModal() {
  const { isVisitModalOpen, editingValue, closeModal } = useModalContext()

  const { values, handleChange, handleSubmit, updateValues } = useForm({
    visitDate: '',
    reason: '',
    diagnostic: '',
    treatment: '',
    doctorId: 0,
    patientId: 0,
  })

  const { mutate, isLoading } = useMutation(saveVisit, {
    onSuccess: data => {
      queryClient.invalidateQueries('visits')
      queryClient.invalidateQueries(['visits', String(data.id)])
      closeModal()
    },
  })

  const { data: doctors } = useQuery('doctors', getDoctors)

  useEffect(() => {
    if (editingValue) {
      updateValues(editingValue)
    }
  }, [editingValue, updateValues])

  return (
    <Modal isOpen={isVisitModalOpen} onClose={closeModal}>
      <ModalOverlay />

      <ModalContent>
        <form onSubmit={handleSubmit(mutate)}>
          <ModalHeader>Visita {isLoading && <Spinner />}</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <Input
              autoFocus
              name='visitDate'
              label='Fecha de Visita'
              type='date'
              onChange={handleChange}
              value={values.visitDate}
            />
            <Input
              name='reason'
              label='Razon de visita'
              onChange={handleChange}
              value={values.reason}
            />

            <Input
              name='diagnostic'
              label='Diagnostico'
              onChange={handleChange}
              value={values.diagnostic}
            />

            <Input
              name='treatment'
              label='Tratamiento'
              onChange={handleChange}
              value={values.treatment}
            />

            <ObjSelect
              name='doctorId'
              label='Doctor Asignado'
              type='doctor'
              onChange={handleChange}
              options={doctors}
              value={values.doctorId}
            ></ObjSelect>

            <VisuallyHidden>
              {' '}
              <Input
                name='patientId'
                label='Paciente'
                onChange={handleChange}
                value={values.patientId}
              />
            </VisuallyHidden>
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
