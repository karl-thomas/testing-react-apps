// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import Login from '../../components/login'

const buildLoginForm = (defaults = {}) => ({
  username: faker.internet.userName(),
  password: faker.internet.password(),
  ...defaults,
})

test('submitting the form calls onSubmit with username and password', () => {
  const {username, password} = buildLoginForm()
  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)

  userEvent.click(screen.getByRole('button', {name: 'Submit'}))

  expect(handleSubmit).toHaveBeenCalledWith({password, username})
})

/*
eslint
  no-unused-vars: "off",
*/
