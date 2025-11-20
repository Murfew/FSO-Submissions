import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = () => {
  const meQuery = useQuery(ME)
  const booksQuery = useQuery(ALL_BOOKS)

  if (meQuery.loading || booksQuery.loading) {
    return <div>loading...</div>
  }

  const favoriteGenre = meQuery.data.me.favoriteGenre
  const books = booksQuery.data.allBooks

  const recommendedBooks = books.filter((book) =>
    book.genres.includes(favoriteGenre)
  )

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
