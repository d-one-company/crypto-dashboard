import Assets from '@/components/Assets/Assets';
import CoinCard from '@/components/Cards/CoinCard';
import CustomisePortfolio from '@/components/Cards/CustomisePortfolio';
import PageDivider from '@/components/Page/PageDivider';
import PageHeader from '@/components/Page/PageHeader';
import PageTitle from '@/components/Page/PageTitle';
import PageWrapper from '@/components/Page/PageWrapper';
import TypeOfTokens from '@/components/TypeOfTokens';

const Page = () => {
  return (
    <PageWrapper>
      <div className="flex w-full flex-col gap-5 rounded-lg border border-[#28272D] bg-[#1A1A1E] pb-10">
        <PageTitle />
        <PageDivider />
        <div className="mt-2 p-4">
          <PageHeader title="Welcome to Portfolio!" />
        </div>
        <div className="mt-5 flex w-full gap-5 px-4">
          <div className="flex w-full flex-col gap-4">
            <div className="flex">
              <CustomisePortfolio />
            </div>
            <Assets />
          </div>
          <div className="flex flex-col gap-10">
            <TypeOfTokens />
            <CoinCard />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Page;
