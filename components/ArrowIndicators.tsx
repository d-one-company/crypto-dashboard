import { ChevronDown, ChevronUp } from 'lucide-react';

const ArrowUpIndicator = () => {
  return <ChevronUp className="text-green-500" />;
};

const ArrowDownIndicator = () => {
  return <ChevronDown className="text-red-500" />;
};

export { ArrowDownIndicator, ArrowUpIndicator };
