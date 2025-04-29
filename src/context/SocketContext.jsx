import { createContext, useEffect, useRef, useState } from 'react';
import { useChannelMessages } from '@/hooks/context/useChannelMessages';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
   const [currentChannel, setCurrentChannel] = useState(null);
   const { messageList, setMessageList } = useChannelMessages();

   const socketRef = useRef(null);

   useEffect(() => {
      socketRef.current = io(import.meta.env.VITE_BACKEND_SOCKET_URL);

      socketRef.current.on('connect', () => {
         console.log('Socket connected:', socketRef.current.id);
      });

      socketRef.current.on('NewMessageReceived', (data) => {
         setMessageList((prev) => [...prev, data]);
      });
      

      return () => {
         socketRef.current.disconnect();
      };
   }, []);

   function joinChannel(channelId) {
      if (!socketRef.current) return;

      socketRef.current.emit('JoinChannel', { channelId }, (data) => {
         console.log('Successfully joined the channel', data);
         setCurrentChannel(data?.data?.channelId);
      });
   };

   function leaveChannel(channelId) {
      if(!socketRef.current || !channelId) return;

      socketRef.current.emit('LeaveChannel', { channelId }, (data) => {
         console.log('Successfully left the channel:', data);
      })
   }

   return (
      <SocketContext.Provider
         value={{ socket: socketRef.current, joinChannel, leaveChannel, currentChannel }}
      >
         {children}
      </SocketContext.Provider>
   );
};

export default SocketContext;
