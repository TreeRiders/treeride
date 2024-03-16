import { DynamicLayoutBaseSet } from '@widgets/dynamic-layout'
import type { FC } from 'react'

const InitPage: FC = () => {
  return (
    <>
      <DynamicLayoutBaseSet />
      <div>
        Init errors
      </div>
    </>
  )
}

export { InitPage }
