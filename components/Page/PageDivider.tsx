type Props = {};

const PageDivider = (props: Props) => {
  return (
    <div className="flex w-full flex-col">
      <div className="h-[2px] w-full bg-[#0D0B0D]" />
      <div className="h-[2px] w-full bg-[#252625]" />
    </div>
  );
};

export default PageDivider;
