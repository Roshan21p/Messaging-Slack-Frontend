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
    console.log('Response in fetch workspace request', response);
    return response?.data;
  } catch (error) {
    console.error('Error in fetch worspace request', error);
    throw error?.response?.data || error?.message;
  }
};
