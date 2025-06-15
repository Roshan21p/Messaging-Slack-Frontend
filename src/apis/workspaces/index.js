import axios from '@/config/axiosConfig';

export const createWorkspaceRequest = async ({ name, description, token }) => {
   try {
      const response = await axios.post(
         '/workspaces',
         { name, description },
         {
            headers: {
               'x-access-token': token
            }
         }
      );
      console.log('Request in create workspace request', response);

      return response?.data?.data;
   } catch (error) {
      console.error('Error in create workspace request', error);
      throw error?.response?.data || error?.message;
   }
};

export const fetchWorkspaceRequest = async ({ token }) => {
   try {
      const response = await axios.get('/workspaces', {
         headers: {
            'x-access-token': token
         }
      });

      return response?.data?.data;
   } catch (error) {
      throw error?.response || error?.message;
   }
};

export const fetchWorkspaceDetailsRequest = async ({ workspaceId, token }) => {
   try {
      const response = await axios.get(`/workspaces/${workspaceId}`, {
         headers: {
            'x-access-token': token
         }
      });
      return response?.data?.data;
   } catch (error) {
      throw error?.response || error?.message;
   }
};

export const deleteWorkspaceRequest = async ({ workspaceId, token }) => {
   try {
      const response = await axios.delete(`/workspaces/${workspaceId}`, {
         headers: {
            'x-access-token': token
         }
      });
      return response?.data?.data;
   } catch (error) {
      console.log('Error in deleting workspace request', error);
      throw error?.response?.data || error?.message;
   }
};

export const updateWorkspaceRequest = async ({ workspaceId, name, token }) => {
   try {
      const response = await axios.put(
         `/workspaces/${workspaceId}`,
         { name },
         {
            headers: {
               'x-access-token': token
            }
         }
      );
      response?.data?.data;
   } catch (error) {
      console.log('Error in updating workspace request', error);
      throw error?.response?.data || error?.message;
   }
};

export const addChannelToWorkspaceRequest = async ({ workspaceId, channelName, token }) => {
   try {
      const response = await axios.put(
         `/workspaces/${workspaceId}/channels`,
         {
            channelName
         },
         {
            headers: {
               'x-access-token': token
            }
         }
      );
      return response?.data?.data;
   } catch (error) {
      console.log('Error in adding channel to workspace request', error);
      throw error?.response?.data || error?.message;
   }
};

export const resetJoinCodeRequest = async ({ workspaceId, token }) => {
   try {
      const response = await axios.put(`/workspaces/${workspaceId}/joinCode/reset`, null, {
         headers: {
            'x-access-token': token
         }
      });
      return response?.data?.data;
   } catch (error) {
      console.log('Error in resetting join code request', error);
      throw error?.response?.data || error?.message;
   }
};

export const joinWorkspaceRequest = async ({ workspaceId, joinCode, token }) => {
   try {
      const response = await axios.put(
         `/workspaces/${workspaceId}/join`,
         { joinCode },
         {
            headers: {
               'x-access-token': token
            }
         }
      );
      return response?.data?.data;
   } catch (error) {
      console.log('Error in joining workspace request', error);
      throw error?.response?.data || error?.message;
   }
};

export const updateChannelToWorkspaceRequest = async ({
   workspaceId,
   channelId,
   channelName,
   token
}) => {
   try {
      const response = await axios.put(
         `/workspaces/${workspaceId}/channel/${channelId}`,
         { channelName },
         {
            headers: {
               'x-access-token': token
            }
         }
      );
      return response?.data?.data;
   } catch (error) {
      console.log('Error in update channel to workspace request', error);
      throw error?.response?.data || error?.message;
   }
};

export const addMemberToWorkspace = async ({ workspaceId, memberId, token }) => {
   try {
      const response = await axios.put(
         `/workspaces/${workspaceId}/members`,
         { memberId },
         {
            headers: {
               'x-access-token': token
            }
         }
      );
      return response?.data?.data;
   } catch (error) {
      console.log('Error in add member to workspace request', error);
      throw error?.response?.data || error?.message;
   }
};

export const deleteMemberFromWorkspace = async ({ workspaceId, memberId, token }) => {
   console.log(token);
   try {
      const response = await axios.delete(`/workspaces/${workspaceId}/member/delete`, {
         headers: {
            'x-access-token': token
         },
         data: {
            memberId
         }
      });
      return response?.data?.data;
   } catch (error) {
      console.log('Error in delete member from workspace request', error);
      throw error?.response?.data || error?.message;
   }
};

export const deleteChannelWorkspaceRequest = async ({ workspaceId, channelId, token }) => {
   try {
      const response = await axios.delete(`/workspaces/${workspaceId}/channel/${channelId}`, {
         headers: {
            'x-access-token': token
         }
      });
      return response?.data?.data;
   } catch (error) {
      console.log('Error in deleting channel from workspace request', error);
      throw error?.response?.data || error?.message;
   }
};

export const LeaveWorkspaceRequest = async ({ workspaceId, token }) => {
   try {
      const response = await axios.post(
         `/workspaces/${workspaceId}/leave`,
         {},
         {
            headers: {
               'x-access-token': token
            }
         }
      );
      return response?.data?.data;
   } catch (error) {
      console.log('Error in leaveing workspace request', error);
      throw error?.response?.data || error?.message;
   }
};
