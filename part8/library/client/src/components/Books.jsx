import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState('')
  const filteredBooksQuery = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre || undefined },
  })
  const allBooksQuery = useQuery(ALL_BOOKS)

  if (allBooksQuery.loading || filteredBooksQuery.loading) {
    return <div>loading...</div>
  }

  const filteredBooks = filteredBooksQuery.data.allBooks
  const allBooks = allBooksQuery.data.allBooks

  const getUniqueGenres = () => {
    const allGenres = allBooks.flatMap((book) => book.genres)
    return [...new Set(allGenres)]
  }

  return (
    <div>
      <h2>books</h2>

      {selectedGenre ? (
        <p>
          in genre <b>{selectedGenre}</b>
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
            onClick={({ target }) => setSelectedGenre(target.value)}
          >
            {genre}
          </button>
        ))}
        <button onClick={() => setSelectedGenre('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
