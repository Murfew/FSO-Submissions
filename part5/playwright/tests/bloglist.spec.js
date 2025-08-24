const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matthew Hurley',
        username: 'mhurley',
        password: 'secret',
      },
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    await expect(page.getByLabel('Username')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })

  describe('Login functionality', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mhurley', 'secret')

      await expect(page.getByText('Matthew Hurley logged in')).toBeVisible()
      await expect(
        page.getByText('Wrong username or password!')
      ).not.toBeVisible()

      await expect(
        page.getByRole('heading', { name: 'Login' })
      ).not.toBeVisible()

      await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible()
    })

    test('fails with wrong password', async ({ page }) => {
      await loginWith(page, 'mhurley', 'wrong')

      await expect(page.getByText('Wrong username or password!')).toBeVisible()
      await expect(page.getByText('Matthew Hurley logged in')).not.toBeVisible()

      await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    })

    test('fails with wrong username', async ({ page }) => {
      await loginWith(page, 'wronguser', 'secret')

      await expect(page.getByText('Wrong username or password!')).toBeVisible()
      await expect(page.getByText('Matthew Hurley logged in')).not.toBeVisible()

      await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mhurley', 'secret')
    })

    test('a new blog can be created', async ({ page }) => {
      const blog = { title: 'Test Blog', author: 'TESTER', url: 'test.com' }

      await createBlog(page, blog.title, blog.author, blog.url)

      await expect(page.locator('.success')).toBeVisible()

      const blogComponent = page
        .locator('.blog')
        .filter({
          hasText: blog.title,
        })
        .filter({
          hasText: blog.author,
        })

      await expect(blogComponent).toBeVisible()
      await expect(blogComponent).toContainText(blog.title)
      await expect(blogComponent).toContainText(blog.author)
      await expect(
        blogComponent.getByRole('button', { name: 'Show' })
      ).toBeVisible()
      await expect(blogComponent.getByText(blog.url)).not.toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Test Blog', 'TESTER', 'test.com')
      })

      test('it can be liked', async ({ page }) => {
        const blogComponent = page
          .locator('.blog')
          .filter({
            hasText: 'Test Blog',
          })
          .filter({
            hasText: 'TESTER',
          })

        await blogComponent.getByRole('button', { name: 'Show' }).click()

        await expect(page.getByText('0 likes')).toBeVisible()

        await page.getByRole('button', { name: 'Like!' }).click()

        await expect(page.getByText('1 likes')).toBeVisible()
      })

      test('it can be deleted by the user who created it', async ({ page }) => {
        const blogComponent = page
          .locator('.blog')
          .filter({
            hasText: 'Test Blog',
          })
          .filter({
            hasText: 'TESTER',
          })

        await blogComponent.getByRole('button', { name: 'Show' }).click()

        page.on('dialog', async (dialog) => {
          expect(dialog.message()).toContain('Are you sure')
          await dialog.accept()
        })
        const removeButton = blogComponent.getByRole('button', {
          name: 'Remove',
        })
        await expect(removeButton).toBeVisible()
        await removeButton.click()

        await expect(blogComponent).not.toBeVisible()
      })

      test.only('only the user who created the blog can see the remove button', async ({
        page,
        request,
      }) => {
        const blogComponent = page
          .locator('.blog')
          .filter({
            hasText: 'Test Blog',
          })
          .filter({
            hasText: 'TESTER',
          })

        await blogComponent.getByRole('button', { name: 'Show' }).click()
        await expect(
          blogComponent.getByRole('button', { name: 'Remove' })
        ).toBeVisible()

        await page.getByRole('button', { name: 'Logout' }).click()

        await request.post('/api/users', {
          data: {
            name: 'Eleane Faultz',
            username: 'efaultz',
            password: 'secret',
          },
        })

        loginWith(page, 'efaultz', 'secret')

        await blogComponent.getByRole('button', { name: 'Show' }).click()
        await expect(
          blogComponent.getByRole('button', { name: 'Remove' })
        ).not.toBeVisible()
      })
    })
  })
})
