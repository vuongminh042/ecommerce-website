import { Skeleton } from 'antd';

const SmallSkeleton = () => {
    return (
        <>
            <div className='flex h-[405px] w-[355px] flex-col justify-center p-5'>
                <Skeleton.Image active={true} className='h-[200px] w-full' />
                <Skeleton active={true} className='mt-[15px] w-[250px]' paragraph={{ rows: 2 }} />
            </div>
        </>
    );
};

export default SmallSkeleton;
