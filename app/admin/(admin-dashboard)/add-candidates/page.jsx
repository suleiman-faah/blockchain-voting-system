'use client';

import { Field, Form, FormLayout, SubmitButton } from '@saas-ui/react';

const AddCandidatePage = () => {
  function onSubmit(params) {
    console.log('onSubmit:', params);
  }

  return (
    <>
      <title>Add Candidates | Admin</title>
      <Form
        className="mx-auto mt-12 max-w-[800px]"
        defaultValues={{
          name: '',
          age: 40,
          party: '',
          qualification: '',
        }}
        onSubmit={onSubmit}
      >
        <FormLayout>
          <Field
            name="name"
            label="Name"
            type="text"
            isRequired
            rules={{ required: true }}
            placeholder="Enter candidate name"
          />

          <Field
            name="age"
            label="Age"
            type="number"
            placeholder="Enter candidate age"
            isRequired
            rules={{ required: true }}
          />

          <Field
            name="party"
            label="Party"
            type="text"
            placeholder="Enter candidate party"
            isRequired
            rules={{ required: true }}
          />

          <Field
            name="qualification"
            label="Qualification"
            type="text"
            placeholder="Enter candidate qualification"
            isRequired
            rules={{ required: true }}
          />

          <SubmitButton size="lg" className="mt-4 w-full bg-primary">
            Add Candidate
          </SubmitButton>
        </FormLayout>
      </Form>
    </>
  );
};

export default AddCandidatePage;
