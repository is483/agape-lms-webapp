import { Box, Input, Text } from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { QuestionType } from './types'

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <Box my="2">
      <Text>{question}</Text>
      <Input isDisabled={isView} value={value} onChange={handleInputChange} />
    </Box>
  )
}

function RatingQuestion(questionProps: Omit<QuestionProps, 'type'>) {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isView, question, value, onChange,
  } = questionProps

  return (
    <Box my="2">
      <Text>{question}</Text>
    </Box>
  )
}

function RadioQuestion(questionProps: Omit<QuestionProps, 'type'>) {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isView, question, value, onChange, options,
  } = questionProps

  return (
    <Box my="2">
      <Text>{question}</Text>
    </Box>
  )
}

export default Question
