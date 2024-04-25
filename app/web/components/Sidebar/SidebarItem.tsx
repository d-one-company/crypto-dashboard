'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cloneElement } from 'react';

type Props = {
  className?: string;
  icon: JSX.Element;
  label: string;
  href?: string;
};

const SidebarItem = ({ className, icon, label, href = '#' }: Props) => {
  const pathname = usePathname();
  const selected = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'flex w-[260px] items-center gap-4 rounded-lg border border-transparent px-4 py-2 text-[#727274]',
        'transition-colors duration-200 hover:border-[#27262B] hover:text-[#E4E4E5]',
        selected && 'border-[#27262B] text-[#E4E4E5]',
        className
      )}
    >
      {cloneElement(icon, { className: 'size-5' })}
      {label}
    </Link>
  );
};

export default SidebarItem;
