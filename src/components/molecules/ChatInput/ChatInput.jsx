import { Editor } from '@/components/atoms/Editor/Editor';
import { MessageRenderer } from '@/components/atoms/MessageRenderer/MessageRenderer';
import { useState } from 'react';

export const ChatInput = () => {
   const [text, setText] = useState('');
   async function handleSubmit({ body }) {
      console.log(body);
      setText(body);
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
         {text && <MessageRenderer value={text} />}
      </div>
   );
};
