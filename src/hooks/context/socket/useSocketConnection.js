import { useContext } from 'react';

import SocketConnectionContext from '@/context/socket/SocketConnectionContext';

export const useSocketConnection = () => {
   return useContext(SocketConnectionContext);
};
