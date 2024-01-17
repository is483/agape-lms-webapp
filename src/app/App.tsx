import { Box } from '@chakra-ui/react'
import {
  Route, Routes, useLocation, useNavigate,
} from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import getAuth from './redux/selectors'
import { Login } from '../features/Login'
import { Register } from '../features/Register'
import AppLayout from './AppLayout'
import paths from '../paths'
import { ForgetPassword } from '../features/ForgetPassword'
import { ResetPassword } from '../features/ResetPassword'
import { SessionExpired } from '../features/SessionExpired'
import { useGetUserRoleQuery } from './services/user/apiUserSlice'
import { setAuth } from './redux/appSlice'
import { useVerifyOnboardingStatusMutation } from './services/auth/apiAuthSlice'

const tokenFromStorage = localStorage.getItem('token')

function App() {
  const { isLoggedIn } = useAppSelector(getAuth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { data, isLoading } = useGetUserRoleQuery(null, { skip: !tokenFromStorage })
  const [verifyOnboardingStatus] = useVerifyOnboardingStatusMutation()
  const initialPath = useRef(pathname)

  useEffect(() => {
    const fetchOnboardingStatus = async () => verifyOnboardingStatus(null).unwrap()

    if (data) {
      dispatch(setAuth({
        token: tokenFromStorage!,
        isLoggedIn: true,
        role: data.role,
      }))
      fetchOnboardingStatus().then(({ onboardingComplete, onboardingStep }) => {
        if (!onboardingComplete) {
          navigate(`${paths.Onboarding}/${onboardingStep}`)
        }
      })
    }
  }, [data, dispatch, initialPath, navigate, verifyOnboardingStatus])

  if (isLoading) {
    return null
  }

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
