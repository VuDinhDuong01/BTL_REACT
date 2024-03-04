// import { io } from "socket.io-client";
// import { getAccessTokenToLS, getProfileToLS } from ".";
// import { checkToken } from "./check-token";

// export const socket = io("http://localhost:3000", {
//     auth: {
//         _id: (getProfileToLS() as { user_id?: string })?.user_id
//     }
// });

// export const checkConnectSocket = () => {
//     const accessToken = getAccessTokenToLS()
//     if (Boolean(accessToken) && checkToken(accessToken as string)) {
//         return io("http://localhost:3000", {
//             auth: {
//                 _id: (getProfileToLS() as { user_id?: string })?.user_id
//             }
//         } )
//     }
// }