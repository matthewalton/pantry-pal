"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSignInPanel } from "@/app/_components/Providers";

export default function SlideInSlideInPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPanelOpen, closePanel } = useSignInPanel();

  return (
    <Transition.Root show={isPanelOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closePanel}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-x-0 right-0 flex max-h-full bottom-0">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
              >
                <Dialog.Panel className="pointer-events-auto relative h-[500px] w-full max-h-md">
                  <div className="flex h-full flex-col items-center bg-white pt-10 pb-6 px-5 shadow-xl">
                    {children}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
