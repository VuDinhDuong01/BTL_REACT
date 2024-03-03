import { io } from "socket.io-client";
import { getProfileToLS } from ".";



export const socket = io("http://localhost:3000",{
    auth:{
        _id: (getProfileToLS() as {user_id?:string })?.user_id
    }
});