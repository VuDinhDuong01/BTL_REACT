/* eslint-disable @typescript-eslint/no-explicit-any */
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'

interface TippyType {
  children: any
  childrenTippy:React.ReactNode
}

export const HeadlessTippy = ({ children, childrenTippy }: TippyType) => {
  return (
    <Tippy
      trigger='click'
      placement='bottom'
      interactive
      render={attrs => (
        <div {...attrs}>
          {
            childrenTippy
          }
        </div>
      )}
    >
      {children}
    </Tippy>
  )
}
