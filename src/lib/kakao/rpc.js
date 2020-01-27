import axios from 'axios'
import { KAKAO_APP_KEY } from './constants'

const kakao = axios.create()
kakao.defaults.baseURL = 'https://dapi.kakao.com'
kakao.defaults.headers = {
  Authorization: `KakaoAK ${KAKAO_APP_KEY}`
}

async function rpc(name) {
  try {
    return kakao.get(name)
  } catch (error) {
    throw new Error(error)
  }
}

export default rpc
