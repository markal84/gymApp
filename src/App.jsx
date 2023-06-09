import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import User from './pages/user'
import Workouts from './pages/workouts'
import Home from './pages/home'
import PageNotFound from './pages/pageNotFound'
import workoutService from './services/workouts'
import Notification from './components/Notification'

function App() {
  const [workouts, setWorkouts] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    if (user) {
      workoutService
        .getAll(user)
        .then((initialWorkouts) => {
          setWorkouts(initialWorkouts)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [user])

  useEffect(() => {
    const loggedUserData = window.localStorage.getItem('loggedWorkoutAppUser')
    if (loggedUserData) {
      const user = JSON.parse(loggedUserData)
      setUser(user)
      workoutService.setToken(user.token)
    }
  }, [])

  return (
    <Router>
      <Notification message={message} />
      <Routes>
        <Route
          path="/workouts"
          element={
            <Workouts
              workouts={workouts}
              user={user}
              setMessage={setMessage}
              setWorkouts={setWorkouts}
              setUser={setUser}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/account"
          element={
            <User
              user={user}
              setUser={setUser}
              setMessage={setMessage}
              workouts={workouts}
            />
          }
        />
        <Route
          path="/"
          element={
            <Home setUser={setUser} user={user} setMessage={setMessage} />
          }
        />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Router>
  )
}

export default App
