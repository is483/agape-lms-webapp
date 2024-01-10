import { Box } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../hooks'
import getAuth from './redux/selectors'
import { Login } from '../features/Login'
import { Register } from '../features/Register'
import AppLayout from './AppLayout'
import paths from '../paths'
import { ForgetPassword } from '../features/ForgetPassword'

function App() {
  const { isLoggedIn } = useAppSelector(getAuth)

  // TODO: Remove false condition when login implemented
  // false &&
  if (!isLoggedIn) {
    return (
      <Box>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path={paths.Login} element={<Login />} />
          <Route path={paths.Register} element={<Register />} />
          <Route path={paths.ForgetPassword} element={<ForgetPassword />} />
        </Routes>
      </Box>
    )
  }

  return <AppLayout />
}

export default App
