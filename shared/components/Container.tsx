export const Container = ({
  children,
  flexCol,
}: {
  children: React.ReactNode;
  flexCol?: boolean;
}) => {
  return (
    <div className="pt-36 pb-36 padding-x ">
      <div
        className={`flex justify-center items-center w-full mx-auto ${
          flexCol ? 'flex-col' : ''
        }`}
      >
        {children}
      </div>
    </div>
  );
};
