import { io } from 'socket.io-client';

import { createContext } from 'react';

const SocketContext = createContext();

console.log(import.meta.env.VITE_BACKEND_SOCKET_URL);

export const SocketContextProvider = ({ children }) => {
   const socket = io(import.meta.env.VITE_BACKEND_SOCKET_URL);

   return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
export default SocketContext;
