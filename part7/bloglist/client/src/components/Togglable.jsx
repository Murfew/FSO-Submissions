import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button, Box, Paper } from '@mui/material'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <Box sx={{ my: 2 }}>
      {!visible && (
        <Button variant='contained' onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      )}

      {visible && (
        <Paper sx={{ p: 2 }}>
          {props.children}
          <Box sx={{ mt: 2 }}>
            <Button
              variant='outlined'
              color='secondary'
              onClick={toggleVisibility}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
