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
  error: string
  questionNo: number
  sectionNo: number
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
    isView, question, value, onChange, error,
    questionNo, sectionNo,
  } = questionProps

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  const errorStyling = {
    ...(error && { borderColor: 'red.500', borderWidth: 2 }),
  }

  return (
    <Box my="8">
      <Text mb="2" fontSize="sm"><b>{sectionNo}.{questionNo})</b> {question}</Text>
      <Textarea isDisabled={isView} value={value} onChange={handleInputChange} {...errorStyling} />
      <Text color="red.500" fontSize="xs">{error}</Text>
    </Box>
  )
}

function RatingQuestion(questionProps: Omit<QuestionProps, 'type'>) {
  const {
    isView, question, value, onChange, error,
    questionNo, sectionNo,
  } = questionProps

  const handleInputChange = (value: number) => {
    if (!isView) {
      onChange(String(value))
    }
  }

  return (
    <Box my="8">
      <Flex justify="space-between" gap={[2, 4, 8]}>
        <Text fontSize="sm"><b>{sectionNo}.{questionNo})</b> {question}</Text>
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
      <Text color="red.500" fontSize="xs">{error}</Text>
    </Box>
  )
}

function RadioQuestion(questionProps: Omit<QuestionProps, 'type'>) {
  const {
    isView, question, value, onChange, options, error,
    questionNo, sectionNo,
  } = questionProps

  const handleInputChange = (nextValue: string) => {
    onChange(nextValue)
  }

  return (
    <Box my="6">
      <Text fontSize="sm" mb="2"><b>{sectionNo}.{questionNo})</b> {question}</Text>
      <RadioGroup onChange={handleInputChange} value={value} isDisabled={isView}>
        <Stack direction="column">
          {options!.map((option) => <Radio size="sm" value={option}>{option}</Radio>)}
        </Stack>
      </RadioGroup>
      <Text color="red.500" fontSize="xs">{error}</Text>
    </Box>
  )
}

export default Question
