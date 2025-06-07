import { createContext, useState } from 'react';

const WorkspaceContext = createContext();

export const WorkspaceContextProvider = ({ children }) => {
   const [currentWorkspace, setCurrentWorkspace] = useState(null);
   const [openDmModal, setOpenDmModal] = useState(false);

   return (
      <WorkspaceContext.Provider
         value={{ currentWorkspace, setCurrentWorkspace, openDmModal, setOpenDmModal }}
      >
         {children}
      </WorkspaceContext.Provider>
   );
};

export default WorkspaceContext;
