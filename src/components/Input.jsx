import { FormControl, FormLabel, Input as UIInput } from '@chakra-ui/react'

export default function Input({ name, label, type = 'text', ...props }) {
  return (
    <FormControl>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <UIInput id={name} name={name} type={type} {...props} />
    </FormControl>
  )
}
