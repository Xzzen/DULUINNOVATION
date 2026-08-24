'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  Bell, 
  Menu, 
  Activity, 
  AlertTriangle, 
  Briefcase, 
  Settings,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Employee {
  id: string;
  name: string;
  role: string;
  task: number;
  dl: string;
  score: number;
  status: 'Overload' | 'Optimal' | 'Available';
  action: string;
}

export default function AICopilotDashboard() {
  const pathname = usePathname();

  const [employees, setEmployees] = useState<Employee[]>([
    { id: 'K01', name: 'Andi', role: 'Teknisi Lapangan', task: 12, dl: '1 Hari', score: 135, status: 'Overload', action: 'Reassign 2 Tasks' },
    { id: 'K02', name: 'Budi', role: 'Installer', task: 2, dl: '5 Hari', score: 30, status: 'Available', action: 'Ready for Task' },
    { id: 'K03', name: 'Citra', role: 'Maintenance', task: 8, dl: '3 Hari', score: 75, status: 'Optimal', action: 'Keep Pacing' },
  ]);

  const [isReassigned, setIsReassigned] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Fungsi simulasi Reassign AI Copilot
  const handleReassign = () => {
    setEmployees(prev => prev.map(emp => {
      if (emp.id === 'K01') {
        return { ...emp, task: 10, score: 95, status: 'Optimal', action: 'Keep Pacing' };
      }
      if (emp.id === 'K02') {
        return { ...emp, task: 4, score: 55, status: 'Optimal', action: 'Keep Pacing' };
      }
      return emp;
    }));
    setIsReassigned(true);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 6000);
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] text-zinc-900">
      
      {/* Sidebar - Duluin Ecosystem */}
      <aside className="w-72 bg-white border-r border-zinc-200 flex flex-col justify-between hidden md:flex shadow-sm z-10">
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
                <Link 
                  href="/" 
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-all ${
                    pathname === '/' 
                      ? 'bg-teal-50 text-teal-700 border border-teal-100/50 shadow-sm' 
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                  }`}
                >
                  <Activity size={18} /> AI Copilot
                </Link>
                <Link 
                  href="/workpulse" 
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all group ${
                    pathname === '/workpulse' 
                      ? 'bg-teal-50 text-teal-700 border border-teal-100/50 shadow-sm' 
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                  }`}
                >
                  <LayoutDashboard size={18} className="group-hover:text-teal-600 transition-colors" /> WorkPulse
                </Link>
              </nav>
            </div>

            {/* Menu Group 2: Operational */}
            <div>
              <div className="text-[11px] font-bold text-zinc-400 mb-2 px-3 tracking-widest uppercase">Operational</div>
              <nav className="space-y-1">
                <Link 
                  href="/fieldops" 
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all group ${
                    pathname === '/fieldops' 
                      ? 'bg-teal-50 text-teal-700 border border-teal-100/50 shadow-sm' 
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                  }`}
                >
                  <Users size={18} className="group-hover:text-teal-600 transition-colors" /> FieldOps
                  <span className="ml-auto bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-[10px] font-bold shadow-sm">3 Alert</span>
                </Link>
                <Link 
                  href="/vendorflow" 
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all group ${
                    pathname === '/vendorflow' 
                      ? 'bg-teal-50 text-teal-700 border border-teal-100/50 shadow-sm' 
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                  }`}
                >
                  <Briefcase size={18} className="group-hover:text-teal-600 transition-colors" /> VendorFlow
                </Link>
              </nav>
            </div>

            {/* Menu Group 3: Business */}
            <div>
              <div className="text-[11px] font-bold text-zinc-400 mb-2 px-3 tracking-widest uppercase">Business</div>
              <nav className="space-y-1">
                <Link 
                  href="/crm" 
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all group ${
                    pathname === '/crm' 
                      ? 'bg-teal-50 text-teal-700 border border-teal-100/50 shadow-sm' 
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                  }`}
                >
                  <CheckSquare size={18} className="group-hover:text-teal-600 transition-colors" /> CRM Pipeline
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md h-16 border-b border-zinc-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-3 text-zinc-600">
            <Menu size={24} className="cursor-pointer md:hidden" />
            <div>
              <h1 className="font-bold text-lg text-zinc-900 leading-none">AI Operational Copilot</h1>
              <p className="text-xs text-zinc-500 mt-1">Hierarchical Clustering & Workload Intelligence System</p>
            </div>
          </div>
          <Button variant="outline" size="icon" className="rounded-full relative">
            <Bell size={18} className="text-zinc-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </Button>
        </header>

        {/* Real-time Notification */}
        {showNotification && (
          <div className="bg-emerald-600 text-white px-8 py-3 flex items-center justify-between text-sm font-medium animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} />
              AI Copilot Berhasil Menyeimbangkan Beban Kerja! 2 Tugas dari Andi telah dialihkan ke Budi.
            </div>
            <button onClick={() => setShowNotification(false)} className="text-emerald-200 hover:text-white">
              <X size={16} />
            </button>
          </div>
        )}

        {/* Dashboard Content */}
        <div className="p-8 overflow-y-auto space-y-8 flex-1 pb-20">
          
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
                <p className="text-sm text-zinc-500 mt-2 font-medium">Terdistribusi di 8 lokasi klien</p>
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

            <Card className={`border-teal-200 shadow-sm hover:shadow-md transition-all ${isReassigned ? 'bg-emerald-50/30' : 'bg-teal-50/30'}`}>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold text-teal-700 uppercase tracking-wider">Rekomendasi AI Copilot</CardTitle>
                <Sparkles size={16} className="text-teal-600 animate-pulse" />
              </CardHeader>
              <CardContent>
                {!isReassigned ? (
                  <div>
                    <div className="text-base font-bold text-teal-950 flex items-start gap-2.5">
                      <Activity size={20} className="mt-0.5 flex-shrink-0 text-teal-600"/>
                      <span className="leading-snug">Pindahkan 2 pekerjaan dari Andi (135%) ke Budi (30%)</span>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={handleReassign}
                      className="mt-3 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold w-full"
                    >
                      Eksekusi Rekomendasi Sekarang
                    </Button>
                  </div>
                ) : (
                  <div className="text-base font-bold text-emerald-900 flex items-center gap-2 py-1">
                    <CheckCircle2 size={20} className="text-emerald-600"/>
                    <span>Seluruh beban kerja tim seimbang (Optimal).</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Data Table */}
          <Card className="shadow-sm border-zinc-200">
            <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 pb-6">
              <CardTitle className="text-xl text-zinc-900">Distribusi Beban Kerja (Workload Intelligence)</CardTitle>
              <CardDescription className="text-zinc-500">
                Klastering hierarkis real-time berdasarkan beban tugas aktif dan jarak tenggat waktu.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-zinc-200">
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
                    <TableRow key={emp.id} className="hover:bg-zinc-50/80 transition-colors border-zinc-100">
                      <TableCell className="font-medium">
                        <div className="text-zinc-900 font-semibold">{emp.name}</div>
                        <div className="text-xs text-zinc-500 font-normal mt-0.5">{emp.role}</div>
                      </TableCell>
                      <TableCell className="text-zinc-700 font-medium">{emp.task} Tugas</TableCell>
                      <TableCell className="text-zinc-700">{emp.dl}</TableCell>
                      <TableCell>
                        <span className={`font-bold ${emp.score > 100 ? 'text-red-600' : 'text-zinc-900'}`}>
                          {emp.score}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={emp.status === 'Overload' ? 'destructive' : emp.status === 'Optimal' ? 'default' : 'secondary'} 
                          className={emp.status === 'Optimal' ? 'bg-teal-100 text-teal-800 hover:bg-teal-200' : ''}
                        >
                          {emp.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant={emp.status === 'Overload' ? 'outline' : 'ghost'} 
                          size="sm" 
                          onClick={emp.status === 'Overload' ? handleReassign : undefined}
                          className={
                            emp.status === 'Overload' 
                              ? 'text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 font-semibold shadow-sm' 
                              : 'text-zinc-600'
                          }
                        >
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