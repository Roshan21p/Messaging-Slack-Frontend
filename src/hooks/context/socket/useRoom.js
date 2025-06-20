import { useContext } from 'react';

import RoomContext from '@/context/socket/RoomContext';

export const useRoom = () => {
   return useContext(RoomContext);
};
