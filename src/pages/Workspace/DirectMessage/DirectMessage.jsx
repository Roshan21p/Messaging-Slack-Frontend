import { DirectMessageHeader } from '@/components/molecules/DirectMessage/DirectMessageHeader';
import { useParams } from 'react-router-dom';

export const DirectMessage = () => {
   const { id } = useParams();
   return (
      <div>
         <DirectMessageHeader userId={id} />
         Direct Message - {id}
      </div>
   );
};
