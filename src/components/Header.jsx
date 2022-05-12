import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import AreaFormModal from 'components/AreaFormModal'
import DoctorFormModal from 'components/DoctorFormModal'
import PatientFormModal from 'components/PatientFormModal'
import useModalContext from 'hooks/useModalContext'
import { Link as ReachLink } from 'react-router-dom'

export default function Header() {
  const { openPatientModal, openAreaModal, openDoctorModal } = useModalContext()

  const linkProps = {
    as: ReachLink,
    px: 2,
    py: 1,
    rounded: 'md',
    _hover: {
      texDecoration: 'none',
      bg: '#85A8BA',
    },
  }

  return (
    <>
      <Box px={4} style={{ backgroundColor: '#B5E3E3' }}>
        <Flex h={16} alignItems='center' justifyContent='space-between'>
          <HStack as='nav' spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Link to='/' {...linkProps}>
              <Text fontSize='xl'>React Pro</Text>
            </Link>
            <Link to='doctors' {...linkProps}>
              <Text fontSize='xl'>Doctores</Text>
            </Link>
            <Link to='patients' {...linkProps}>
              <Text fontSize='xl'>Pacientes</Text>
            </Link>
            <Link to='areas' {...linkProps}>
              <Text fontSize='xl'>Areas</Text>
            </Link>
          </HStack>
          <Flex alignItems='center'>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<AddIcon />}
                variant='outline'
                borderColor='green'
                backgroundColor='#6CBB7A'
                _hover={{
                  bg: '#B6EEBD',
                }}
              />
              <MenuList>
                <MenuItem onClick={() => openDoctorModal()}>
                  Crear Doctor
                </MenuItem>
                <MenuItem onClick={() => openPatientModal()}>
                  Crear Paciente
                </MenuItem>
                <MenuItem onClick={() => openAreaModal()}>Crear Area</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
      <DoctorFormModal />
      <PatientFormModal />
      <AreaFormModal />
    </>
  )
}
