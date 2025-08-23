import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author, but not likes or url by default', () => {
  const blog = {
    title: 'Test blog',
    author: 'Tester',
    url: 'example.com',
    likes: 10,
    user: { username: 'testuser' },
  }

  const user = { username: 'testuser' }

  render(
    <Blog
      blog={blog}
      handleLike={() => {}}
      user={user}
      handleRemove={() => {}}
    />
  )

  const titleAndAuthor = screen.getByText('Test blog Tester')
  expect(titleAndAuthor).toBeDefined()

  const url = screen.queryByText('example.com')
  expect(url).toBeNull()

  const likes = screen.queryByText('10 likes')
  expect(likes).toBeNull()
})
