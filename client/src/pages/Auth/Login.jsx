import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Divider,
  FormControl,
  TextField,
} from "@mui/material"
import axios from "axios"
// import CloseIcon from "@mui/icons-material/Close";
// import GoogleIcon from "@mui/icons-material/Google";
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Link} from "react-router-dom"
import BgStars from "../../components/background/BgStars"
import Navbar from "../../components/Navbar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
})

export default function Login() {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  var formData = new FormData()
  formData.append('email', mail);   //append the values with key, value pair
  formData.append('password', pass);
  
  async function handleSubmit() {
    await axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/api/login',
      data: formData,
      headers:{"Content-Type": "multipart/form-data"}, 
      withCredentials: true
    }).then((props) => {
      console.log(props)
      // localStorage.setItem('userid', props.data.id)
      // window.location= "/"
    }).catch(function (response) {
      //handle error
      console.log(response);
    });
      // axios calls and other checks
    
    // await axios.get("http://127.0.0.1:5000/api/checklogin")
    //   .then((props) => {
    //     console.log(props)
    //     // if (props=== "True") {
    //     //   window.location= "/"
    //     // }
    // })
    await axios({
      method: 'get',
      url: 'http://127.0.0.1:5000/api/checklogin',
      // data: formData,
      // headers:{"Content-Type": "LOL"}, 
      withCredentials: true
    }).then((props) => {
      console.log(props)
      // localStorage.setItem('userid', props.data.id)
      // window.location= "/"
    }).catch(function (response) {
      //handle error
      console.log(response);
    });
  }
  async function handleLogout(){
    await axios({
      method: 'get',
      url: 'http://127.0.0.1:5000/api/logout',
      // data: formData,
      // headers:{"Content-Type": "multipart/form-data"}, 
      withCredentials: true
    }).then((props) => {
      console.log(props)
    }).catch(function (response) {
      console.log(response);
    });
    await axios({
      method: 'get',
      url: 'http://127.0.0.1:5000/api/checklogin',
      // data: formData,
      // headers:{"Content-Type": "multipart/form-data"}, 
      withCredentials: true
    }).then((props) => {
      console.log(props)
    }).catch(function (response) {
      console.log(response);
    });
  }

  return (
    <>
      <Navbar/>
      <BgStars />
      <ThemeProvider theme={darkTheme}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "auto",
            minHeight: "90vh",
            padding: "20vh 50px",
          }}
        >
          <Card
            sx={{
              minWidth: 270,
              maxWidth: 800,
              textAlign: "center",
              padding: "20px 90px",
            }}
          >
            <CardContent>
              <Typography variant="h4" color="text.primary" gutterBottom>
                Login
              </Typography>
              <Divider className="divider" sx={{ mb: 2 }} />
              <Typography variant="body2"  >Hey! Welcome Again...</Typography>

              <FormControl variant="standard">
                <TextField
                  id="Email"
                  label="Email"
                  helperText="Your registered institute email"
                  variant="standard"
                  margin="dense"
                  value={mail}
                  onChange={(e)=>setMail(e.target.value)}
                />
                <TextField
                  id="Password"
                                  label="Password"
                                  type="password"
                  helperText="You remember your password right"
                  variant="standard"
                  margin="dense"
                  value={pass}
                  onChange={(e)=>setPass(e.target.value)}
                />
              </FormControl>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button onClick={handleSubmit}
                size="large"
                variant="outlined"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                // startIcon={<GoogleIcon />}
              >
                Login
              </Button>
              <Button onClick={handleLogout}
                size="large"
                variant="outlined"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                // startIcon={<GoogleIcon />}
              >
                Logout
              </Button>
            </CardActions>
            <div sx={{ padding: "0px" }}>
              <Link to="/signup">
                <Button size="small" variant="text">
                  New user? Register first..
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </ThemeProvider>
    </>
  )
}
