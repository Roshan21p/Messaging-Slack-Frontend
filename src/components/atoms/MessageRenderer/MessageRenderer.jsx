import { useEffect, useRef, useState } from 'react';

import Quill from 'quill';

export const MessageRenderer = ({ value }) => {
   const rendererRef = useRef(null);
   const [isEmpty, setIsEmpty] = useState(false);

   console.log('value', value);

   useEffect(() => {
      //  console.log('Renderer Ref: ', rendererRef.current);
      if (!rendererRef.current) return;

      const quill = new Quill(document.createElement('div'), {
         theme: 'snow'
      });

      // Disable Editting
      quill.disable();
      const content = JSON.parse(value);
      quill.setContents(content);
      // console.log('Content', quill.root.innerHTML);
      const isContentEmpty = quill.getText().trim().length === 0;
      setIsEmpty(isContentEmpty);
      rendererRef.current.innerHTML = quill.root.innerHTML;
   }, [value]);

   if (isEmpty) return null;

   return <div ref={rendererRef} className="ql-editor ql-renderer" />;
};
