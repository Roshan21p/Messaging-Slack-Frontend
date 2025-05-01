import { createContext, useEffect, useRef, useState } from 'react';
import { useChannelMessages } from '@/hooks/context/useChannelMessages';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
   const [currentChannel, setCurrentChannel] = useState(null);
   const [typingUsers, setTypingUsers] = useState([]);
   const [onlineUsers, setOnlineUsers] = useState(0);
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
   }, [currentChannel]);

   useEffect(() => {
      if (!socketRef.current) return;

      console.log("hello");
      
   
      const handleTyping = ({ channelId, username }) => {
         
         if(channelId === currentChannel) {
            setTypingUsers((prev) => {
               if (!prev.includes(username)) return [...prev, username];
               return prev;
            });
         }
        
      };
   
      const handleStopTyping = ({ channelId, username }) => {
         if(channelId === currentChannel){
            setTypingUsers((prev) => prev.filter((user) => user !== username));
         }
      };
   
      socketRef.current.on('typing', handleTyping);
      socketRef.current.on('stop_typing', handleStopTyping);
   
      return () => {
         socketRef.current.off('typing', handleTyping);
         socketRef.current.off('stop_typing', handleStopTyping);
         setTypingUsers([]);
      };
   }, [currentChannel]); 
   

   function joinChannel(channelId) {
      if (!socketRef.current) return;

      socketRef.current.emit('JoinChannel', { channelId }, (data) => {
         console.log('Successfully joined the channel', data);
         setCurrentChannel(data?.data?.channelId);
         setOnlineUsers(data?.data?.users);
      });
   }

   function leaveChannel(channelId) {
      if (!socketRef.current || !channelId) return;

      socketRef.current.emit('LeaveChannel', { channelId }, (data) => {
         console.log('Successfully left the channel:', data);
      });
   }

   function emitTyping( channelId, username){
      socketRef.current?.emit('typing', { channelId, username });
   }

   function emitStopTyping( channelId, username){
      socketRef.current?.emit('stop_typing', { channelId, username });
   }


   return (
      <SocketContext.Provider
         value={{
            socket: socketRef.current,
            joinChannel,
            leaveChannel,
            currentChannel,
            onlineUsers,
            emitTyping,
            emitStopTyping,
            typingUsers,
         }}
      >
         {children}
      </SocketContext.Provider>
   );
};

export default SocketContext;
