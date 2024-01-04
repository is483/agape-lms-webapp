import { Box } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../hooks'
import getAuth from './redux/selectors'
import { Login } from '../features/Login'
import { Register } from '../features/Register'
import AppLayout from './AppLayout'

function App() {
  const { isLoggedIn } = useAppSelector(getAuth)

  // TODO: Remove false condition when login implemented
  if (false && !isLoggedIn) {
    return (
      <Box>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Box>
    )
  }

  return <AppLayout />
}

export default App
