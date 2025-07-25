import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { LucideLoader2, TriangleAlert } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export const Signincard = ({
   signinForm,
   setSigninForm,
   onSigninFormSubmit,
   validationError,
   error,
   isSuccess,
   isPending
}) => {
   const navigate = useNavigate();

   return (
      <Card className="w-full max-w-md">
         <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Sign in to access your account</CardDescription>

            {validationError && (
               <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                  <TriangleAlert className="size-5" />
                  <p>{validationError.message}</p>
               </div>
            )}

            {error && (
               <div className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                  <TriangleAlert className="size-5" />
                  <p>{typeof error === 'object' ? JSON.stringify(error?.message) : error}</p>
               </div>
            )}

            {isSuccess && (
               <div className="bg-primary/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-primary mb-5">
                  <FaCheck className="size-5" />
                  <p>
                     Successfully signed in. You will be redirected to the home page in a few
                     seconds.
                     <LucideLoader2 className="animate-spin ml-2" />
                  </p>
               </div>
            )}
         </CardHeader>

         <CardContent>
            <form className="space-y-3" noValidate onSubmit={onSigninFormSubmit}>
               <Input
                  disabled={isPending}
                  placeholder="Email"
                  required
                  type="email"
                  value={signinForm.email}
                  onChange={(e) => setSigninForm({ ...signinForm, email: e.target.value })}
               />

               <Input
                  disabled={isPending}
                  placeholder="Password"
                  required
                  type="password"
                  value={signinForm.password}
                  onChange={(e) => setSigninForm({ ...signinForm, password: e.target.value })}
               />

               <Button className="w-full" disabled={isPending} size="lg" type="submit">
                  {isPending ? 'Signing in...' : 'Sign In'}
               </Button>
            </form>

            <Separator className="my-5" />

            <p className="text-s text-muted-foreground mt-4">
               Do not have an account ?{' '}
               <span
                  className="text-sky-600 hover:underline cursor-pointer"
                  onClick={() => navigate('/auth/signup')}
               >
                  Sign Up
               </span>
            </p>
         </CardContent>
      </Card>
   );
};
