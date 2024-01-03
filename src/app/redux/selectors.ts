import { RootState } from '../store'

const getAuth = (state: RootState) => state.app.auth

export default getAuth
