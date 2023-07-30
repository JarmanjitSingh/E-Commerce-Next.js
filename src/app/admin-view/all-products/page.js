import CommonListing from '@/components/CommonListing'
import { getAllAdminProducts } from '@/services/product'
import React from 'react'

const AdminAllProducts = async() => {

  const allAdminProducts = await getAllAdminProducts()

  console.log(allAdminProducts)
  return (
    <CommonListing data={allAdminProducts && allAdminProducts.data } />
  )
}

export default AdminAllProducts
