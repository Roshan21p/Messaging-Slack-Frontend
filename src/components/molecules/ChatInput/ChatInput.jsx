import { getGenerateSignedUrl, uploadImageToCloudinaryGeneratesignedUrl } from '@/apis/cloudinary';
import { Editor } from '@/components/atoms/Editor/Editor';
import { useAuth } from '@/hooks/context/useAuth';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { useSocket } from '@/hooks/context/useSocket';
import { useQueryClient } from '@tanstack/react-query';

export const ChatInput = () => {
   const { auth } = useAuth();
   const { socket, currentChannel } = useSocket();
   const { currentWorkspace } = useCurrentWorkspace();
   const queryClient = useQueryClient();

   async function handleSubmit({ body, image }) {
      console.log(body, image);
      let fileUrl = null;
      if (image) {
         const generateSignedUrl = await queryClient.fetchQuery({
            queryKey: ['getGenerateSignedUrl'],
            queryFn: () => getGenerateSignedUrl({ token: auth?.token })
         });

         console.log('GenerateSigned url', generateSignedUrl);

         const formData = new FormData();
         formData.append('file', image);
         formData.append('timestamp', generateSignedUrl.timestamp);
         formData.append('signature', generateSignedUrl.signature);
         formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);

         const cloudinaryResponse = await uploadImageToCloudinaryGeneratesignedUrl(formData);
         console.log('file upload success', cloudinaryResponse);
         fileUrl = cloudinaryResponse?.data?.secure_url;
      }
      socket?.emit(
         'NewMessage',
         {
            channelId: currentChannel,
            body,
            image: fileUrl,
            senderId: auth?.user?._id,
            workspaceId: currentWorkspace?._id
         },
         (data) => {
            // this is a cb fun for Acknowledgement
            console.log('Message sent', data);
         }
      );
   }
   return (
      <div className="px-5 w-full">
         <Editor
            placeholder="Type a message..."
            onSubmit={handleSubmit}
            onCancel={() => {}}
            disabled={false}
            defaultValue=""
         />
      </div>
   );
};
