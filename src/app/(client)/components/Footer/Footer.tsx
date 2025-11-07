import { MdLocationOn, MdEmail } from 'react-icons/md';
import FooterForm from './FooterForm';

export default function Footer() {
    return (
        <footer>
            <div className="footer__form">
                <div className="container w-full">
                    <FooterForm/>
                </div>
            </div>
            <div className="pt-[80px] pb-[50px] footer-mid">
                <div className="container max-w-[1320px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="grid-item">
                            <div className="entire-info-website">
                                <div className="title-footer font-bold text-[18px] mb-4">28Tech - Become A Better Developer</div>
                                <address className="not-italic text-gray-600">
                                    <p className="flex items-center gap-2 mb-2">
                                        <MdLocationOn className="text-[20px]" /> 
                                        <span>TP. Hồ Chí Minh</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <MdEmail className="text-[20px]" /> 
                                        <span>khoahoc@gmail.com</span>
                                    </p>
                                </address>
                            </div>
                        </div>
                        <div className="grid-item">
                            <div className="footer-menu-section">
                                <div className="title-footer font-bold text-[18px] mb-4">
                                    Về chúng tôi
                                </div>
                                <ul className="list-none space-y-2">
                                    <li>
                                        <a href="#" className="text-gray-600 hover:text-primary transition-colors">Về chúng tôi</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-600 hover:text-primary transition-colors">Điều khoản dịch vụ</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-600 hover:text-primary transition-colors">Chính sách bảo mật</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-600 hover:text-primary transition-colors">Hướng dẫn thanh toán</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-item">
                            <div className="footer-menu-section">
                                <div className="title-footer font-bold text-[18px] mb-4">
                                    Thông tin 28Tech
                                </div>
                                <ul className="list-none space-y-2">
                                    <li>
                                        <a href="#" className="text-gray-600 hover:text-primary transition-colors">Đăng ký giảng viên</a>
                                    </li>
                                    <li>
                                        <a href="/khoa-hoc" className="text-gray-600 hover:text-primary transition-colors">Danh sách khóa học</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-600 hover:text-primary transition-colors">Câu hỏi thường gặp</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-600 hover:text-primary transition-colors">Góc chia sẻ</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid_item">
                            <div className="social-footer-section">
                                <div className="title-footer font-bold text-[18px] mb-4">Fanpage Facebook</div>
                                <iframe
                                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F28TechAndEdu&amp;tabs=timeline&amp;width=270&amp;height=130&amp;small_header=false&amp;adapt_container_width=true&amp;hide_cover=false&amp;show_facepile=true&amp;appId=269675293903570"
                                    width="270"
                                    height="130"
                                    style={{border: 'none', overflow: 'hidden'}}
                                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}