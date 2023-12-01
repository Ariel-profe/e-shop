import { FC } from "react";
import Image from "next/image";
import {FaUserCircle} from 'react-icons/fa'

interface Props {
    src?: string | null | undefined; 
}

export const Avatar:FC<Props> = ({src}) => {

    if(src){
        return <Image
            src={src}
            alt='Avatar'
            className="rounded-full"
            height={30}
            width={30}
        />
    }

  return ( <FaUserCircle size={24} />)
}
