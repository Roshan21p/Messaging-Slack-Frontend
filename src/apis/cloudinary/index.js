import axiosConfig from '@/config/axiosConfig';
import axios from 'axios';

export const uploadImageToCloudinaryGeneratesignedUrl = async (formData) => {
   try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const response = await axios.post(
         `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
         formData
      );
      console.log('cloudinary', response);
      return response;
   } catch (error) {
      console.log('Error in uploading image to cloudinary', error);
      throw error?.response?.data || error?.message;
   }
};

export const getGenerateSignedUrl = async ({ token }) => {
   try {
      const response = await axiosConfig.get('/messages/generate-signed-url', {
         headers: {
            'x-access-token': token
         }
      });
      console.log('res', response);
      return response?.data?.data;
   } catch (error) {
      console.log('Error in getting generateSigned url', error);
      throw error?.response?.data || error?.message;
   }
};
