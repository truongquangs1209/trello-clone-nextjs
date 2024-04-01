"use client";
import { useDataFetching } from "@/app/hook/useDataFetching";
import React, { createContext,useState } from "react";

interface WorkspacesContextValue {
  workspace: IWorkspaces[];
  openModalAddWorkspace: boolean;
  openModalDeleteWorkspace: boolean;
  setOpenModalDeleteWorkspace: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModalAddWOrkspace: React.Dispatch<React.SetStateAction<boolean>>;
  setWorkspace: React.Dispatch<React.SetStateAction<IWorkspaces[]>>;
}

export const WorkSpaceContext = createContext<
  WorkspacesContextValue | undefined
>(undefined);

function WorkspaceProvider({ children }) {
  const [openModalAddWorkspace, setOpenModalAddWOrkspace] =
    useState<boolean>(false);
  const [openModalDeleteWorkspace, setOpenModalDeleteWorkspace] =
    useState<boolean>(false);
  const [workspace, setWorkspace] = useState<IWorkspaces[]>([]);
  useDataFetching(setWorkspace, "workspaces",null);

  return (
    <WorkSpaceContext.Provider
      value={{
        workspace,
        setWorkspace,
        openModalDeleteWorkspace,
        setOpenModalDeleteWorkspace,
        openModalAddWorkspace,
        setOpenModalAddWOrkspace,
      }}
    >
      {children}
    </WorkSpaceContext.Provider>
  );
}

export default WorkspaceProvider;
