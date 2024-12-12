import { NavLink, useLocation } from 'react-router-dom';
import SidebarDropdown from './SidebarDropdown';
import { IMenuItem } from './_options';
import { FC, useState } from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import { cn } from '@/utils';

export type ISidebarItem = {
    item: IMenuItem;
};

const SidebarItem: FC<ISidebarItem> = ({ item }) => {
    const [isMenuActive, setIsMenuActive] = useState(true);
    const handleClick = () => {
        return setIsMenuActive(!isMenuActive);
    };

    const location = useLocation();

    // eslint-disable-next-line no-shadow
    const isActive = (path: any) => {
        if (path.route === location.pathname) return true;
        if (path.children) {
            return path.children.some((child: any) => isActive(child));
        }
        return false;
    };

    const isItemActive = isActive(item);

    return (
        <>
            <li>
                <span
                    onClick={handleClick}
                    className={`${isItemActive ? 'bg-graydark dark:bg-meta-4' : ''} group relative flex gap-2.5 rounded-sm px-4 py-2 text-[13px] font-medium capitalize text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4`}
                >
                    <div className='flex w-full gap-2'>
                        {item.icon}
                        {item.children || !item.route ? (
                            item.label
                        ) : (
                            <NavLink className='w-full ' to={item.route}>
                                {item.label}
                            </NavLink>
                        )}
                    </div>
                    {item.children && (
                        <CaretDownOutlined
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                isMenuActive && 'rotate-180'
                            }`}
                        />
                    )}
                </span>

                {item.children && (
                    <div className={cn('translate transform ', { ['hidden']: !isMenuActive })}>
                        <SidebarDropdown item={item.children} />
                    </div>
                )}
            </li>
        </>
    );
};

export default SidebarItem;
