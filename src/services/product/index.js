import Cookies from "js-cookie";

export const addNewProduct = async (formData) => {
  try {
    const response = await fetch("/api/admin/add-product", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getAllAdminProducts = async () => {
  try {
    const res = await fetch(`https://e-commerce-next-js-bice.vercel.app/api/admin/all-products`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (formData) => {
  try {
    const res = await fetch("/api/admin/update-product", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`/api/admin/delete-product?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const productByCategory = async (id) => {
  try {
    const res = await fetch(
      `https://e-commerce-next-js-bice.vercel.app/api/admin/product-by-category?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const productById = async (id) => {
  try {
    const res = await fetch(
      `https://e-commerce-next-js-bice.vercel.app/api/admin/product-by-id?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
