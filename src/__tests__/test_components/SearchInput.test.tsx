import { SearchInput } from '@/components/SearchInput/SearchInput'
import {render, screen} from '@testing-library/react'

describe('SearchInput', () => {
  it('renders the search input with placeholder and icon', () => {
    render(<SearchInput />)
    const inputElement = screen.getByPlaceholderText('Buscar profissionais e áreas')

    expect(inputElement).toBeInTheDocument()
  })
})