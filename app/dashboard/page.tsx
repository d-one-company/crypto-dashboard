import TopCrypto from '@/components/Dashboard/TopCrypto';
import { DotsHorizontal, Trending } from '@/components/icons';
import RecentTransactionsList from './RecentTransactionsList';

const Dashboard = () => {
  return (
    <div className="flex h-screen flex-grow flex-col gap-5 bg-background p-5">
      <h1 className="mb-4 text-lg">Hi, Alex</h1>
      <div className="flex items-stretch gap-4">
        <div className="min-w-[400px] rounded-xl bg-card-dark p-5 shadow-card">
          <div className="flex items-center justify-between">
            <p className="text-sm">Current Balance</p>
            <button>
              <DotsHorizontal />
            </button>
          </div>
          <p className="mt-4 text-3xl">
            <span className="text-foreground-dark">$</span>
            <span>{Intl.NumberFormat('en').format(21432.15)}</span>
          </p>
          <div className="mt-2 flex items-center gap-1">
            <div className="inline-block rounded border border-green-700 p-0.5">
              <Trending className="text-green-700" width={10} height={10} />
            </div>
            <span className="text-xs text-green-700">12% last month</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button className="rounded-xl bg-white px-3.5 py-2 text-black shadow-button">Balance</button>
            <button className="px-3.5 py-2">Quick Invest</button>
            <button className="px-3.5 py-2">Actives</button>
          </div>
        </div>
        <TopCrypto />
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-lg">Recent Transactions</span>
        <button className="font-light text-foreground-dark">See all coins</button>
      </div>
      <RecentTransactionsList />
    </div>
  );
};

export default Dashboard;
