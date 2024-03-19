"use client";
import { WorkSpaceContext } from "@/context/WorkspaceProvider";
import { faAdd, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";

function WorkSpace() {
  const { workspace, setWorkspace, setOpenModalAddWOrkspace } =
    useContext(WorkSpaceContext);
  console.log(workspace);
  return (
    <div>
      <div className="p-2 text-xs font-semibold flex item-center justify-between">
        <span>Workspace</span>
        <FontAwesomeIcon
          onClick={() => setOpenModalAddWOrkspace(true)}
          icon={faAdd}
        />
      </div>
      <div className="flex items-center flex-col justify-between">
        {workspace &&
          workspace.map((item: IWorkspaces) => (
            <div className="flex items-center mb-3 px-4 justify-between w-full">
              <span className="w-[26px] text-sm h-[26px] mr-3 bg-gradient-to-r from-sky-500 to-indigo-500 font-semibold text-white flex items-center justify-center rounded-lg">
                {item.title.charAt(0)?.toUpperCase()}
              </span>
              <span className="text-sm font-medium">{item.title}</span>

              <FontAwesomeIcon icon={faCaretDown} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default WorkSpace;
