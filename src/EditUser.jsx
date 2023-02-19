import Button from '@mui/material/Button';
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"


const formValidationSchema = yup.object({
    id: yup.number().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    phoneNo: yup.number().required(),
    address: yup.string().required()
});
export function EditUser() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [userList, setUserList] = useState(null)
    useEffect(() => {
        fetch(`https://63f17e9bff1b45a1a44cefb6.mockapi.io/user/${id}`)
            .then((data) => data.json())
            .then((urs) => setUserList(urs))
    }, [])
    return userList ? <EditUserList userList={userList} /> : <h2>Loading...</h2>
}

function EditUserList({ userList }) {

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({
        initialValues: {
            id: userList.id,
            name: userList.name,
            email: userList.email,
            phoneNo: userList.phoneNo,
            address: userList.address
        },
        validationSchema: formValidationSchema,
        onSubmit: (newUpdate) => {
            console.log("form value", newUpdate)
            UpdateData(newUpdate)
        }
    });

    const UpdateData = (newUpdate) => {
        console.log(newUpdate)
        // const newdata = {
        //     id: id,
        //     name: name,
        //     email: email,
        //     phoneNo: phoneNo,
        //     address: address
        // };

        fetch(`https://63f17e9bff1b45a1a44cefb6.mockapi.io/user/${userList.id}`,
            {
                method: "PUT",
                body: JSON.stringify(newUpdate),
                headers: {
                    "content-type": "application/json"
                }
            });

    };
    return (
        <div className="editUser">
            <form onSubmit={handleSubmit}>
                <TextField name="id" onBlur={handleBlur} onChange={handleChange} value={values.id} id="outlined-basic" label="id" variant="outlined" />
                {/* {userList.id} */}
                {touched.id && errors.id ? errors.id : null}<br />
                <TextField name="name" onBlur={handleBlur} onChange={handleChange} value={values.name} id="outlined-basic" label="Name" variant="outlined" />
                {touched.name && errors.name ? errors.name : null}<br />
                <TextField name="email" onBlur={handleBlur} onChange={handleChange} value={values.email} id="outlined-basic" label="Email" variant="outlined" />
                {touched.email && errors.email ? errors.email : null}<br />
                <TextField name="phoneNo" onBlur={handleBlur} onChange={handleChange} value={values.phoneNo} id="outlined-basic" label="Phone Number" variant="outlined" />
                {touched.phoneNo && errors.phoneNo ? errors.phoneNo : null}<br />
                <TextField name="address" onBlur={handleBlur} onChange={handleChange} value={values.address} id="outlined-basic" label="Address" variant="outlined" />
                {touched.address && errors.address ? errors.address : null}<br />
                <Button color="success" variant="outlined" type="submit" >SAVE</Button>
            </form>
        </div>
    );
}
