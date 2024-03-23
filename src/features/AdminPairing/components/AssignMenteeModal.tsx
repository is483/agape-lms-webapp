import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Flex, Button, SimpleGrid, Box,
} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { ControlledSelect } from '../../../components'
import useAdminUnassignedMenteesOptions from '../../../hooks/useAdminUnassignedMenteesOptions'

interface AssignMenteeModalProps {
  isModalOpen: boolean
  onModalClose: () => void
  mentorId: string | number
}

function AssignMenteeModal(props: AssignMenteeModalProps) {
  const { isModalOpen, onModalClose, mentorId } = props
  const [menteeId, setMenteeId] = useState('')
  const { options: unAssignedMenteeAdminOptions } = useAdminUnassignedMenteesOptions()

  const handleMenteeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedMenteeId = e.target.value
    setMenteeId(selectedMenteeId)
  }

  const handleModalCancel = () => {
    onModalClose()
  }
  const handleAccept = async () => {

  }
  return (
    <Modal isOpen={isModalOpen} onClose={onModalClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent p="4" m="4" maxHeight="90vh" overflowY="auto">
        <ModalHeader> Assign Mentee to Mentor</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={2} spacing="4">
            <Flex>
              Hello
            </Flex>

            <Flex>
              <ControlledSelect options={unAssignedMenteeAdminOptions} selectProps={{ value: menteeId, onChange: handleMenteeChange }} error="" />
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
