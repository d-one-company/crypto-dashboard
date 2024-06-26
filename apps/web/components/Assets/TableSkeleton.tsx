const TableSkeleton = () => {
  return (
    <div className="flex w-full flex-col overflow-hidden">
      <div className="grid h-[48px] w-full grid-cols-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div className="p-4" key={idx}>
            <div className="flex h-full w-1/2 rounded-sm bg-foreground-dark text-transparent" />
          </div>
        ))}
      </div>
      {Array.from({ length: 10 }).map((_, idx) => (
        <div key={idx} className="flex h-[65px] w-full border-b border-b-gray-jumbo"></div>
      ))}
    </div>
  );
};

export default TableSkeleton;
