import { TypingContext } from '@/context/socket/TypingContext';
import { useContext } from 'react';

export const useTyping = () => {
   return useContext(TypingContext);
};
