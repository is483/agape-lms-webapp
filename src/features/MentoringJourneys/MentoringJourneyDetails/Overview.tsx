import { useParams } from 'react-router-dom'
import {
  Box, Flex, Skeleton, SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react'
import { useGetMentoringJourneyOverviewQuery } from '../../../app/services/mentoringJourney/apiMentoringJourneySlice'

function Overview() {
  const { mentoringJourneyId } = useParams()
  const { data, isLoading } = useGetMentoringJourneyOverviewQuery(mentoringJourneyId!)
  console.log(data)
  if (isLoading) {
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

  return null
}

export default Overview
