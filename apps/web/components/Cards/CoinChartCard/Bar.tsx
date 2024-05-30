import { HTMLProps, forwardRef, memo } from 'react';

type Props = HTMLProps<HTMLDivElement> & {
  color: string;
  height: number;
};

const Bar = forwardRef<HTMLDivElement, Props>(({ color, height, ...props }, ref) => {
  return (
    <div ref={ref} className="group relative flex h-full flex-1 cursor-crosshair items-end" {...props}>
      <div className="absolute left-1/2 hidden h-full border-l border-dashed border-gray-50 mix-blend-difference group-hover:block" />
      <div className="flex-1 rounded-sm" style={{ backgroundColor: color, height }} />
    </div>
  );
});

Bar.displayName = 'Bar';

export default memo(Bar);
