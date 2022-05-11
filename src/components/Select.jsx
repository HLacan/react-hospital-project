import { FormControl, FormLabel, Select as UISelect } from '@chakra-ui/react'

export default function Select({ name, label, options, ...props }) {
  return (
    <FormControl>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <UISelect id={name} name={name} {...props}>
        {options?.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </UISelect>
    </FormControl>
  )
}
