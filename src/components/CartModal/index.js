"use-client";

import React, { Fragment, useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartItems } from "@/services/cart";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../Loader/componentlevel";
import { useRouter } from "next/navigation";

const CartModal = () => {
  const {
    showCartModal,
    setShowCartModal,
    user,
    cartItems,
    setCartItems,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  const router = useRouter();

  async function extractAllCartItems() {
    const res = await getAllCartItems(user?._id);

    console.log(user._id);

    console.log(res);

    if (res.success) {
      const updatedData =
      res.data && res.data.length
        ? res.data.map((item) => ({
            ...item,
            productId: {
              ...item.productId,
              price:
                item.productId.onSale === "yes"
                  ? parseInt(
                      (
                        item.productId.price -
                        item.productId.price * (item.productId.priceDrop / 100)
                      ).toFixed(2)
                    )
                  : item.productId.price,
            },
          }))
        : [];
      setCartItems(updatedData);
      localStorage.setItem("cartItems", JSON.stringify(updatedData)); //because we need this data on checkout page
    }
  }

  async function handleDeleteCartItem(getCartItemID) {
    setComponentLevelLoader({ loading: true, id: getCartItemID });
    const res = await deleteFromCart(getCartItemID);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      extractAllCartItems();
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: getCartItemID });
    }
  }

  useEffect(() => {
    if (user !== null) extractAllCartItems();
  }, [user]);

  return (
    <CommonModal
      showButtons={true}
      show={showCartModal}
      setShow={setShowCartModal}
      mainContent={
        cartItems && cartItems.length ? (
          <ul role="list" className="my-6 divide-y divide-gray-300">
            {cartItems.map((product) => (
              <li key={product.id} className="py-6 flex">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={
                      product && product.productId && product.productId.imageUrl
                    }
                    alt="cart item"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a>
                          {product &&
                            product.productId &&
                            product.productId.name}
                        </a>
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      ${product && product.productId && product.productId.price}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <button
                      type="button"
                      className="font-medium text-yellow-600 sm:order-2"
                      onClick={() => handleDeleteCartItem(product._id)}
                    >
                      {componentLevelLoader &&
                      componentLevelLoader.loading &&
                      componentLevelLoader.id === product._id ? (
                        <ComponentLevelLoader
                          text={"Removing"}
                          color={"#000000"}
                          loading={
                            componentLevelLoader && componentLevelLoader.loading
                          }
                        />
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : null
      }
      buttonComponent={
        <Fragment>
          <button
            type="button"
            className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
            onClick={() => {
              router.push("/cart");
              setShowCartModal(false);
            }}
          >
            Go To Cart
          </button>
          <button
            type="button"
            onClick={()=> {
              router.push('/checkout')
              setShowCartModal(false)
            }}
            disabled={cartItems && cartItems.length === 0}
            className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide disabled:opacity-50"
          >
            Checkout
          </button>

          <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
            <button type="button" className="font-medium text-grey">
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </div>
        </Fragment>
      }
    />
  );
};

export default CartModal;
