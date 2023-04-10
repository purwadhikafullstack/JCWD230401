import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./SwiperCarousel.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import { API_URL } from "../../helper";



export default function SwiperCarousel(props) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {
                    props?.pictureProperty?.map((val, idx) => {
                        return <SwiperSlide>
                            <img src={`${API_URL}${val.picture}`} />
                        </SwiperSlide>
                    })
                }
                {
                    props?.pictureRoom?.map((val, idx) => {
                        return <SwiperSlide>
                            <img src={`${API_URL}${val.picture}`} />
                        </SwiperSlide>
                    })
                }
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {
                    props?.pictureProperty?.map((val, idx) => {
                        return <SwiperSlide>
                            <img src={`${API_URL}${val.picture}`} />
                        </SwiperSlide>
                    })
                }
                {
                    props?.pictureRoom?.map((val, idx) => {
                        return <SwiperSlide>
                            <img src={`${API_URL}${val.picture}`} />
                        </SwiperSlide>
                    })
                }

            </Swiper>
        </>
    );
}
