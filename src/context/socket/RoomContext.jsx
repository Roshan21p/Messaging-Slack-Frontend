import { useSocketConnection } from '@/hooks/context/socket/useSocketConnection';
import { createContext, useEffect, useRef, useState } from 'react';

const RoomContext = createContext();

export const RoomContextProvider = ({ children }) => {
   const { socket } = useSocketConnection();

   const [currentChannel, setCurrentChannel] = useState(null);
   const [currentRoomId, setCurrentRoomId] = useState(null);

   const [onlineUsers, setOnlineUsers] = useState(0);

   const currentChannelRef = useRef(null); // ✅ holds active roomId for comparison

   useEffect(() => {
      currentChannelRef.current = currentChannel;
      return () => {
         if (socket) {
            currentChannelRef.current = null;
         }
      };
   }, [currentChannel]);

   // Handle online users
   useEffect(() => {
      if (!socket) return;

      const handleOnlineUsers = ({ roomId, count }) => {
         if (roomId === currentChannel) {
            setOnlineUsers(count);
         } else if (roomId === currentRoomId) {
            setOnlineUsers(count);
         }
      };

      socket.on('OnlineUsers', handleOnlineUsers);

      return () => {
         if (socket) {
            socket.off('OnlineUsers', handleOnlineUsers);
         }
      };
   }, [currentChannel, currentRoomId]);

   function joinChannel(channelId) {
      if (!socket || !channelId) return;

      socket?.emit('JoinChannel', { channelId }, (data) => {
         console.log('Successfully joined the channel', data);
         setCurrentChannel(data?.data?.roomId);
         currentChannelRef.current = data?.data?.roomId;
         setCurrentRoomId(null);
         setOnlineUsers(data?.data?.users);
      });
   }

   function leaveChannel(channelId) {
      if (!socket || !channelId) return;
      socket?.emit('LeaveChannel', { channelId }, (data) => {
         console.log('Successfully left the channel:', data);
         setCurrentChannel(null);
         setCurrentRoomId(null);
      });
   }

   function joinDmRoom(roomId) {
      if (!socket || !roomId) return;

      socket?.emit('JoinDmRoom', { roomId }, (data) => {
         console.log('Successfully joined the JoinDmRoom', data);
         setCurrentRoomId(data?.data?.roomId);
         setOnlineUsers(data?.data?.users);
         setCurrentChannel(null);
      });
   }

   function leaveDmRoom(roomId) {
      if (!socket || !roomId) return;

      socket?.emit('LeaveDmRoom', { roomId }, (data) => {
         console.log('Successfully left the LeaveDmRoom:', data);
         setCurrentChannel(null);
         setCurrentRoomId(null);
      });
   }

   return (
      <RoomContext.Provider
         value={{
            currentChannel,
            currentRoomId,
            joinChannel,
            leaveChannel,
            currentChannelRef,
            leaveDmRoom,
            joinDmRoom,
            onlineUsers
         }}
      >
         {children}
      </RoomContext.Provider>
   );
};
export default RoomContext;
