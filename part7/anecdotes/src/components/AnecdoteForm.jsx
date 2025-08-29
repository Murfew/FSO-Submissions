/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const AnecdoteForm = ({ addNew }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    navigate('/')
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content
          <input {...content.input} />
        </div>
        <div>
          Author
          <input {...author.input} />
        </div>
        <div>
          URL for more info
          <input {...info.input} />
        </div>
        <button type='submit'>Create</button>
        <button type='reset' onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  )
}

export default AnecdoteForm
