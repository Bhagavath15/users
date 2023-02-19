import Button from '@mui/material/Button';
import { useFormik } from "formik";
import * as yup from "yup";

const formValidationSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required()
});
export function BasicForm() {

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: formValidationSchema,
        onSubmit: (values) => console.log("form value", values)
    });
    return (
        <div>
            <h1>Basic form</h1>
            <form onSubmit={handleSubmit}>
                <input name="email" onChange={handleChange}
                    onBlur={handleBlur} value={values.email}
                    type="email" placeholder="email" />
                {touched.email && errors.email ? errors.email : null}<br />
                <input name="password" onChange={handleChange}
                    onBlur={handleBlur} value={values.password}
                    type="password" placeholder="password" />
                {touched.password && errors.password ? errors.password : null}
                <br />
                <Button type="submit">Submit</Button>
                {/* Values
                  <pre>{JSON.stringify(form.values)}</pre>
                  Error
                  <pre>{JSON.stringify(form.errors)}</pre>
                  Touched
                  <pre>{JSON.stringify(form.touched)}</pre> */}
            </form>

        </div>
    );
}
