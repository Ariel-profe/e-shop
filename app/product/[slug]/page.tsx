import { ListRating } from "@/app/components/products/ListRating"
import { ProductDetails } from "@/app/components/products/ProductDetails"
import { Container } from "@/app/components/ui/Container"
import { products } from "@/db/products"

const ProductPageBySlug = ({params} : {params: {slug:string}}) => {

    const product = products.find( product => product.slug === params.slug)

  return (
    <div className="p-8">
      <Container>
        {
          product ? (
            <>
            <ProductDetails product={product} />
            <div className="flex flex-col mt-20 gap-4">
              <div>Add rating</div>
              <ListRating product={product} />
            </div>
            </>
          ) : (
            <div className="h-[300px] flex justify-center items-center w-full">
              <p className="text-3xl lg:text-5xl">This product doesn`t exist</p>
            </div>
          )
        }
      </Container>
    </div>
  )
}

export default ProductPageBySlug