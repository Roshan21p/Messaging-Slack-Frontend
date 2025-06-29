import axios from '@/config/axiosConfig';

export const getUnreadMessageCount = async ({ workspaceId, token }) => {
   try {
      const response = await axios.get(`/message-status/channel/unread-count/${workspaceId}`, {
         headers: {
            'x-access-token': token
         }
      });
      return response?.data?.data;
   } catch (error) {
      throw error?.response?.data || error?.message;
   }
};

export const markMessageAsRead = async ({ workspaceId, channelId, token }) => {
   try {
      const response = await axios.patch(
         '/channel/mark-read',
         { workspaceId, channelId },
         {
            headers: {
               'x-access-token': token
            }
         }
      );
      return response?.data?.data;
   } catch (error) {
      throw error?.response?.data || error?.message;
   }
};

export const getUnreadDmMessageCount = async ({ token }) => {
   try {
      const response = await axios.get(`/message-status/dm/unread-count`, {
         headers: {
            'x-access-token': token
         }
      });
      return response?.data?.data;
   } catch (error) {
      throw error?.response?.data || error?.message;
   }
};
