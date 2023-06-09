import workoutService from '../services/workouts'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import WorkoutList from '../components/WorkoutList'
import AddWorkoutForm from '../components/forms/AddWorkoutForm'
import { Box, CircularProgress } from '@mui/material'
import Nav from '../components/Navigation'
import { PropTypes } from 'prop-types'

export default function Workouts({
  workouts,
  setWorkouts,
  setMessage,
  user,
  setUser,
  isLoading
}) {
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserData = window.localStorage.getItem('loggedWorkoutAppUser')
    if (!loggedUserData) {
      navigate('/')
    }
  }, [navigate])

  function handleAddWorkout(newWorkout) {
    workoutService
      .create(newWorkout)
      .then((returnedWorkout) => {
        setWorkouts([...workouts, returnedWorkout])
        setMessage('workout added')
        setTimeout(() => {
          setMessage(null)
        }, 3500)
      })
      .then(() => {
        workoutService.getAll(user).then((updatedWorkouts) => {
          setWorkouts(updatedWorkouts)
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  function handleUpdateWorkout(id, updatedWorkout) {
    workoutService
      .update(id, updatedWorkout)
      .then((returnedWorkout) => {
        setWorkouts(workouts.map((w) => (w.id !== id ? w : returnedWorkout)))
        setMessage('workout updated')
        setTimeout(() => {
          setMessage(null)
        }, 3500)
      })
      .catch((error) => console.log(error))
  }

  function handleDeleteWorkout(id) {
    workoutService
      .remove(id)
      .then(() => {
        setWorkouts(workouts.filter((w) => w.id !== id))
        setMessage('workout deleted')
        setTimeout(() => {
          setMessage(null)
        }, 3500)
      })
      .catch((error) => console.log(error))
  }

  return (
    <Box>
      {user && (
        <Box>
          <Nav user={user} setMessage={setMessage} setUser={setUser} />
          <Box>
            <AddWorkoutForm onAddWorkout={handleAddWorkout} />
            {isLoading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ height: '50vh' }}
              >
                <CircularProgress color="inherit" />
              </Box>
            ) : (
              <WorkoutList
                workouts={workouts}
                onDeleteWorkout={handleDeleteWorkout}
                onUpdateWorkout={handleUpdateWorkout}
                setWorkouts={setWorkouts}
                user={user}
              />
            )}
          </Box>
        </Box>
      )}
    </Box>
  )
}

Workouts.propTypes = {
  workouts: PropTypes.array,
  user: PropTypes.object,
  setWorkouts: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
}
