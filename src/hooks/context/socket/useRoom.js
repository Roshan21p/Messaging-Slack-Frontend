import RoomContext from '@/context/socket/RoomContext';
import { useContext } from 'react';

export const useRoom = () => {
   return useContext(RoomContext);
};
