import type { FC } from 'react'

const HelloPage: FC = () => {
  return (
    <div
      className="flex-1 flex flex-col items-center justify-center gap-6"
    >
      <div
        className="text-5xl"
      >
        TreeRide
      </div>
      <div>Open-Source multi-platform productivity boost tool</div>
    </div>
  )
}

export { HelloPage }
