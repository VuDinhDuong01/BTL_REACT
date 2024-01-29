import { type GenerateType } from './generate'
interface AuthResponse {
  _id?: string,
  access_token: string,
  refresh_token: string
  user: {
    _id: string,
    roles: [
      string
    ],
  }
}
export type AuthResponseType = GenerateType<AuthResponse>
export interface AuthRequestProp {
  password: string,
  email: string,
  username?: string

}
export type HandleDiaLog = {
  openDiaLog: () => void,
};


export interface ErrorHandle {
  status: number,
  data: {
    message: string,
    error: {
      [key: string]: string
    }
  }
}