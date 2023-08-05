"use-client";

import React, { Fragment, useContext } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";

const CartModal = () => {
  const { showCartModal, setShowCartModal } = useContext(GlobalContext);
  return (
    <CommonModal
      showButtons={true}
      show={showCartModal}
      setShow={setShowCartModal}
      buttonComponent={
        <Fragment>
          <button>Go To Cart</button>
          <button>Checkout</button>
        </Fragment>
      }
    />
  );
};

export default CartModal;
