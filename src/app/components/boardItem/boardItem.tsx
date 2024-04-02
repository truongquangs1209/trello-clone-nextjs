import React from "react";
import Link from "next/link";

interface IProps {
  href: string;
  background: string;
  title: string;
}

function BoardShortcut({ href, background, title }: IProps) {
  return (
    <Link
      href={href}
      style={{ backgroundImage: `url(${background})` }}
      className="w-[195px] bg-cover rounded text-white h-[96px]"
    >
      <p className="m-1 text-base text-white font-semibold">{title}</p>
    </Link>
  );
}

export default BoardShortcut;
