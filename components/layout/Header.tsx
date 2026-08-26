import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode; // Untuk meletakkan tombol tambahan spesifik halaman
}

export default function Header({ title, subtitle, children }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-md h-16 border-b border-zinc-200 flex items-center justify-between px-8 sticky top-0 z-10 shrink-0">
      <div className="flex items-center gap-3 text-zinc-600">
        <Menu size={24} className="cursor-pointer md:hidden" />
        <div>
          <h1 className="font-bold text-lg text-zinc-900 leading-none">{title}</h1>
          <p className="text-xs text-zinc-500 mt-1">{subtitle}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Tombol tambahan akan dirender di sini */}
        {children}
        
        {/* Tombol Notifikasi Universal */}
        <Button variant="outline" size="icon" className="rounded-full relative">
          <Bell size={18} className="text-zinc-600" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </Button>
      </div>
    </header>
  );
}