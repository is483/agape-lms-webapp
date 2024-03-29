import { useNavigate, useParams } from 'react-router-dom'
import {
  Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, SkeletonCircle,
  SkeletonText, Text, useDisclosure, useToast,
} from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { useGetMentoringJourneyOverviewQuery, useUpdateMentoringJourneyOverviewMutation } from '../../../app/services/mentoringJourney/apiMentoringJourneySlice'
import {
  ControlledTextInput, Icon,
  InfographicItem, ProfileIcon,
} from '../../../components'
import { formatDate } from '../../../utils'
import paths from '../../../paths'
import { MentoringJourneyDetailsResponse, UpdateMentoringJourneyRequest } from '../../../app/services/mentoringJourney/types'
import { getAuth } from '../../../app/redux/selectors'
import { useAppSelector } from '../../../hooks'

function Overview() {
  const { mentoringJourneyId } = useParams()
  const { role } = useAppSelector(getAuth)
  const { data, isLoading } = useGetMentoringJourneyOverviewQuery(mentoringJourneyId!)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()

  const mentee = data?.mentee
  const mentor = data?.mentor
  const menteeFullName = `${mentee?.firstName} ${mentee?.lastName}`
  const mentorFullName = `${mentor?.firstName} ${mentor?.lastName}`
  if (isLoading) {
    return <OverviewSkeleton />
  }

  const formattedStartDate = formatDate(new Date(data?.startDate ?? ''))
  const formattedEndDate = formatDate(new Date(data?.endDate ?? ''))

  const handleViewMentee = () => {
    if (role === 'Mentor') {
      navigate(`${paths.AssignedMentees.subPath}/${mentee?.menteeId}`)
    } else {
      navigate(`${paths.Mentees.subPath}/${mentee?.menteeId}`)
    }
  }
  const handleViewMentor = () => {
    navigate(`${paths.Mentors.subPath}/${mentor?.mentorId}`)
  }

  return (
    <>
      <Flex justify="space-between">
        <OverviewModalEditForm data={data} onClose={onClose} isOpen={isOpen} />
        <Text fontWeight="700" fontSize={['lg', null, null, 'xl']}>
          {data?.title}
        </Text>
        {role === 'Mentor' && (
          <Button onClick={onOpen} px="0" rounded="full">
            <Icon name="edit" fontSize="24px" />
          </Button>
        )}
      </Flex>
      {role === 'Mentor' && (
        <Text fontSize="sm" color="secondary.400">
          View all necessary information about your mentoring journey
        </Text>
      )}
      {role === 'Admin' && (
        <Text fontSize="sm" color="secondary.400">
          View all necessary information about the mentoring journey between <b> {menteeFullName} and {mentorFullName} </b>.
        </Text>
      )}

      {role === 'Mentor' && (
        <Flex gap="4" mt="4" flexDir={['column', null, 'row']}>
          <InfographicItem
            containerProps={{
              border: 'solid',
              borderWidth: '1px',
              borderColor: 'secondary.50',
              padding: 4,
              rounded: 'md',
            }}
            title="Total Sessions Completed"
            amount={data?.totalSessionsCompleted ?? 0}
            iconName="handshake"
          />
          <InfographicItem
            containerProps={{
              border: 'solid',
              borderWidth: '1px',
              borderColor: 'secondary.50',
              padding: 4,
              rounded: 'md',
            }}
            title="Total Hours Completed"
            amount={data?.totalCompletedHours ?? 0}
            iconName="history"
          />
        </Flex>
      )}
      <Flex gap={role === 'Admin' ? [0, null, 10] : 0} flexDir={role === 'Admin' ? ['column', null, 'row'] : 'row'}>
        <Box mt="10">
          <Text fontWeight="600" fontSize="lg">Mentee</Text>
          <Flex mt="4">
            <Box padding="6" _hover={{ shadow: 'md', transition: '0.5s', cursor: 'pointer' }} border="solid 1px" borderRadius="md" borderColor="secondary.50" display="flex" alignItems="center" gap="2" onClick={handleViewMentee}>
              <ProfileIcon imgUrl={data?.mentee.profileImgUrl} />
              {menteeFullName}
            </Box>
          </Flex>
        </Box>

        {role === 'Admin' && (
          <Box mt="10">
            <Text fontWeight="600" fontSize="lg">Mentor</Text>
            <Flex mt="4">
              <Box padding="6" _hover={{ shadow: 'md', transition: '0.5s', cursor: 'pointer' }} border="solid 1px" borderRadius="md" borderColor="secondary.50" display="flex" alignItems="center" gap="2" onClick={handleViewMentor}>
                <ProfileIcon imgUrl={data?.mentor.profileImgUrl} />
                {mentorFullName}
              </Box>
            </Flex>
          </Box>
        )}
      </Flex>

      <Box mt="10">
        <Text fontWeight="600" fontSize="lg">Mentoring Duration</Text>
        <Text color="secondary.400">{formattedStartDate} To {formattedEndDate}</Text>
      </Box>
      <Box mt="10">
        <Text fontWeight="600" fontSize="lg" marginBottom="2">Description</Text>
        <ReactQuill
          value={data?.description ?? ''}
          readOnly
          theme="snow"
          className="react-quill-view"
        />
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

  const handleDescriptionChange = (description: string) => {
    setDescription(description)
  }

  const handleSave = () => {
    if (!data) return
    const newErrors = defaultErrors()
    let hasErrors: boolean = false
    if (!title.trim().length) {
      hasErrors = true
      newErrors.title = 'Title required'
    }
    if (title.length > 50) {
      hasErrors = true
      newErrors.description = `Title must not exceed 50 characters (${title.length} / 50)`
    }
    if (!description.trim().length) {
      hasErrors = true
      newErrors.description = 'Description required'
    }

    if (description.length > 2000) {
      hasErrors = true
      newErrors.description = `Description must not exceed 2000 characters (${description.length} / 2000)`
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
          <ReactQuill
            theme="snow"
            value={description}
            onChange={handleDescriptionChange}
            className="react-quill-update"
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
