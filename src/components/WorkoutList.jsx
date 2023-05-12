import Workout from './Workout'
import { PropTypes } from 'prop-types'

export default function WorkoutList({
  workouts,
  onDeleteWorkout,
  onUpdateWorkout,
  setWorkouts
}) {
  return (
    <>
      <ul>
        {workouts.map((workout) => (
          <li style={{ listStyle: 'none' }} key={workout.id}>
            <Workout
              workout={workout}
              onDeleteWorkout={onDeleteWorkout}
              onUpdateWorkout={onUpdateWorkout}
              setWorkouts={setWorkouts}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

WorkoutList.propTypes = {
  workouts: PropTypes.array.isRequired,
  onDeleteWorkout: PropTypes.func.isRequired,
  onUpdateWorkout: PropTypes.func.isRequired,
  setWorkouts: PropTypes.func.isRequired
}
