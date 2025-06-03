import axios from '@/config/axiosConfig';

export const signUpRequest = async ({ email, password, username }) => {
   console.log(email, password, username);

   try {
      const response = await axios.post('/users/signup', {
         email,
         password,
         username
      });
      return response.data;
   } catch (error) {
      console.error(error);
      throw error?.response?.data || error?.message;
   }
};

export const signInRequest = async ({ email, password }) => {
   try {
      const response = await axios.post('/users/signin', {
         email,
         password
      });
      return response.data;
   } catch (error) {
      console.error('error', error);
      throw error?.response?.data || error?.message;
   }
};

export const getUserByUsername = async ({ username, id, token }) => {
   try {
      const response = await axios.get(`/users/username/${id}/${username}`, {
         headers: {
            'x-access-token': token
         }
      });

      return response?.data?.data;
   } catch (error) {
      console.log('Error in getUserByUsername', error);
      throw error?.response || error?.message;
   }
};
