import useFilter from '@/hooks/_common/useFilter';
import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';

type ItemProps = {
    item: {
        name: string;
        _id: string;
    };
};

const MenuItem = ({ item }: ItemProps) => {
    const { query, updateQueryParam } = useFilter();
    const handleUpdateParams = () => {
        updateQueryParam({ category: item._id });
    };
    return (
        <li>
            <Link
                to={`/products/?category=${item._id}`}
                onClick={handleUpdateParams}
                className={`text-base text-global uppercase font-bold  duration-300 ml-8 ${query['category'] === item._id ? 'text-hover' : 'hover:text-hover'}`}
            >
                {item.name}
            </Link>
        </li>
    );
};

export default memo(MenuItem);
