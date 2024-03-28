import React from "react";
import Link from "next/link";

interface IProps {
  key: string;
  href: string;
  background: string;
  title: string;
}

function BoardShortcut({ key, href, background, title }: IProps) {
  return (
    <Link
      key={key}
      href={href}
      style={{ backgroundImage: `url(${background})` }}
      className="w-[195px] bg-cover rounded text-white h-[96px]"
    >
      <p className="m-1 text-base text-white font-semibold">{title}</p>
    </Link>
  );
}

export default BoardShortcut;
