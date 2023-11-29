/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"


const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal



const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ ...props }, _
) => (
    <DialogPrimitive.Overlay

        className={(
            "fixed inset-0  bg-[rgba(0,0,0,0.7)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        )}
        {...props}
    />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={(
                "fixed inset-0 z-20 text-[white] data-[state=open]:animate-in data-[state=closed]:animate-data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 flex justify-center items-center  " +
                className
            )}
            {...props}
        >
            {children}
        </DialogPrimitive.Content>
    </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName


export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogTrigger,
    DialogContent,
}

