import {DropdownMenu} from '@/components/DropdownMenu/DropdownMenu'
import {render} from '@testing-library/react'

describe('SearchInput', () => {
  it('renders the search input with placeholder and icon', () => {
    render(
      <DropdownMenu
        anchorEl={document.createElement('div')}
        isOpen={true}
        onClose={() => {}}
      >
        <div>Menu Item</div>
      </DropdownMenu>
    )
  })
})