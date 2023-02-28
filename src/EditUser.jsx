import Button from '@mui/material/Button';
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { API } from "./global"

const formValidationSchema = yup.object({
    id: yup.number().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    phoneNo: yup.number().required(),
    address: yup.string().required()
});
export function EditUser() {
    const { id } = useParams()

    const [userList, setUserList] = useState(null)
    useEffect(() => {
        fetch(`${API}/user/${id}`)
            .then((data) => data.json())
            .then((urs) => setUserList(urs))
    }, [])
    return userList ? <EditUserList userList={userList} /> : <h2>Loading...</h2>
}

function EditUserList({ userList }) {
    const navigate = useNavigate()
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
            navigate("/")
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

        fetch(`${API}/user/${userList.id}`,
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
            <form onSubmit={handleSubmit} >
                <TextField name="id"
                    fullWidth sx={{ m: 1 }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.id}
                    id="outlined-basic"
                    label="id"
                    variant="standard"
                    error={touched.id && errors.id}
                /><br />
                {touched.id && errors.id ? errors.id : null}<br />
                <TextField name="name"
                    fullWidth sx={{ m: 1 }} onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    id="outlined-basic" label="Name"
                    variant="standard"
                    error={touched.name && errors.name} /><br />
                {touched.name && errors.name ? errors.name : null}<br />
                <TextField name="email"
                    fullWidth sx={{ m: 1 }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    id="outlined-basic" label="Email"
                    variant="standard"
                    error={touched.email && errors.email} /><br />
                {touched.email && errors.email ? errors.email : null}<br />
                <TextField name="phoneNo"
                    fullWidth sx={{ m: 1 }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phoneNo} id="outlined-basic"
                    label="Phone Number" variant="standard"
                    error={touched.phoneNo && errors.phoneNo} /><br />
                {touched.phoneNo && errors.phoneNo ? errors.phoneNo : null}<br />
                <TextField
                    name="address"
                    fullWidth sx={{ m: 1 }}
                    onBlur={handleBlur}
                    onChange={handleChange} value={values.address}
                    id="outlined-basic" label="Address"
                    variant="standard"
                    error={touched.address && errors.address} /><br />
                {touched.address && errors.address ? errors.address : null}<br />
                <Button color="success"
                    fullWidth sx={{ m: 1 }}
                    variant="outlined" type="submit" >SAVE</Button>
            </form>
        </div>
    );
}
