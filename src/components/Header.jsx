import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'

function Header() {

  const { setUserInfo , userInfo } = useContext(UserContext)

  useEffect(() => {
    fetch(`http://localhost:4000/profile` , {
      credentials : 'include'

    }).then(respone => {
      respone.json().then(userInfo => {
        setUserInfo(userInfo)
      })
    })
  }, [])

  function logout() {
    fetch(`http://localhost:4000/logout` , {
      credentials : 'include' ,
      method : 'POST'
    })
    setUserInfo(null)
  }

  const username = userInfo?.username

  return (
    <header>
            <Link to='' className='logo'>Blog Node</Link>

            <nav>
              {username && (
                <>
                  <Link to={'/create'}>Create new post</Link>
                  <a onClick={logout}>Logout</a>
                </>
              ) }
              
              {!username && (
                <>
                  <Link to={'/login'}>Login</Link>
                  <Link to={'/register'}>Register</Link>
                </>
              )}
            </nav>
    </header>
  )
}

export default Header
