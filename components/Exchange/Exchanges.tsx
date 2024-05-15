import { useExchangesContext } from '@/providers/crypto/ExchangesProvider';
import ExchangesTable from './ExchangesTable';

const Exchanges = () => {
  const {
    exchangesStore: { exchanges },
  } = useExchangesContext();

  return (
    <div className="flex w-full flex-col gap-10">
      <h1 className="mt-20 text-2xl font-bold">Exchanges</h1>
      <ExchangesTable exchanges={exchanges} />
    </div>
  );
};

export default Exchanges;
