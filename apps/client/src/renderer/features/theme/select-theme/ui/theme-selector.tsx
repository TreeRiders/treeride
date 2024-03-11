import { defaultDarkTheme, defaultLightTheme, useTheme } from '@entities/theme'
import { Carousel, CarouselContent, CarouselItem, Section, SectionContent, SectionTitle } from '@treeride/ui'
import type { FC } from 'react'
import { ThemeItem } from './theme-item'

interface ThemeSelectorProps {
  appearance: 'light' | 'dark'
}

const ThemeSelector: FC<ThemeSelectorProps> = ({ appearance }) => {
  const { darkThemes, lightThemes, currentDarkTheme, currentLightTheme } = useTheme()

  const currentThemes = appearance === 'light' ? lightThemes : darkThemes

  const currentTheme = appearance === 'light' ? currentLightTheme : currentDarkTheme

  const defaultTheme = appearance === 'light' ? defaultLightTheme : defaultDarkTheme

  const appearanceTitle = appearance === 'light' ? 'Light' : 'Dark'

  return (
    <Section>
      <SectionTitle
        accentContent={currentTheme.title}
        titleContent={`${appearanceTitle} themes`}
      />
      <SectionContent
        className="-mx-[8px]"
      >
        <Carousel
          className="min-w-0 max-w-[100vw]"
          opts={{
            align: 'start',
            dragFree: true,
          }}
        >
          <CarouselContent
            className="px-2"
          >
            {([defaultTheme, ...currentThemes]).map(theme => (
              <CarouselItem
                className="basis-1/8"
                key={theme.name}
              >
                <ThemeItem
                  theme={theme}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </SectionContent>
    </Section>
  )
}

export { ThemeSelector }
