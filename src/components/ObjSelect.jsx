import { FormControl, FormLabel, Select as UISelect } from '@chakra-ui/react'

export default function ObjSelect({ name, label, options, type, ...props }) {
  if (type === 'doctor') {
    console.log('options de doctores')
    console.log(options)
    return (
      <FormControl>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <UISelect id={name} name={name} {...props}>
          {options?.map(option => (
            <option key={option.id} value={option.id}>
              {option.id}
              {' - '}
              {option.name}
            </option>
          ))}
        </UISelect>
      </FormControl>
    )
  } else if (type === 'bed') {
    console.log('options de camas')
    return (
      <FormControl>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <UISelect id={name} name={name} {...props}>
          {options?.map(option => (
            <option key={option.id} value={option.id}>
              {option.id}
            </option>
          ))}
        </UISelect>
      </FormControl>
    )
  }
}
