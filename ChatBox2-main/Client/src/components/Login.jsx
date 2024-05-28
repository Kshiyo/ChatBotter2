import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import {Link , useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState , useEffect } from 'react'
import { useAuth } from '../context/UserContextProvider.jsx'


function Login() {

  const { user , setUser } = useAuth()
  

  const navigate = useNavigate()
  const noInput = () => toast.error('Please enter password'); 
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [show , setShow] = useState(false)

  const valueInput = document.getElementById("pass")?.value

  const handleClick = (e) => {
    if(valueInput){
      setShow(!show)
    }else{
      noInput()
    }
  }

  useEffect(() => {
    if(show){
      document.getElementById("pass").type = "text"
    }else {
      document.getElementById("pass").type = "password"
    }
  }, [show])

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value) 
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleLogin = async(e) => {
    e.preventDefault()

    // const formData = new FormData()
    // formData.append('username' , username)
    // formData.append('password' , password)
    // formData.append('email' , email)
    

    try {
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);
      params.append('email', email);

      
      const response = await toast.promise(axios.post('http://localhost:5000/api/v1/users/login' , params ,
      { headers: 
        {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    ),
    {
      loading : "Logging In...",
      error: "User does not exist"
    }
  );
    //   const response = await axios.post('http://localhost:5000/api/v1/users/login' , formData ,
    //   { headers: 
    //     {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }
    // );

      // console.log(response.data.statusCode)
      setUsername('')
      setEmail('')
      setPassword('')  



    if(response.data.statusCode == 200){
      navigate('/message')
    }

    setUser({
      userId: response.data.data.user._id,
      token: response.data.data.accessToken,
      userName: response.data.data.user.username,
    })

    localStorage.setItem('userToken' , response.data.data.accessToken)


    } catch (error) {
        console.error('Error logging in: ', error)
        setUsername('')
        setEmail('')
        setPassword('')
    }
    
  }

  return (
  <>
    <div className="flex w-screen h-screen">
    <div className=" w-screen flex items-center justify-center"> 
    <div className="h-full w-screen bg-[#231942] absolute"></div>
    <div className='bg-white px-20 py-5 rounded-3xl border-2 relative z-20 h-max'>
        <Toaster 
        position='top-center
        '/>
        <div className='text-5xl font-semibold mt-2 px-32'>
         <h1>Login</h1>
        </div>
        <p className='font-medium text-lg text-gray-500 mt-10'>Welcome Back! Please enter your details to login</p>
        <form onSubmit={handleLogin}>
        <div>
            <div className='mt-4 mb-4'>
                <input type="text"
                  onChange = {handleUsername}
                  value={username}
                  className='w-full border-b-2 focus:outline-none focus:border-button border-gray-100 p-4  mt-1 bg-transparent'
                  placeholder='Username' 
                  id='username'
                />
            </div>
            <div className='mt-2 relative'>
                <input type="password"
                  onChange = {handlePassword}
                  value={password}
                  className='w-full border-b-2 focus:outline-none focus:border-button border-gray-100 p-4  mt-1 bg-transparent'
                  placeholder='Password'
                  id='pass' 
                />
                <div className='absolute top-[20px] text-button right-2 cursor-pointer' onClick={handleClick}>
                  {show ? "Hide": "Show"}
                  </div>
            </div>
            <div className='mt-2'>
                <input type="text"
                  onChange = {handleEmail}
                  value={email}
                  className='w-full border-b-2 focus:outline-none focus:border-button border-gray-100 p-4  mt-1 bg-transparent'
                  placeholder='Email' 
                  id='email'
                />
            </div>
            <div className='mt-8 flex flex-col w-full'>
                <button 
                type='submit'
                className='active:scale-[.98] active:duration-75  transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-button text-white text-lg font-bold'>
                    LogIn
                </button>
                <div className='mt-8 flex justify-center items-center'>
                   <p className='font-medium text-base'>Don't have an account ?</p>
                   <Link to = "/register">
                   <button className='text-violet-500 text-base font-medium ml-2'>Register</button>
                   </Link>
                </div>
            </div>
        </div>
        </form>
    </div>
    </div>
    </div> 
  </>  
  )
}

export default Login