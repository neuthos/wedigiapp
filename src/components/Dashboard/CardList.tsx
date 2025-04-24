import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Typography from "../Common/Typography";

dayjs.extend(relativeTime);

interface CardItem {
  id: string | number;
  date: Date | string;
  title: string;
  description: string;
}

interface CardListProps {
  items: CardItem[];
  onCardClick?: (item: CardItem) => void;
  className?: string;
}

const formatDate = (date: Date | string) => {
  const now = dayjs();
  const itemDate = dayjs(date);

  if (itemDate.isSame(now, "day")) {
    const hoursAgo = now.diff(itemDate, "hour");
    const minutesAgo = now.diff(itemDate, "minute");

    if (hoursAgo > 0) {
      return `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
    } else {
      return `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
    }
  }
  if (itemDate.isSame(now.subtract(1, "day"), "day")) {
    return "Yesterday";
  }

  return itemDate.format("DD MMMM YYYY");
};

const CardList: React.FC<CardListProps> = ({
  items,
  onCardClick,
  className = "",
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`${className}`}>
      <Swiper
        slidesPerView={1.2}
        spaceBetween={16}
        centeredSlides={false}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          type: "bullets",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        modules={[Pagination]}
        className="w-full"
      >
        {items.map((item) => (
          <SwiperSlide className="p-1.5" key={item.id}>
            <div
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onCardClick && onCardClick(item)}
            >
              <Typography.Caption>
                {mounted ? formatDate(item.date) : ""}
              </Typography.Caption>
              <Typography.H4>{item.title}</Typography.H4>
              <Typography.Caption className=" line-clamp-2">
                {item.description}
              </Typography.Caption>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination mt-4 flex justify-center"></div>
    </div>
  );
};

export default CardList;
