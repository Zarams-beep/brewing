import FourthHomePage from "@/component/homepage/FourthHomePage";
import "../styles/Homepage.css";
import HeroSection from '@/component/homepage/HeroPage'
import SecondHomepage from '@/component/homepage/SecondHomepage'
import ThirdHomePage from "@/component/homepage/ThirdHomePage";
import Image from "next/image";
import FifthHomePage from "@/component/homepage/FifthHomePage";
import SixthHomePage from "@/component/homepage/SixthHomePage";
import Footer from "@/component/Footer/Footer";
const page = () => {
   
  return (
    <div>
      <HeroSection/>
      <div className="parellex-scrolling">
        <div className="homepage-sub">
                <SecondHomepage/>
          <Image src="/left_blast.svg" alt="left-blast" width={100} height={100} quality={100} className="left-blast"/>      
      <ThirdHomePage/>
       <Image src="/right_blast.svg" alt="right-blast" width={100} height={100} quality={100} className="right-blast"/>      
      <FourthHomePage/>
        </div>
        <FifthHomePage/>
        {/* <SixthHomePage/> */}
        <Footer/>
      </div>
    </div>
  )
}

export default page
