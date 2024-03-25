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
  const [pairing] = useUpdateMentorMenteePairingMutation()
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
      await pairing(PairingRequest).unwrap()
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
    <Modal isOpen={isModalOpen} onClose={onModalClose} size="3xl" isCentered>
      <ModalOverlay />
      <ModalContent p="4" m="4" maxHeight="90vh">
        <ModalHeader> Pairing of Mentee to Mentor</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justify="end" mb="4">
            <Box w="50%">
              <ControlledSelect options={unAssignedMenteeAdminOptions} selectProps={{ value: menteeId, onChange: handleMenteeChange }} error="" />
            </Box>
          </Flex>
          <SimpleGrid columns={2} spacing="8" maxHeight="600px" overflowY="auto">
            <Flex flexDir="column">
              <Text fontWeight="semibold" fontSize="lg" mb="4"> Current Mentor: </Text>
              {mentorDetails && <UserDetails user={mentorDetails} isMobile userRole="Mentor" toHide />}
            </Flex>

            <Flex flexDir="column">
              <Text fontWeight="semibold" fontSize="lg" mb="4"> Current Mentee: </Text>
              {menteeDetails && <UserDetails user={menteeDetails} isMobile userRole="Mentee" toHide />}
              {!menteeDetails && <Text fontSize="sm" color="gray.500">Please select a mentee</Text>}
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
