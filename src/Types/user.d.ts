import { GenerateType } from "./generate"

interface User{
    _id: string,
    name: string,
    email: string,
    bio: string,
    location: string,
    website: string,
    username: string,
    avatar: string,
    cover_photo: string,
    roles: string[]
    created_at: string,
    updated_at: string,
}

export interface UpdateMe{
    username?:string ,
    bio?:string 
    website?:string 
    location?:string 
}
export type  GetUserResponse= GenerateType<User>
// eslint-disable-next-line @typescript-eslint/ban-types
export type GetLogoutResponse= GenerateType<{}>