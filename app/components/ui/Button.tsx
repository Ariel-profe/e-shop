"use client";

import { FC } from 'react';
import {IconType} from 'react-icons'

interface Props {
    label: string;
    disabled?: boolean;
    outline?:boolean;
    small?:boolean;
    custom?: string;
    icon?: IconType;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button:FC<Props> = ({label, onClick, custom, disabled, icon: Icon, outline, small}) => {
  return (
    <button
        className={`
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded-md
            hover:opacity-80
            transition
            w-full
            border-slate-700
            flex
            items-center
            justify-center
            gap-x-2
            ${outline ? 'bg-transparent' : 'bg-slate-700'}
            ${outline ? 'text-slate-700' : 'text-white'}
            ${small ? 'text-sm font-light' : 'text-md font-semibold'}
            ${small ? 'py-1 px-2 border' : 'py-3 px-4 border-2'}
            ${custom ? custom : ''}
        `}
        disabled={disabled}
        onClick={onClick}
    >
        {Icon && <Icon size={24} />}
        {label}
    </button>
  )
}
