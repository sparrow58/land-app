"use client";

import { useState, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Play } from "lucide-react";

interface ModalVideoProps {
  thumb: string;
  thumbWidth: number;
  thumbHeight: number;
  thumbAlt: string;
  video: string;
  videoWidth: number;
  videoHeight: number;
}

export default function ModalVideo({
  thumb,
  thumbWidth,
  thumbHeight,
  thumbAlt,
  video,
  videoWidth,
  videoHeight,
}: ModalVideoProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div>
      {/* Video thumbnail */}
      <div className="relative group">
        <Image
          src={thumb}
          width={thumbWidth}
          height={thumbHeight}
          alt={thumbAlt}
          className="w-full aspect-video object-cover rounded-lg shadow-2xl"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Play button */}
          <button
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            onClick={() => {
              setModalOpen(true);
            }}
            aria-label="Play video"
          >
            <div className="bg-white/90 rounded-full p-4 transform hover:scale-110 transition-transform duration-300">
              <Play className="w-12 h-12 text-primary fill-current" />
            </div>
          </button>
        </div>
      </div>
      {/* Modal */}
      <Transition show={modalOpen} as={Fragment}>
        <Dialog onClose={() => setModalOpen(false)}>
          {/* Modal backdrop */}
          <Transition.Child
            className="fixed inset-0 z-[99999] bg-black/75"
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            aria-hidden="true"
          />
          {/* Modal dialog */}
          <Transition.Child
            className="fixed inset-0 z-[99999] overflow-hidden flex items-center justify-center transform px-4 sm:px-6"
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-out duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="max-w-6xl mx-auto h-full flex items-center">
              <Dialog.Panel className="w-full max-h-full aspect-video bg-black overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full aspect-video"
                  width={videoWidth}
                  height={videoHeight}
                  loop
                  controls
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
}
