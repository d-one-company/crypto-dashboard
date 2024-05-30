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
        'flex w-full items-center gap-4 rounded-lg border border-transparent px-4 py-2 text-gray-jumbo',
        'transition-colors duration-200 hover:border-baltic-sea hover:text-grayish-white',
        selected && 'border-baltic-sea text-grayish-white',
        className
      )}
    >
      {cloneElement(icon, { className: 'size-5' })}
      {label}
    </Link>
  );
};

export default SidebarItem;
