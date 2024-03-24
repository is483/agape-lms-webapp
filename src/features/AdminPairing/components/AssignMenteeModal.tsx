import {
  Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Flex, Button, SimpleGrid, Text, useToast,
} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { ControlledSelect } from '../../../components'
import useAdminUnassignedMenteesOptions from '../../../hooks/useAdminUnassignedMenteesOptions'
import { useGetUserDetailsAdminQuery, useUpdateMentorMenteePairingMutation } from '../../../app/services/user/apiUserSlice'
import UserDetails from '../../UsersList/UserDetails'
import { PairingRequest } from '../../../app/services/user/types'

interface AssignMenteeModalProps {
  isModalOpen: boolean
  onModalClose: () => void
  mentorId: string | number
}

function AssignMenteeModal(props: AssignMenteeModalProps) {
  const { isModalOpen, onModalClose, mentorId } = props
  const [Pairing] = useUpdateMentorMenteePairingMutation()
  const { options: unAssignedMenteeAdminOptions } = useAdminUnassignedMenteesOptions()
  const [menteeId, setMenteeId] = useState('')
  const toast = useToast()
  const { data: mentorDetails } = useGetUserDetailsAdminQuery(mentorId ?? '')
  const { data: menteeDetails } = useGetUserDetailsAdminQuery(menteeId ?? '')

  const handleMenteeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedMenteeId = e.target.value
    setMenteeId(selectedMenteeId)
  }

  const handleModalCancel = () => {
    onModalClose()
  }
  const handleAccept = async () => {
    if (!menteeId || !mentorId) {
      toast({
        title: 'Pairing of Mentor and Mentee',
        description: 'Please ensure you have selected a mentee first!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      })
      return
    }
    const PairingRequest: PairingRequest = {
      mentorId,
      menteeId,
    }
    try {
      console.log(PairingRequest)
      await Pairing(PairingRequest).unwrap()
      toast({
        title: 'Pairing of Mentor and Mentee',
        description: 'Mentee has been successfully assigned to new mentor!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      })
      handleModalCancel()
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <Modal isOpen={isModalOpen} onClose={onModalClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent p="4" m="4" maxHeight="90vh">
        <ModalHeader> Pairing of Mentee to Mentor</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={2} spacing="4" maxHeight="650px" overflowY="auto">
            <Flex flexDir="column">
              <Text fontWeight="semibold" fontSize="lg" mb="10"> Current Mentor: </Text>
              {mentorDetails && <UserDetails user={mentorDetails} userRole="Admin" toHide />}
            </Flex>

            <Flex flexDir="column">
              <Box mb="5">
                <ControlledSelect options={unAssignedMenteeAdminOptions} selectProps={{ value: menteeId, onChange: handleMenteeChange }} error="" />
              </Box>
              {menteeDetails && <UserDetails user={menteeDetails} userRole="Admin" toHide />}
            </Flex>

          </SimpleGrid>
          <Flex gap="4" justify="flex-end" mt="8">
            <Button colorScheme="red" size="sm" variant="outline" onClick={handleModalCancel}>Cancel</Button>
            <Button colorScheme="red" size="sm" onClick={handleAccept}> Confirm </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default AssignMenteeModal
function toast(arg0: { title: string; description: string; status: string; duration: number; isClosable: boolean; position: string }) {
  throw new Error('Function not implemented.')
}

