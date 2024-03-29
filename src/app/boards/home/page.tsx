"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "@/app/components/header/header";
import WorkSpace from "@/app/components/workspace/workspace";
import CreateWorkspace from "@/app/components/action/createWorkspace/createWorkspace";
import {
  faClock,
  faHeart,
  faStar as regularStar,
} from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { BoardsContext } from "@/context/BoardsProvider";
import Link from "next/link";
import { WorkSpaceContext } from "@/context/WorkspaceProvider";
import Image from "next/image";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

function Home() {
  const { boards } = useContext(BoardsContext);
  const { workspace } = useContext(WorkSpaceContext);
  const { setBoards, star, setStar } = useContext(BoardsContext);
  const handleUpdateStar = (selectedBoard: IBoards) => {
    setStar(!star);

    if (selectedBoard) {
      const itemRef = doc(db, "listBoards", selectedBoard.id);
      updateDoc(itemRef, { star: star });
      selectedBoard.star = star;
      setBoards((prevBoards) => [...prevBoards]); // Trigger re-render
    }
  };
  return (
    <div className="w-full">
      <CreateWorkspace />
      <Header />
      <div>
        <div className="flex text-black m-auto w-[80%] mb-14">
          <WorkSpace />
          <div className="flex flex-[3] mt-[92px] px-4">
            <div className="flex-[1]">
              <div>
                <div className="mb-4">
                  <FontAwesomeIcon className="mr-2 w-4 h-4" icon={faHeart} />
                  <span className="text-xs font-bold">Điểm nổi bật </span>
                </div>
                <div className="flex   shadow-md rounded-md overflow-hidden">
                  <Image
                    src={"https://trello.com/assets/6841b60bdc0a1588b82b.svg"}
                    alt=""
                    width={88}
                    height={152}
                  />
                  <div className="p-4">
                    <h2 className="text-base font-semibold">Điểm nổi bật</h2>
                    <p className="text-sm my-[10px]">
                      Luôn cập nhật hoạt động từ các Không gian làm việc và các
                      bảng của bạn.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-[1]">
              <div className="flex px-[50px] mt-10 mb-6 items-center">
                <FontAwesomeIcon className="mr-2" icon={faClock} />
                <span className="text-xs font-semibold">Đã xem gần đây</span>
              </div>
              <div>
                {boards?.slice(0, 7).map((item) => (
                  <Link
                    href={`/boards/${item.workspaceId}/${item.id}`}
                    className="group cursor-pointer hover:bg-[#333b44] transition mb-1 rounded flex items-center justify-start py-1 mx-12 px-2"
                  >
                    <div
                      className=" w-8 h-7 mr-3 rounded"
                      style={{ backgroundImage: `url(${item.background})` }}
                    ></div>
                    <div className="mr-16">
                      <h2 className="font-bold text-sm">{item.title}</h2>
                      <h2 className="font-light text-xs">{item.workspaceId}</h2>
                    </div>
                    <FontAwesomeIcon
                      onClick={(e) => {
                        handleUpdateStar(item);
                      }}
                      className="hidden group-hover:block"
                      icon={item.star ? solidStar : regularStar}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;