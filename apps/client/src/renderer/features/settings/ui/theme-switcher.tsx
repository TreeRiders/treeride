import type { ThemeSchema } from '@root/schemas'
import { ThemeSelector } from '@shared/theme'
import { Carousel, CarouselContent, CarouselItem, Section, SectionContent, SectionTitle } from '@treeride/ui'
import type { FC } from 'react'

interface ThemeSwitcherProps {
  title: string
  defaultTheme: ThemeSchema
  currentTheme: ThemeSchema
  themes: ThemeSchema[]
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ themes, defaultTheme, currentTheme, title }) => {
  return (
    <Section>
      <SectionTitle
        accentContent={currentTheme.title}
        titleContent={title}
      />
      <SectionContent>
        <Carousel
          className="min-w-0 max-w-[95vw]"
          opts={{
            align: 'start',
            dragFree: true,
          }}
        >
          <CarouselContent
            className="ml-2 mr-5"
          >
            {([defaultTheme, ...themes]).map(theme => (
              <CarouselItem
                className="basis-1/8"
                key={theme.name}
              >
                <ThemeSelector
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

export { ThemeSwitcher }
