import { createContext, useEffect, useRef, useState } from 'react';
import { useChannelMessages } from '@/hooks/context/useChannelMessages';
import { io } from 'socket.io-client';
import { useAuth } from '@/hooks/context/useAuth';
import { useMessageStatus } from '@/hooks/context/useMessageStatus';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';

//const SocketContext = createContext();

//export const SocketContextProvider = ({ children }) => {
// const [currentChannel, setCurrentChannel] = useState(null);
// const [currentRoomId, setCurrentRoomId] = useState(null);
// const [typingUsers, setTypingUsers] = useState([]);
// const [onlineUsers, setOnlineUsers] = useState(0);
// const { messageList, setMessageList } = useChannelMessages();
// const { auth } = useAuth();
// const { updateChannelUnreadCount } = useMessageStatus();
// const { currentWorkspace } = useCurrentWorkspace();
// const currentChannelRef = useRef(null);
// const socketRef = useRef(null);

// useEffect(() => {
//    currentChannelRef.current = currentChannel;

//    return () => {
//       if (socketRef.current) {
//          currentChannelRef.current = null;
//       }
//    };
// }, [currentChannel]);

// useEffect(() => {
//    if (!auth?.user?._id) return;

//    if (socketRef.current) {
//       socketRef.current.disconnect();
//    }

//    socketRef.current = io(import.meta.env.VITE_BACKEND_SOCKET_URL, {
//       auth: {
//          userId: auth.user._id
//       }
//    });

//    socketRef.current.on('connect', () => {
//       console.log('Socket connected:', socketRef.current.id);
//    });

//    socketRef.current.on('NewMessageReceived', (data) => {
//       setMessageList((prev) => [...prev, data]);
//       console.log('new message', data);
//    });

//    socketRef.current.on('NewMessageNotification', ({ channelId, workspaceId, senderId }) => {
//       console.log(
//          'NewMessageNotification',
//          channelId,
//          'workspaceId',
//          workspaceId,
//          'currentChannel',
//          currentChannelRef.current
//       );

//       if (senderId !== auth?.user?._id && channelId !== currentChannelRef.current) {
//          console.log(
//             'newMessageNotification call back',
//             channelId,
//             'currentChannel',
//             currentChannelRef.current
//          );

//          updateChannelUnreadCount(channelId);
//       }
//    });

//    return () => {
//       if (socketRef.current) {
//          socketRef.current.off('NewMessageReceived');
//          socketRef.current.off('NewMessageNotification');
//          socketRef.current.disconnect();
//          socketRef.current = null;
//          setCurrentChannel(null);
//       }
//    };
// }, [auth?.user?._id]);

// console.log('currentChannel', currentChannel, currentChannelRef.current);

// useEffect(() => {
//    if (!socketRef.current || !currentWorkspace?._id) return;

//    console.log('workspace', currentWorkspace?._id);

//    socketRef.current.emit('JoinWorkspace', {
//       workspaceId: currentWorkspace?._id
//    });

//    return () => {
//       if (socketRef.current) {
//          socketRef.current.emit('LeaveWorkspace', {
//             workspaceId: currentWorkspace?._id
//          });
//       }
//    };
// }, [currentWorkspace?._id]);

// // Listen for typing/stop_typing
// useEffect(() => {
//    if (!socketRef.current) return;

//    const handleTyping = ({ roomId, username }) => {
//       console.log('socket typing', roomId, currentChannel, currentRoomId);
//       const currentRoom = currentChannel || currentRoomId;

//       if (roomId === currentRoom) {
//          setTypingUsers((prev) => {
//             if (!prev.includes(username)) return [...prev, username];
//             return prev;
//          });
//       }
//    };

//    const handleStopTyping = ({ roomId, username }) => {
//       const currentRoom = currentChannel || currentRoomId;

//       if (roomId === currentRoom) {
//          setTypingUsers((prev) => prev.filter((user) => user !== username));
//       }
//    };

//    socketRef.current.on('UserTyping', handleTyping);
//    socketRef.current.on('UserStopTyping', handleStopTyping);

//    return () => {
//       if (socketRef.current) {
//          socketRef.current.off('UserTyping', handleTyping);
//          socketRef.current.off('UserStopTyping', handleStopTyping);
//          setTypingUsers([]);
//       }
//    };
// }, [currentChannel, currentRoomId]);

// // Handle online users
// useEffect(() => {
//    if (!socketRef.current) return;

//    const handleOnlineUsers = ({ roomId, count }) => {
//       if (roomId === currentChannel) {
//          setOnlineUsers(count);
//       } else if (roomId === currentRoomId) {
//          setOnlineUsers(count);
//       }
//    };

//    socketRef.current.on('OnlineUsers', handleOnlineUsers);

//    return () => {
//       if (socketRef.current) {
//          socketRef.current.off('OnlineUsers', handleOnlineUsers);
//       }
//    };
// }, [currentChannel, currentRoomId]);

// function joinChannel(channelId) {
//    if (!socketRef.current || !channelId) return;

//    socketRef.current.emit('JoinChannel', { channelId }, (data) => {
//       console.log('Successfully joined the channel', data);
//       setCurrentChannel(data?.data?.roomId);
//       setOnlineUsers(data?.data?.users);
//       setCurrentRoomId(null);
//    });
// }

// function leaveChannel(channelId) {
//    if (!socketRef.current || !channelId) return;
//    socketRef.current?.emit('LeaveChannel', { channelId }, (data) => {
//       console.log('Successfully left the channel:', data);
//       setCurrentRoomId(null);
//       setCurrentChannel(null);
//       setTypingUsers([]);
//    });
// }

// function emitTyping(roomId, username) {
//    if (!roomId || !username || !socketRef.current) return;
//    socketRef.current?.emit('UserTyping', { roomId, username });
// }

// function emitStopTyping(roomId, username) {
//    if (!roomId || !username || !socketRef.current) return;
//    socketRef.current?.emit('UserStopTyping', { roomId, username });
// }

// function joinDmRoom(roomId) {
//    if (!socketRef.current || !roomId) return;

//    socketRef.current.emit('JoinDmRoom', { roomId }, (data) => {
//       console.log('Successfully joined the JoinDmRoom', data);
//       setCurrentRoomId(data?.data?.roomId);
//       setOnlineUsers(data?.data?.users);
//       setCurrentChannel(null);
//    });
// }

// function leaveDmRoom(roomId) {
//    if (!socketRef.current || !roomId) return;

//    socketRef.current?.emit('LeaveDmRoom', { roomId }, (data) => {
//       console.log('Successfully left the LeaveDmRoom:', data);
//       setCurrentChannel(null);
//       setCurrentRoomId(null);
//       setTypingUsers([]);
//    });
// }

//    return (
//       <SocketContext.Provider
//          value={{
//             socket: socketRef.current,
//             joinChannel,
//             leaveChannel,
//             currentChannel,
//             onlineUsers,
//             emitTyping,
//             emitStopTyping,
//             typingUsers,
//             joinDmRoom,
//             leaveDmRoom,
//             currentRoomId
//          }}
//       >
//          {children}
//       </SocketContext.Provider>
//    );
// };

// export default SocketContext;
