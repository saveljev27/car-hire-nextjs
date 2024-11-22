import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';

interface StatusProps {
  status: {
    status: boolean;
    message: string;
  };
}

export const Status = ({ status }: StatusProps) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (status?.status == true || status?.status == false) {
      setOpen(true);
    } else {
      return;
    }
  }, [status]);

  return (
    <>
      {open && (
        <div className="flex justify-center items-center mt-5 ">
          {status?.status == true && (
            <div className="bg-green-300 px-4 py-2 rounded flex gap-2">
              <p className=" text-green-700">{status?.message}</p>
              <button onClick={() => setOpen(false)}>
                {<RxCross2 size={12} className="text-green-700" />}
              </button>
            </div>
          )}
          {status?.status == false && (
            <div className="bg-red-300 px-4 py-2 rounded flex gap-2">
              <p className="text-red-700">{status?.message}</p>
              <button onClick={() => setOpen(false)}>
                {<RxCross2 size={12} className="text-red-700" />}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
