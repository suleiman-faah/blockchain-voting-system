'use client';

import { Form, FormLayout, Field, SubmitButton } from '@saas-ui/react';
import Link from '~/components/Link';
import { useRouter } from 'next/navigation';

function LoginPage() {
  const router = useRouter();

  function onSubmit(params) {
    console.log('onSubmit:', params);
    router.push('/admin');
  }

  return (
    <div className="w-[400px]">
      <h2 className="mb-8 text-center text-2xl font-semibold">Admin Login</h2>

      <Form
        defaultValues={{
          email: '',
          password: '',
        }}
        onSubmit={onSubmit}
      >
        <FormLayout>
          <Field
            name="email"
            label="Email"
            type="email"
            isRequired
            rules={{ required: true }}
            placeholder="Enter your email"
          />

          <Field
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            isRequired
            rules={{ required: true }}
          />

          <SubmitButton className="mt-4 w-full bg-primary">Log in</SubmitButton>
        </FormLayout>
      </Form>

      <div className="mt-8 text-center">
        <Link href="/" className="border-b border-b-primary text-primary">
          Go back home
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
