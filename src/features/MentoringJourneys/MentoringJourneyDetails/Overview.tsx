import { useNavigate, useParams } from 'react-router-dom'
import {
  Box, Flex, Skeleton, SkeletonCircle,
  SkeletonText, Text,
} from '@chakra-ui/react'
import { useGetMentoringJourneyOverviewQuery } from '../../../app/services/mentoringJourney/apiMentoringJourneySlice'
import { InfographicItem, ProfileIcon } from '../../../components'
import { formatDate } from '../../../utils'
import paths from '../../../paths'

function Overview() {
  const { mentoringJourneyId } = useParams()
  const { data, isLoading } = useGetMentoringJourneyOverviewQuery(mentoringJourneyId!)
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
      <Text fontWeight="700" fontSize={['lg', null, null, 'xl']}>
        Career Transformation with {data?.mentee.firstName}
      </Text>
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
          amount={data?.totalCompletedHours ?? 0}
          iconName="handshake"
        />
        <InfographicItem
          border="solid"
          borderWidth="1px"
          borderColor="secondary.50"
          padding="4"
          rounded="md"
          title="Total Hours Completed"
          amount={data?.totalSessionsCompleted ?? 0}
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

export default Overview
