type Props = { value: string; text: string; percentage?: number };

const InfoContainer = ({ value, text, percentage }: Props) => {
  return (
    <div className="flex w-full flex-col items-start gap-4 rounded-lg border border-baltic-sea bg-card-dark p-3">
      <p className="text-sm text-gray-200/50">{text}</p>
      <div className="flex items-center gap-2">
        <p className="text-lg font-semibold text-grayish-white">{value}</p>
        <p className="w-fit rounded-sm bg-white px-1.5 text-sm font-semibold text-black">{percentage}%</p>
      </div>
    </div>
  );
};

export default InfoContainer;
