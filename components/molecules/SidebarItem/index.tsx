import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import clsx from 'classnames';
import Link from 'next/link';

type PropsTypes = {
  active?: boolean,
  icon: IconProp,
  label: string,
  to?: string,
}

export default function Component({ active, icon, label, to }: PropsTypes) {
  return (
    <Link href={to || '/'}
      className={clsx(
        'flex items-center cursor-pointer transition-all pr-10 my-7 hover:text-indigo-500 before:block before:w-[5px] before:h-10 before:rounded-tr-lg before:rounded-br-lg before:mr-8',
        active
          ? 'text-indigo-500 before:bg-indigo-500'
          : 'text-slate-400'
      )}
    >
      <FontAwesomeIcon icon={icon} className='w-5 mr-3.5' />
      <p className='text-base font-semibold'>{label}</p>
    </Link>
  );
}