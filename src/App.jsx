import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Routes, Route, useNavigate, useParams } from "react-router-dom"
import { BasicForm } from './BasicForm';
import { AddUser } from './AddUser';
import { EditUser } from './EditUser';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import { API } from "./global"
export default function App() {
  const navigate = useNavigate()

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Button color="inherit" onClick={() => navigate("/")}  >
              HOME
            </Button>
            <Button color="inherit" onClick={() => navigate("/adduser")} >
              ADD USER
            </Button>
            {/* <Button color="inherit" onClick={() => navigate("/edituser")}  >
              EDIT USER
            </Button>
            <Button color="inherit" onClick={() => navigate("/form")}  >
              BASIC FORM
            </Button> */}
            <Button color="inherit" sx={{ marginLeft: "auto" }}>Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      {/* <HorizontalBar />
      <UserList /> */}
      <Routes>

        <Route path="/" element={<UserList />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/edituser/:id" element={<EditUser />} />
        <Route path="/form" element={<BasicForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}


function NotFound() {

  return (
    <img className="img" src="https://cdn4.vectorstock.com/i/1000x1000/39/98/error-404-page-not-found-vector-14463998.jpg" alt="Notfound" />
  )
}

function UserList() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [userList, setUserList] = useState([])
  const getUsers = () => {
    fetch(`${API}/users`,
      { method: "GET" })
      .then((data) => data.json())
      .then((usr) => setUserList(usr))
  }
  useEffect(() => getUsers(), [])

  const deleteUser = async (id) => {
    console.log("deleting...", id)
    await fetch(`${API}/${id}`, {
      method: "DELETE"
    }).then(() => getUsers())
  }

  return (
    <div >
      <h1 className="name">User lists</h1>
      <div className="userlist">
        {userList.map((usr, index) => <User user={usr} key={index.id}
          deleteButton={
            <IconButton
              onClick={() => deleteUser(usr.id)}
              color="primary"
              aria-label="delete">
              <DeleteIcon />
            </IconButton>}
          editButton={
            <IconButton
              onClick={() => {
                navigate(`/edituser/${usr.id}`)
                console.log("edit", usr.id)
              }}
              color="primary"
              aria-label="edit">
              <EditIcon />
            </IconButton>} />)}
      </div >
    </div>


  )
}
function User({ user, id, deleteButton, editButton }) {
  return (
    <div className="users">
      {/* <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 56, height: 56 }}
      /> */}
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <b>NAME        :</b>{user.name}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <b>EMAIL       :</b>{user.email}
          </Typography> <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <b>PHONE NUMBER:</b>{user.phoneNo}
          </Typography> <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <b>ADDRESS     :</b> {user.address}
          </Typography>
        </CardContent>
        <CardActions>
          <Stack direction="row" spacing={1}>
            {editButton}
            {deleteButton}
          </Stack>
        </CardActions>
      </Card>
    </div>
  )
}


