import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle
} from '@/components/ui/dialog';

export const useConfirm = ({ title, message }) => {
   const [promise, setPromise] = useState(null);

   async function confirmation() {
      console.log('Confirmation trigged');
      return new Promise((reslove) => {
         setPromise({ reslove });
      });
   }

   const handleClose = () => {
      setPromise(null);
   };

   const handleConfirm = () => {
      promise?.reslove(true);
      handleClose();
   };

   const ConfirmDialog = () => {
      return (
         <Dialog open={promise !== null} onOpenChange={handleClose}>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle>{title}</DialogTitle>
                  <DialogDescription>{message}</DialogDescription>
               </DialogHeader>

               <DialogFooter>
                  <DialogClose>
                     <Button onClick={handleClose} variant="secondary">
                        Cancel
                     </Button>
                     <Button onClick={handleConfirm} className="cursor-pointer">
                        Confirm
                     </Button>
                  </DialogClose>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      );
   };

   return { confirmation, ConfirmDialog };
};
