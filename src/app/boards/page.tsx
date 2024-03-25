"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/header/header";
import { faClipboard } from "@fortawesome/free-solid-svg-icons/faClipboard";
import {
  faClipboardCheck,
  faClock,
  faGear,
  faHome,
  faTableCellsLarge,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
import { useContext } from "react";
import WorkSpace from "../components/workspace/workspace";
import CreateWorkspace from "../components/createWorkspace/createWorkspace";
import { WorkSpaceContext } from "@/context/WorkspaceProvider";
import CreateBoards from "../components/createBoards/createBoards";
import { BoardsContext } from "@/context/BoardsProvider";
import Link from "next/link";

function Boards() {
  // const [modalCreateBoard, setModalCreateBoard] = useState<boolean>(false);
  const { workspace } = useContext(WorkSpaceContext);
  const { boards } = useContext(BoardsContext);
  // console.log(boards);
  const { openModalAddBoards, setOpenModalAddBoards } =
    useContext(BoardsContext);

  return (
    <div className="w-full">
      <CreateWorkspace />
      <Header />
      <div>
        <div className="flex text-black m-auto w-[80%] mb-14">
          <div className=" flex-[1] mt-[92px] px-4">
            <ul className="text-[#9FaDBC] ">
              <li className="py-[10px] mb-1 hover:bg-[#333b44] rounded-md transition px-2 text-sm font-medium">
                <FontAwesomeIcon className="mr-2 w-4 h-4" icon={faClipboard} />
                <span>Bảng</span>
              </li>
              <li className="py-[10px]  mb-1 hover:bg-[#333b44] rounded-md transition px-2 text-sm font-medium">
                <FontAwesomeIcon
                  className="mr-2 w-4 h-4"
                  icon={faClipboardCheck}
                />
                <span>Mẫu</span>
              </li>
              <li className="py-[10px]  mb-1 hover:bg-[#333b44] rounded-md transition px-2 text-sm font-medium">
                <FontAwesomeIcon className="mr-2 w-4 h-4" icon={faHome} />
                <span>Trang chủ</span>
              </li>
              <hr className="my-3"></hr>
            </ul>
            <WorkSpace />
          </div>

          <div className="flex-[3] mt-[92px] px-4">
            <div className="pb-[40px]">
              <div className="py-[10px] pb-5 flex items-center text-base font-bold">
                <FontAwesomeIcon className="pr-3 w-6 h-6" icon={faStar} />
                <span>Bảng đánh dấu sao</span>
              </div>
              <div className="flex gap-5">
                {boards &&
                  boards
                    .filter((board) => board.star === true)
                    .map((item) => (
                      <Link
                        key={item.id}
                        href={`/boards/${item.title}/${item.id}`}
                        style={{ backgroundImage: `url(${item.background})` }}
                        className="w-[195px] bg-cover rounded text-white bg-black h-[96px]"
                      >
                        <p className="m-1 text-base text-white font-semibold">
                          {item.title}
                        </p>
                      </Link>
                    ))}
              </div>
            </div>
            <div className="mb-[70px]">
              <div className="py-[10px] pb-5 flex items-center text-base font-bold">
                <FontAwesomeIcon className="pr-3 w-6 h-6" icon={faClock} />
                <span>Đã xem gần đây</span>
              </div>
              <div className="flex gap-5">
                {boards?.slice(0, 2).map((item) => (
                  <Link
                    key={item.id}
                    href={`/boards/${item.title}/${item.id}`}
                    style={{ backgroundImage: `url(${item.background})` }}
                    className="w-[195px] bg-cover rounded text-white h-[96px]"
                  >
                    <p className="m-1 text-base text-white font-semibold">
                      {item.title}
                    </p>
                  </Link>
                ))}

                {/* Create Boards  */}
                <CreateBoards />
              </div>
            </div>
            <div>
              <h1 className="my-5 font-bold text-base">
                CÁC KHÔNG GIAN LÀM VIỆC CỦA BẠN
              </h1>
              {workspace?.map((item) => (
                <div key={item.id} className="mb-9">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center justify-between">
                      <span className="w-[32px] text-sm h-[32px] mr-3 bg-gradient-to-r from-sky-500 to-indigo-500 font-semibold text-white flex items-center justify-center rounded">
                        {item.title.charAt(0)?.toUpperCase()}
                      </span>
                      <span className=" font-bold text-base">{item.title}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="py-1 px-2 bg-[#282d33] rounded">
                        <FontAwesomeIcon
                          className="mr-2 w-4 h-4"
                          icon={faClipboard}
                        />
                        <span className="text-sm font-semibold">Bảng</span>
                      </button>
                      <button className="py-1 px-2 bg-[#282d33] rounded">
                        <FontAwesomeIcon
                          className="mr-2 w-4 h-4"
                          icon={faTableCellsLarge}
                        />
                        <span className="text-sm font-semibold">Dạng xem</span>
                      </button>
                      <button className="py-1 px-2 bg-[#282d33] rounded">
                        <FontAwesomeIcon
                          className="mr-2 w-4 h-4"
                          icon={faUser}
                        />
                        <span className="text-sm font-semibold">
                          Thành viên
                        </span>
                      </button>
                      <button className="py-1 px-2 bg-[#282d33] rounded">
                        <FontAwesomeIcon
                          className="mr-2 w-4 h-4"
                          icon={faGear}
                        />
                        <span className="text-sm font-semibold">Cài đặt</span>
                      </button>
                      <button className="py-1 px-2 bg-[#2b273f] hover:bg-[#352c63] transition rounded">
                        <FontAwesomeIcon
                          className="mr-2 w-4  h-4"
                          icon={faClipboard}
                        />
                        <span className="text-sm font-light">Nâng cấp</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    {boards &&
                      boards
                        .filter((board) => board.workspaceId === item.id)
                        .map((i) => (
                          <Link
                            key={i.id}
                            href={`/boards/${item.title}/${i.id}`}
                            style={{ backgroundImage: `url(${i.background})` }}
                            className="w-[195px] bg-cover rounded text-white h-[96px]"
                          >
                            <p className="m-1 text-base text-white font-semibold">
                              {i.title}
                            </p>
                          </Link>
                        ))}
                    <div
                      onClick={() => setOpenModalAddBoards(!openModalAddBoards)}
                      style={
                        boards.filter((board) => board.workspaceId === item.id)
                          .length >= 8
                          ? { display: "none" }
                          : { display: "flex" }
                      }
                      className="select-none  rounded text-sm text-[#b6c2cf] flex items-center justify-center w-[195px] cursor-pointer hover:bg-[#333b44] transition h-[96px] bg-[#272d33]"
                    >
                      Tạo bảng mới
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Boards;
