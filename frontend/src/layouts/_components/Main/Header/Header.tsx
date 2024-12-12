import { MAIN_ROUTES } from '@/constants/router';
import useFilter from '@/hooks/_common/useFilter';
import useGetCategoriesMenu from '@/hooks/categories/Queries/useGetCategoriesMenu';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuItem from './MenuItem/MenuItem';
import UserToolBar from './UserToolbar/UserToolBar';
export default function Header() {
    const { data: categoriesRes } = useGetCategoriesMenu();
    const location = useLocation();
    const navigate = useNavigate();
    const categoriesResData = categoriesRes?.data.categories;
    const [searchValue, setSearchValue] = useState<string>('');
    const { query,updateQueryParam} = useFilter();
    const onEnterSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
              if(location.pathname !== '/products'){
                navigate(`${MAIN_ROUTES.PRODUCTS}?search=${searchValue}`);
              }else{
                updateQueryParam({
                    ...query,
                    search: searchValue
                })
              }
        }
    };
    return (
        <>
            <div className="h-[40px] bg-[#333f48] flex items-center justify-center">
                <p className="text-[#f2c75c] uppercase font-medium text-sm">
                    ĐỔI HÀNG MIỄN PHÍ - Tại tất cả cửa hàng trong 30 ngày
                </p>
            </div>
            <header dir="ltr" className="sticky top-0 z-10 bg-white shadow-md">
                <div className="flex items-center justify-between max-w-screen-default py-1.5 mx-4 default:mx-auto">
                    <div className="flex gap-10 items-center">
                        <Link to={'/'}>
                            <img
                                src="https://res.cloudinary.com/dn1s3axok/image/upload/v1732159969/adstore/logo_zhcecc.png"
                                className="w-[55px]"
                                alt=""
                            />
                        </Link>
                        <div>
                            <ul className="flex">
                                <li>
                                    <Link
                                        to={'/'}
                                        className="text-base text-global uppercase font-bold hover:text-hover duration-300"
                                    >
                                        Trang chủ
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={'/products'}
                                        className={`text-base text-global uppercase font-bold ${location.pathname === '/products/' && location.search === '' ? 'text-hover' : 'hover:text-hover'}  duration-300 ml-8`}
                                    >
                                        Sản phẩm
                                    </Link>
                                </li>
                                {categoriesResData?.map((item) => (
                                    <MenuItem item={item} key={item._id} />
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="flex  items-center">
                        <div className="flex items-center gap-2 border-[1px] border-[#7777] py-2 px-4 rounded-full">
                            <button className="flex items-center">
                                <SearchOutlined className="text-xl" />
                            </button>
                            <input
                                onKeyDown={onEnterSearch}
                                type="text"
                                onChange={(e)=> setSearchValue(e.target.value)}
                                placeholder="Tìm kiếm..."
                                className="text-sm outline-none"
                            />
                        </div>
                        <UserToolBar />
                    </div>
                </div>
            </header>
        </>
    );
}
