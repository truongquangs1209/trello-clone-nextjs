import React, { useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { BoardsContext } from "@/context/BoardsProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

interface IProps {
  href: string;
  background: string;
  title: string;
  boardItem: any;
}

function BoardShortcut({ href, background, title,boardItem }: IProps) {
  const { setBoards, star, setStar } = useContext(BoardsContext);
  const handleUpdateStar = (boardItem: IBoards) => {
    setStar(!star);
    if (boardItem) {
      const itemRef = doc(db, "listBoards", boardItem.id);
      updateDoc(itemRef, { star: star });
      boardItem.star = star;
      setBoards((prevBoards) => [...prevBoards]); // Trigger re-render
    }
  };
  console.log(boardItem);
  return (
    <Link
      href={href}
      style={{ backgroundImage: `url(${background})` }}
      className="w-[195px] group relative overflow-hidden max-[600px]:mb-3 max-w-[47%] bg-cover rounded text-white h-[96px]"
    >
      <p className="m-1 text-base text-white font-semibold">{title}</p>
      <FontAwesomeIcon
      onClick={()=> handleUpdateStar}
        className="absolute transition-all group-hover:right-[5%] right-[-10%] bottom-[10%]"
        icon={faStar}
      />
    </Link>
  );
}

export default BoardShortcut;
