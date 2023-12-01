import { FC } from "react";

interface Props {
    title: string;
    center?: boolean;
};

export const Heading:FC<Props> = ({title, center}) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
        <h1 className="font-bold text-2xl">{title}</h1>
    </div>
  )
}
