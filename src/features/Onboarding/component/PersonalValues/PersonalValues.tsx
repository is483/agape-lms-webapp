import {
  Box, Button, Flex, FormControl, FormLabel, Select, Text,
} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { ControlledSelect, Icon } from '../../../../components'

interface Props {
  handleBack: () => void
  handleNext: () => void
}

interface Errors {
  values: string
}

const defaultErrors: Errors = {
  values: 'No skill selected'
}

const valueOptions = ['Integrity', 'Humility', 'Open Mindedness', 'Independence']

function PersonalValues(props: Props) {
  const { handleBack, handleNext } = props
  const [values, setValues] = useState<string[]>([''])
  const [errors, setErrors] = useState<Errors>(defaultErrors)
  
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
  }

  const handleDeleteValue = (index: number) => {
    if (values.length <= 1) return
    setValues((prevValues) => {
      const newValues = [...prevValues]
      newValues.splice(index, 1)
      return newValues
    })
  }

  const handleSave = () => {
    // TODO: include api call to save changes
    handleNext()
  }

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="600"> Personal Values </Text>
      <Text color="secondary.500" marginTop="1" marginBottom="8"> Share about your core principles and beliefs </Text>
      <FormLabel>Personal Values (Select up to 5 options)</FormLabel>
      {values.map((value, index) => (
        <Flex alignItems="center" marginBottom="5" gap={4}>
          <ControlledSelect error={errors.values} placeholder={''} options={valueOptions} selectProps={{ onChange: (e)=> handleValueChange(e,index), value: value}}/>
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
        <Button colorScheme="red" onClick={handleSave}>Next</Button>
      </Flex>
    </Box>
  )
}
export default PersonalValues
