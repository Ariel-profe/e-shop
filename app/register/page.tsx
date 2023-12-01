import { Container } from "../components/ui/Container";
import { RegisterForm } from "../components/auth/RegisterForm";
import { FormWrap } from "../components/ui/FormWrap";
import { getUser } from "@/actions/getUser";

const RegisterPage = async() => {

  const user = await getUser();

  return (
    <Container>
        <FormWrap>
            <RegisterForm user={user} />
        </FormWrap>
    </Container>
  )
}

export default RegisterPage