import axios from '@/config/axiosConfig';

export const getUnreadMessageCount = async ({ workspaceId, token }) => {
   try {
      const response = await axios.get(`/message-status/unreadMessageCount/${workspaceId}`, {
         headers: {
            'x-access-token': token
         }
      });
      return response?.data?.data;
   } catch (error) {
      throw error?.response?.data || error?.message;
   }
};
