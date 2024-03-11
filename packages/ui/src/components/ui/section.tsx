import * as React from 'react'
import { Separator } from '.'
import { cn } from '@/lib'

type SectionProps = React.HTMLAttributes<HTMLTableSectionElement>

export const Section = React.forwardRef<HTMLTableSectionElement, SectionProps>(({ className, ...otherProps }, ref) => {
  return (
    <section
      className={cn(
        'flex flex-col gap-4',
        className,
      )}
      ref={ref}
      {...otherProps}
    />
  )
})

Section.displayName = 'Section'

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  titleContent: React.ReactNode
  accentContent?: React.ReactNode
}

export const SectionTitle = React.forwardRef<HTMLHeadingElement, SectionTitleProps>(({ className, accentContent, titleContent, ...otherProps }, ref) => {
  return (
    <div
      className="flex flex-col gap-4"
    >
      <h4
        className={cn(
          'flex items-center gap-2 text-2xl font-bold',
          className,
        )}
        ref={ref}
        {...otherProps}
      >
        <div
          className="text-foreground-600"
        >
          {titleContent}
          {' '}
          {!!accentContent && (
            <span
              className="text-foreground"
            >
              (
              {accentContent}
              )
            </span>
          )}
        </div>
      </h4>
      <Separator />
    </div>
  )
})

SectionTitle.displayName = 'SectionTitle'

type SectionContentProps = React.HTMLAttributes<HTMLDivElement>

export const SectionContent = React.forwardRef<HTMLDivElement, SectionContentProps>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
    />
  )
})

SectionContent.displayName = 'SectionContent'
