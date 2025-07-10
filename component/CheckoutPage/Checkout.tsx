"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removeFromCart, clearCart } from "@/store/slices/CartSlices";

const Checkout = () => {
  const { status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleCheckout = () => {
    setShowModal(true);
    dispatch(clearCart()); // optional: clear cart after checkout
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/");
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="checkout-container">
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="checkout-cart">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="cart-sub"
              >
                <div className="cart-img">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={96}
                    className=""
                  />
                </div>
                <div className="cart-content">
                  <div className="cart-sub-content">
                  <h3 className="">{item.name}</h3>
                  <p>Qty: {item.quantity}</p>
                  <p>₦{(item.price * item.quantity).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className=""
                >
                  Remove
                </button>
                </div>
              </div>
            ))}

            <div className="total-checkout">
              Total: ₦
              {cartItems
                .reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )
                .toLocaleString()}
            </div>

            <div className="check-out-container-btn">
              <button
              onClick={handleCheckout}
              className="check-out-btn"
            >
              Checkout
            </button>
            </div>
          </div>
        </>
      )}

      {/* Modal */}
      {showModal && (
        <div className="checkout-modal">
          <div className="bg-white rounded-lg p-8 shadow-xl text-center">
            <h2 className="text-2xl font-bold mb-4">🎉 Thank You!</h2>
            <p className="mb-6">Your order has been placed successfully.</p>
            <button
              onClick={handleCloseModal}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
