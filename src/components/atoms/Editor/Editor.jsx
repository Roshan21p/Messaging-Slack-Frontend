import 'quill/dist/quill.snow.css'; // ES6

import { useEffect, useRef, useState } from 'react';
import { MdSend } from 'react-icons/md';
import { PiTextAa } from 'react-icons/pi';

import { ImageIcon, XIcon } from 'lucide-react';
import Quill from 'quill';

import { useRoom } from '@/hooks/context/socket/useRoom';
import { useTyping } from '@/hooks/context/socket/useTyping';
import { useAuth } from '@/hooks/context/useAuth';
import { useSocket } from '@/hooks/context/useSocket';

import { Button } from '@/components/ui/button';

import { Hint } from '../Hint/Hint';

export const Editor = ({ onSubmit, disabled }) => {
   const [isToolbarVisible, setIsToolbarVisible] = useState(false);

   const [image, setImage] = useState(null);
   const [isTyping, setIsTyping] = useState(false);

   const lastRoomRef = useRef(null);

   const containerRef = useRef(); // Stores the container where the Quill editor is mounted and required to initialize the editor

   const defaultValueRef = useRef();
   const quillRef = useRef(); // Stores the Quill instance
   const imageInputRef = useRef(null);
   const typingTimeout = useRef(null);

   const { auth } = useAuth();
   // const { emitTyping, emitStopTyping, currentChannel, currentRoomId } = useSocket();
   const { emitTyping, emitStopTyping } = useTyping();
   const { currentChannel, currentRoomId } = useRoom();

   function toggleToolbar() {
      setIsToolbarVisible(!isToolbarVisible);
      const toolbar = containerRef.current.querySelector('.ql-toolbar');
      if (toolbar) {
         toolbar.classList.toggle('hidden');
      }
   }

   useEffect(() => {
      if (!containerRef.current || quillRef.current) return; // if containerRef is not initialized, return

      const container = containerRef.current; // get the container element

      const editorContainer = container.appendChild(container.ownerDocument.createElement('div')); // create a new div element and append it to the container

      const options = {
         theme: 'snow',
         modules: {
            toolbar: [
               ['bold', 'italic', 'underline', 'strike'],
               ['link'],
               [{ list: 'ordered' }, { list: 'bullet' }],
               ['clean']
            ],
            keyboard: {
               bindings: {
                  enter: {
                     key: 'Enter',
                     handler: () => {
                        quill.insertText(quill.getSelection()?.index || 0, '\n'); // insert a new line
                        return false; // prevent default
                     }
                  }
               }
            }
         }
      };

      const quill = new Quill(editorContainer, options);

      quillRef.current = quill;

      quillRef.current.root.addEventListener('touchstart', () => {
         quillRef.current.focus(); // Manually ensure the editor is focused when touched
      });

      quillRef.current.focus();

      quill.setContents(defaultValueRef.current);
   }, []);

   // ✅ Attach the typing handler AFTER Quill is initialized
   useEffect(() => {
      if (!quillRef.current) return;

      // Attach the typing event handler
      const quill = quillRef.current;
      const handleTyping = () => {
         const roomId = currentChannel || currentRoomId;
         if (!isTyping) {
            setIsTyping(true);

            // Stop typing in previous room if different
            if (lastRoomRef.current && lastRoomRef.current !== roomId) {
               emitStopTyping(lastRoomRef.current, auth?.user?.username);
            }

            lastRoomRef.current = roomId;
            emitTyping(roomId, auth?.user?.username);
         }

         // Clear the existing timeout
         if (typingTimeout.current) {
            clearTimeout(typingTimeout.current);
         }

         // Set new timeout to emit stop typing
         typingTimeout.current = setTimeout(() => {
            setIsTyping(false);
            emitStopTyping(roomId, auth?.user?.username);
         }, 1000);
      };

      // Attach the event listener
      quill.on('text-change', handleTyping);
      quill.on('selection-change', handleTyping); // for mobile triggers like cursor movement
      quill.root.addEventListener('input', handleTyping); // native fallback for mobile

      return () => {
         // Clean up the event listener on unmount or channel change

         if (lastRoomRef.current && auth?.user?.username) {
            emitStopTyping(lastRoomRef.current, auth.user.username);
         }

         quill.off('text-change', handleTyping);
         quill.off('selection-change', handleTyping);
         quill.root.removeEventListener('input', handleTyping);
         clearTimeout(typingTimeout.current);
      };
   }, [currentChannel, currentRoomId]);

   const handleSend = () => {
      if (!quillRef.current) return;

      const plainText = quillRef.current.getText().trim(); // Get plain text and trim whitespace/newlines

      if (!plainText && !image) {
         // Don't send if empty message
         return;
      }
      const content = quillRef.current?.getContents();
      if (!content || !onSubmit) return;

      const cleanedContent = {
         ...content,
         ops: content.ops.map((op) => {
            if (typeof op.insert === 'string') {
               const cleaned = op.insert.replace(/\s+/g, ' ').trim();
               return { ...op, insert: cleaned };
            }
            return op;
         })
      };

      onSubmit({ body: JSON.stringify(cleanedContent), image });

      //Stop typing after message is sent
      const roomId = currentChannel || currentRoomId;
      setIsTyping(false); // Reset typing state
      emitStopTyping(roomId, auth?.user?.username);

      quillRef.current?.setText('');
      setImage(null);
      if (imageInputRef.current) imageInputRef.current.value = '';
   };

   return (
      <div className="flex flex-col">
         <div className="flex flex-col border border-slate-300 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400 bg-white">
            <div className="h-full ql-custom" ref={containerRef} />

            {image && (
               <div className="p-2">
                  <div className="relative size-[60px] flex items-center justify-center group/image">
                     <button
                        className="hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[5] border-2 border-white items-center justify-center cursor-pointer"
                        onClick={() => {
                           setImage(null);
                           imageInputRef.current.value = '';
                        }}
                     >
                        <XIcon className="size-4 " />
                     </button>
                     <img
                        src={URL.createObjectURL(image)}
                        className="rounded-xl overflow-hidden border object-cover"
                     />
                  </div>
               </div>
            )}

            <div className="flex gap-4 px-2 pb-2 z-[5]">
               <Hint
                  label={!isToolbarVisible ? 'Hide toolbar' : 'Show toolbar'}
                  side="bottom"
                  align="center"
               >
                  <Button
                     size="iconSm"
                     variant="ghost"
                     disabled={false}
                     onClick={toggleToolbar}
                     className="cursor-pointer"
                  >
                     <PiTextAa className="size-4 m-0" />
                  </Button>
               </Hint>

               <Hint label="Image">
                  <Button
                     size="iconSm"
                     variant="ghost"
                     disabled={false}
                     onClick={() => {
                        imageInputRef.current.click();
                     }}
                     className="cursor-pointer"
                  >
                     <ImageIcon className="size-4 m-0" />
                  </Button>
               </Hint>

               <input
                  type="file"
                  className="hidden"
                  ref={imageInputRef}
                  onChange={(e) => setImage(e.target.files[0])}
               />

               <Hint label="Send Message">
                  <Button
                     className="ml-auto bg-[#007a6a] hover:bg-[#007a6a]/80 text-white cursor-pointer"
                     onClick={handleSend}
                     disabled={disabled}
                  >
                     <MdSend className="size-4" />
                  </Button>
               </Hint>
            </div>
         </div>

         <p className="p-2 text-[10px] text-mutes-foreground flex justify-end">
            <strong>Enter</strong> &nbsp; to add a new line
         </p>
      </div>
   );
};
