import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import { useSignin } from '@/hooks/apis/auth/useSignin';

import { Signincard } from './SigninCard';

export const SigninContainer = () => {
   const navigate = useNavigate();

   const queryClient = useQueryClient();

   const [signinForm, setSigninForm] = useState({
      email: '',
      password: ''
   });

   const [validationError, setValidationError] = useState(null);

   const { isSuccess, isPending, error, signinMutation } = useSignin(null);

   const onSigninFormSubmit = async (e) => {
      e.preventDefault();

      if (!signinForm.email || !signinForm.password) {
         console.log('Please fill all the fields');
         setValidationError({ message: 'Please fill all the fields' });
         return;
      }

      setValidationError(null);

      await signinMutation({
         email: signinForm.email,
         password: signinForm.password
      });
   };

   useEffect(() => {
      if (isSuccess) {
         queryClient.invalidateQueries(['fetchWorkspaces']);

         const pendingJoin = localStorage.getItem('pendingJoin');
         if (pendingJoin) {
            const { workspaceId, joinCode } = JSON.parse(pendingJoin);
            localStorage.removeItem('pendingJoin');
            navigate(`/workspaces/join/${workspaceId}?code=${joinCode}`);
         } else {
            setTimeout(() => {
               navigate('/');
            }, 2000);
         }
      }
   }, [isSuccess, navigate, queryClient]);

   return (
      <Signincard
         onSigninFormSubmit={onSigninFormSubmit}
         signinForm={signinForm}
         setSigninForm={setSigninForm}
         validationError={validationError}
         error={error}
         isSuccess={isSuccess}
         isPending={isPending}
      />
   );
};
