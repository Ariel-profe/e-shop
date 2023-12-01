import { products } from "@/db/products";
import { Container } from "./components/ui/Container";
import { HomeBanner } from "./components/ui/HomeBanner";
import { ProductCard } from "./components/products/ProductCard";

export default function Home() {
  return (
   <div className="p-3">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {
            products.map( product => (
              <ProductCard key={product.id} product={product} />
            ))
          }
        </div>
      </Container>
   </div>
  )
}
