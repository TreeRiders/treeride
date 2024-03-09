import { FooterAction } from './footer-action'
import { HeaderSearch } from './header-search'

const DynamicLayout: {
  FooterAction: typeof FooterAction
  HeaderSearch: typeof HeaderSearch
} = {
  FooterAction,
  HeaderSearch,
}

export { DynamicLayout }
