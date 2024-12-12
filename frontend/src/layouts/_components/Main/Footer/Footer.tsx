import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="py-5 border-t-[1px] border-[#C0C0C0] mt-18">
            <div className="max-w-screen-default mx-4 default:mx-auto">
                <div className="flex  justify-between">
                    <div className="default:w-1/5 w-1/4">
                        <h3 className="uppercase font-bold text-sm text-global">
                            Công ty cổ phần ADSTORE
                        </h3>
                        <ul className="text-global mt-4">
                            <li>
                                <p className="text-sm">FPT @Polytechnic</p>
                            </li>
                            <li>
                                <p className="text-sm">
                                    Địa chỉ trụ sở tại tòa nhà FPT Polytechnic,
                                    Cổng số 2, 13 P. Trịnh Văn Bô, Xuân Phương,
                                    Nam Từ Liêm, Hà Nội
                                </p>
                            </li>
                            <li>
                                <p className="text-sm">
                                    Địa chỉ liên hệ tại Tòa nhà FPT Polytechnic,
                                    P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm,
                                    Hà Nội
                                </p>
                            </li>
                            <li>
                                <p className="text-sm">
                                    Điện thoại: +84 123 456 789
                                </p>
                            </li>
                            <li>
                                <p className="text-sm">Fax: +84 123 456 789</p>
                            </li>
                            <li>
                                <p className="text-sm">
                                    Email: adstore@gmail.com
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="uppercase font-bold text-sm text-global">
                            Hỗ trợ
                        </h3>
                        <ul className="text-global mt-4 flex flex-col gap-4 font-medium">
                            <li>
                                <Link to={'/'} className="hover:text-red-500">
                                    <p className="text-sm">Liên lạc</p>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'} className="hover:text-red-500">
                                    <p className="text-sm">
                                        Chính sách và bảo mật
                                    </p>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'} className="hover:text-red-500">
                                    <p className="text-sm">
                                        Chăm sóc khách hàng
                                    </p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 py-5 border-t-[1px] border-[#C0C0C0] flex justify-between">
                    <h3 className="uppercase font-semibold text-sm text-global">
                        @ {new Date().getFullYear()} AdStore
                    </h3>
                    <h3 className="uppercase font-semibold text-sm text-global">
                        Dự án tốt nghiệp
                    </h3>
                </div>
            </div>
        </footer>
    );
}
