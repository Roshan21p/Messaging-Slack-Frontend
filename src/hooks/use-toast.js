import { toast as shadToast } from 'sonner';

export const useToast = () => {
  const toast = ({ title, message, type }) => {
    shadToast[type || 'message'](title, {
      description: message
    });
  };

  return { toast };
};
