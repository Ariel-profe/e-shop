import { FC } from 'react';

interface Props {
    onClick: () => void;
};

export const BackDrop:FC<Props> = ({onClick}) => {
  return (
    <div onClick={onClick} className='z-20 bg-slate-200 opacity-50 w-screen h-screen fixed top-0 left-0'>

    </div>
  )
}
