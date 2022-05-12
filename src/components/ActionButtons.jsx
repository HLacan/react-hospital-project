import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, HStack as UIHStack, IconButton, Tooltip } from '@chakra-ui/react'

export default function ActionButtons({ edit, del, newObj, isNew, ...props }) {
  return (
    <Box>
      {isNew ? (
        <Tooltip label='Nuevo'>
          <IconButton
            colorScheme='green'
            margin={4}
            icon={<AddIcon />}
            onClick={newObj}
          />
        </Tooltip>
      ) : (
        <UIHStack spacing='24px'>
          <Tooltip label='Editar'>
            <IconButton
              colorScheme='yellow'
              icon={<EditIcon />}
              onClick={edit}
            />
          </Tooltip>
          <Tooltip label='Eliminar'>
            <IconButton colorScheme='red' icon={<DeleteIcon />} onClick={del} />
          </Tooltip>
        </UIHStack>
      )}
    </Box>
  )
}
