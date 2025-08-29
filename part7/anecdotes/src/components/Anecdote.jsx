/* eslint-disable react/prop-types */
const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>Votes: {anecdote.votes}</p>
      <p>
        See <a href={anecdote.info}>{anecdote.info}</a> for more info!
      </p>
    </div>
  )
}

export default Anecdote
