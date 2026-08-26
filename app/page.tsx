'use client';

import React, { useState } from 'react';
import { Activity, AlertTriangle, Briefcase, Sparkles, CheckCircle2, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Import komponen yang baru dibuat
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

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
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 'K01', name: 'Andi', role: 'Teknisi Lapangan', task: 12, dl: '1 Hari', score: 135, status: 'Overload', action: 'Reassign 2 Tasks' },
    { id: 'K02', name: 'Budi', role: 'Installer', task: 2, dl: '5 Hari', score: 30, status: 'Available', action: 'Ready for Task' },
    { id: 'K03', name: 'Citra', role: 'Maintenance', task: 8, dl: '3 Hari', score: 75, status: 'Optimal', action: 'Keep Pacing' },
  ]);

  const [isReassigned, setIsReassigned] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleReassign = () => {
    setEmployees(prev => prev.map(emp => {
      if (emp.id === 'K01') return { ...emp, task: 10, score: 95, status: 'Optimal', action: 'Keep Pacing' };
      if (emp.id === 'K02') return { ...emp, task: 4, score: 55, status: 'Optimal', action: 'Keep Pacing' };
      return emp;
    }));
    setIsReassigned(true);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 6000);
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] text-zinc-900">
      
      {/* 1. Gunakan Sidebar di Sini */}
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* 2. Gunakan Header di Sini */}
        <Header 
          title="AI Operational Copilot" 
          subtitle="Hierarchical Clustering & Workload Intelligence System" 
        />

        {showNotification && (
          <div className="bg-emerald-600 text-white px-8 py-3 flex items-center justify-between text-sm font-medium animate-in fade-in slide-in-from-top-2 shrink-0">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} />
              AI Copilot Berhasil Menyeimbangkan Beban Kerja! 2 Tugas dari Andi telah dialihkan ke Budi.
            </div>
            <button onClick={() => setShowNotification(false)} className="text-emerald-200 hover:text-white">
              <X size={16} />
            </button>
          </div>
        )}

        <div className="p-8 overflow-y-auto space-y-8 flex-1 pb-20">
          {/* Sisa konten dashboard Anda (Card & Table) tetap sama persis seperti sebelumnya */}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ... Kartu Active Task ... */}
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

            {/* ... Kartu SLA Risk ... */}
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

            {/* ... Kartu AI Copilot ... */}
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
                    <Button size="sm" onClick={handleReassign} className="mt-3 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold w-full">
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

          <Card className="shadow-sm border-zinc-200">
            <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 pb-6">
              <CardTitle className="text-xl text-zinc-900">Distribusi Beban Kerja (Workload Intelligence)</CardTitle>
              <CardDescription className="text-zinc-500">Klastering hierarkis real-time berdasarkan beban tugas aktif dan jarak tenggat waktu.</CardDescription>
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
                        <span className={`font-bold ${emp.score > 100 ? 'text-red-600' : 'text-zinc-900'}`}>{emp.score}%</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={emp.status === 'Overload' ? 'destructive' : emp.status === 'Optimal' ? 'default' : 'secondary'} className={emp.status === 'Optimal' ? 'bg-teal-100 text-teal-800 hover:bg-teal-200' : ''}>
                          {emp.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant={emp.status === 'Overload' ? 'outline' : 'ghost'} size="sm" onClick={emp.status === 'Overload' ? handleReassign : undefined} className={emp.status === 'Overload' ? 'text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 font-semibold shadow-sm' : 'text-zinc-600'}>
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