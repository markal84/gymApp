import { PropTypes } from 'prop-types'
import { useNavigate } from 'react-router'
import LoginForm from '../components/forms/LoginForm'
import loginService from '../services/login'
import workoutService from '../services/workouts'
import { DEMO_PASSWORD } from '../config'

export default function Login({ setUser, user, setMessage }) {
  const navigate = useNavigate()

  async function handleLogin(username, password) {
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedWorkoutAppUser', JSON.stringify(user))

      workoutService.setToken(user.token)
      setUser(user)
      navigate('/workouts')
    } catch (error) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  async function handleDemoLogin() {
    await handleLogin('DemoUser', DEMO_PASSWORD)
  }

  const loginForm = () => {
    return (
      <LoginForm handleLogin={handleLogin} handleDemoLogin={handleDemoLogin} />
    )
  }

  return <div>{user ? 'already logged in' : loginForm()}</div>
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  user: PropTypes.object
}
