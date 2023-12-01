import React from 'react'
import { Container } from '../components/ui/Container'
import { FormWrap } from '../components/ui/FormWrap'
import { LoginForm } from '../components/auth/LoginForm'
import { getUser } from '@/actions/getUser'

const LoginPage = async() => {

  const user = await getUser();

  return (
    <Container>
        <FormWrap>
            <LoginForm user={user} />
        </FormWrap>
    </Container>
  )
}

export default LoginPage