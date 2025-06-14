import axios from '@/config/axiosConfig';

export const getPaginatedDirectMessages = async ({ receiverId, limit, page, token }) => {
   try {
      const response = await axios.get(`/messages/dm/${receiverId}`, {
         params: {
            limit: limit || 50,
            page: page || 1
         },
         headers: {
            'x-access-token': token
         }
      });
      return response?.data?.data;
   } catch (error) {
      throw error?.response?.data || error?.message;
   }
};
