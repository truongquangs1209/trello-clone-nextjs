"use client";
import { useDataFetching } from "@/firebase/service";
import React, { createContext, useContext, useEffect, useState } from "react";

interface WorkspacesContextValue {
  workspace: IWorkspaces[];
  openModalAddWorkspace: boolean;
  setOpenModalAddWOrkspace: React.Dispatch<React.SetStateAction<boolean>>;
  setWorkspace: React.Dispatch<React.SetStateAction<IWorkspaces[]>>;
}

export const WorkSpaceContext = createContext<
  WorkspacesContextValue | undefined
>(undefined);

function WorkspaceProvider({ children }) {
  const [openModalAddWorkspace, setOpenModalAddWOrkspace] =
    useState<boolean>(false);
  const [workspace, setWorkspace] = useState<IWorkspaces[]>([]);
  useDataFetching(setWorkspace, "workspaces");

  return (
    <WorkSpaceContext.Provider
      value={{
        workspace,
        setWorkspace,
        openModalAddWorkspace,
        setOpenModalAddWOrkspace,
      }}
    >
      {children}
    </WorkSpaceContext.Provider>
  );
}

export default WorkspaceProvider;
