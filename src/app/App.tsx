import { Box } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../hooks'
import getAuth from './redux/selectors'
import { Login } from '../features/Login'
import { Register } from '../features/Register'
import AppLayout from './AppLayout'
import paths from '../paths'
import { ForgetPassword } from '../features/ForgetPassword'
import { ResetPassword } from '../features/ResetPassword'
import { SessionExpired } from '../features/SessionExpired'

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
          <Route path={paths.ResetPassword} element={<ResetPassword />} />
          <Route path={paths.SessionExpired} element={<SessionExpired />} />
        </Routes>
      </Box>
    )
  }

  return <AppLayout />
}

export default App
