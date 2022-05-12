import { Box, Center, Image, Text } from '@chakra-ui/react'
import back from 'images/background.jpg'

export default function HomePage() {
  return (
    <>
      <Center>
        <Text fontSize='6xl'>Hospital App</Text>
      </Center>
      <Box w='100%' margin={0} padding={0}>
        <Image src={back} alt='Dan Abramov' />
      </Box>
    </>
  )
}
