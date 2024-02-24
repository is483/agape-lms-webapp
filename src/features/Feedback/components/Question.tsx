import {
  Box, Flex, Radio, RadioGroup, Stack, Text, Textarea,
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { QuestionType } from './types'
import { Icon } from '../../../components'

interface QuestionProps {
  isView: boolean
  question: string
  value: string
  type: QuestionType
  options: string[] | undefined
  onChange: (value: string) => void
}

function Question(questionProps: QuestionProps) {
  const {
    type, ...rest
  } = questionProps

  if (type === 'freeform') {
    return <FreeformQuestion {...rest} />
  }

  if (type === 'rating') {
    return <RatingQuestion {...rest} />
  }

  if (type === 'radio') {
    return <RadioQuestion {...rest} />
  }

  return null
}

function FreeformQuestion(questionProps: Omit<QuestionProps, 'type'>) {
  const {
    isView, question, value, onChange,
  } = questionProps

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <Box my="8">
      <Text mb="2" fontSize="sm">{question}</Text>
      <Textarea isDisabled={isView} value={value} onChange={handleInputChange} />
    </Box>
  )
}

function RatingQuestion(questionProps: Omit<QuestionProps, 'type'>) {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isView, question, value, onChange,
  } = questionProps

  const handleInputChange = (value: number) => {
    if (!isView) {
      onChange(String(value))
    }
  }

  return (
    <Box my="8">
      <Flex justify="space-between" gap={[2, 4, 8]}>
        <Text fontSize="sm">{question}</Text>
        <Stack direction="row">
          {[1, 2, 3, 4, 5].map((rating) => (
            <Icon
              name="star"
              onClick={() => handleInputChange(rating)}
              color={Number(value) < rating ? 'gray.200' : 'yellow.300'}
              style={{ fontVariationSettings: "'FILL' 1" }}
              _hover={{ cursor: 'pointer' }}
            />
          ))}
        </Stack>
      </Flex>
    </Box>
  )
}

function RadioQuestion(questionProps: Omit<QuestionProps, 'type'>) {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isView, question, value, onChange, options,
  } = questionProps

  const handleInputChange = (nextValue: string) => {
    onChange(nextValue)
  }

  return (
    <Box my="2">
      <Text fontSize="sm">{question}</Text>
      <RadioGroup onChange={handleInputChange} value={value} isDisabled={isView}>
        <Stack direction="column">
          {options!.map((option) => <Radio value={option}>{option}</Radio>)}
        </Stack>
      </RadioGroup>
    </Box>
  )
}

export default Question
