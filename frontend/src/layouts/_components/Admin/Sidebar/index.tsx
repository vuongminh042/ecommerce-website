import { CloseOutlined } from '@ant-design/icons';
import { menuGroups } from './_options';
import SidebarItem from './SidebarItem';
import ClickOutside from '@/components/_common/ClickOutside';

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
    return (
        <ClickOutside onClick={() => setSidebarOpen(false)}>
            <aside
                className={`fixed left-0 top-0 z-9999 flex h-screen w-60 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* <!-- SIDEBAR HEADER --> */}
                <div className='flex items-center justify-between gap-2 px-6 '>
                    {/* <Link to='/'>
                        <img
                            className='w-full rounded-md border border-transparent'
                            height={32}
                            src={StaticImages.logo}
                            alt='Logo'
                        />
                    </Link> */}

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-controls='sidebar'
                        className='absolute right-4 top-4 z-9999 lg:hidden'
                    >
                        <CloseOutlined className='fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary' />
                    </button>
                </div>

                <div className=' flex flex-col overflow-y-auto duration-300 ease-linear'>
                    {/* <!-- Sidebar Menu --> */}
                    <nav className='mt-3 px-2 py-4 '>
                        <ul className='mb-6 flex flex-col gap-1.5'>
                            {menuGroups.map((menuItem, menuIndex) => (
                                <SidebarItem key={menuIndex} item={menuItem} />
                            ))}
                        </ul>
                    </nav>
                    {/* <!-- Sidebar Menu --> */}
                </div>
            </aside>
        </ClickOutside>
    );
};

export default Sidebar;
