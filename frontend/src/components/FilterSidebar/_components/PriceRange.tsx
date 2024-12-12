import { MAX_PRICE, MIN_PRICE } from '@/constants/products';
import useFilter from '@/hooks/_common/useFilter';
import { Currency } from '@/utils/FormatCurreny';
import { Form, Slider } from 'antd';
import _, { isEmpty } from 'lodash';
import { useCallback, useEffect } from 'react';

const PriceRange = () => {
    const { query, updateQueryParam } = useFilter();
    const [form] = Form.useForm();

    // // check query price is empty or not
    // const minPrice = !isEmpty(query?.['price[gte]'])
    //     ? query?.['price[gte]']
    //     : 0;
    // const maxPrice = !isEmpty(query?.['price[lte]'])
    //     ? query?.['price[lte]']
    //     : 0;

    const onChangePrice = (value: number[]) => {
        const [min, max] = value;
        updateQueryParam({
            ...query,
            ['price[gte]']: min,
            ['price[lte]']: max,
            page: 1,
        });
    };
    const debounceFn = useCallback(_.debounce(onChangePrice, 700), [query]);

    const resetForm = () => {
        form.resetFields();
    };

    useEffect(() => {
        if (!query['price[gte]'] && !query['price[lte]']) {
            resetForm();
        }
    }, [query]);
    return (
        <div className="w-full px-2 pl-2 min-h-32 bg-white">
            <div className="flex justify-between mt-4">
                <span className="text-sm font-medium cursor-default">
                    {Currency(query['price[gte]'] || MIN_PRICE)}
                </span>
                <span className="text-sm font-medium cursor-default">
                    {Currency(query['price[lte]'] || MAX_PRICE)}
                </span>
            </div>
            <Form form={form}>
                <Form.Item
                    name="slider"
                    initialValue={[
                        query['price[gte]'] || MIN_PRICE,
                        query['price[lte]'] || MAX_PRICE,
                    ]}
                >
                    <Slider
                        className="pb-6 mb-4 slider-custom"
                        range
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        onChange={debounceFn}
                        tooltip={{
                            formatter(value) {
                                return Currency(Number(value));
                            },
                        }}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};

export default PriceRange;
