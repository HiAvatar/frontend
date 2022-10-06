import axios from 'axios'

interface UserInfo {
  id: string
  password: string
}

export const postUserInfo = async (info: UserInfo) =>
  await axios.post('http://localhost:8000/users', info)

export const postUserCheck = async (info: UserInfo) =>
  await axios.post('/sign-up/check/duplicate-id', info)
