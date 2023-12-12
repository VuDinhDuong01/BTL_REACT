import {type GenerateType} from './Generate.d'
interface AuthResponse{
    _id?:string ,
    access_token:string ,
    refresh_token:string 
}
export type AuthResponseType=GenerateType<AuthResponse>
export interface AuthRequestProp{
    password:string ,
    email:string ,
    username?:string 
}
export type HandleDiaLog = {
    openDiaLog:()=>void,
    closeDiaLog:()=>void;
};
