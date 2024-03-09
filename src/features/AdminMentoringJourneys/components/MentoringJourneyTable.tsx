import {
  Button, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure,
} from '@chakra-ui/react'
import { Link, ProfileIcon } from '../../../components'
import paths from '../../../paths'
import { AdminMentoringJourney } from '../../../app/services/mentoringJourney/types'
import DeleteMentoringJourneyModal from '../DeleteMentoringJourneyModal'

interface MentoringJourneyTableProps {
  data: AdminMentoringJourney[]
}

function MentoringJourneyTable(props: MentoringJourneyTableProps) {
  const { data } = props
  const { isOpen: isDeleteMentoringJourneyModalOpen, onOpen: onOpenDeleteMentoringJourneyModal, onClose: onDeleteMentoringJourneyModalClose } = useDisclosure()
  return (
    <TableContainer whiteSpace="unset" width="100%">
      <Table variant="simple">
        <Thead backgroundColor="gray.100">
          <Tr>
            <Th>Mentor</Th>
            <Th>Mentee</Th>
            <Th>Title</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {data.length === 0 && (
            <Tr>
              <Td colSpan={4}>
                <Flex height="40px" justify="center" align="center">
                  No Mentoring Journey
                </Flex>
              </Td>
            </Tr>
          )}
          {data.map((mentoringJourney) => {
            const {
              mentorImgUrl, mentorFirstName, mentorLastName, menteeImgUrl, menteeFirstName, menteeLastName, title, mentoringJourneyId,
            } = mentoringJourney

            return (
              <Tr>
                <Td>
                  <Flex gap="4" align="center">
                    <ProfileIcon imgUrl={mentorImgUrl} width="32px" height="32px" iconProps={{ fontSize: '24px' }} />
                    {mentorFirstName} {mentorLastName}
                  </Flex>
                </Td>
                <Td>
                  <Flex gap="4" align="center">
                    <ProfileIcon imgUrl={menteeImgUrl} width="32px" height="32px" iconProps={{ fontSize: '24px' }} />
                    {menteeFirstName} {menteeLastName}
                  </Flex>
                </Td>
                <Td>
                  {title}
                </Td>

                <Td>
                  <DeleteMentoringJourneyModal isModalOpen={isDeleteMentoringJourneyModalOpen} onModalClose={onDeleteMentoringJourneyModalClose} mentoringJourneyId={mentoringJourneyId} />
                  <Flex justify="end" gap="4">
                    <Link to={`${paths.AdminMentoringJourneys.Details.subPath}/${mentoringJourneyId}`}>
                      <Button colorScheme="red">View Details</Button>
                    </Link>
                    <Button colorScheme="red" variant="outline" onClick={onOpenDeleteMentoringJourneyModal}>
                      Delete
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            )
          })}

        </Tbody>
      </Table>
    </TableContainer>
  )
}
export default MentoringJourneyTable
