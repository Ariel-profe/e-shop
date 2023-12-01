import { FC, ReactNode } from 'react';

export const FooterList:FC<{children: ReactNode}> = ({children}) => {
  return (
    <div className="flex flex-col gap-2 w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-6">
        {children}
    </div>
  )
}
