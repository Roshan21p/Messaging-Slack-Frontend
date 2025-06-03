import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const DirectMessageHeader = ({ name }) => {
   const { currentWorkspace: workspace } = useCurrentWorkspace();
   const userData = workspace?.members?.find((member) => member?.memberId?.username === name);

   if (!userData) {
      return null; // or a loading state
   }

   const { memberId } = userData;
   const username = memberId?.username || 'Unknown User';
   const imageUrl = memberId?.avatar;

   const hasValidImage = imageUrl && imageUrl !== '';

   return (
      <div className="bg-white border-b h-[50px] flex items-center justify-between px-4 overflow-hidden">
         <div className="flex flex-col sm:items-center sm:flex-row sm:gap-x-2">
            <div className="flex items-center gap-x-4">
               <Dialog>
                  <DialogTrigger>
                     <div className="relative cursor-pointer  rounded-full border-2 border-slack-dark overflow-hidden">
                        <Avatar>
                           <AvatarImage
                              src={imageUrl}
                              alt="User Avatar"
                              className="object-cover w-full h-full"
                           />
                           <AvatarFallback className="rounded-md bg-sky-500 text-white">
                              {username?.charAt(0).toUpperCase()}
                           </AvatarFallback>
                        </Avatar>
                     </div>
                  </DialogTrigger>

                  <DialogContent className="w-[300px] h-[300px] border-none bg-transparent p-0 shadow-none">
                     <div className="w-full h-full relative rounded-full overflow-hidden">
                        {hasValidImage ? (
                           <img
                              src={imageUrl}
                              alt="User Avatar Large"
                              className="w-full h-full object-cover rounded-full border-4 border-slack-dark"
                           />
                        ) : (
                           <div className="w-full h-full flex items-center justify-center bg-sky-500 text-white text-6xl font-bold rounded-full border-4 border-slack-dark">
                              {username?.charAt(0).toUpperCase()}
                           </div>
                        )}
                     </div>
                  </DialogContent>
               </Dialog>

               <span className="text-lg font-semibold text-slack-medium">
                  {username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()}
               </span>
            </div>
         </div>
      </div>
   );
};
