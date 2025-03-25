import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannelModal"
import { useState } from "react";

export const CreateChannelModal = () => {

    
    const { openCreateChannelModal, setOpenCreateChannelModal } = useCreateChannelModal();

    const [channelName, setChannelName] = useState('');

    function handleClose(){
        setOpenCreateChannelModal(false);
    }

    function handleFormSubmit(e){
        e.preventDefault();
    }

    return(
        <Dialog open={openCreateChannelModal} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create a Channel
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleFormSubmit}>
                    <Input 
                        required
                        onChange={(e) => setChannelName(e.target.value)}
                        value={channelName}
                        minLength={3}
                        placeholder="Channel Name e.g. team-announcments"
                    />

                    <div className="flex justify-end mt-4">
                        <Button>
                           Create Channel
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}