import { DownOutlined } from '@ant-design/icons';
import { ConfigProvider, Menu } from 'antd';
import { FilterItem } from './_components/MenuItem';

const FilterSidebar = () => {
    const items = FilterItem();
    return (
        <div className={`shadow-2 z-999 bg-white`}>
            <ConfigProvider
                theme={{
                    components: {
                        Menu: {
                            itemActiveBg: '#fffff',
                            itemSelectedColor: '#000',
                            horizontalItemSelectedColor: '#000',
                            itemHoverBg: 'transparent',
                            colorBgContainer: 'transparent',
                            itemSelectedBg: 'transparent',
                            horizontalItemHoverBg: 'transparent',
                            subMenuItemBg: 'transparent',
                        },
                        Slider: {
                            trackBg: '#333',
                            handleColor: '#000',
                            handleActiveColor: '#333',
                            dotActiveBorderColor: '#000',
                        },
                    },
                    token: {
                        colorPrimaryBorderHover: '#000',
                    },
                }}
            >
                <Menu
                    className={`text-base custom-menu w-full p-3 font-medium bg-white text-black`}
                    mode="inline"
                    defaultOpenKeys={['cost', 'sizes', 'colors']}
                    items={items}
                    expandIcon={<DownOutlined />}
                />
            </ConfigProvider>
        </div>
    );
};

export default FilterSidebar;
