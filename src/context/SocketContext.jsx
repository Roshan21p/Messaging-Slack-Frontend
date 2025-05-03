import { createContext, useEffect, useRef, useState } from 'react';
import { useChannelMessages } from '@/hooks/context/useChannelMessages';
import { io } from 'socket.io-client';
import { useAuth } from '@/hooks/context/useAuth';

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
   const [currentChannel, setCurrentChannel] = useState(null);
   const [typingUsers, setTypingUsers] = useState([]);
   const [onlineUsers, setOnlineUsers] = useState(0);
   const { messageList, setMessageList } = useChannelMessages();
   const { auth } = useAuth();

   const socketRef = useRef(null);

   useEffect(() => {
      if (!auth?.user?._id || socketRef.current) return;
      socketRef.current = io(import.meta.env.VITE_BACKEND_SOCKET_URL, {
         auth: {
            userId: auth?.user?._id
         }
      });

      socketRef.current.on('connect', () => {
         console.log('Socket connected:', socketRef.current.id);
      });

      socketRef.current.on('NewMessageReceived', (data) => {
         setMessageList((prev) => [...prev, data]);
      });

      return () => {
         socketRef.current.disconnect();
      };
   }, [auth?.user?._id]);

   // Listen for typing/stop_typing
   useEffect(() => {
      if (!socketRef.current) return;

      const handleTyping = ({ channelId, username }) => {
         if (channelId === currentChannel) {
            setTypingUsers((prev) => {
               if (!prev.includes(username)) return [...prev, username];
               return prev;
            });
         }
      };

      const handleStopTyping = ({ channelId, username }) => {
         if (channelId === currentChannel) {
            setTypingUsers((prev) => prev.filter((user) => user !== username));
         }
      };

      socketRef.current.on('UserTyping', handleTyping);
      socketRef.current.on('UserStopTyping', handleStopTyping);

      return () => {
         socketRef.current.off('UserTyping', handleTyping);
         socketRef.current.off('UserStopTyping', handleStopTyping);
         setTypingUsers([]);
      };
   }, [currentChannel]);

   // Handle online users
   useEffect(() => {
      if (!socketRef.current || !currentChannel) return;

      const handleOnlineUsers = ({ channelId, count }) => {
         if (channelId === currentChannel) {
            setOnlineUsers(count);
         }
      };

      socketRef.current.on('OnlineUsers', handleOnlineUsers);

      return () => {
         socketRef.current.off('OnlineUsers', handleOnlineUsers);
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
      console.log('leave');

      socketRef.current?.emit('LeaveChannel', { channelId }, (data) => {
         console.log('Successfully left the channel:', data);
      });
   }

   function emitTyping(channelId, username) {
      socketRef.current?.emit('UserTyping', { channelId, username });
   }

   function emitStopTyping(channelId, username) {
      socketRef.current?.emit('UserStopTyping', { channelId, username });
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
            typingUsers
         }}
      >
         {children}
      </SocketContext.Provider>
   );
};

export default SocketContext;
