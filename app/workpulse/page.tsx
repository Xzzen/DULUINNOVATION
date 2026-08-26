'use client';

import React, { useState } from 'react';
import { Clock, ArrowUpRight, CheckCircle2, AlertCircle, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Import komponen layout yang sudah kita buat
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export default function WorkPulsePage() {
  // Simulasi Data Job/SPK dari Database Prisma dengan Status Bahasa Indonesia
  const [jobs] = useState([
    { id: 'SPK-1029', client: 'PT Grand Graha Mall', title: 'Instalasi AC Central', assignee: 'Budi (Installer)', status: 'Sedang Dikerjakan', location: 'Makassar Pusat', deadline: 'Hari ini, 15:00' },
    { id: 'SPK-1030', client: 'RS Stella Maris', title: 'Deep Cleaning Steril', assignee: 'Citra (Maintenance)', status: 'Telah Ditugaskan', location: 'Pantai Losari', deadline: 'Besok, 10:00' },
    { id: 'SPK-1031', client: 'Hotel Aston', title: 'Inspeksi Genset', assignee: 'Belum Ditugaskan', status: 'Menunggu Penugasan', location: 'Perintis', deadline: 'Lusa, 14:00' },
    { id: 'SPK-1028', client: 'Logistik Nusantara', title: 'Pemasangan CCTV', assignee: 'Andi (Teknisi)', status: 'Selesai', location: 'Pelabuhan', deadline: 'Selesai' },
  ]);

  return (
    <div className="flex h-screen bg-[#f8fafc] text-zinc-900">
      
      {/* 1. Komponen Sidebar Terpusat */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* 2. Komponen Header Dinamis */}
        <Header 
          title="WorkPulse Dashboard" 
          subtitle="Pusat Komando & Penugasan Operasional Lapangan" 
        />

        <div className="p-8 overflow-y-auto space-y-8 flex-1 pb-20">
          
          {/* Quick Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-zinc-200 shadow-sm">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-xl"><Clock size={24}/></div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500">Menunggu Penugasan</p>
                  <p className="text-2xl font-extrabold text-zinc-900">1</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-zinc-200 shadow-sm">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><ArrowUpRight size={24}/></div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500">Sedang Dikerjakan</p>
                  <p className="text-2xl font-extrabold text-zinc-900">1</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-zinc-200 shadow-sm">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl"><CheckCircle2 size={24}/></div>
                <div>
                  <p className="text-sm font-semibold text-zinc-500">Selesai (Hari Ini)</p>
                  <p className="text-2xl font-extrabold text-zinc-900">1</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-red-200 bg-red-50/50 shadow-sm">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 bg-red-100 text-red-600 rounded-xl"><AlertCircle size={24}/></div>
                <div>
                  <p className="text-sm font-semibold text-red-600">Risiko Terlambat (SLA)</p>
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
              <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm">Perbarui Data</Button>
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
                        {job.status === 'Menunggu Penugasan' ? (
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
                          job.status === 'Sedang Dikerjakan' ? 'bg-blue-100 text-blue-700 border-transparent' :
                          job.status === 'Telah Ditugaskan' ? 'bg-zinc-100 text-zinc-700 border-transparent' :
                          job.status === 'Menunggu Penugasan' ? 'bg-amber-100 text-amber-700 border-transparent' :
                          'bg-emerald-100 text-emerald-700 border-transparent'
                        }>
                          {job.status}
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