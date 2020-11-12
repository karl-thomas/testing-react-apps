// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'

beforeEach(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  }
})

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {latitude: 1, longitude: 1},
  }
  const {promise, resolve, reject} = deferred()
  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    success => {
      promise.then(() => success(fakePosition))
    },
  )
  render(<Location />)
  expect(screen.getByLabelText(/loading/gi)).toBeInTheDocument()

  await act(() => {
    resolve()
    return promise
  })

  expect(screen.queryByLabelText(/loading/gi)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

/*
eslint
  no-unused-vars: "off",
*/
