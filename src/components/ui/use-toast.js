 import { toast as shadToast } from "sonner";

export const useToast = () => {
  const toast = ({ title, message, type, variant }) => {
    shadToast[type || "message"](title, {
      description: message,
      variant: variant || "default",
    });
  };

  return { toast };
};
