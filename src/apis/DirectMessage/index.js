import axios from '@/config/axiosConfig';

export const getPaginatedDirectMessages = async ({ receiverId, limit, offset, token }) => {
   try {
      const response = await axios.get(`/messages/dm/${receiverId}`, {
         params: {
            limit: limit || 50,
            offset: offset || 0
         },
         headers: {
            'x-access-token': token
         }
      });
      return response?.data?.data;
   } catch (error) {
      console.log('Error in getPaginatedDirectMessages', error);
      throw error?.response?.data || error?.message;
   }
};
