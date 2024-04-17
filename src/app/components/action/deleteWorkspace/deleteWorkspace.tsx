"use client";

import { WorkSpaceContext } from "@/context/WorkspaceProvider";
import { db } from "@/firebase/config";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { BoardsContext } from "@/context/BoardsProvider";
import { useLocale, useTranslations } from "next-intl";

function DeleteWorkspace({ selectWorkspace }) {
  const [inputValue, setInputValue] = useState<string>("");
  const { setBoards } = useContext(BoardsContext);
  const {
    setWorkspace,
    openModalDeleteWorkspace,
    setOpenModalDeleteWorkspace,
  } = useContext(WorkSpaceContext);
  const locale = useLocale()
  const router = useRouter();
const t = useTranslations('deleteWorkspace')
  const handleDeleteWorkspace = async (itemId: string) => {
    try {
      if (inputValue === selectWorkspace?.title) {
        // Xóa workspace
        const workspaceDocRef = doc(db, "workspaces", itemId);
        await deleteDoc(workspaceDocRef);
        setWorkspace((prevWorkspace) =>
          prevWorkspace.filter((item) => item.id !== itemId)
        );

        // Xóa các boardItem có workspaceId bằng itemId của workspace đã xóa
        const boardItemQuery = query(
          collection(db, "listBoards"),
          where("workspaceId", "==", itemId)
        );
        const boardItemQuerySnapshot = await getDocs(boardItemQuery);

        // Lặp qua danh sách các boardItem và xóa chúng
        const deleteBoardItemPromises = boardItemQuerySnapshot.docs.map(
          async (boardItemDoc) => {
            const boardItemId = boardItemDoc.id;
            await deleteDoc(boardItemDoc.ref);
            // Cập nhật state boards nếu cần
            setBoards((prevBoards) =>
              prevBoards.filter((board) => board.workspaceId !== itemId)
            );
            console.log(`Deleted boardItem with ID: ${boardItemId}`);
          }
        );

        // Đợi cho tất cả các hoạt động xóa boardItem hoàn thành trước khi chuyển hướng
        await Promise.all(deleteBoardItemPromises);

        // Chuyển hướng đến trang /boards
        router.push(`/${locale}/boards`);

        // Hiển thị thông báo thành công
        toast.success("Delete Workspace Success !");
      }else{
        alert('Vui lòng nhập đúng tên workspace')
      }
    } catch (error) {
      console.error("Error deleting workspace:", error);
    }
  };

  return (
    <section
      className="fixed px-3 z-10 rounded-xl right-[55%] w-[304px] top-[10%] bg-[#282e33]"
      style={
        openModalDeleteWorkspace ? { display: "block" } : { display: "none" }
      }
    >
      <div className="text-[#Fadbc] flex cursor-pointer items-center justify-between py-4 px-3">
        <span className="text-sm font-semibold">{t('note6')}</span>
        <FontAwesomeIcon
          onClick={() => setOpenModalDeleteWorkspace(false)}
          className="w-4 h-4 p-1"
          icon={faClose}
        />
      </div>
      <div>
        <p className="font-semibold mb-2 text-base">
        {t('span1')}{selectWorkspace?.title} {t('span2')}
        </p>
        <ul className="text-xs ml-5 list-disc font-normal">
        {t('noteTitle')}
          <li className="text-sm text-[#B6c2cf] mt-2">
          {t('note1')}
          </li>
          <li className="text-sm text-[#B6c2cf] mt-2">
          {t('note2')}
          </li>
          <li className="text-sm text-[#B6c2cf] mt-2">
          {t('note3')}
          </li>
          <li className="text-sm text-[#B6c2cf] mt-2">
          {t('note4')}
          </li>
        </ul>
        <div>
          <span className="text-xs mb-1 font-semibold ">
          {t('note5')}
          </span>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-[#22272b] h-8 rounded py-2 px-3"
          />
          <button
            style={
              inputValue === selectWorkspace?.title
                ? { backgroundColor: "#F87168", color: "black" }
                : {
                    backgroundColor: "#2e353b",
                    color: "#BFDBD847",
                    cursor: "no-drop",
                  }
            }
            onClick={() => handleDeleteWorkspace(selectWorkspace.id)}
            className="w-full  my-2 text-sm font-semibold bg-[#22272b] h-8 rounded py-2 px-3"
          >
           {t('note6')}
          </button>
        </div>
      </div>
    </section>
  );
}

export default DeleteWorkspace;
