/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    )
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteFor(id))
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
            handleClick={() => vote(anecdote.id)}
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
