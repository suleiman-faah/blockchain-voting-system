'use client';

import { Form, FormLayout, Field, SubmitButton } from '@saas-ui/react';
import Link from '~/components/Link';

function LoginPage() {
  function onSubmit(params) {
    console.log('onSubmit:', params);
  }

  return (
    <div className="w-[400px]">
      <h2 className="text-2xl font-semibold mb-8 text-center">Admin Login</h2>
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

          <SubmitButton className="bg-primary mt-4 w-full">Log in</SubmitButton>
        </FormLayout>
      </Form>

      <div className="text-center mt-8">
        <Link href="/" className="text-primary border-b border-b-primary">
          Go back home
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
