import { FC, ReactNode, useState } from 'react';
import ClickOutside from '@/components/_common/ClickOutside'
import {cn} from '@/utils'

type IDropdown = {
    title: string;
    icon: ReactNode;
    footer?: ReactNode;
    children: ReactNode;
};

const Dropdown: FC<IDropdown> = ({ icon, title, footer, children }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifying, setNotifying] = useState(true);

    return (
        <ClickOutside onClick={() => setDropdownOpen(false)} className='relative'>
            <li className='relative'>
                <span
                    onClick={() => {
                        setNotifying(false);
                        setDropdownOpen(!dropdownOpen);
                    }}
                    className='relative flex items-center justify-center hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white'
                >
                    <span
                        className={cn('absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1', {
                            ['hidden']: !notifying,
                            ['inline']: notifying,
                        })}
                    >
                        <span className='absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75'></span>
                    </span>
                    {icon}
                </span>

                {/* <!-- Dropdown Start --> */}
                {dropdownOpen && (
                    <div
                        className={`absolute -right-16 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80`}
                    >
                        <div className='px-4.5 py-3'>
                            <h5 className='text-sm font-medium text-bodydark2'>{title}</h5>
                        </div>

                        <ul className='flex h-auto flex-col overflow-y-auto'>{children}</ul>
                        {footer && footer}
                    </div>
                )}
                {/* <!-- Dropdown End --> */}
            </li>
        </ClickOutside>
    );
};

export default Dropdown;
