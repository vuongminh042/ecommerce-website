import { Rate } from 'antd';
import { cn } from '@/utils';

const RatingDisplay = ({ rating, reviews }: { rating: number; reviews?: number }) => {
    const checkRating = rating === 0 ? 5 : rating;
    return (
        <div className={cn('mt-[10px] items-center gap-1', { ['flex']: !reviews || reviews < 100 })}>
            <Rate className='text-[12px] text-[#FFB800]' allowHalf disabled={true} value={checkRating} />
            {reviews !== 0 && <span className='text-gray-500 text-[12px]'>{`(${reviews})`}</span>}
        </div>
    );
};

export default RatingDisplay;
