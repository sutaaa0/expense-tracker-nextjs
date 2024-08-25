"use client";

import { ChartNoAxesCombined, CircleDollarSign, House, Wallet } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react'

export default function Navbar() {

    const pathName = usePathname();

    return (
        <div className='absolute top-0 w-full p-12 flex justify-between py-7 px-5 md:py-12 md:px-60'>
            <div>
            <CircleDollarSign className='w-12 h-12 md:w-16 md:h-16' />
            </div>
            <div className='flex justify-center items-center gap-x-7 md:gap-x-12'>
                <Link href={"/dashboard/dashboardtes"} className={`flex gap-x-2 ${pathName === "/dashboard/dashboardtes" ? "text-black" : "text-gray-500"}`}>
                    <House />
                    <p className='hidden md:block'>Home</p>
                </Link>
                <Link href={"/dashboard/expenses"} className={`flex gap-x-2 ${pathName === "/dashboard/expense" ? "text-black" : "text-gray-500"}`}>
                    <Wallet />
                    <p className='hidden md:block'>Cashflow</p>
                </Link>
                <Link href={"/dashboard/networth"} className={`flex gap-x-2 ${pathName === "/dashboard/networth" ? "text-black" : "text-gray-500"}`}>
                    <ChartNoAxesCombined />
                    <p className='hidden md:block'>Net Worth</p>
                </Link>

            </div>
            <div>
                <Image src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRikqw0frjDjJZlqHjkvFS3YO-1ney9nUsvVnQLyLb6qEpvIvsjygp0GcwRHGD7bAYxXeI&usqp=CAU'} alt='logo' width={100} height={100} className='rounded-full bg-cover w-[40px]  md:w-[60px] h-[40px] md:h-[60px]'/>
            </div>
        </div>
    )
}
