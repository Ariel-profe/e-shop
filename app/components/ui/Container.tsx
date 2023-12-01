import { FC, ReactNode } from 'react'

export const Container:FC<{children: ReactNode}> = ({children}) => {
  return (
    <div
        className='max-w-[1920px] mx-auto px-4 md:px-2 xl:px-20'
    >{children}</div>
  )
}
