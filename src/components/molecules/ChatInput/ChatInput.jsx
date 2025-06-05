import { getGenerateSignedUrl, uploadImageToCloudinaryGeneratesignedUrl } from '@/apis/cloudinary';
import { Editor } from '@/components/atoms/Editor/Editor';
import { useAuth } from '@/hooks/context/useAuth';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { useSocket } from '@/hooks/context/useSocket';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

export const ChatInput = () => {
   const { auth } = useAuth();
   const { socket, currentChannel, currentRoomId } = useSocket();
   const { currentWorkspace } = useCurrentWorkspace();
   const queryClient = useQueryClient();
   const [isUploading, setIsUploading] = useState(false);

   async function handleSubmit({ body, image }) {
      let toastId;

      try {
         console.log(body, image);
         let fileUrl = null;

         if (image) {
            toastId = toast.loading('Uploading image...');
            setIsUploading(true); // Start loading

            const generateSignedUrl = await queryClient.fetchQuery({
               queryKey: ['getGenerateSignedUrl'],
               queryFn: () => getGenerateSignedUrl({ token: auth?.token })
            });

            console.log('Generated Signed URL:', generateSignedUrl);

            const formData = new FormData();
            formData.append('file', image);
            formData.append('timestamp', generateSignedUrl.timestamp);
            formData.append('signature', generateSignedUrl.signature);
            formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);

            const cloudinaryResponse = await uploadImageToCloudinaryGeneratesignedUrl(formData);
            console.log('Cloudinary Upload Success:', cloudinaryResponse);

            fileUrl = cloudinaryResponse?.data?.secure_url;

            toast.success('Image successfully uploaded!', { id: toastId });
         }

         socket?.emit(
            'NewMessage',
            {
               channelId: currentChannel,
               roomId: currentRoomId,
               body,
               image: fileUrl,
               senderId: auth?.user?._id,
               workspaceId: currentWorkspace?._id
            },
            (data) => {
               console.log('Message sent successfully:', data);
            }
         );
      } catch (error) {
         console.error('Upload error:', error);
         if (toastId) {
            toast.error('Image upload failed!', { id: toastId });
         } else {
            toast.error('Something went wrong!');
         }
      } finally {
         setIsUploading(false); // End loading
      }
   }

   return (
      <div className="px-5 w-full">
         <Editor
            placeholder="Type a message..."
            onSubmit={handleSubmit}
            onCancel={() => {}}
            disabled={isUploading}
         />
      </div>
   );
};
