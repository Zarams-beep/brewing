import Checkout from "@/component/CheckoutPage/Checkout";
import CheckoutHeader from "@/component/CheckoutPage/CheckoutHeader";
import Footer from "@/component/Footer/Footer";
import "@/styles/Checkout.css";
export const metadata = {
  title: "Brewing Checkout",
  description: "This is Checkout Page",
};

export default function CheckoutPage (){
  return (
    <div className="">
      <CheckoutHeader/>
      <Checkout/>
      <Footer/>
    </div>
  )
}