'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, Bell, Settings, LayoutDashboard, Users, CheckSquare, Activity, Briefcase, 
  MapPin, Clock, ArrowUpRight, CheckCircle2, AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function WorkPulsePage() {
  const pathname = usePathname();

  // Simulasi Data Job/SPK dari Database Prisma
  const [jobs] = useState([
    { id: 'SPK-1029', client: 'PT Grand Graha Mall', title: 'Instalasi AC Central', assignee: 'Budi (Installer)', status: 'IN_PROGRESS', location: 'Makassar Pusat', deadline: 'Hari ini, 15:00' },
    { id: 'SPK-1030', client: 'RS Stella Maris', title: 'Deep Cleaning Steril', assignee: 'Citra (Maintenance)', status: 'ASSIGNED', location: 'Pantai Losari', deadline: 'Besok, 10:00' },
    { id: 'SPK-1031', client: 'Hotel Aston', title: 'Inspeksi Genset', assignee: 'Belum Ditugaskan', status: 'WAITING_DISPATCH', location: 'Perintis', deadline: 'Lusa, 14:00' },
    { id: 'SPK-1028', client: 'Logistik Nusantara', title: 'Pemasangan CCTV', assignee: 'Andi (Teknisi)', status: 'COMPLETED', location: 'Pelabuhan', deadline: 'Selesai' },
  ]);

  return (
    <div className="flex h-screen bg-[#f8fafc] text-zinc-900">
      
      {/* Sidebar - (Sama seperti halaman Copilot, ini bisa Anda buat jadi Komponen terpisah nantinya) */}
      <aside className="w-72 bg-white border-r border-zinc-200 flex flex-col justify-between hidden md:flex shadow-sm z-10">
        <div>
          <div className="h-16 flex items-center px-6 border-b border-zinc-100">
            <Link href="/" className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-zinc-900">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white shadow-md">D</div>
              Duluin<span className="text-teal-500">360</span>
            </Link>
          </div>
          
          <div className="p-4 space-y-6">
            <div>
              <div className="text-[11px] font-bold text-zinc-400 mb-2 px-3 tracking-widest uppercase">Analytics & AI</div>
              <nav className="space-y-1">
                <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-zinc-600 hover:bg-zinc-50 transition-all">
                  <Activity size={18} /> AI Copilot
                </Link>
                <Link href="/workpulse" className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold bg-teal-50 text-teal-700 border border-teal-100/50 shadow-sm transition-all">
                  <LayoutDashboard size={18} /> WorkPulse
                </Link>
              </nav>
            </div>

            <div>
              <div className="text-[11px] font-bold text-zinc-400 mb-2 px-3 tracking-widest uppercase">Operational</div>
              <nav className="space-y-1">
                <Link href="/fieldops" className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-zinc-600 hover:bg-zinc-50 transition-all">
                  <Users size={18} /> FieldOps
                </Link>
              </nav>
            </div>
            
            <div>
              <div className="text-[11px] font-bold text-zinc-400 mb-2 px-3 tracking-widest uppercase">Business</div>
              <nav className="space-y-1">
                <Link href="/crm" className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-zinc-600 hover:bg-zinc-50 transition-all">
                  <CheckSquare size={18} /> CRM Pipeline
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="bg-white/80 backdrop-blur-md h-16 border-b border-zinc-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-3 text-zinc-600">
            <Menu size={24} className="cursor-pointer md:hidden" />
            <div>
              <h1 className="font-bold text-lg text-zinc-900 leading-none">WorkPulse Dashboard</h1>
              <p className="text-xs text-zinc-500 mt-1">Pusat Komando & Penugasan Operasional Lapangan</p>
            </div>
          </div>
          <Button variant="outline" size="icon" className="rounded-full relative">
            <Bell size={18} className="text-zinc-600" />
          </Button>
        </header>

        <div className="p-8 overflow-y-auto space-y-8 flex-1 pb-20">
          
          {/* Quick Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-zinc-200 shadow-sm">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-xl"><Clock size={24}/></div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500">Waiting Dispatch</p>
                  <p className="text-2xl font-extrabold text-zinc-900">1</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-zinc-200 shadow-sm">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><ArrowUpRight size={24}/></div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500">In Progress</p>
                  <p className="text-2xl font-extrabold text-zinc-900">1</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-zinc-200 shadow-sm">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl"><CheckCircle2 size={24}/></div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500">Completed (Hari Ini)</p>
                  <p className="text-2xl font-extrabold text-zinc-900">1</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-red-200 bg-red-50/50 shadow-sm">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 bg-red-100 text-red-600 rounded-xl"><AlertCircle size={24}/></div>
                <div>
                  <p className="text-sm font-semibold text-red-600">SLA Breach Risk</p>
                  <p className="text-2xl font-extrabold text-red-700">0</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Dispatch Table */}
          <Card className="shadow-sm border-zinc-200">
            <CardHeader className="border-b border-zinc-100 bg-white pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg text-zinc-900">Antrean Surat Perintah Kerja (SPK)</CardTitle>
              </div>
              <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">Refresh Data</Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-zinc-50">
                  <TableRow>
                    <TableHead className="font-semibold text-zinc-900">No. SPK & Klien</TableHead>
                    <TableHead className="font-semibold text-zinc-900">Pekerjaan</TableHead>
                    <TableHead className="font-semibold text-zinc-900">Lokasi</TableHead>
                    <TableHead className="font-semibold text-zinc-900">Ditugaskan Ke</TableHead>
                    <TableHead className="font-semibold text-zinc-900">Batas Waktu (SLA)</TableHead>
                    <TableHead className="font-semibold text-zinc-900">Status Lapangan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <div className="font-bold text-zinc-900">{job.id}</div>
                        <div className="text-xs text-zinc-500">{job.client}</div>
                      </TableCell>
                      <TableCell className="font-medium text-zinc-700">{job.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-zinc-600">
                          <MapPin size={14} className="text-teal-600"/> {job.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        {job.status === 'WAITING_DISPATCH' ? (
                          <Button size="sm" variant="outline" className="text-xs border-dashed border-teal-500 text-teal-700 hover:bg-teal-50">
                            Auto-Assign (AI)
                          </Button>
                        ) : (
                          <span className="text-sm font-semibold">{job.assignee}</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-zinc-700">{job.deadline}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          job.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700 border-transparent' :
                          job.status === 'ASSIGNED' ? 'bg-zinc-100 text-zinc-700 border-transparent' :
                          job.status === 'WAITING_DISPATCH' ? 'bg-amber-100 text-amber-700 border-transparent' :
                          'bg-emerald-100 text-emerald-700 border-transparent'
                        }>
                          {job.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}