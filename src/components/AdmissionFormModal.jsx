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
import { saveAdmission } from 'api/admissionApi'
import { getBeds } from 'api/bedApi'
import { getDoctors } from 'api/doctorApi'
import Input from 'components/Input'
import ObjSelect from 'components/ObjSelect'
import useForm from 'hooks/useForm'
import useModalContext from 'hooks/useModalContext'
import queryClient from 'queryClient'
import { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'

export default function AdmissionFormModal() {
  const { isAdmissionModalOpen, editingValue, closeModal } = useModalContext()

  const { values, handleChange, handleSubmit, updateValues } = useForm({
    admissionDate: '',
    reason: '',
    bedId: 0,
    patientId: 0,
    doctorId: 0,
  })

  const { mutate, isLoading } = useMutation(saveAdmission, {
    onSuccess: data => {
      queryClient.invalidateQueries('admissions')
      queryClient.invalidateQueries(['admissions', String(data.id)])
      closeModal()
    },
  })

  const { data: doctors } = useQuery('doctors', getDoctors)
  const { data: beds } = useQuery('beds', getBeds)

  useEffect(() => {
    if (editingValue) {
      updateValues(editingValue)
    }
  }, [editingValue, updateValues])

  console.log(doctors)

  return (
    <Modal isOpen={isAdmissionModalOpen} onClose={closeModal}>
      <ModalOverlay />

      <ModalContent>
        <form onSubmit={handleSubmit(mutate)}>
          <ModalHeader>Admisiones {isLoading && <Spinner />}</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <Input
              autoFocus
              name='admissionDate'
              label='Fecha de Admision'
              type='date'
              onChange={handleChange}
              value={values.admissionDate}
            />
            <Input
              name='reason'
              label='Razon de visita'
              onChange={handleChange}
              value={values.reason}
            />

            <ObjSelect
              name='doctorId'
              label='Doctor Asignado'
              onChange={handleChange}
              options={doctors}
              type='doctor'
              value={values.doctorId}
            ></ObjSelect>

            <ObjSelect
              name='bedId'
              label='Cama Asignada'
              onChange={handleChange}
              options={beds}
              type='bed'
              value={values.bedId}
            ></ObjSelect>

            <VisuallyHidden>
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
