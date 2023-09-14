'use client';

import { useState } from 'react';
import { RadioGroup, Stack, Radio } from '@chakra-ui/react';
import { Form, FormLayout, SubmitButton } from '@saas-ui/react';

const ChangeStatePage = () => {
  const [value, setValue] = useState('Voting');

  function onChangeState() {
    console.log('onChangeState:', value);
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-8">Current State: {value}</h2>
      <Form className="" onSubmit={onChangeState}>
        <FormLayout>
          <RadioGroup defaultValue="2" value={value} onChange={setValue}>
            <Stack spacing={5} direction="column">
              <Radio colorScheme="purple" value="Voting" size="lg">
                Voting
              </Radio>
              <Radio colorScheme="purple" value="Registration" size="lg">
                Registration
              </Radio>
              <Radio colorScheme="purple" value="Result" size="lg">
                Result
              </Radio>
            </Stack>
          </RadioGroup>

          <SubmitButton size="lg" className="mt-4 bg-primary">
            Save State
          </SubmitButton>
        </FormLayout>
      </Form>
    </>
  );
};

export default ChangeStatePage;
