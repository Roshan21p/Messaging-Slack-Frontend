import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/hooks/context/useAuth';
import { useToast } from '@/hooks/use-toast';

import { signInRequest } from '@/apis/auth';

export const useSignin = () => {
   const { toast } = useToast();
   const { setAuth } = useAuth();
   const {
      isPending,
      isSuccess,
      error,
      mutateAsync: signinMutation
   } = useMutation({
      mutationFn: signInRequest,

      onSuccess: (response) => {
         console.log('Successfully signed in', response);

         const userObject = JSON.stringify(response.data);

         localStorage.setItem('user', userObject);
         localStorage.setItem('token', response.data.token);

         setAuth({
            user: response?.data,
            token: response?.data?.token,
            isLoading: false
         });

         toast({
            title: 'Successfully signed in',
            message: 'You will be redirected to the home page in a few seconds',
            type: 'success'
         });
      },
      onError: (error) => {
         console.error('Failed to sign in hello', error);
         toast({
            title: 'Failed to sign in',
            message: error?.message || 'Something went wrong',
            type: 'error'
         });
      }
   });

   return {
      isPending,
      isSuccess,
      error,
      signinMutation
   };
};
