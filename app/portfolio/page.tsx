import CustomisePortfolio from '@/components/Cards/CustomisePortfolio';
import PageDivider from '@/components/Page/PageDivider';
import PageHeader from '@/components/Page/PageHeader';
import PageTitle from '@/components/Page/PageTitle';
import PageWrapper from '@/components/Page/PageWrapper';
import TypeOfTokents from '@/components/TypeOfTokens';

const Page = () => {
  return (
    <PageWrapper>
      <div className="flex w-full flex-col rounded-lg border border-[#28272D] bg-[#1A1A1E]">
        <PageTitle />
        <PageDivider />
        <div className="mt-2 p-4">
          <PageHeader title="Welcom to Portfolio!" />
        </div>
        <div className="mt-5 flex w-full px-4">
          <div className="flex w-full flex-col">
            <div className="flex">
              <CustomisePortfolio />
            </div>
          </div>
          <TypeOfTokents />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Page;
