"use client";
import { useEffect, useRef } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { IDiaLogVideoProps } from "@/app/(client)/interfaces/DiaLog/IDiaLogVideoProps";

export default function DiagLogVideo({
  isOpen,
  onClose,
  videoUrl,
  title,
}: IDiaLogVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current && videoUrl) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  }, [isOpen, videoUrl]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-[1000] w-full"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/50 data-[closed]:opacity-0 transition" />

      <div className="fixed inset-0 flex w-screen items-center p-4">
        <DialogPanel className="w-full bg-white rounded-md shadow-lg overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <DialogTitle className="text-lg font-semibold">
              {title || "Video"}
            </DialogTitle>
            <button
              onClick={onClose}
              className="px-3 py-1 rounded text-sm bg-red-500 text-white"
            >
              ĐÓNG
            </button>
          </div>
          <div className="bg-black">
            {videoUrl ? (
              <video
                ref={videoRef}
                controls
                autoPlay
                className="w-full h-[600px] bg-black"
              >
                <source src={videoUrl} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ thẻ video.
              </video>
            ) : (
              <div className="w-full h-[600px] bg-black flex items-center justify-center">
                <p className="text-white">Không có video</p>
              </div>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
