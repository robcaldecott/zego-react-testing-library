import { useState } from "react";
import { ComponentMeta, ComponentStory, Story } from "@storybook/react";
import { Formik, FormikErrors } from "formik";
import { Button } from "../Button";
import { TextField } from ".";

export default {
  title: "Components/TextField",
  component: TextField,
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => {
  const [value, setValue] = useState(args.value || "");
  return (
    <TextField
      {...args}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Label",
  placeholder: "Placeholder",
  disabled: false,
  isRequired: false,
};

export const Error = Template.bind({});
Error.args = {
  type: "email",
  label: "Email address",
  placeholder: "you@company.com",
  value: "george@krugerindustrial.",
  isRequired: false,
  error: "Please enter a valid email address",
};

interface Values {
  name: string;
  email: string;
}

export const Form: Story = () => {
  return (
    <Formik
      initialValues={{ name: "", email: "" } as Values}
      validate={(values) => {
        const errors: FormikErrors<Values> = {};
        if (!values.name) {
          errors.name = "Please enter a name";
        }
        if (!values.email) {
          errors.email = "Please enter an email address";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Please enter a valid email address";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 2000);
      }}
    >
      {({
        handleSubmit,
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        resetForm,
        isSubmitting,
        isValid,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="bg-white max-w-2xl mx-auto m-2 p-4 space-y-4 border border-slate-300 shadow-xl rounded-lg"
        >
          <TextField
            name="name"
            label="Name"
            placeholder="Jane Doe"
            isRequired
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            error={touched.name && errors.name}
            disabled={isValid && isSubmitting}
          />
          <TextField
            name="email"
            label="Email address"
            placeholder="you@company.com"
            isRequired
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
            disabled={isValid && isSubmitting}
          />

          <div className="flex justify-end space-x-2">
            <Button
              variant="secondary"
              type="button"
              onClick={() => resetForm()}
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
