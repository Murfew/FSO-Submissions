import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = () => {
  const result = useQuery(ALL_BOOKS)

  const [genre, setGenre] = useState('')

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  const getUniqueGenres = () => {
    const allGenres = books.flatMap((book) => book.genres)
    return [...new Set(allGenres)]
  }

  const filteredBooks = genre
    ? books.filter((book) => book.genres.includes(genre))
    : books

  return (
    <div>
      <h2>books</h2>

      {genre ? (
        <p>
          in genre <b>{genre}</b>
        </p>
      ) : null}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {getUniqueGenres().map((genre) => (
          <button
            value={genre}
            onClick={({ target }) => setGenre(target.value)}
          >
            {genre}
          </button>
        ))}
        <button onClick={() => setGenre('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
