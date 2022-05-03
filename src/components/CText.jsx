import { Flex, Text as UIText } from '@chakra-ui/react'

export default function CText({ title, ...props }) {
  return (
    <Flex>
      <UIText fontSize='xl' color='gray'>
        {title}: &nbsp;
      </UIText>
      <UIText fontSize='xl'>{props.children}</UIText>
    </Flex>
  )
}
