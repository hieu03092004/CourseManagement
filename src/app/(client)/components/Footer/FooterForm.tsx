export default function FooterForm() {
    return (
        <>
            <div className="subscribe-area">
                <div
                    className="subscribe-box h-[390px] w-full rounded-[24px] flex justify-center items-center "

                >
                    <div className="subscribe-content text-white z-[2] text-center max-w-[600px]">
                        <h2 className="text-[32px] font-bold mb-4">Gửi yêu cầu tư vấn miễn phí</h2>
                        <p className="text-[16px] text-white/90 mb-8">Vui lòng để lại số điện thoại, chúng tôi sẽ liên hệ tư vấn bạn trong thời gian sớm nhất.</p>
                        <div className="subscribe-bottom">
                            <div className="subscribe-form-box">
                                <form className="flex gap-3 bg-white p-2 rounded-full">
                                    <input
                                        type="text"
                                        placeholder="Số điện thoại..."
                                        className="flex-1 border-none px-6 py-3 text-[16px] outline-none bg-transparent text-gray-800 placeholder:text-gray-400"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-[#0369a8] to-[#03a2e2] text-white px-8 py-3 rounded-full font-semibold text-[16px] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#03a2e2]/40 transition-all duration-200 whitespace-nowrap"
                                    >
                                        Đăng ký →
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}