import { useContext } from 'react';

import { TypingContext } from '@/context/socket/TypingContext';

export const useTyping = () => {
   return useContext(TypingContext);
};
