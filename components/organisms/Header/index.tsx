import { ReactNode } from 'react'
import clsx from 'classnames'

type PropsTypes = {
  label: string,
  labelFull: boolean,
  loading: boolean,
  className: string,
  children: ReactNode | any,
}

export default function Component({ label, labelFull, loading, className, children }: Partial<PropsTypes>) {
  return (
    <div className="flex items-center justify-between flex-wrap">
      <h2
        className={clsx(
          'text-3xl font-bold mt-5',
          labelFull && 'w-full',
          loading &&
            'bg-slate-300 text-slate-300 p-4 cursor-wait select-none rounded-lg animate-pulse'
        )}
      >
        {label}
      </h2>
      {children && (
        <div
          className={clsx(
            'grid grid-cols-1 gap-5 mt-8',
            className,
            children instanceof Array
              ? `lg:grid-cols-${Math.ceil(children?.length)} xl:grid-cols-${
                  children?.length
                }`
              : `xl:grid-cols-1`
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}