"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/header/header";
import { faClipboard } from "@fortawesome/free-solid-svg-icons/faClipboard";
import {
  faAdd,
  faCaretDown,
  faClipboardCheck,
  faClock,
  faClose,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "@/firebase/config";
import Image from "next/image";
import { useState } from "react";
import { Button, Select } from "antd";
import { Option } from "antd/es/mentions";

const backgroundUrl = [
  {
    url: "https://images.unsplash.com/photo-1679678691006-3afa56204979?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8YmFja2dyb3VuZHxlbnwwfDB8MHx8fDA%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1510070009289-b5bc34383727?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGJhY2tncm91bmR8ZW58MHwwfDB8fHww",
  },
  {
    url: "https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFja2dyb3VuZHxlbnwwfDB8MHx8fDA%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFja2dyb3VuZHxlbnwwfDB8MHx8fDA%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8OHx8YmFja2dyb3VuZHxlbnwwfDB8MHx8fDA%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1507608158173-1dcec673a2e5?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJhY2tncm91bmR8ZW58MHwwfDB8fHww",
  },
];

function Boards() {
  const [backgroundImg, setBackgroundImg] = useState<string>(
    "https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFja2dyb3VuZHxlbnwwfDB8MHx8fDA%3D"
  );
  const router = useRouter();
  const handleAddBoard: () => void = async () => {
    try {
      const newBoard = {
        background: "",
        star: false,
        title: "",
        workspaceId: "",
      };
      const dataCollection = collection(db, "listBoards");
      const docRef = await addDoc(dataCollection, newBoard);
      // router.push(`/boards/${props.workspace}/${props.board?.id}`)
      toast.success("Create succeed !...");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <Header />
      <div>
        <div className="flex text-black m-auto w-[75%]">
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
            <div>
              <div className="p-2 text-xs font-semibold flex item-center justify-between">
                <span>Workspace</span>
                <FontAwesomeIcon icon={faAdd} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-[24px] h-[24px] mr-3 bg-gradient-to-r from-sky-500 to-indigo-500 font-semibold text-white flex items-center justify-center rounded-lg">
                    W
                  </span>
                  <span className="text-sm font-medium">Workspace</span>
                </div>
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
            </div>
          </div>

          <div className="flex-[3] mt-[92px] px-4">
            <div className="pb-[40px]">
              <div className="py-[10px] pb-5 flex items-center text-base font-bold">
                <FontAwesomeIcon className="pr-3 w-6 h-6" icon={faStar} />
                <span>Bảng đánh dấu sao</span>
              </div>
              <div className="w-[195px] h-[96px] bg-orange-700"></div>
            </div>
            <div className="">
              <div className="py-[10px] pb-5 flex items-center text-base font-bold">
                <FontAwesomeIcon className="pr-3 w-6 h-6" icon={faClock} />
                <span>Đã xem gần đây</span>
              </div>
              <div className="flex gap-5">
                <div className="w-[195px] h-[96px] bg-blue-700"></div>
                <div className="relative flex items-center justify-center w-[195px] h-[96px] bg-slate-800">
                  Tạo bảng mới
                  <section className="absolute px-3 rounded-xl left-[105%] w-[304px] bg-[#282e33]">
                    <div className="flex py-4 items-center justify-center">
                      <p className="text-sm font-semibold text-center">
                        Tạo bảng
                      </p>
                      <FontAwesomeIcon
                        className="translate-x-[90px]"
                        icon={faClose}
                      />
                    </div>
                    <div
                      className="w-[200px] back flex items-center justify-center h-[120px] m-auto rounded bg-white"
                      style={{ backgroundImage: `url(${backgroundImg})` }}
                    >
                      <Image
                        src="https://trello.com/assets/14cda5dc635d1f13bc48.svg"
                        alt=""
                        width={186}
                        height={103}
                      />
                    </div>
                    <p className="text-xs py-2 font-semibold">Phông nền</p>
                    <div className="flex pb-2 gap-2">
                      {backgroundUrl.slice(0, 4).map((img) => (
                        <img
                          onClick={() => setBackgroundImg(img.url)}
                          className="rounded"
                          src={img.url}
                          width={64}
                          height={40}
                        />
                      ))}
                    </div>
                    <p className="text-xs py-2 font-semibold">
                      Tiêu đề bảng<span className="text-red-600">*</span>
                    </p>
                    <input
                      className="bg-[#22272b] py-2 px-3 text-sm w-full rounded outline-[red]"
                      type="text"
                    />
                    <div className="flex text-sm">
                      <span className="mr-1" role="img" aria-label="wave">
                        👋
                      </span>
                      <p>Tiêu đề bảng là bắt buộc</p>
                    </div>
                    <p className="text-xs py-2 font-semibold">Workspace</p>
                    <Select className="w-full h-9 bg-[#22272b]">
                      <Option>hi</Option>
                    </Select>
                    <button className="w-full bg-[#579dff] hover:bg-[#85b8ff] transition-all h-9 rounded-md text-[#1d2125] text-sm font-semibold mt-3 mb-[6px]">
                      Tạo Mới
                    </button>
                    <div className="text-xs pt-1 pb-3">
                      Bằng cách sử dụng hình ảnh từ Unsplash, bạn đồng ý với{" "}
                      <a
                        className="hover:underline"
                        href="https://unsplash.com/license"
                        target="_blank"
                      >
                        giấy phép
                      </a>{" "}
                      và{" "}
                      <a
                        className="hover:underline"
                        href="https://unsplash.com/terms"
                        target="_blank"
                      >
                        Điều khoản dịch vụ
                      </a>
                    </div>
                  </section>
                </div>
              </div>
            </div>
            <div>
              <h1 className="my-5 font-bold text-base">
                CÁC KHÔNG GIAN LÀM VIỆC CỦA BẠN
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Boards;
