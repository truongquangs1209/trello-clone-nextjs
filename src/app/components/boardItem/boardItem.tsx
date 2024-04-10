import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

interface IProps {
  href: string;
  background: string;
  title: string;
  star?: boolean;
  handleUpdateStar?: () => any ;
}

function BoardShortcut({
  href,
  background,
  star,
  title,
  handleUpdateStar,
}: IProps) {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault(); // Ngăn chặn sự kiện click từ lan ra phần tử cha
    handleUpdateStar();
  };
  return (
    <Link
      href={href}
      style={{ backgroundImage: `url(${background})` }}
      className="w-[195px] group relative overflow-hidden max-[600px]:mb-3 max-w-[47%] bg-cover rounded text-white h-[96px]"
    >
      <p className="m-1 text-base text-white font-semibold">{title}</p>
      <FontAwesomeIcon
        onClick={handleClick}
        className="absolute p-[3px] transition-all group-hover:right-[5%] right-[-10%] bottom-[10%]"
        icon={star ? solidStar : regularStar}
      />
    </Link>
  );
}

export default BoardShortcut;
