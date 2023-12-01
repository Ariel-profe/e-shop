import {NextResponse} from 'next/server';
import bcrypt from 'bcrypt';

import prisma from '@/libs/prisma-db';

export async function POST(req: Request){

    const body = await req.json();

    const {name, email, password} = body;
    
    // if(password.length < 5){
    //     return NextResponse.json({ error: 'Password should have 5 characters or more' }, { status: 411 })
    // };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name: name.toLowerCase(),
            email: email.toLowerCase(),
            hashedPassword
        }
    });

    return NextResponse.json(user);
};