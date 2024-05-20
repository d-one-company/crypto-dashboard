import Link from 'next/link';

const blogUrl = '#'; // `${process.env['COMPANY_WEBSITE_URL']}/blog/crypto`;

const Banner = () => {
  return (
    <div className="sticky top-0 z-10 w-full border-b border-gray-200/10 bg-background py-3 pl-4 text-center text-sm font-semibold text-gray-400 transition-colors hover:text-white">
      <span>You are viewing a proof of concept. You can read more about our journey to create this app on our blog.</span>
      &nbsp;
      <Link className="underline" href={blogUrl} target="_blank" rel="noreferrer">
        Read more
      </Link>
    </div>
  );
};

export default Banner;
