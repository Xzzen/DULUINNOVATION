'use client';
import React, { useState } from 'react';
import { LayoutDashboard, Users, CheckSquare, Bell, Menu, Activity, AlertTriangle, Briefcase, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Dashboard() {
  const [employees] = useState([
    { id: 'K01', name: 'Andi', role: 'Teknisi Lapangan', task: 12, dl: '1 Hari', score: 135, status: 'Overload', action: 'Reassign 2 Tasks' },
    { id: 'K02', name: 'Budi', role: 'Installer', task: 2, dl: '5 Hari', score: 30, status: 'Available', action: 'Ready for Task' },
    { id: 'K03', name: 'Citra', role: 'Maintenance', task: 8, dl: '3 Hari', score: 75, status: 'Optimal', action: 'Keep Pacing' },
  ]);

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      
      {/* Sidebar - Duluin Ecosystem (Upgraded Design) */}
      <aside className="w-72 bg-white border-r border-zinc-200 flex flex-col justify-between hidden md:flex shadow-sm z-10">
        
        {/* Brand Logo */}
        <div>
          <div className="h-16 flex items-center px-6 border-b border-zinc-100">
            <div className="flex items-center gap-2 font-extrabold text-xl text-zinc-900 tracking-tight">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white shadow-md">
                D
              </div>
              Duluin<span className="text-teal-500">360</span>
            </div>
          </div>
          
          <div className="p-4 space-y-6">
            
            {/* Menu Group 1: Analytics */}
            <div>
              <div className="text-[11px] font-bold text-zinc-400 mb-2 px-3 tracking-widest uppercase">Analytics & AI</div>
              <nav className="space-y-1">
                <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-teal-50 text-teal-700 rounded-xl font-semibold transition-all border border-teal-100/50 shadow-sm">
                  <Activity size={18} /> AI Copilot
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 rounded-xl font-medium transition-all group">
                  <LayoutDashboard size={18} className="group-hover:text-teal-600 transition-colors" /> WorkPulse
                </a>
              </nav>
            </div>

            {/* Menu Group 2: Operational */}
            <div>
              <div className="text-[11px] font-bold text-zinc-400 mb-2 px-3 tracking-widest uppercase">Operational</div>
              <nav className="space-y-1">
                <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 rounded-xl font-medium transition-all group">
                  <Users size={18} className="group-hover:text-teal-600 transition-colors" /> FieldOps
                  <span className="ml-auto bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-[10px] font-bold shadow-sm">3 Alert</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 rounded-xl font-medium transition-all group">
                  <Briefcase size={18} className="group-hover:text-teal-600 transition-colors" /> VendorFlow
                </a>
              </nav>
            </div>

            {/* Menu Group 3: Business */}
            <div>
              <div className="text-[11px] font-bold text-zinc-400 mb-2 px-3 tracking-widest uppercase">Business</div>
              <nav className="space-y-1">
                <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 rounded-xl font-medium transition-all group">
                  <CheckSquare size={18} className="group-hover:text-teal-600 transition-colors" /> CRM Pipeline
                </a>
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md h-16 border-b border-zinc-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-3 text-zinc-600">
            <Menu size={24} className="cursor-pointer md:hidden" />
            <span className="font-bold text-lg text-zinc-900">AI Operational Copilot</span>
          </div>
          <Button variant="outline" size="icon" className="rounded-full relative">
            <Bell size={18} className="text-zinc-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </Button>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 overflow-y-auto space-y-8 pb-20">
          
          {/* AI Insights Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Pekerjaan Aktif Hari Ini</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-extrabold text-zinc-900 flex items-center gap-3">
                  <Briefcase size={28} className="text-blue-500"/> 23
                </div>
                <p className="text-sm text-zinc-500 mt-2 font-medium">Terdistribusi di 8 lokasi</p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50/30 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-red-600 uppercase tracking-wider">Peringatan Keterlambatan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-extrabold text-red-700 flex items-center gap-3">
                  <AlertTriangle size={28}/> 3 Berisiko
                </div>
                <p className="text-sm text-red-600 mt-2 font-medium">Lokasi C terlambat 3 hari berturut-turut</p>
              </CardContent>
            </Card>

            <Card className="border-teal-200 bg-teal-50/30 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-teal-700 uppercase tracking-wider">Rekomendasi AI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold text-teal-900 flex items-start gap-3">
                  <Activity size={24} className="mt-1 flex-shrink-0 text-teal-600"/>
                  <span className="leading-snug">Pindahkan 2 pekerjaan dari Teknisi A ke Teknisi B</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data Table */}
          <Card className="shadow-sm">
            <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 pb-6">
              <CardTitle className="text-xl text-zinc-900">Distribusi Beban Kerja (Workload Intelligence)</CardTitle>
              <CardDescription className="text-zinc-500">Analisis kapasitas otomatis berbasis data lapangan real-time.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="font-semibold text-zinc-900">Nama Karyawan</TableHead>
                    <TableHead className="font-semibold text-zinc-900">Tugas Aktif</TableHead>
                    <TableHead className="font-semibold text-zinc-900">Deadline Terdekat</TableHead>
                    <TableHead className="font-semibold text-zinc-900">AI Score</TableHead>
                    <TableHead className="font-semibold text-zinc-900">Status</TableHead>
                    <TableHead className="text-right font-semibold text-zinc-900">Tindakan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((emp) => (
                    <TableRow key={emp.id} className="hover:bg-zinc-50/80 transition-colors">
                      <TableCell className="font-medium">
                        <div className="text-zinc-900">{emp.name}</div>
                        <div className="text-xs text-zinc-500 font-normal mt-0.5">{emp.role}</div>
                      </TableCell>
                      <TableCell className="text-zinc-700">{emp.task}</TableCell>
                      <TableCell className="text-zinc-700">{emp.dl}</TableCell>
                      <TableCell>
                        <span className={`font-bold ${emp.score > 100 ? 'text-red-600' : 'text-zinc-900'}`}>
                          {emp.score}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={emp.status === 'Overload' ? 'destructive' : emp.status === 'Optimal' ? 'default' : 'secondary'} 
                               className={emp.status === 'Optimal' ? 'bg-teal-100 text-teal-800 hover:bg-teal-200' : ''}>
                          {emp.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant={emp.status === 'Overload' ? 'outline' : 'ghost'} size="sm" 
                                className={emp.status === 'Overload' ? 'text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 font-semibold' : 'text-zinc-600'}>
                          {emp.action}
                        </Button>
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