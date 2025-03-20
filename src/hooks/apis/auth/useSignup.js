import { useMutation } from '@tanstack/react-query';
import { signUpRequest } from '@/apis/auth';
import { useToast } from '@/components/ui/use-toast';

export const useSignup = () => {
  const { toast } = useToast();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: signupMutation
  } = useMutation({
    mutationFn: signUpRequest,
    onSuccess: (data) => {
      console.log('Successfully signed up', data);
      toast({
        title: 'Successfully signed up',
        message: 'You will be redirected to the login page in a few seconds',
        type: 'success'
      });
    },
    onError: (error) => {
      console.error('Failed to sign up hhh', error);
      toast({
        title: 'Failed to sign up',
        message: error?.message || 'Something went wrong',
        type: 'error'
      });
    }
  });

  return {
    isPending,
    isSuccess,
    error,
    signupMutation
  };
};
