import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react"

import clsx from "clsx"

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  prefix?: ReactNode
  suffix?: ReactNode
}
function Button({ children, prefix, suffix, className, ...other }: IProps) {
  if (prefix || suffix)
    return (
      <div
        {...other}
        className={clsx(
          "cursor-pointer select-none flex gap-1 items-center justify-center px-2 py-1 rounded-md bg-white border border-light-100",
          className
        )}>
        {prefix}
        <button>{children}</button>
        {suffix}
      </div>
    )
  return (
    <button
      {...other}
      className={clsx(
        "px-2 py-1 rounded-md bg-white border border-light-100 select-none",
        className
      )}>
      {children}
    </button>
  )
}

export default Button
