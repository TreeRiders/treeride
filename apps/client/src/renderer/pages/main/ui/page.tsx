import { DynamicLayout } from '@widgets/root-layout'
import type { FC } from 'react'

const MainPage: FC = () => {
  return (
    <div>
      <DynamicLayout.HeaderSearch
        placeholder="Search for apps and commands"
        value={undefined}
        onChange={undefined}
      />
    </div>
  )
}

export { MainPage }
