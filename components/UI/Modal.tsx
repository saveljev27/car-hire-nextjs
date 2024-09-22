import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface ModalProps {
  isVisible: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal = ({ isVisible, title, onClose, onConfirm }: ModalProps) => {
  if (!isVisible) return null;

  return (
    <Transition appear show={isVisible} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-40">
            <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Confirm Action</h2>
              <p>Are you sure you want to cancel this {title}?</p>
              <div className="mt-6 flex justify-end">
                <button
                  className="mr-4 px-4 py-2 bg-gray-400 text-white rounded hover:opacity-90"
                  onClick={onClose}
                >
                  No, Go Back
                </button>
                <button
                  className="px-4 py-2 bg-primary-red text-white rounded hover:opacity-90"
                  onClick={onConfirm}
                >
                  Yes, Cancel {title}
                </button>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Modal;
