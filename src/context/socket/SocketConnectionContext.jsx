import { createContext, useEffect, useRef, useState } from 'react';

import io from 'socket.io-client';

import { useAuth } from '@/hooks/context/useAuth';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';

const SocketConnectionContext = createContext();

export const SocketConnectionProvider = ({ children }) => {
   const socketRef = useRef(null);
   const [socket, setSocket] = useState(null); // ✅ use state for context
   const { auth } = useAuth();
   const { currentWorkspace: workspace } = useCurrentWorkspace();
   const workspaceId = workspace?._id;

   console.log('workspaceId', workspaceId);

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
      setSocket(socketInstance);

      socketInstance.on('connect', () => {
         console.log('Socket connected:', socketInstance.id);
      });

      return () => {
         socketRef.current?.disconnect();
         setSocket(null); // ✅ clear socket
         socketRef.current = null;
      };
   }, [auth?.user?._id]);

   useEffect(() => {
      if (!socket) return;

      const join = () => {
         if (!workspaceId) return;
         socket.emit('JoinWorkspace', { workspaceId }, (data) => {
            console.log('Workspace joined:', data);
         });
      };

      socket.on('connect', join);

      if (socket.connected) {
         join();
      }

      // Clean up
      return () => {
         if (socket && workspaceId) {
            socket.emit('LeaveWorkspace', { workspaceId });
         }
         socket.off('connect', join);
      };
   }, [socket, workspaceId]);
   return (
      <SocketConnectionContext.Provider value={{ socket }}>
         {children}
      </SocketConnectionContext.Provider>
   );
};

export default SocketConnectionContext;
