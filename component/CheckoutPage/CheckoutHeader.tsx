"use client";
import { GiPadlock } from "react-icons/gi";
import { useRouter } from "next/navigation";
export default function CheckoutHeader(){
    const router = useRouter();
    return(
        <header className="checkout-header">
            <div className="checkout-sub-header">
                <h2 onClick={()=>{router.push("/")}}>Checkout</h2>
            <GiPadlock className="checkout-padlock"/>
            </div>
        </header>
    )
}