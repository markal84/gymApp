import { useState } from 'react'
import { PropTypes } from 'prop-types'
import { Box, Button, Typography } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { addDays } from 'date-fns'
import enGB from 'date-fns/esm/locale/en-GB/index.js'

export default function AddWorkoutForm({ onAddWorkout }) {
  const [date, setDate] = useState(new Date())
  const maxDate = addDays(new Date(), 0)

  function handleAddWorkout(e) {
    e.preventDefault()

    const newWorkout = {
      date: date.toLocaleDateString('en-US'),
      exercises: []
    }

    onAddWorkout(newWorkout)
    setDate(new Date())
  }

  function handleDateChange(newDate) {
    setDate(newDate)
  }

  return (
    <form onSubmit={handleAddWorkout}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" component="p" gutterBottom>
          Create a new workout
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
          <DatePicker
            label="Date"
            value={date}
            maxDate={maxDate}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Add Workout
        </Button>
      </Box>
    </form>
  )
}

AddWorkoutForm.propTypes = {
  onAddWorkout: PropTypes.func.isRequired
}
