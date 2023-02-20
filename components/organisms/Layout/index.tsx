import * as COMPONENT from 'components'
import * as far from '@fortawesome/free-regular-svg-icons'
import * as fas from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Manrope } from '@next/font/google'
import { ReactNode, useState } from 'react'
import { SidebarContext } from './context';

import Head from 'next/head';
import clsx from 'classnames';

type PropsTypes = {
  children: ReactNode
}

const manrope = Manrope({ subsets: ['latin'] })

export default function Component({ children }: PropsTypes) {
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <Head>
        <title>Online Test - Frontend Engineer</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Online Test - Frontend Engineer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={clsx(manrope.className, 'flex')}>
        <SidebarContext.Provider value={{ toggle, setToggle }}>
          <COMPONENT.Sidebar />
        </SidebarContext.Provider>
        <div
          className={clsx(
            'w-full min-h-screen bg-[#f3f1f8] p-10 transition-all lg:p-16 lg:pr-[70px]'
          )}
        >
          <FontAwesomeIcon
            icon={fas.faBars}
            className={clsx(
              'w-6 text-indigo-500 mb-8 cursor-pointer transition-all',
              toggle && 'ml-[216px] lg:ml-0'
            )}
            onClick={() => setToggle(!toggle)}
          />
          {children}
        </div>
      </main>
    </>
  );
}