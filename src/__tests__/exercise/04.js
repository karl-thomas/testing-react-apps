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

  const handleSubmit = jest.fn(data => data)
  render(<Login onSubmit={handleSubmit} />)

  const usernameInput = screen.getByLabelText(/username/i)
  const passwordInput = screen.getByLabelText(/password/i)
  userEvent.type(usernameInput, username)
  userEvent.type(passwordInput, password)
  const submit = screen.getByRole('button', {name: 'Submit'})
  userEvent.click(submit)

  expect(handleSubmit).toHaveBeenCalledWith({password, username})
})

/*
eslint
  no-unused-vars: "off",
*/
