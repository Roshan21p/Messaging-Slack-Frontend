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
      console.error('Error in fetch workspace request', error);
      throw error?.response?.data || error?.message;
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
      console.log('Error in fetching workspace details request', error, error?.response?.data);
      throw error?.response?.data || error?.message;
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
