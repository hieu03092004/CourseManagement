"use client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";

function LessonItem() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <li className="lesson-item flex text-[14px] py-2 ps-2 border-b border-gray-300 last:border-b-0 ;">
        <div className="lesson-item-title flex gap-2 items-center me-[150px]">
          <FaCirclePlay />
          <span>Bài 1. Hướng dẫn cài đặt phần mềm DEV C++ để lập trình</span>
        </div>
        <div className="flex gap-4 pe-[20px]">
          <div className="lesson-item-watch">
            <button
              className="underline decoration-sky-500 text-sky-500/100"
              onClick={() => setModalOpen(true)}
            >
              Vào học
            </button>
          </div>
          <div className="lesson-item-duration">03:01</div>
        </div>
      </li>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className="relative z-1000 w-full"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50 data-[closed]:opacity-0 transition" />

        <div className="fixed inset-0 flex w-screen items-center  p-4">
          <DialogPanel className="w-full  bg-white rounded-md shadow-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <DialogTitle className="text-lg font-semibold">
                Bài 1. Hướng dẫn cài đặt phần mềm DEV C++
              </DialogTitle>
              <button
                onClick={() => setModalOpen(false)}
                className="px-3 py-1 rounded text-sm bg-red-500 text-white"
              >
                ĐÓNG
              </button>
            </div>

            <div className="bg-black">
              <video controls className="w-full h-[600px] bg-black">
                <source src="/demo/sample.mp4" type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ thẻ video.
              </video>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default LessonItem;
