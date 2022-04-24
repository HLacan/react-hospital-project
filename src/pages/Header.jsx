import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";


export default function Header(){
  const linkProps = {
    as: ReachLink,
    px: 2,
    py: 1,
    rounded: 'md',
    _hover: {
      texDecoration: 'none',
      bg: 'gray.200'
    }
  }

  return (
    <Box px={4}>
      <Flex h={16} alignItems='center' justifyContent='space-between'>
        <HStack as='nav' spacing={4} display={{base: 'none', md: 'flex'}}>
          <Link to='/' {...linkProps}>
            <Text fontSize='xl'>React Pro</Text>
          </Link>
          <Link to='doctors' {...linkProps}>
            <Text fontSize='xl'>Doctores</Text>
          </Link>
          <Link to='patients' {...linkProps}>
            <Text fontSize='xl'>Pacientes</Text>
          </Link>
        </HStack>
      </Flex>
    </Box>
  )
}

