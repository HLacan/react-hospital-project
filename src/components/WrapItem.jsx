import { Box, Divider, Text, WrapItem as UIWrapItem } from '@chakra-ui/react'

export default function WrapItem({ ...props }) {
  return (
    <UIWrapItem>
      <Box w='300px' h='full' p='4' bg='#E4DECB' borderRadius='xl'>
        <Text fontSize='xl'>{props.title}</Text>
        <Divider borderColor='black' padding={1} marginBottom={3} />
        <Text fontSize='md'>{props.children}</Text>
      </Box>
    </UIWrapItem>
  )
}
