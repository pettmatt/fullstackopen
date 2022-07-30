import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('Blog form', () => {
  test('Blog form calls event handler it received as a prop', async () => {
    const mockHandler = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm handleSubmit={mockHandler} />)

    const inputTitle = screen.getByPlaceholderText('Example title for a blog')
    const inputAuthor = screen.getByPlaceholderText('Author J. Example')
    const inputUrl = screen.getByPlaceholderText('http://www.example.com')
    const submitButton = screen.getByText('Add')

    await user.type(inputTitle, 'Blog title')
    await user.type(inputAuthor, 'Blog author')
    await user.type(inputUrl, 'Url to blog')
    await user.click(submitButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('Blog title')
    expect(mockHandler.mock.calls[0][0].author).toBe('Blog author')
    expect(mockHandler.mock.calls[0][0].url).toBe('Url to blog')
  })
})