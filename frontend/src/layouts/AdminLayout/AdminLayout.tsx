import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../_components/Admin/Sidebar';
import Header from '../_components/Admin/Header/Header';
import useDocumentTitle from '@/hooks/_common/useDocumentTitle';

export default function AdminLayout() {
    useDocumentTitle('Quản trị');

    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className='flex h-screen overflow-hidden bg-[#F5F5F5] dark:bg-slate-700 '>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className='mt-5 px-4'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
