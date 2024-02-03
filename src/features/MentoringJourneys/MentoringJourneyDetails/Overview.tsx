import { useParams } from 'react-router-dom'
import {
  Box, Flex, Skeleton, SkeletonCircle,
  SkeletonText, Text,
} from '@chakra-ui/react'
import { useGetMentoringJourneyOverviewQuery } from '../../../app/services/mentoringJourney/apiMentoringJourneySlice'

function Overview() {
  const { mentoringJourneyId } = useParams()
  const { data, isLoading } = useGetMentoringJourneyOverviewQuery(mentoringJourneyId!)
  console.log(data)

  if (isLoading) {
    return <OverviewSkeleton />
  }

  return (
    <>
      <Text fontWeight="700" fontSize="xl">
        Career Transformation with {data?.mentee.firstName}
      </Text>
      <Text fontSize="sm" color="secondary.400">
        View all necessary information about your mentoring journey
      </Text>
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
