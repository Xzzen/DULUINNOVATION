'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Activity,
  Briefcase,
  Settings,
  HardDrive
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const getLinkClass = (path: string) => `
    flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all group
    ${isActive(path)
      ? 'bg-teal-50 text-teal-700 border border-teal-100/50 shadow-sm'
      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}
  `;

  return (
    <aside className="w-72 bg-white border-r border-zinc-200 flex flex-col justify-between hidden md:flex shadow-sm z-10 shrink-0">
      <div>
        {/* Brand Logo */}
        <div className="h-16 flex items-center px-6 border-b border-zinc-100">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-zinc-900">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white shadow-md">
              D
            </div>
            Duluin<span className="text-teal-500">360</span>
          </Link>
        </div>

        <div className="p-4 space-y-6">
          {/* Menu Group 1: Analytics & AI */}
          <div>
            <div className="text-[11px] font-bold text-zinc-400 mb-2 px-3 tracking-widest uppercase">Analytics & AI</div>
            <nav className="space-y-1">
              <Link href="/copilot" className={getLinkClass('/copilot')}>
                <Activity size={18} className="group-hover:text-teal-600 transition-colors" /> AI Copilot
              </Link>
              <Link href="/workpulse" className={getLinkClass('/workpulse')}>
                <LayoutDashboard size={18} className="group-hover:text-teal-600 transition-colors" /> WorkPulse
              </Link>
            </nav>
          </div>

          {/* Menu Group 2: Operational */}
          <div>
            <div className="text-[11px] font-bold text-zinc-400 mb-2 px-3 tracking-widest uppercase">Operational</div>
            <nav className="space-y-1">
              <Link href="/fieldops" className={getLinkClass('/fieldops')}>
                <Users size={18} className="group-hover:text-teal-600 transition-colors" /> FieldOps
                {/* Contoh badge alert statis, bisa dibuat dinamis nantinya */}
                <span className="ml-auto bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-[10px] font-bold shadow-sm">3 Alert</span>
              </Link>
              <Link href="/vendorflow" className={getLinkClass('/vendorflow')}>
                <Briefcase size={18} className="group-hover:text-teal-600 transition-colors" /> VendorFlow
              </Link>
            </nav>
          </div>

          {/* Menu Group 3: Business */}
          <div>
            <div className="text-[11px] font-bold text-zinc-400 mb-2 px-3 tracking-widest uppercase">Business</div>
            <nav className="space-y-1">
              <Link href="/crm" className={getLinkClass('/crm')}>
                <CheckSquare size={18} className="group-hover:text-teal-600 transition-colors" /> CRM Pipeline
              </Link>
              {/* TOMBOL ARSIP BARU DITAMBAHKAN DI SINI */}
              <Link href="/archive" className={getLinkClass('/archive')}>
                <HardDrive size={18} className="group-hover:text-teal-600 transition-colors" /> Arsip Dokumen
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-zinc-100 bg-zinc-50/50 mt-auto">
        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-zinc-200 cursor-pointer hover:border-teal-300 hover:shadow-sm transition-all group">
          <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">
            BA
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-zinc-900 truncate group-hover:text-teal-700 transition-colors">Balanza</p>
            <p className="text-xs text-zinc-500 truncate">System Administrator</p>
          </div>
          <Settings size={18} className="text-zinc-400 group-hover:text-teal-600 transition-colors" />
        </div>
      </div>

    </aside>
  );
}