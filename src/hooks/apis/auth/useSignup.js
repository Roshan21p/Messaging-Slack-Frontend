import { useMutation } from "@tanstack/react-query";

import { signUpRequest } from "@/api/auth";

export const useSignup = () => {
    const { isPending, isSuccess, error, mutate: singnupMutation} = useMutation({
        mutationFn: signUpRequest,
        onSuccess: (data) => {
            console.log("Successfully signed up", data);
        },
        onError: (error) => {
            console.error('Failed to sign up', error);
        }
    });
    return {
        isPending,
        isSuccess,
        error,
        singnupMutation
    }
}