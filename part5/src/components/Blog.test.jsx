import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

// eslint-disable-next-line quotes
test("renders likes and url once the 'show' button is clicked", async () => {
  const blog = {
    title: 'Test blog',
    author: 'Tester',
    url: 'example.com',
    likes: 10,
    user: { username: 'testuser' },
  }

  const testUser = { username: 'testuser' }

  render(
    <Blog
      blog={blog}
      handleLike={() => {}}
      user={testUser}
      handleRemove={() => {}}
    />
  )

  const user = userEvent.setup()
  const button = await screen.findByText('Show')
  await user.click(button)

  const url = await screen.findByText('example.com')
  expect(url).toBeDefined()

  const likes = await screen.findByText('10 likes')
  expect(likes).toBeDefined()
})

test('the event handler for the like button is called twice when the button is cliked twice', async () => {
  const blog = {
    title: 'Test blog',
    author: 'Tester',
    url: 'example.com',
    likes: 10,
    user: { username: 'testuser' },
  }

  const testUser = { username: 'testuser' }

  const mockLikeHandler = vi.fn()

  render(
    <Blog
      blog={blog}
      handleLike={mockLikeHandler}
      user={testUser}
      handleRemove={() => {}}
    />
  )

  const user = userEvent.setup()
  const showButton = await screen.findByText('Show')
  await user.click(showButton)

  const likeButton = await screen.findByText('Like!')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockLikeHandler.mock.calls).toHaveLength(2)
})
