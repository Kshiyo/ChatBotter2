import React from 'react'
import { Link } from 'react-router-dom'
import { useState , useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'


function Register() {

  // const notifyRegister = () => toast('Registration Successful !!'); 
  const noInput = () => toast('Does not contain any password !!'); 

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [dob, setDob] = useState("")
  const [file, setFile] = useState(null)
  const [isClicked , setClicked] = useState(false)
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

  const handleDob = (e) => {
    setDob(e.target.value)
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setClicked(true)

    if(!file){
      console.log("Please select a file")
      return
    }

    const formData = new FormData()
    formData.append('avatar' , file)
    formData.append('username' , username)
    formData.append('password' , password)
    formData.append('email' , email)
    formData.append('dob' , dob)

    // console.log(process.env.REGISTER_DOMAIN)
    // you're trying to use the dotenv package in a browser environment, 
    // which is not its intended use case. dotenv is primarily used in Node.js applications
    // to load environment variables from a .env file into the process.env object.

    try {
      const response = await toast.promise(axios.post('http://localhost:5000/api/v1/users/register' , formData , {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      }
    ),
    {
      loading: "Registering...",
      success: "Registration Successful",
      error: "Registration failed."
    }
  );

    //   console.log(response.data.statusCode) == 200
    if(response.data.statusCode == 200){
        setClicked(false)
        // notifyRegister()
    }

      setUsername('')
      setDob('')
      setEmail('')
      setPassword('')
      setFile(null)
      document.getElementById('avatar').value = '';
    } catch (error) {
        console.error('Error uploading file: ', error)
        setUsername('')
        setDob('')
        setEmail('')
        setPassword('')
        setFile(null)
        document.getElementById('avatar').value = '';
    }

    // try {
    //   console.log(formData)
    //   const response = await axios.post('http://localhost:5000/api/v1/users/register', formData);
      
    //   // Handle response if needed
    //   console.log('Server response:', response.data);
    // } catch (error) {
    //   console.error('Error submitting form:', error);
    // }

  }

  return (
  <>
    <div className="flex w-screen h-screen">
    <div className=" w-screen flex items-center justify-center">  
    <div className="h-full w-screen bg-[#231942] absolute"></div>
        <div className='bg-white px-10 py-5 rounded-3xl border-2 relative h-max'>
        <Toaster
          position='top-center'
          />
            <h1 className='text-5xl font-semibold px-20'>Register</h1>
            <p className='font-medium text-lg text-gray-500 mt-6'>Welcome! Please enter your details to register</p>
            <form onSubmit={handleSubmit} >
            <div>
                <div className='mt-2'>
                    {!isClicked ? (
                      <input type="text"
                      className='w-full border-b-2 focus:outline-none focus:border-button border-gray-100 p-4  mt-1 bg-transparent'
                      placeholder='Enter your username' 
                      id='username'
                      value={username}
                      onChange={handleUsername}
                      />
                    ) : (
                      <input type="text"
                      className='w-full border-b-2 focus:outline-none focus:border-button border-gray-100 p-4  mt-1 bg-transparent'
                    placeholder='Enter your username' 
                    id='username'
                    value={username}
                    onChange={handleUsername}
                    readOnly
                    />
                    ) }
                    
                </div>
                <div className='mt-5 relative'>
                    {!isClicked ? (
                    <input
                    type='password'
                    className='w-full border-b-2 focus:outline-none focus:border-button border-gray-100 p-4  mt-1 bg-transparent'
                    placeholder='Enter your password'
                    id='pass' 
                    value={password}
                    onChange={handlePassword}
                    />
                    ) : (
                      <input type="password"
                      className='w-full border-b-2 focus:outline-none focus:border-button border-gray-100 p-4  mt-1 bg-transparent'
                    placeholder='Enter your password'
                    id='pass' 
                    value={password}
                    onChange={handlePassword}
                    readOnly
                    />
                    ) }
                  <div className='absolute top-[20px] text-button right-2 cursor-pointer' onClick={handleClick}>
                  {show ? "Hide": "Show"}
                  </div>
                </div>
                
                <div className='mt-6'>
                    {!isClicked ? (
                      <input type="text"
                      className='w-full border-b-2 focus:outline-none focus:border-button border-gray-100 p-4  mt-1 bg-transparent'
                      placeholder='Enter your email' 
                      id='email'
                      value={email}
                      onChange={handleEmail}
                      />
                    ) : (
                      <input type="text"
                      className='w-full border-b-2 focus:outline-none focus:border-button border-gray-100 p-4  mt-1 bg-transparent'
                    placeholder='Enter your email' 
                    id='email'
                    value={email}
                    onChange={handleEmail}
                    readOnly
                    />
                    ) }
                    
                </div>
                <div className='mt-6'>
                    {!isClicked ? (
                      <input type="text"
                      className='w-full border-b-2 focus:outline-none focus:border-button border-gray-100 p-4  mt-1 bg-transparent'
                    placeholder='Enter your birth date' 
                    id='dob'
                    value={dob}
                    onChange={handleDob}
                    />
                    ) : (
                      <input type="text"
                      className='w-full border-b-2 focus:outline-none focus:border-button border-gray-100 p-4  mt-1 bg-transparent'
                    placeholder='Enter your birth date' 
                    id='dob'
                    value={dob}
                    onChange={handleDob}
                    readOnly
                    />
                    ) }
                    
                </div>
                <div className='mt-6 mb-4'>
                      <label className='text-lg text-gray-600' htmlFor="avatar">Choose your profile: </label>
                      {!isClicked ? (
                        <input id="avatar" type="file" onChange={handleFileChange} className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-button
                        hover:file:bg-violet-100
                        "/>
                      ) : 
                      (
                        <input id="avatar" type="file" className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-button
                        hover:file:bg-violet-100"
                        readOnly
                        />
                      )
                      }     
                </div>
                <div className='mt-8 flex flex-col w-full'>
                    {!isClicked ? (
                        <button
                        type='submit'
                        className='active:scale-[.98] active:duration-75  transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-button text-white text-lg font-bold'>
                            Register
                        </button>
                    ) : (
                        <button
                        disabled
                        className='active:scale-[.98] active:duration-75  transition-all ease-in-out py-3 rounded-xl bg-button text-white text-lg font-bold'>
                            Register
                        </button>
                    )}
                    <div className='mt-8 flex justify-center items-center'>
                    <p className='font-medium text-base'>Already have an account ?</p>
                    <Link to="/login">
                    <button className='text-violet-500 text-base font-medium ml-2'>LogIn</button>
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

export default Register