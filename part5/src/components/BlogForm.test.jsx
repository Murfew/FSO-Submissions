import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('the event handler is called with the correct blog details when the form is submitted', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByLabelText('Title')
  const author = screen.getByLabelText('Author')
  const url = screen.getByLabelText('URL')
  const sendButton = screen.getByText('Create')

  await user.type(title, 'Test')
  await user.type(author, 'Tester')
  await user.type(url, 'test.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls[0][0].title).toBe('Test')
  expect(createBlog.mock.calls[0][0].author).toBe('Tester')
  expect(createBlog.mock.calls[0][0].url).toBe('test.com')
})
