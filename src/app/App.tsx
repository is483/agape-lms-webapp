import { Box, Flex } from '@chakra-ui/react'
import {
  Route, Routes, useLocation, useNavigate,
} from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getAuth, getOnboardingStatus } from './redux/selectors'
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
import Onboarding from '../features/Onboarding/Onboarding'
import Introduction from '../features/Onboarding/component/Introduction/Introduction'

const tokenFromStorage = localStorage.getItem('token')

function App() {
  const { isLoggedIn } = useAppSelector(getAuth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { data, isLoading } = useGetUserRoleQuery(null, { skip: !tokenFromStorage })
  const [verifyOnboardingStatus] = useVerifyOnboardingStatusMutation()
  const { isComplete: onboardingComplete } = useAppSelector(getOnboardingStatus)
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
          if (onboardingStep === '1') {
            navigate(`${paths.Introduction}`)
            return
          }
          navigate(`${paths.Onboarding}/${onboardingStep}`)
        } else if (initialPath.current === '/') {
          if (data.role === 'Mentee') {
            navigate(paths.Sessions.ViewAll)
          }
          if (data.role === 'Mentor') {
            navigate(paths.MentoringJourneys.ViewAll)
          }
          if (data.role === 'Admin') {
            // TODO: navigate to main page Admin
          }
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
          {/* TODO: look into this */}
          {/* <Route path="*" element={<Navigate to={paths.Login} replace />} /> */}
          <Route path={paths.Login} element={<Login />} />
          <Route path={paths.Register} element={<Register />} />
          <Route path={paths.ForgetPassword} element={<ForgetPassword />} />
          <Route path={paths.ResetPassword} element={<ResetPassword />} />
          <Route path={paths.SessionExpired} element={<SessionExpired />} />
        </Routes>
      </Box>
    )
  }

  if (!onboardingComplete) {
    return (
      <Flex background="white" justify="center" paddingTop={[4, null, 16]} minHeight="100vh">
        <Routes>
          <Route path={paths.Introduction} element={<Introduction />} />
          <Route path={`${paths.Onboarding}/:step`} element={<Onboarding />} />
        </Routes>
      </Flex>
    )
  }

  return <AppLayout />
}

export default App
