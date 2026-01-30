import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Common = { children: ReactNode; variant?: 'primary' | 'accent' | 'ghost'; className?: string }
type AsButton = Common & { as?: 'button' } & ButtonHTMLAttributes<HTMLButtonElement>
type AsAnchor = Common & { as: 'a' } & AnchorHTMLAttributes<HTMLAnchorElement>
type Props = AsButton | AsAnchor

export function Button(props: Props) {
  const { variant = 'primary', className = '', children, ...rest } = props as any
  const cls = `btn btn--${variant} ${className}`.trim()

  if ((props as AsAnchor).as === 'a') {
    return (
      <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} className={cls}>
        {children}
      </a>
    )
  }

  return (
    <button {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} className={cls}>
      {children}
    </button>
  )
}
