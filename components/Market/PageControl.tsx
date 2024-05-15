import { useCoinsContext } from '@/providers/crypto/CoinsProvider';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const PageControl = () => {
  const {
    coinsStore: { fetchNextPage, fetchPrevPage, pageControl },
  } = useCoinsContext();

  return (
    <Observer>
      {() => (
        <div className="my-4 flex w-full justify-end">
          <div className="flex w-[90px] justify-end gap-4">
            {pageControl.hasPrevPage && (
              <button onClick={() => fetchPrevPage()} className="flex h-[32px] w-[32px] items-center justify-center rounded-sm border border-gray-jumbo">
                <ChevronLeft />
              </button>
            )}
            {pageControl.hasNextPage && (
              <button className="flex h-[32px] w-[32px] items-center justify-center rounded-sm border border-gray-jumbo" onClick={fetchNextPage}>
                <ChevronRight />
              </button>
            )}
          </div>
        </div>
      )}
    </Observer>
  );
};

export default PageControl;
