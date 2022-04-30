import { useCallback, useState } from 'react'

export default function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues)

  const handleChange = event => {
    const { name, value } = event.target
    setValues(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = onSubmit => event => {
    event.preventDefault()
    onSubmit(values)
  }

  const updateValues = useCallback(newValues => {
    setValues(newValues)
  }, [])

  return { values, handleChange, handleSubmit, updateValues }
}

// const [values, setValues] = useState({
//   dpi: '',
//   name: '',
//   lastName: '',
//   phone: '',
// })
