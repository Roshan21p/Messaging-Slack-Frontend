import axios from '@/config/axiosConfig';

export const getChannelById = async ({ channelId, token }) => {
   try {
      const response = await axios.get(`/channels/${channelId}`, {
         headers: {
            'x-access-token': token
         }
      });
      return response?.data?.data;
   } catch (error) {
      console.log('Error in getChannelByIdRequest', error);
      throw error?.response || error?.message;
   }
};

export const getPaginatedMessages = async ({ channelId, limit, page, token }) => {
   try {
      const response = await axios.get(`/messages/${channelId}`, {
         params: {
            limit: limit || 100,
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
