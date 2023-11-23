import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'

function LoginPage() {
  
  const [ username , setUsername ] = useState('')
  const [ password , setPassword ] = useState('')
  const [ redirect , setRedirect ] = useState(false)
  const { setUserInfo } = useContext(UserContext)

  async function login(e) {
    e.preventDefault()
    const respone = await fetch(`http://localhost:4000/login` , {
      method : 'POST' ,
      body : JSON.stringify( { username , password} ) ,
      headers : { 'Content-Type' : 'application/json'} ,
      credentials : 'include'

    }) ;

    if(respone.ok) {
      respone.json().then(userInfo => {
        setUserInfo(userInfo)
        setRedirect(true)
      })
    }

  }

  if(redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <form className='login' onSubmit={login}>
        <h1>Login</h1>
        <input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button>Login</button>
    </form>
  )
}

export default LoginPage
