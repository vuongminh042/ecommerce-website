import { Carousel } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SliderControls from '../SliderControls';

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const ref = useRef<CarouselRef>(null);
  const handlePrev = () => {
    if (ref.current) {
      ref.current.prev();
    }
  };

  const handleNext = () => {
    if (ref.current) {
      ref.current.next();
    }
  };
  return (
    <div className="relative">
      <div className="group ">
        <Carousel className='w-full' ref={ref} draggable infinite autoplay>
          <Link to={'/'}>
            <img
              className="object-cover"
              src="https://media.canifa.com/Simiconnector/BannerSlider/a/o/aogio-topbanner-desktop-06.11.webp"
              alt=""
            />
          </Link>
          <Link to={'/'}>
            <img
              className="object-cover"
              src="https://media.canifa.com/Simiconnector/BannerSlider/u/u/uudai20_topbanner_desktop-06.11.webp"
              alt=""
            />
          </Link>
        </Carousel>
        <SliderControls isButtonHandle={false} handlePrev={handlePrev} handleNext={handleNext}/>
      </div>
    </div>
  );
}
