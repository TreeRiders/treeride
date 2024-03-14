import { useConfig } from '@entities/config'
import { DynamicLayoutBaseSet } from '@widgets/dynamic-layout'
import type { FC } from 'react'

const InitPage: FC = () => {
  const { extensions, errors } = useConfig()

  return (
    <>
      <DynamicLayoutBaseSet />
      <div
        className="flex flex-col gap-6"
      >
        <div
          className="flex flex-col gap-4"
        >
          <div
            className="text-2xl"
          >
            Loaded extensions
          </div>
          <div
            className="flex flex-col gap-4"
          >
            {extensions.map(extension => (
              <div
                key={extension.name}
              >
                <div
                  className="text-md font-bold"
                >
                  {extension.name}
                </div>
                <div
                  className="flex flex-col gap-2"
                >
                  {
              [...extension.themes, ...extension.commands].map(item => (
                <div
                  className="text-sm font-light ml-2"
                  key={item.name}
                >
                  -
                  {' '}
                  {item.name}
                </div>
              ))
            }
                </div>
              </div>
            ))}
          </div>

        </div>
        {!!errors.length && (
          <div
            className="gap-4 flex flex-col"
          >
            <div
              className="text-2xl"
            >
              Errors
            </div>
            <div
              className="flex flex-col gap-4"
            >
              {errors.map((error) => {
                return (
                  <div
                    className="flex flex-col gap-2"
                    key={`${error.type}-${error.message}`}
                  >
                    <div
                      className="flex gap-2"
                    >
                      <div
                        className="text-md"
                      >
                        Type:
                      </div>
                      <div
                        className="text-md text-warning font-light"
                      >
                        {error.type}
                      </div>
                    </div>
                    {error.type === 'initExtensionError' && (
                      <div
                        className="flex gap-2"
                      >
                        <div
                          className="text-md"
                        >
                          Extension:
                        </div>
                        <div
                          className="text-md text-warning font-light"
                        >
                          {error.extension}
                        </div>
                      </div>
                    )}
                    {error.type === 'initExtensionPartError' && (
                      <div
                        className="flex gap-2"
                      >
                        <div
                          className="text-md"
                        >
                          Part:
                        </div>
                        <div
                          className="text-md text-warning font-light"
                        >
                          {error.part}
                        </div>
                      </div>
                    )}
                    <div
                      className="flex gap-2"
                    >
                      <div
                        className="text-md"
                      >
                        Message:
                      </div>
                      <div
                        className="text-md text-warning font-light"
                      >
                        {error.message}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export { InitPage }
