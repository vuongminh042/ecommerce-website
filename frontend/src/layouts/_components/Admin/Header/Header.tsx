import { Link } from 'react-router-dom';
import DarkModeSwitcher from './SwitchTheme';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser/DropdownUser';
import { MenuOutlined } from '@ant-design/icons';

const Header = (props: {
    sidebarOpen: string | boolean | undefined;
    setSidebarOpen: (arg0: boolean) => void;
}) => {
    return (
        <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-between px-4 py-2 shadow-2 md:px-4 2xl:px-4">
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    {/* <!-- Hamburger Toggle BTN --> */}
                    <button
                        aria-controls="sidebar"
                        onClick={(e) => {
                            e.stopPropagation();
                            props.setSidebarOpen(!props.sidebarOpen);
                        }}
                        className="z-99999 block bg-white  p-1.5 shadow-sm dark:bg-boxdark lg:hidden"
                    >
                        <MenuOutlined className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary" />
                    </button>
                </div>

                <Link className="block flex-shrink-0" to="/">
                    <span className="text-2xl font-semibold capitalize text-[#da291c]">
                        AdStore -{' '}
                    </span>
                    <span className="text-2xl font-semibold capitalize text-[#da291c] dark:text-white">
                        Quản trị Admin
                    </span>
                </Link>

                <div className="flex items-center gap-3 2xsm:gap-7">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                        {/* <!-- Dark Mode Toggler --> */}
                        {/* <DarkModeSwitcher /> */}

                        {/* <!-- Notification Menu Area --> */}
                        {/* <DropdownNotification /> */}

                        {/* <!-- Chat Notification Area --> */}
                        {/* <DropdownMessage /> */}
                    </ul>

                    {/* <!-- User Area --> */}
                    {/* <DropdownUser /> */}
                </div>
            </div>
        </header>
    );
};

export default Header;
