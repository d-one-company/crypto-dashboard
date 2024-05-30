type Props = {
  title: string;
};

const PageHeader = ({ title }: Props) => {
  return (
    <div className="flex w-full justify-between">
      <p className="text-3xl text-grayish-white">{title}</p>
    </div>
  );
};

export default PageHeader;
