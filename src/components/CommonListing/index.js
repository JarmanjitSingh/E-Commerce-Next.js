"use client";

import ProductButton from "./ProductButtons";
import ProductTile from "./ProductTile";

const dummyData = [
  {
    _id: "64c6a0bba37b3b9c4ab66e1f",
    name: "Mens T-shirt",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur maxime voluptatum hic voluptates. Beatae, tempora.",
    price: 97,
    category: "men",
    sizes: [
      {
        id: "s",
        label: "S",
      },
    ],
    deliveryInfo: "Free Delivery",
    onSale: "yes",
    priceDrop: 15,
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/e-commerce-nextjs-2023.appspot.com/o/ecommerce%2Flogo3.png-1690738850074-0.9t9vwyp3hj6?alt=media&token=ec4867e8-adbf-4149-ba8c-4717388ee4d3",
  },
];

export default function CommonListing() {
  return (
    <section className="bg-white py-12 sm:py-16 ">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16 ">
          {dummyData && dummyData.length
            ? dummyData.map((item) => <article className="relative flex flex-col overflow-hidden border cursor-pointer" key={item._id}>

                <ProductTile item={item} />
                <ProductButton />
            </article>)
            : null}
        </div>
      </div>
    </section>
  );
}
