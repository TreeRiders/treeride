import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  'flex h-10 w-full rounded-md px-3 py-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border border-input bg-background-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-sm',
        search: 'bg-transparent outline-none text-lg placeholder:text-lg placeholder:text-foreground-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        type={type}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
