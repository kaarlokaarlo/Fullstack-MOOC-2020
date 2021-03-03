import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


const blog = {
  title: 'Component testing',
  author: 'Kake',
  url: 'netti.fi',
  likes: 19,
  user: {
    username: 'kake',
    name: 'kake boi',
  }
}

test('renders only author and title when not expanded', () => {

  const component = render(
    <Blog blog={blog} />
  )


  expect(component.container).toHaveTextContent('Component testing')
  expect(component.container).toHaveTextContent('Kake')

  expect(component.container).not.toHaveTextContent('netti.fi')
  expect(component.container).not.toHaveTextContent(19)


})

test('likes and url render when view-button is pressed', async () => {

  const mockHandler = jest.fn()

  const component = render (
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)


  expect(component.container).toHaveTextContent('netti.fi')
  expect(component.container).toHaveTextContent(19)
})

test('when like button is pressed twice its eventhandler is called twice', async () => {

  const mockHandler = jest.fn()

  const component = render (
    <Blog blog={blog} like={mockHandler} />
  )

  const vButton = component.getByText('view')
  fireEvent.click(vButton)
  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)



  
})