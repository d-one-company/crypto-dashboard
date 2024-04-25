import CustomisePortfolio from '@/components/Cards/CustomisePortfolio';
import PageDivider from '@/components/Page/PageDivider';
import PageHeader from '@/components/Page/PageHeader';
import PageTitle from '@/components/Page/PageTitle';
import PageWrapper from '@/components/Page/PageWrapper';

const Page = () => {
  return (
    <PageWrapper>
      <div className="flex w-full flex-col rounded-lg border border-[#28272D] bg-[#151617]">
        <PageTitle />
        <PageDivider />
        <div className="mt-2 p-4">
          <PageHeader title="Welcom to Portfolio!" />
        </div>
        <div className="flex w-full px-4">
          <div className="flex w-full flex-col">
            <div className="flex">
              <CustomisePortfolio />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Page;
