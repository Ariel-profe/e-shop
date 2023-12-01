import Link from "next/link"
import {Redressed} from 'next/font/google';
import { FaRegUserCircle } from "react-icons/fa";

import { Container } from "./Container";
import { CartCounter } from "../cart/CartCounter";
import { UserMenu } from "./UserMenu";
import { getUser } from "@/actions/getUser";

const redressed = Redressed({subsets: ["latin"], weight: ["400"]})

export const Navbar = async() => {

    const user = await getUser();

  return (
    <div className="sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
        <div className="py-4 border-b-[1px]">
            <Container>
                <div className="flex items-center justify-between gap-3 md:gap-0">
                    <Link href="/" className={`${redressed.className} font-bold text-2xl`}>
                        E-Shop
                    </Link>
                    <div className="hidden md:block">Search</div>
                    <div className="flex items-center gap-8 md:gap-12">
                        <CartCounter />
                        <UserMenu user={user} />
                    </div>
                </div>
            </Container>
        </div>
    </div>
  )
}
