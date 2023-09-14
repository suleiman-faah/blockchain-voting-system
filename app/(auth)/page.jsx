'use client';

import { useRouter } from 'next/navigation';
import { Form, FormLayout, SubmitButton } from '@saas-ui/react';
import { Lock, User } from '@phosphor-icons/react';

export default function Home() {
  const router = useRouter();

  function handleMetaMaskLogin() {
    console.log('handleMetaMaskLogin');
  }
  function onSubmit() {
    console.log('Login Submit');
  }

  return (
    <>
      <Form defaultValues={{}} onSubmit={onSubmit} className="">
        <FormLayout className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">How would you like to log in?</h2>
          <SubmitButton
            className="bg-primary"
            type="button"
            size={'lg'}
            onClick={handleMetaMaskLogin}
          >
            <User weight="fill" className="text-white mr-2" size={20} />
            <span>As a voter (with MetaMask)</span>
          </SubmitButton>

          <SubmitButton
            className="bg-transparent text-primary border border-primary hover:bg-transparent"
            type="button"
            onClick={() => router.push('/admin-login')}
          >
            <Lock weight="fill" className="text-primary mr-2" size={20} />
            <span>As an admin</span>
          </SubmitButton>
        </FormLayout>
      </Form>
    </>
  );
}
