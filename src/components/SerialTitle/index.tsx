"use client";
import React from "react";
import Image from 'next/image'

import { Bebas_Neue } from 'next/font/google'

const bebasNeue = Bebas_Neue({ 
  subsets: ['latin'], 
  weight: '400' 
});
 
export default function SerialTitle() {
  return (
    <div className={`${bebasNeue.className} flex flex-col items-center justify-center overflow-hidden rounded-md`}>
      <Image 
        className="relative z-20 mb-4"
        src="/header_logo.png"
        width={400}
        height={200}
        alt="Logo Serial"
        style={{ height: "auto", width: "50%" }}
      />
      <div className="w-[40rem] relative">
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
        <h3 className="text-gray-100 text-center mt-2 text-3xl tracking-widest">GERENCIE SUAS SÉRIES EM UM SÓ LUGAR</h3>
      </div>
      
    </div>
  );
}