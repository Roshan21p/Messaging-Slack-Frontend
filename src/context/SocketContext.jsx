import { createContext, useEffect, useRef, useState } from 'react';
import { useChannelMessages } from '@/hooks/context/useChannelMessages';
import { io } from 'socket.io-client';
import { useAuth } from '@/hooks/context/useAuth';

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
   const [currentChannel, setCurrentChannel] = useState(null);
   const [currentRoomId, setCurrentRoomId] = useState(null);
   const [typingUsers, setTypingUsers] = useState([]);
   const [onlineUsers, setOnlineUsers] = useState(0);
   const { messageList, setMessageList } = useChannelMessages();
   const { auth } = useAuth();

   const socketRef = useRef(null);

   useEffect(() => {
      if (!auth?.user?._id) return;

      if (socketRef.current) {
         socketRef.current.disconnect();
      }

      socketRef.current = io(import.meta.env.VITE_BACKEND_SOCKET_URL, {
         auth: {
            userId: auth.user._id
         }
      });

      socketRef.current.on('connect', () => {
         console.log('Socket connected:', socketRef.current.id);
      });

      socketRef.current.on('NewMessageReceived', (data) => {
         setMessageList((prev) => [...prev, data]);
      });

      return () => {
         if (socketRef.current) {
            socketRef.current.off('NewMessageReceived');
            socketRef.current.disconnect();
            socketRef.current = null;
         }
      };
   }, [auth?.user?._id]);

   // Listen for typing/stop_typing
   useEffect(() => {
      if (!socketRef.current) return;

      const handleTyping = ({ roomId, username }) => {

         if (roomId === currentChannel || roomId === currentRoomId) {
            setTypingUsers((prev) => {
               if (!prev.includes(username)) return [...prev, username];
               return prev;
            });
         }
      };

      const handleStopTyping = ({ roomId, username }) => {
         if (roomId === currentChannel || roomId === currentRoomId) {
            setTypingUsers((prev) => prev.filter((user) => user !== username));
         }
      };

      socketRef.current.on('UserTyping', handleTyping);
      socketRef.current.on('UserStopTyping', handleStopTyping);

      return () => {
         if (socketRef.current) {
            socketRef.current.off('UserTyping', handleTyping);
            socketRef.current.off('UserStopTyping', handleStopTyping);
            setTypingUsers([]);
         }
      };
   }, [currentChannel, currentRoomId]);

   // Handle online users
   useEffect(() => {
      if (!socketRef.current) return;

      const handleOnlineUsers = ({ roomId, count }) => {
         if (roomId === currentChannel) {
            setOnlineUsers(count);
         } else if (roomId === currentRoomId) {
            setOnlineUsers(count);
         }
      };

      socketRef.current.on('OnlineUsers', handleOnlineUsers);

      return () => {
         if (socketRef.current) {
            socketRef.current.off('OnlineUsers', handleOnlineUsers);
         }
      };
   }, [currentChannel, currentRoomId]);

   function joinChannel(channelId) {
      if (!socketRef.current) return;

      socketRef.current.emit('JoinChannel', { channelId }, (data) => {
         console.log('Successfully joined the channel', data);
         setCurrentChannel(data?.data?.roomId);
         setOnlineUsers(data?.data?.users);
         setCurrentRoomId(null);
      });
   }

   function leaveChannel(channelId) {
      if (!socketRef.current || !channelId) return;
      console.log('leave');

      socketRef.current?.emit('LeaveChannel', { channelId }, (data) => {
         console.log('Successfully left the channel:', data);
         setCurrentRoomId(null);
      });
   }

   function emitTyping(roomId, username) {
      socketRef.current?.emit('UserTyping', { roomId, username });
   }

   function emitStopTyping(roomId, username) {
      socketRef.current?.emit('UserStopTyping', { roomId, username });
   }

   function joinDmRoom(roomId) {
      if (!socketRef.current) return;

      socketRef.current.emit('JoinDmRoom', { roomId }, (data) => {
         console.log('Successfully joined the JoinDmRoom', data);
         setCurrentRoomId(data?.data?.roomId);
         setOnlineUsers(data?.data?.users);
         setCurrentChannel(null);

      });
   }

   function leaveDmRoom(roomId) {
      if (!socketRef.current) return;
      console.log('leave');

      socketRef.current?.emit('LeaveDmRoom', { roomId }, (data) => {
         console.log('Successfully left the LeaveDmRoom:', data);
         setCurrentChannel(null);
      });
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
            joinDmRoom,
            leaveDmRoom,
            currentRoomId
         }}
      >
         {children}
      </SocketContext.Provider>
   );
};

export default SocketContext;
