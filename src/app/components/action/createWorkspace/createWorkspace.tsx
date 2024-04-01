import { AuthContext } from "@/context/AppProvider";
import { WorkSpaceContext } from "@/context/WorkspaceProvider";
import { db } from "@/firebase/config";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select } from "antd/lib";
import { addDoc, collection } from "firebase/firestore";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

function CreateWorkspace() {
  const { user } = useContext(AuthContext);

  const [titleWorkspace, setTitleWorkspace] = useState<string>("");
  const [typeWorkspace, setTypeWorkspace] = useState<any>("");
  const [descriptionWorkspace, setDescriptionWorkspace] = useState<string>("");

  const {
    workspace,
    setWorkspace,
    openModalAddWorkspace,
    setOpenModalAddWOrkspace,
  } = useContext(WorkSpaceContext);
  const handleAddWorkspace = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (typeWorkspace == "" || titleWorkspace == "") {
      toast.error("Vui lòng nhập đầy đủ thông tin");
    } else {
      const newWorkspace: IWorkspaces = {
        title: titleWorkspace,
        type: typeWorkspace,
        boards: [],
        createBy: user?.uid,
        description: descriptionWorkspace,
      };
      const dataCollection = collection(db, "workspaces");
      const docRef = await addDoc(dataCollection, newWorkspace);
      newWorkspace.id = docRef.id;
      setWorkspace([...workspace, newWorkspace as any]);
      toast.success("Create workspace success!");
      setOpenModalAddWOrkspace(false);
      console.log(docRef);
    }
  };

  return (
    <div
      style={
        !openModalAddWorkspace
          ? { display: "none" }
          : {
              backgroundImage: `url('https://trello-clone-ruby.vercel.app/assets/other/workspace-modal-bg.png')`,
            }
      }
      className="fixed mb-20 rounded left-[12%] top-[2%] bg-cover bg-no-repeat z-10 m-auto w-[74%] "
    >
      <div className="text-right  m-2 cursor-pointer ">
        <FontAwesomeIcon
          onClick={() => setOpenModalAddWOrkspace(false)}
          className="hover:bg-slate-300 p-2 transition rounded"
          icon={faClose}
        />
      </div>
      <form className="flex ">
        <div className="flex-[1] px-10 md:px-[120px] ">
          <h1 className="text-[#b6c2cf] mt-[30px] mb-4 font-medium text-[26px]">
            Hãy xây dựng một không gian làm việc
          </h1>
          <p className="text-lg text-[#9Fadbc]">
            Tăng năng suất của bạn bằng cách giúp mọi người dễ dàng truy cập
            bảng ở một vị trí.
          </p>
          <div className="flex flex-col">
            <label className=" text-xs font-semibold mt-6 mb-1 text-[#b6c2cf]">
              Tên không gian làm việc <span className="text-[red]">*</span>
            </label>
            <input
              value={titleWorkspace}
              onChange={(e) => setTitleWorkspace(e.target.value)}
              maxLength={100}
              type="text"
              className="py-2 px-3 outline-2 border border-[#738496] mb-2"
            />
            <span className="text-[#9fadbc] text-xs">
              Đây là tên của công ty, nhóm hoặc tổ chức của bạn.
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold mt-6 mb-2 text-[#b6c2cf]">
              Loại Không gian làm việc
            </span>
            <Select
              showSearch
              value={typeWorkspace}
              onChange={(newValue) => setTypeWorkspace(newValue)}
              filterOption
              placeholder="Chọn..."
              className="h-9 outline-rose-600"
            >
              <Select.Option key="Kỹ thuật-CNTT">Kỹ thuật-CNTT</Select.Option>
              <Select.Option key="Doanh nghiệp nhỏ">
                Doanh nghiệp nhỏ
              </Select.Option>
              <Select.Option key="Nhân sự">Nhân sự</Select.Option>
              <Select.Option key="Giáo dục">Giáo dục</Select.Option>
              <Select.Option key="Khác">Khác</Select.Option>
            </Select>
          </div>
          <div className="flex flex-col">
            <label
              className="text-xs font-semibold mt-6 mb-2 text-[#b6c2cf]"
              htmlFor="description"
            >
              Mô tả Không gian làm việc{" "}
              <span className="text-[#9fadbc] font-thin text-xs">Tùy chọn</span>
            </label>
            <textarea
              value={descriptionWorkspace}
              onChange={(e) => setDescriptionWorkspace(e.target.value)}
              className="py-2 px-3 rounded-sm text-sm h-[120px]"
              id="description"
              placeholder="Nhóm của chúng tôi tổ chức mọi thứ ở đây."
            ></textarea>
            <span className="text-[#9fadbc] mb-2 text-xs">
              Đưa các thành viên của bạn vào bảng với mô tả ngắn về Không gian
              làm việc của bạn.
            </span>
          </div>
          <button
            onClick={handleAddWorkspace}
            className="w-full h-[48px] rounded font-semibold text-[#1d2125] bg-[#579dff] hover:bg-[#85b8ff] transition mb-6 text-sm"
          >
            Tiếp tục
          </button>
        </div>
        <div className="flex-[1] hidden md:block pt-[112px]">
          <Image
            src="https://trello.com/assets/d1f066971350650d3346.svg"
            alt=""
            width={342}
            height={256}
          />
        </div>
      </form>
    </div>
  );
}

export default CreateWorkspace;
