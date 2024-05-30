'use client';

import Market from '@/components/Market/Market';
import { Observer } from 'mobx-react-lite';

const Page = () => {
  return (
    <div className="flex w-full px-24">
      <Observer>{() => <Market />}</Observer>
    </div>
  );
};

export default Page;
