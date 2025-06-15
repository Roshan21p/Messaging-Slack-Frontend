import { createContext, useEffect, useState } from 'react';
import { useSocketConnection } from '@/hooks/context/socket/useSocketConnection';
import { useRoom } from '@/hooks/context/socket/useRoom';

export const TypingContext = createContext();

export const TypingContextProvider = ({ children }) => {
   const { socket } = useSocketConnection();
   const [typingUsers, setTypingUsers] = useState([]);
   const { currentChannel, currentRoomId } = useRoom();

   useEffect(() => {
      if (!socket) return;

      const handleTyping = ({ roomId, username }) => {
         const currentRoom = currentChannel || currentRoomId;

         if (roomId === currentRoom) {
            setTypingUsers((prev) => {
               if (!prev.includes(username)) return [...prev, username];
               return prev;
            });
         }
      };

      const handleStopTyping = ({ roomId, username }) => {
         const currentRoom = currentChannel || currentRoomId;

         if (roomId === currentRoom) {
            setTypingUsers((prev) => prev.filter((user) => user !== username));
         }
      };

      socket.on('UserTyping', handleTyping);
      socket.on('UserStopTyping', handleStopTyping);

      return () => {
         if (socket) {
            socket.off('UserTyping', handleTyping);
            socket.off('UserStopTyping', handleStopTyping);
            setTypingUsers([]);
         }
      };
   }, [socket, currentChannel, currentRoomId]);

   function emitTyping(roomId, username) {
      if (!roomId || !username || !socket) return;
      socket?.emit('UserTyping', { roomId, username });
   }

   function emitStopTyping(roomId, username) {
      if (!roomId || !username || !socket) return;
      socket?.emit('UserStopTyping', { roomId, username });
   }
   return (
      <TypingContext.Provider value={{ typingUsers, emitStopTyping, emitTyping }}>
         {children}
      </TypingContext.Provider>
   );
};
