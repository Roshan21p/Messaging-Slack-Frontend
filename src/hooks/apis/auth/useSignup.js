import { signUpRequest } from '@/apis/auth';
import { useMutation } from '@tanstack/react-query';

export const useSignup = () => {
  // prettier-ignore
  const { isPending, isSuccess, error, mutateAsync: signupMutation  } = useMutation({
      mutationFn: signUpRequest,
      onSuccess: (data) => {
        console.log('Successfully signed up', data);
      },
      onError: (error) => {
        console.error('Failed to sign up', error);
      },
    });

  return {
    isPending,
    isSuccess,
    error,
    signupMutation 
  };
};
