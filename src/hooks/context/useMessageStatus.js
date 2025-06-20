import { useContext } from 'react';

import MessageStatusContext from '@/context/MessageStatusContext';

export const useMessageStatus = () => {
   return useContext(MessageStatusContext);
};
