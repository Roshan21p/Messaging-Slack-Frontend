import MessageContext from '@/context/socket/MessageContext';
import { useContext } from 'react';

export const useMessage = () => {
   return useContext(MessageContext);
};
