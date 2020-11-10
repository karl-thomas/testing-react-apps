// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  const {container} = render(<Counter />)

  const increment = screen.getByRole('button', {name: 'Increment'})
  const decrement = screen.getByRole('button', {name: 'Decrement'})

  expect(container).toHaveTextContent('Current count: 0')
  userEvent.click(increment)
  expect(container).toHaveTextContent('Current count: 1')
  userEvent.click(decrement)
  expect(container).toHaveTextContent('Current count: 0')
})
