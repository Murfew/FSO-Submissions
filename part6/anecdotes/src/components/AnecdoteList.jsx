/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    )
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteFor(anecdote))

    dispatch(setNotification(`you voted for '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <>
      {anecdotes
        .sort((a, b) => {
          return b.votes - a.votes
        })
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => vote(anecdote)}
          />
        ))}
    </>
  )
}

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

export default AnecdoteList
