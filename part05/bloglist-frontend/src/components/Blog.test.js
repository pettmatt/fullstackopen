import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog.js'

describe('Blog', () => {
  beforeEach(() => {
    const blog = {
      title: 'Blog title',
      author: 'Blog author',
      url: 'Url to blog',
      likes: 12,
    }

    render(<Blog blog={blog} />)
  })

  test('By default blog displays only title and author', () => {
    const title = screen.findByText('Blog title')
    const author = screen.findByText('Blog author')
    const url = screen.queryByText('Url to blog')
    const likes = screen.queryByText('likes: 12')

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('On button click blog shows more details', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Extend')
    await user.click(button)

    const url = screen.queryByText('likes: 12')
    expect(url).toBeDefined()
  })
})
  
test('When like button is clicked twice, the event handler is called twice', async ()=> {
  const blog = {
    title: 'Blog title',
    author: 'Blog author',
    url: 'Url to blog',
    likes: 12,
  }

  const mockHandler = jest.fn()
  const user = userEvent.setup()
  
  render(<Blog blog={blog} handleLike={mockHandler} />)

  const extendButton = screen.getByText('Extend')
  await user.click(extendButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
