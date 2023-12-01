import { CheckoutClient } from "../components/checkout/CheckoutClient"
import { Container } from "../components/ui/Container"
import { FormWrap } from "../components/ui/FormWrap"

const CheckoutPage = () => {
  return (
    <div className="p-8">
        <Container>
            <FormWrap>
                <CheckoutClient />
            </FormWrap>
        </Container>
    </div>
  )
}

export default CheckoutPage