import {
  Box, Button, Flex, FormLabel, Text,
} from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import { ControlledSelect, Icon } from '../../../../components'
import { useUpdateMenteeValuesMutation, useUpdateMentorValuesMutation } from '../../../../app/services/user/apiUserSlice'
import { ValuesRequest } from '../../../../app/services/user/types'
import { useAppSelector } from '../../../../hooks'
import getAuth from '../../../../app/redux/selectors'
import { deepCopy } from '../../../../utils'

interface Props {
  handleBack: () => void
  handleNext: () => void
  data: any
}

interface Errors {
  personalValues: string[]
}

const defaultErrors: Errors = {
  personalValues: [],
}

const valueOptions = ['Integrity', 'Humility', 'Open Mindedness', 'Independence']

function PersonalValues(props: Props) {
  const { handleBack, handleNext, data } = props
  const [values, setValues] = useState<string[]>([''])
  const [updateMentorValues,
    { isLoading: isMentorInfoLoading }] = useUpdateMentorValuesMutation()
  const [updateMenteeValues,
    { isLoading: isMenteeInfoLoading }] = useUpdateMenteeValuesMutation()
  const { role } = useAppSelector(getAuth)
  const [errors, setErrors] = useState<Errors>(defaultErrors)

  useEffect(() => {
    setValues(data?.personalValues ?? [''])
  }, [data])

  const handleValueChange = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
    setValues((prevValues) => {
      const newValues = [...prevValues]
      newValues[index] = e.target.value
      return newValues
    })
  }

  const handleAddValue = () => {
    setValues((prevValues) => [
      ...prevValues, '',
    ])
    setErrors((prevErrors) => {
      const newErrors = deepCopy(prevErrors)
      newErrors.personalValues = [...prevErrors.personalValues, '']
      return newErrors
    })
  }

  const handleDeleteValue = (index: number) => {
    if (values.length <= 1) return
    setValues((prevValues) => {
      const newValues = [...prevValues]
      newValues.splice(index, 1)
      return newValues
    })
    setErrors((prevErrors) => {
      const newErrors = deepCopy(prevErrors)
      newErrors.personalValues.splice(index, 1)
      return newErrors
    })
  }

  const handleSave = async () => {
    const newErrors = deepCopy(defaultErrors)
    let hasErrors = false
    values.forEach((value, index) => {
      if (!value) {
        newErrors.personalValues[index] = 'Personal Value required'
        hasErrors = true
      }
    })
    if (hasErrors) {
      setErrors(newErrors)
      return
    }
    const updateValues = role === 'Mentor' ? updateMentorValues : updateMenteeValues
    const valueRequests: ValuesRequest = {
      personalValues: values,
    }
    try {
      await updateValues(valueRequests).unwrap()
      handleNext()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="600"> Personal Values </Text>
      <Text color="secondary.500" marginTop="1" marginBottom="8"> Share about your core principles and beliefs </Text>
      <FormLabel>Personal Values (Select up to 5 options)</FormLabel>
      {values.map((value, index) => (
        <Flex alignItems="center" marginBottom="5" gap={4}>
          <ControlledSelect
            error={errors.personalValues[index]}
            options={valueOptions}
            selectProps={{ onChange: (e) => handleValueChange(e, index), value }}
          />
          <Icon name="delete" _hover={{ cursor: 'pointer' }} color={values.length <= 1 ? 'secondary.200' : 'secondary.500'} onClick={() => handleDeleteValue(index)} />
        </Flex>
      ))}
      {values.length < 5 && (
        <Box marginY="10">
          <Button size="sm" onClick={handleAddValue}> + Add Values</Button>
        </Box>
      )}
      <Flex justifyContent="end" gap="4">
        <Button onClick={handleBack}>Back</Button>
        <Button colorScheme="red" onClick={handleSave} isLoading={role === 'Mentor' ? isMentorInfoLoading : isMenteeInfoLoading}>Next</Button>
      </Flex>
    </Box>
  )
}
export default PersonalValues
