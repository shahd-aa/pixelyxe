import { useState } from 'react'
import Login from './Login'
import SignUp from './SignUp'

function Homepage() {
  const [showSignUp, setShowSignUp] = useState(false)

  return (
    <div className="homepage-container">
      {showSignUp ? <SignUp /> : <Login />}
      <p>{showSignUp ? 'already have an account?' : 'no account?'} <button onClick={() => setShowSignUp(!showSignUp)}>{showSignUp ? 'log in' : 'sign up'}</button></p>
    </div>
  )
}

export default Homepage