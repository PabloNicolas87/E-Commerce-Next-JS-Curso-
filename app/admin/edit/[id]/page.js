import CreateForm from '@/app/components/admin/CreateForm'
import { getProductById } from '@/app/utils/firebaseHelpers';
import React from 'react'

const CreateProductPage = async ({params}) => {
    const {id} = params;

    const product = await getProductById(id);

  return (
    <div><CreateForm product={product} /></div>
  )
}

export default CreateProductPage