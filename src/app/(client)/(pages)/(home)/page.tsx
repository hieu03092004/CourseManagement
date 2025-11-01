import Link from 'next/link';
import Title from "../../components/Title/title";
import CardList from '../../components/Card/CardList';
export default function HomePage() {
  return (
    <>
      <div className="hero">
        <div className="hero-area pt-[115px] pb-[20px]" style={{backgroundImage:"url('/src/assets/images/hero-bg.jpg')"}}>
          <div className="container max-w-[960px] mx-auto px-[15px]">
            <div className="hero-content flex flex-col items-center justify-center gap-[35px] mb-[65px]">
              <h1 className="hero-title mb-[20px] text-white text-[50px] font-semibold">28Tech - Become A Better Developer</h1>
              <div className="hero-img-box hero-img-box-1">
                <img
                  src="https://cdn-main.28tech.com.vn/media/anh-khoa-hoc/web3.png"
                  alt="28Tech"
                />
              </div>
              <p className="hero-text text-white font-[400] text-[18px]">
                28Tech là đơn vị cung cấp những khóa học chất lượng cao về lập trình với mục tiêu
                lớn nhất là giúp các bạn sinh viên IT phát triển kiến thức, sự nghiệp !
              </p>
              <div className="button-collections flex gap-[20px] justify-center items-center">
                <Link href="/course" className="btn btn-secondary">
                  Các Khóa Học
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='py-[80px] bg-[#f6fcff]'>
       <Title text="Khóa Học Tại 28Tech"/>
       <CardList/>
      </div>
    </>
  );
}
