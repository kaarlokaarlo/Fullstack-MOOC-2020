import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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