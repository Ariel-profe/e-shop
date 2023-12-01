import { Container } from "../components/ui/Container"
import { CartClient } from "../components/cart/CartClient"

const CartPage = () => {
  return (
    <div className="pt-8">
      <Container>
        <CartClient />
      </Container>
        
    </div>
  )
}

export default CartPage