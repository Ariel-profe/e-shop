import { Container } from "../components/ui/Container"
import { CartClient } from "../components/cart/CartClient"
import { getUser } from "@/actions/getUser"

const CartPage = async() => {

  const user = await getUser();

  return (
    <div className="pt-8">
      <Container>
        <CartClient user={user} />
      </Container>
        
    </div>
  )
}

export default CartPage