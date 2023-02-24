import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Filters } from './index'

describe('Filters Component', () => {
  beforeEach(() => {
    render(<Filters />)
  })
  test('Should render', () => {
    const elCategory = screen.getByText('Categoría')
    const elMinPrice = screen.queryByText(/precio/i)

    expect(elCategory).toBeDefined()
    expect(elMinPrice).toBeDefined()
  })
})
