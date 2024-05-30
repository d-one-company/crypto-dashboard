import { PropsWithChildren } from 'react';

const PageWrapper = ({ children }: PropsWithChildren) => {
  return <div className="flex-grow py-8 pr-8">{children}</div>;
};

export default PageWrapper;
