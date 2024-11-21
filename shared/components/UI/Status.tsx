interface StatusProps {
  status: {
    status: boolean;
    message: string;
  };
}

export const Status = ({ status }: StatusProps) => {
  return (
    <div className="flex justify-center items-center mt-5 ">
      {status?.status == true ? (
        <p className="text-green-500">{status?.message}</p>
      ) : (
        <p className="text-red-500">{status?.message}</p>
      )}
    </div>
  );
};
