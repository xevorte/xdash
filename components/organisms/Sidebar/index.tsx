import * as COMPONENT from 'components'
import * as far from '@fortawesome/free-regular-svg-icons'
import * as fas from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { SidebarContext } from '../Layout/context'
import clsx from 'classnames'
import { useRouter } from 'next/router'

export default function Component() {
  const { toggle } = useContext(SidebarContext);
  const router = useRouter();

  return (
    <div
      className={clsx(
        'sidebar fixed lg:relative min-h-screen flex bg-white shadow-md transition-all z-10',
        toggle ? 'min-w-[220px]' : 'min-w-[0]'
      )}
    >
      <div className="sidebar-content absolute left-0 top-0 right-0 flex flex-col justify-between h-full overflow-y-auto pt-8">
        <div className="sidebar-header font-bold text-2xl text-center tracking-widest mb-7 cursor-pointer">
          <span className="text-indigo-500 mr-2">X</span>
          DASH
        </div>
        <div className="sidebar-items">
          <COMPONENT.SidebarItem active={router.asPath === '/'} icon={fas.faGlobe} label="Overview" to="/" />
          <COMPONENT.SidebarItem active={router.asPath.includes('/products')} icon={fas.faCube} label="Products" to="/products" />
          <COMPONENT.SidebarItem active={router.asPath.includes('/carts')} icon={fas.faFolderOpen} label="Carts" to="/carts" />
        </div>
        <div className="sidebar-footer">
          <COMPONENT.SidebarItem icon={fas.faRightFromBracket} label="Logout" />
        </div>
      </div>
    </div>
  );
}