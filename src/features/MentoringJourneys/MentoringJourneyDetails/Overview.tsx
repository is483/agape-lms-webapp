import { useNavigate, useParams } from 'react-router-dom'
import {
  Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, SkeletonCircle,
  SkeletonText, Text, Textarea, useDisclosure, useToast,
} from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import { useGetMentoringJourneyOverviewQuery, useUpdateMentoringJourneyOverviewMutation } from '../../../app/services/mentoringJourney/apiMentoringJourneySlice'
import {
  ControlledTextInput, Icon,
  InfographicItem, ProfileIcon,
} from '../../../components'
import { formatDate } from '../../../utils'
import paths from '../../../paths'
import { MentoringJourneyDetailsResponse, UpdateMentoringJourneyRequest } from '../../../app/services/mentoringJourney/types'

function Overview() {
  const { mentoringJourneyId } = useParams()
  const { data, isLoading } = useGetMentoringJourneyOverviewQuery(mentoringJourneyId!)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()

  const mentee = data?.mentee
  const fullName = `${mentee?.firstName} ${mentee?.lastName}`
  if (isLoading) {
    return <OverviewSkeleton />
  }

  const formattedStartDate = formatDate(new Date(data?.startDate ?? ''))
  const formattedEndDate = formatDate(new Date(data?.endDate ?? ''))

  const handleViewMentee = () => {
    navigate(`${paths.AssignedMentees}/${mentee?.menteeId}`)
  }

  return (
    <>
      <Flex justify="space-between">
        <OverviewModalEditForm data={data} onClose={onClose} isOpen={isOpen} />
        <Text fontWeight="700" fontSize={['lg', null, null, 'xl']}>
          Career Transformation with {data?.mentee.firstName}
        </Text>
        <Button onClick={onOpen} px="0" rounded="full">
          <Icon name="edit" fontSize="24px" />
        </Button>
      </Flex>
      <Text fontSize="sm" color="secondary.400">
        View all necessary information about your mentoring journey
      </Text>
      <Flex gap="4" mt="4" flexDir={['column', null, 'row']}>
        <InfographicItem
          border="solid"
          borderWidth="1px"
          borderColor="secondary.50"
          padding="4"
          rounded="md"
          title="Total Sessions Completed"
          amount={data?.totalSessionsCompleted ?? 0}
          iconName="handshake"
        />
        <InfographicItem
          border="solid"
          borderWidth="1px"
          borderColor="secondary.50"
          padding="4"
          rounded="md"
          title="Total Hours Completed"
          amount={data?.totalCompletedHours ?? 0}
          iconName="history"
        />
      </Flex>
      <Box mt="10">
        <Text fontWeight="600" fontSize="lg">Mentee</Text>
        <Flex mt="4">
          <Box padding="6" _hover={{ shadow: 'md', transition: '0.5s', cursor: 'pointer' }} border="solid 1px" borderRadius="md" borderColor="secondary.50" display="flex" alignItems="center" gap="2" onClick={handleViewMentee}>
            <ProfileIcon imgUrl={data?.mentee.profileImgUrl} />
            {fullName}
          </Box>
        </Flex>
      </Box>
      <Box mt="10">
        <Text fontWeight="600" fontSize="lg">Mentoring Duration</Text>
        <Text color="secondary.400">{formattedStartDate} To {formattedEndDate}</Text>
      </Box>
      <Box mt="10">
        <Text fontWeight="600" fontSize="lg">Description</Text>
        <Text color="secondary.400">{data?.description ? data.description : '-'}</Text>
      </Box>
    </>
  )
}

function OverviewSkeleton() {
  return (
    <>
      <Skeleton height="24px" />
      <Flex height="40px" mt="4" gap="4">
        <Skeleton flex="1" height="40px" />
        <Skeleton flex="1" height="40px" />
      </Flex>
      <Flex height="40px" mt="4" gap="4">
        <Box flex="1">
          <SkeletonCircle size="10" flex="1" />
        </Box>
        <Box flex="10">
          <SkeletonText noOfLines={2} spacing="2" skeletonHeight="4" />
        </Box>
      </Flex>
      <SkeletonText mt="5" noOfLines={4} spacing="2" skeletonHeight="4" />
    </>
  )
}

interface OverviewModalEditFormProps {
  isOpen: boolean
  onClose: () => void
  data: MentoringJourneyDetailsResponse | undefined
}

const defaultErrors = () => ({
  title: '',
  description: '',
})

function OverviewModalEditForm(props: OverviewModalEditFormProps) {
  const { isOpen, onClose, data } = props
  const [errors, setErrors] = useState(defaultErrors())
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [updateMentoringJourney] = useUpdateMentoringJourneyOverviewMutation()
  const toast = useToast()

  useEffect(() => {
    if (!data) return
    setTitle(data.title)
    setDescription(data.description)
  }, [data])

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handleSave = () => {
    if (!data) return
    const newErrors = defaultErrors()
    let hasErrors: boolean = false
    if (!title.trim().length) {
      hasErrors = true
      newErrors.title = 'Title required'
    }
    if (!description.trim().length) {
      hasErrors = true
      newErrors.description = 'Description required'
    }
    setErrors(newErrors)
    if (hasErrors) return
    const mentoringJourneyDetails: UpdateMentoringJourneyRequest = {
      mentoringJourneyId: data.mentoringJourneyId.toString(),
      description,
      title,
    }
    updateMentoringJourney(mentoringJourneyDetails).unwrap()
    toast({
      title: 'Mentoring journey',
      description: 'Mentoring journey details successfully updated',
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'bottom-right',
    })
    onClose()
  }

  return (
    <Modal size="xl" onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent mx="4">
        <ModalHeader fontWeight="700" fontSize="lg">Edit Mentoring Journey</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb="4" pt="8">
          <ControlledTextInput error={errors.title} label="Title" type="text" inputProps={{ value: title, onChange: handleTitleChange }} />
          <Text mt="6">Description</Text>
          <Textarea
            borderColor={errors.description ? 'red.600' : 'inherit'}
            borderWidth={errors.description ? '2px' : '1px'}
            value={description}
            onChange={handleDescriptionChange}
          />
          {!!errors.description && <Text position="absolute" fontSize="xs" color="red.600">{errors.description}</Text>}
        </ModalBody>
        <ModalFooter gap="4">
          <Button colorScheme="red" variant="outline" onClick={onClose}>Cancel</Button>
          <Button colorScheme="red" onClick={handleSave}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default Overview
