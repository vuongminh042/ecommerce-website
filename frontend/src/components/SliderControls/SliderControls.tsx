import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import clsx from 'clsx';

const SliderControls = ({
    handleNext,
    handlePrev,
    isButtonHandle,
}: {
    handleNext: () => void;
    handlePrev: () => void;
    isButtonHandle?: boolean;
}) => {
    return (
        <div
            className={clsx({
                ['hidden']: isButtonHandle,
            })}
        >
            <LeftOutlined
                onClick={handlePrev}
                className="absolute left-3 top-[50%] z-50 translate-y-[-50%] rounded-full border-transparent bg-white p-3 text-[10px] font-extrabold text-global transition-all duration-700 ease-in-out hover:bg-hover hover:text-white block opacity-100"
            />
            <RightOutlined
                onClick={handleNext}
                className="absolute right-3 top-[50%] z-[9999999999999999999] translate-y-[-50%] rounded-full border-transparent  bg-white p-3 text-[10px] font-extrabold text-global transition-all duration-700 ease-in-out hover:bg-hover hover:text-white block opacity-100"
            />
        </div>
    );
};

export default SliderControls;
