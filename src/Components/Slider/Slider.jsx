import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./Slider.css";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { getFileUrl } from "@/lib/utils";

export default function Slider({ slidesPerView = 3, slides = [] }) {
  const navigate = useNavigate();
  // console.log(slides);
  return (
    <Swiper
      key={slides.length}
      effect={"coverflow"}
      // centeredSlides={true}
      autoplay={{
        delay: 1200,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      loop
      slidesPerView={slidesPerView}
      // coverflowEffect={{
      //   rotate: -10,
      //   stretch: 10,
      //   depth: 100,
      //   modifier: -1,
      //   slideShadows: true,
      // }}
      pagination={true}
      modules={[Pagination, Autoplay]}
      className="mySwiper"
    >
      {slides.length > 0 ? (
        slides.map(({ file, url }) => {
          return (
            <SwiperSlide key={file} onClick={() => navigate(url)}>
              <img src={getFileUrl(file)} alt="Slide" />
            </SwiperSlide>
          );
        })
      ) : (
        <p>No slides available</p>
      )}
    </Swiper>
  );
}
