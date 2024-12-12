import { DeleteOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd';

const CustomItemRenderVariant: UploadProps['itemRender'] = (originNode, file, fileList, actions) => {
    return (
        <div className='ant-upload-list-item ant-upload-list-item-undefined h-14 w-14'>
            <img className='' src={file.thumbUrl || file.url} alt={file.name} />
            <span className='ant-upload-list-item-actions'>
                <span
                    onClick={actions.remove}
                    className='ant-btn css-dev-only-do-not-override-mzwlov ant-btn-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-action text-white'
                >
                    <DeleteOutlined />
                </span>
            </span>
        </div>
    );
};

export default CustomItemRenderVariant;
