// import { useState } from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';

// export function AddUser() {
//     const [id, setId] = useState("");
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [phoneNo, setPhoneNo] = useState("");
//     const [address, setAddress] = useState("");

//     const addData = () => {
//         const newdata = {
//             id: id,
//             name: name,
//             email: email,
//             phoneNo: phoneNo,
//             address: address
//         };

//         fetch("https://63f17e9bff1b45a1a44cefb6.mockapi.io/user",
//             {
//                 method: "POST",
//                 body: JSON.stringify(newdata),
//                 headers: {
//                     "content-type": "application/json"
//                 }
//             });

//     };
//     return (
//         <div className="addUser">
//             <TextField onChange={(event) => setId(event.target.value)} id="outlined-basic" label="id" variant="outlined" /><br />
//             <TextField onChange={(event) => setName(event.target.value)} id="outlined-basic" label="Name" variant="outlined" /><br />
//             <TextField onChange={(event) => setEmail(event.target.value)} id="outlined-basic" label="Email" variant="outlined" /><br />
//             <TextField onChange={(event) => setPhoneNo(event.target.value)} id="outlined-basic" label="Phone Number" variant="outlined" /><br />
//             <TextField onChange={(event) => setAddress(event.target.value)} id="outlined-basic" label="Address" variant="outlined" /><br />
//             <Button color="inherit" onClick={addData}>ADD USER</Button>
//         </div>
//     );

// }





import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from "formik";
import * as yup from "yup";

const formValidationSchema = yup.object({
    id: yup.number().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    phoneNo: yup.number().required(),
    address: yup.string().required()
});

export function AddUser() {
    const navigate = useNavigate()
    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({
        initialValues: {
            id: "",
            name: "",
            email: "",
            phoneNo: "",
            address: ""
        },
        validationSchema: formValidationSchema,
        onSubmit: (newdata) => {
            console.log("form value", newdata)
            addData(newdata)
            navigate("/user")
        }
    });
    // const [id, setId] = useState("");
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [phoneNo, setPhoneNo] = useState("");
    // const [address, setAddress] = useState("");

    const addData = (newdata) => {
        // const newdata = {
        //     id: id,
        //     name: name,
        //     email: email,
        //     phoneNo: phoneNo,
        //     address: address
        // };

        fetch("https://63f17e9bff1b45a1a44cefb6.mockapi.io/user",
            {
                method: "POST",
                body: JSON.stringify(newdata),
                headers: {
                    "content-type": "application/json"
                }
            });

    };
    return (
        <div className="addUser">
            <form onSubmit={handleSubmit}>
                <TextField name="id" onBlur={handleBlur} onChange={handleChange} value={values.id} id="outlined-basic" label="id" variant="outlined" />
                {touched.id && errors.id ? errors.id : null}<br />
                <TextField name="name" onBlur={handleBlur} onChange={handleChange} value={values.name} id="outlined-basic" label="Name" variant="outlined" />
                {touched.name && errors.name ? errors.name : null}<br />
                <TextField name="email" onBlur={handleBlur} onChange={handleChange} value={values.email} id="outlined-basic" label="Email" variant="outlined" />
                {touched.email && errors.email ? errors.email : null}<br />
                <TextField name="phoneNo" onBlur={handleBlur} onChange={handleChange} value={values.phoneNo} id="outlined-basic" label="Phone Number" variant="outlined" />
                {touched.phoneNo && errors.phoneNo ? errors.phoneNo : null}<br />
                <TextField name="address" onBlur={handleBlur} onChange={handleChange} value={values.address} id="outlined-basic" label="Address" variant="outlined" />
                {touched.address && errors.address ? errors.address : null}<br />
                <Button color="primary" variant="outlined" type=" submit" >ADD USER</Button>
            </form>
        </div >
    );

}