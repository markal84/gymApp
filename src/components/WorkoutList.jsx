import Workout from './Workout'
import { Container, Grid } from '@mui/material'
import { PropTypes } from 'prop-types'

export default function WorkoutList({
  workouts,
  onDeleteWorkout,
  onUpdateWorkout,
  setWorkouts,
  user
}) {
  return (
    <Container maxWidth="xl">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {workouts.map((workout) => (
          <Grid key={workout.id} item xs={12} sm={8} md={6} mt={1} mb={1}>
            <Workout
              workout={workout}
              onDeleteWorkout={onDeleteWorkout}
              onUpdateWorkout={onUpdateWorkout}
              setWorkouts={setWorkouts}
              user={user}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

WorkoutList.propTypes = {
  workouts: PropTypes.array.isRequired,
  onDeleteWorkout: PropTypes.func.isRequired,
  onUpdateWorkout: PropTypes.func.isRequired,
  setWorkouts: PropTypes.func.isRequired,
  user: PropTypes.object
}
