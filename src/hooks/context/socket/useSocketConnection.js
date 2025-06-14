import SocketConnectionContext from '@/context/socket/SocketConnectionContext';
import { useContext } from 'react';

export const useSocketConnection = () => {
   return useContext(SocketConnectionContext);
};
