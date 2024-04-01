"use client";
import Header from "@/app/components/header/header";
import { useContext } from "react";
import WorkSpace from "@/app/components/workspace/workspace";
import CreateWorkspace from "@/app/components/action/createWorkspace/createWorkspace";
import { WorkSpaceContext } from "@/context/WorkspaceProvider";
import CreateBoards from "@/app/components/action/createBoards/createBoards";
import DeleteWorkspace from "@/app/components/action/deleteWorkspace/deleteWorkspace";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

function Setting({ params }) {

  const {workspace, setOpenModalDeleteWorkspace } =
    useContext(WorkSpaceContext);
  const selectWorkspace = workspace.find(
    (item) => item.id === params.workspace
  );

  return (
    <div className="w-full">
      <CreateWorkspace />
      <Header />
      <div>
        <div className="flex text-black md:m-0 w-[100%] md:w-[80%] mb-14">
          <WorkSpace />
          <div className="flex-[3] mt-[92px]  px-4">
            <div className="flex gap-3 p-8 items-center">
              <span className="w-[60px] text-[35px] font-bold text-[#1d2125] h-[60px] mr-3 bg-gradient-to-r from-sky-500 to-indigo-500 flex items-center justify-center rounded">
                {selectWorkspace?.title.charAt(0)?.toUpperCase()}
              </span>
              <div>
                <h2 className="text-xl font-medium">
                  {selectWorkspace?.title}
                </h2>
                <p className="text-xs font-light">
                  {selectWorkspace?.description}
                </p>
              </div>
            </div>
            <hr className="h-[1px] w-full my-4 bg-[#333c44]" />
            <div className="pb-[40px]">
              <div className="p-4 bg-[#1c2b41] rounded mb-3">
                <span className="text-[#B6c2df] font-semibold block my-3">Các cài đặt Không gian làm việc</span>
                <div className="flex gap-5 ">
                  <FontAwesomeIcon className="w-6 h-6" icon={faCircleInfo}/>
                  <div>
                    <p className="text-sm">Không gian làm việc Trello miễn phí sẽ giới hạn trong 10 người cộng tác kể từ 8 tháng 4 năm 2024.</p>
                    <span className="py-2">Không gian làm việc miễn phí sẽ sớm giới hạn trong 10 thành viên, khách và thư mời đang chờ xử lý.</span>
                    <ul className="text-sm mb-2 list-disc">
                      <li>Vào ngày 8 tháng 4 năm 2024, bạn sẽ không thể mời người cộng tác mới vào Không gian làm việc miễn phí đạt đến hoặc vượt quá giới hạn.</li>
                      <li>Vào ngày 20 tháng 5 năm 2024, các bảng thông tin trong Không gian làm việc miễn phí vượt quá giới hạn sẽ chuyển sang chế độ chỉ xem.</li>
                    </ul>
                    <span className="text-sm">Để quản lý người cộng tác, hãy kiểm tra trang thành viên Không gian làm việc.</span>
                  </div>
                </div>
              </div>
              <h3
                onClick={() => setOpenModalDeleteWorkspace(true)}
                className="text-[#FD9891] text-sm font-semibold cursor-pointer hover:underline"
              >
                Xóa không gian làm việc này?
              </h3>
            </div>
            <CreateBoards />
            <DeleteWorkspace selectWorkspace={selectWorkspace}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;