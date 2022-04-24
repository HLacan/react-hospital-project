import { Table, TableContainer, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react"

export default function DoctorList() {
  return (
    <div>
      <Text fontSize='5xl'>Doctor List</Text>

      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>DPI</Th>
              <Th>Nombre</Th>
              <Th>Apellido</Th>
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
