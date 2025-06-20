import { useContext } from 'react';

import MessageContext from '@/context/socket/MessageContext';

export const useMessage = () => {
   return useContext(MessageContext);
};
