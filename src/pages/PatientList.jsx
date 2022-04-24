import { Table, TableContainer, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react"

export default function PatientList() {
  return (
    <div>
      <Text fontSize='5xl'>Patient List</Text>

      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>DPI</Th>
              <Th>Nombre</Th>
              <Th>Apellido</Th>
              <Th>Fecha de Nacimiento</Th>
              <Th>Telefono</Th>
            </Tr>
          </Thead>
          <Tbody>

          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
