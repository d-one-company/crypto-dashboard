import Assets from '@/components/Assets/Assets';
import CoinCard from '@/components/Cards/CoinCard';
import CoinChartCard from '@/components/Cards/CoinChartCard';
import CustomisePortfolio from '@/components/Cards/CustomisePortfolio';
import PageDivider from '@/components/Page/PageDivider';
import PageHeader from '@/components/Page/PageHeader';
import PageTitle from '@/components/Page/PageTitle';
import PageWrapper from '@/components/Page/PageWrapper';
import TypeOfTokens from '@/components/TypeOfTokens';

const Page = () => {
  return (
    <PageWrapper>
      <div className="flex w-full flex-col gap-5 rounded-lg border border-baltic-sea bg-black-shark pb-10">
        <PageTitle />
        <PageDivider />
        <div className="mt-2 p-4">
          <PageHeader title="Welcome to Portfolio!" />
        </div>
        <div className="mt-5 flex w-full gap-5 px-4">
          <div className="flex w-full flex-col gap-4">
            <div className="flex items-center gap-14">
              <CustomisePortfolio />
              <CoinChartCard />
            </div>
            <Assets />
          </div>
          <div className="hidden flex-col gap-10 2xl:flex">
            <TypeOfTokens />
            <CoinCard />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Page;
