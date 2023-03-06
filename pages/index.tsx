import type { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import * as Yup from 'yup'
import { IconDatabase } from '@tabler/icons'
import { ShieldCheckIcon } from '@heroicons/react/solid'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
import { Anchor,TextInput,Button,Group,PasswordInput,Alert } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { Layout } from '../components/Layout'
import { AuthForm } from '../types';

const schema = Yup.object().shape({
  email: Yup.string()
  .email('メールアドレスが不正です')
  .required('メールアドレスを入力してください'),
  password: Yup.string().required('パスワードを入力してください').min(5,'パスワードは6文字以上を入力してください'),
})

const Home:NextPage = () => {
  const router = useRouter()
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const form = useForm<AuthForm>({
    validate: yupResolver(schema),
    initialValues :{
      email:'',
      password:''
    }
  })
  const handlerSubmit = async () => {
    try {
      if(isRegister){
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,{
          email:form.values.email,
          password: form.values.password
        })
      }
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,{
          email:form.values.email,
          password: form.values.password
      })
      form.reset()
      router.push('/dashboard')
    }catch(e: any){
      setError(e.response.data.message);
    }
  }
  return (
  <Layout title="Auth">
    <ShieldCheckIcon className='h-16 w-16 text-blue-500' />
    {error &&(
      <Alert
        my="md"
        variant='filled'
        icon={<ExclamationCircleIcon />}
        title="認証エラー"
        color="red"
        radius="md"
      >
        {error}
      </Alert>
    )}
    <form onSubmit={form.onSubmit(handlerSubmit)}>
      <TextInput
        mt="md"
        id="email"
        label="email"
        placeholder="example@example.com"
        {...form.getInputProps('email')}
        />
      <PasswordInput
        mt="md"
        id="password"
        label="password"
        placeholder="password"
        description="パスワードは6文字以上で入力してください"
        {...form.getInputProps('password')}
        />
        <Group mt="xl" position="apart">
          <Anchor
            component="button"
            type="button"
            size="xs"
            className="text-gray-300"
            onClick={() => {
              setIsRegister(!isRegister)
              setError('')
            }}>
              {isRegister ? 'アカウントを持っていますか？ログインする' : 'アカウントがありませんか？登録する'}
            </Anchor>
            <Button
              leftIcon={<IconDatabase size={14} />}
              color="cyan"
              type="submit"
            >
            {isRegister ? '新規登録' : 'ログイン'}
            </Button>
        </Group>
    </form>
  </Layout>)
}

export default Home

