import { getConfig } from '@entities/config'
import { useQuery } from '@tanstack/react-query'
import { ScrollArea } from '@treeride/ui'
import type { FC } from 'react'

const HelloPage: FC = () => {
  const { data: config } = useQuery({
    queryKey: ['config'],
    queryFn: getConfig,
  })

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
      {!!config && (
        <div>
          <ScrollArea
            className="w-full h-[200px] p-2 border rounded-md select-text"
          >
            <pre>{JSON.stringify(config, null, 2)}</pre>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}

export { HelloPage }
