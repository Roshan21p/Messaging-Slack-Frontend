import { useState } from 'react';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';

import { PlusIcon } from 'lucide-react';

import { useAuth } from '@/hooks/context/useAuth';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';

import { Button } from '@/components/ui/button';

export const WorkspacePanelSection = ({ children, label, onIconClick }) => {
   const [open, setOpen] = useState(false);

   const { auth } = useAuth();
   const { currentWorkspace: workspace } = useCurrentWorkspace();

   const isLoggedInUserAdminOfWorkspace = workspace?.members?.find(
      (member) => member?.memberId?._id === auth?.user?._id && member.role === 'admin'
   );

   return (
      <div className="flex flex-col mt-3 px-2">
         <div className="flex items-center px-3.5 group">
            <Button
               onClick={() => setOpen(!open)}
               variant="transparent"
               className="p-0.5 text-sm size-6 text-[#f9edffcc] cursor-pointer"
            >
               {open ? <FaCaretDown className="size-4" /> : <FaCaretRight className="size-4" />}
            </Button>
            <Button
               variant="transparent"
               size="sm"
               className="group px-1.5 text-sm text-[#f9edffcc] h-[30px] justify-start items-center overflow-hidden"
            >
               <span>{label}</span>
            </Button>

            {isLoggedInUserAdminOfWorkspace && onIconClick && (
               <Button
                  variant="primary"
                  size="sm"
                  onClick={onIconClick}
                  className="text-[#f9edffcc] transition opacity ml-auto p-1 text-sm size-6 hover:bg-slack-dark"
               >
                  <PlusIcon className="size-4 text-[#f9edffcc] cursor-pointer" />
               </Button>
            )}
         </div>
         {open && children}
      </div>
   );
};
