import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import App from '@/App';
import './styles/_global.css';
import ReduxProvider from './context/ReduxProvider';
import QueryProvider from './context/QueryProvider';
import { ToastContainer } from 'react-toastify';
import vi from 'antd/locale/vi_VN';
import AutoScrollToTop from './components/_common/AutoScrollToTop';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
    <BrowserRouter>
        <ReduxProvider>
            <QueryProvider>
                <ConfigProvider locale={vi}>
                    <AutoScrollToTop>
                        <App />
                    </AutoScrollToTop>
                </ConfigProvider>
                <ToastContainer
                    position="bottom-center"
                    autoClose={1500}
                    hideProgressBar
                    draggable
                    bodyClassName={'text-white font-medium'}
                    toastClassName={'bg-global w-auto'}
                    className={'w-auto max-w-[390px]'}
                />
            </QueryProvider>
        </ReduxProvider>
    </BrowserRouter>,
    // </React.StrictMode>,
);
