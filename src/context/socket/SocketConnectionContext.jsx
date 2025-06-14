import { useAuth } from '@/hooks/context/useAuth';
import { createContext, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const SocketConnectionContext = createContext();

export const SocketConnectionProvider = ({ children }) => {
   const socketRef = useRef(null);
   const [socket, setSocket] = useState(null); // ✅ use state for context
   const { auth } = useAuth();

   useEffect(() => {
      if (!auth?.user?._id) return;

      if (socketRef.current) {
         socketRef.current.disconnect();
      }

      const socketInstance = io(import.meta.env.VITE_BACKEND_SOCKET_URL, {
         auth: {
            userId: auth.user._id
         }
      });

      socketRef.current = socketInstance;
      setSocket(socketInstance); // ✅ update context value

      socketInstance.on('connect', () => {
         console.log('Socket connected:', socketInstance.id);
      });

      return () => {
         socketRef.current?.disconnect();
         setSocket(null); // ✅ clear socket
         socketRef.current = null;
      };
   }, [auth?.user?._id]);

   return (
      <SocketConnectionContext.Provider value={{ socket }}>
         {children}
      </SocketConnectionContext.Provider>
   );
};

export default SocketConnectionContext;
