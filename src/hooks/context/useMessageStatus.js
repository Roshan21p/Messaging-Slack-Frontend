import MessageStatusContext from '@/context/MessageStatusContext';
import { useContext } from 'react';

export const useMessageStatus = () => {
   return useContext(MessageStatusContext);
};
