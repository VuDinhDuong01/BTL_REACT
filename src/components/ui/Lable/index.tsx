/* eslint-disable @typescript-eslint/no-unused-vars */
import * as LabelPrimitive from "@radix-ui/react-label"
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import { cva, type VariantProps } from "class-variance-authority"

const labelVariants = cva(
    " font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
)
const Label = forwardRef<ElementRef<typeof LabelPrimitive.Root>,
    ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants> & {
        className: string
    }
>(({ className, ...props }, _) => (
    <LabelPrimitive.Root
        className={labelVariants + className as string}
        {...props}
    />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }