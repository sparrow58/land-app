"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { RiImageEditFill } from "react-icons/ri";
import Button from "../Button";
import { useRouter } from "next/navigation";
interface Props {
  id: string;
  slides: string[];
}
const ImageSlider = ({ id, slides }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };
  if (slides.length === 0) {
    return (
      <div className="flex  p-3 justify-center align-middle">
        <div className="">
          <p className="text-center italic">no images found</p>
          <Button text="Add Images" onClick={handleEdit} />
        </div>
      </div>
    );
  }
  return (
    <div className=" h-96 md:h-[40rem]  w-full m-auto pb-10 relative group ">
      <div className="absolute top-[5%] align-middle left-5 visible md:hidden group-hover:block -translate-x-0 translate-y-[-50%] text-2xl rounded-full  p-2 bg-black/50 text-white cursor-pointer">
        {/* <button onClick={handleEdit}> */}
        <RiImageEditFill onClick={() => handleEdit()} size={30} />
        {/* </button> */}
      </div>
      <Image
        src={slides[currentIndex]}
        width={0}
        height={0}
        sizes="100vm"
        alt=""
        className="w-full h-full rounded-2xl bg-center bg-cover ease-out duration-500 object-cover"
      />
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slide}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );

  function handleEdit() {
    router.push(`/real/${id}/edit/images`);
  }
};

export default ImageSlider;
