import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      return state.map((a) => (a.id !== action.payload.id ? a : action.payload))
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteFor = (anecdote) => {
  return async (dispatch) => {
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }
    const updatedAnecdote = await anecdoteService.update(
      anecdote.id,
      changedAnecdote
    )
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export const { appendAnecdote, setAnecdotes, updateAnecdote } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer
