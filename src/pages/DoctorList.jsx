import { Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"

const doctors = [
  {
    id: 1,
    dpi: '10',
    name: 'Jeorge',
    lastName: 'Herrera',
    phoneNumber: '12345844'
  },
  {
    id: 2,
    dpi: '20',
    name: 'Herbert',
    lastName: 'Lacan',
    phoneNumber: '78549824'
  },
  {
    id: 2,
    dpi: '30',
    name: 'Andrea',
    lastName: 'Hurtado',
    phoneNumber: '68750570'
  }
]

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
            {doctors.map((ticket) => (
              <Tr>
                <Td>{ticket.id}</Td>
                <Td>{ticket.dpi}</Td>
                <Td>{ticket.name}</Td>
                <Td>{ticket.lastName}</Td>
                <Td>{ticket.phoneNumber}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}
