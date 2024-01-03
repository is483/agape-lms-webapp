import { Box } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../hooks'
import getAuth from './redux/selectors'
import { Login } from '../features/Login'
import { Register } from '../features/Register'

function App() {
  const auth = useAppSelector(getAuth)

  if (!auth.isLoggedIn) {
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

  return (
    <Box>
      Main
    </Box>
  )
}

export default App
