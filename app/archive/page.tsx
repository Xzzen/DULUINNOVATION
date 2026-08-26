'use client';

import React, { useState } from 'react';
import { 
  FileText, Search, Filter, Download, FileCheck, 
  Calendar, Building2, HardDrive, MoreVertical, ChevronDown, CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Import Layout Components
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

interface Document {
  id: string;
  title: string;
  client: string;
  type: 'Kontrak' | 'SPK' | 'Berita Acara' | 'Invoice';
  date: string;
  size: string;
  status: 'Aktif' | 'Selesai' | 'Kedaluwarsa';
}

export default function ArchivePage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // 1. State Baru untuk Filter Kategori
  const [selectedType, setSelectedType] = useState<string>('Semua Kategori');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [documents] = useState<Document[]>([
    { id: 'DOC-2026-001', title: 'Kontrak Induk Maintenance AC (1 Tahun)', client: 'PT Grand Graha Mall', type: 'Kontrak', date: '12 Jan 2026', size: '2.4 MB', status: 'Aktif' },
    { id: 'DOC-2026-002', title: 'SPK-1029 Instalasi Router', client: 'PT Grand Graha Mall', type: 'SPK', date: '15 Jan 2026', size: '850 KB', status: 'Selesai' },
    { id: 'DOC-2026-003', title: 'Berita Acara Deep Cleaning', client: 'RS Stella Maris', type: 'Berita Acara', date: '20 Feb 2026', size: '1.1 MB', status: 'Selesai' },
    { id: 'DOC-2025-089', title: 'Kontrak Pengadaan CCTV', client: 'Logistik Nusantara', type: 'Kontrak', date: '10 Nov 2025', size: '3.2 MB', status: 'Kedaluwarsa' },
    { id: 'DOC-2026-004', title: 'Invoice INV-0045 Termin 1', client: 'Hotel Aston', type: 'Invoice', date: '01 Mar 2026', size: '450 KB', status: 'Aktif' },
  ]);

  // 2. Logika Pemfilteran Ganda (Search Text + Kategori)
  const filteredDocs = documents.filter(doc => {
    // Cek kecocokan teks pencarian
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      doc.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Cek kecocokan kategori dropdown
    const matchesType = selectedType === 'Semua Kategori' || doc.type === selectedType;

    // Tampilkan hanya jika keduanya cocok
    return matchesSearch && matchesType;
  });

  const getBadgeColor = (type: Document['type']) => {
    switch (type) {
      case 'Kontrak': return 'bg-purple-100 text-purple-700 border-transparent';
      case 'SPK': return 'bg-blue-100 text-blue-700 border-transparent';
      case 'Berita Acara': return 'bg-emerald-100 text-emerald-700 border-transparent';
      case 'Invoice': return 'bg-amber-100 text-amber-700 border-transparent';
      default: return 'bg-zinc-100 text-zinc-700';
    }
  };

  const categories = ['Semua Kategori', 'Kontrak', 'SPK', 'Berita Acara', 'Invoice'];

  return (
    <div className="flex h-screen bg-[#f8fafc] text-zinc-900">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <Header title="Arsip & Dokumen" subtitle="Penyimpanan terpusat untuk kontrak, SPK, dan laporan pekerjaan">
          <Button className="bg-zinc-900 hover:bg-zinc-800 text-white gap-2 font-bold shadow-md">
            <HardDrive size={18} /> Cadangkan Data (Backup)
          </Button>
        </Header>

        <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 pb-20">
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
            {/* Input Pencarian Teks */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari nomor dokumen, klien, atau judul..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-teal-500 outline-none text-sm transition-all"
              />
            </div>
            
            {/* 3. Dropdown Filter Kategori Interaktif */}
            <div className="relative w-full md:w-auto">
              <Button 
                variant="outline" 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`gap-2 border-zinc-300 w-full md:w-auto justify-between transition-colors ${isFilterOpen ? 'ring-2 ring-teal-500 border-transparent' : 'text-zinc-600'}`}
              >
                <div className="flex items-center gap-2">
                  <Filter size={16} className={selectedType !== 'Semua Kategori' ? 'text-teal-600' : ''} /> 
                  <span className={selectedType !== 'Semua Kategori' ? 'font-bold text-teal-700' : ''}>
                    {selectedType}
                  </span>
                </div>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : 'opacity-50'}`} />
              </Button>

              {/* Menu Dropdown Popup */}
              {isFilterOpen && (
                <>
                  {/* Backdrop invisible untuk mendeteksi klik di luar menu */}
                  <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)}></div>
                  
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-zinc-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <div className="p-1">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedType(cat);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm rounded-lg transition-colors flex items-center justify-between
                            ${selectedType === cat 
                              ? 'font-bold text-teal-700 bg-teal-50' 
                              : 'text-zinc-700 hover:bg-zinc-100 font-medium'}`}
                        >
                          {cat}
                          {selectedType === cat && <CheckCircle2 size={16} className="text-teal-600" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <Card className="shadow-sm border-zinc-200">
            <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 pb-4">
              <CardTitle className="text-lg text-zinc-900 flex items-center gap-2">
                <FileCheck size={20} className="text-teal-600" /> Daftar Dokumen Digital
              </CardTitle>
              <CardDescription>Semua dokumen yang di-generate dari CRM Pipeline dan FieldOps.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-white">
                  <TableRow>
                    <TableHead className="font-bold text-zinc-900">Nama Dokumen</TableHead>
                    <TableHead className="font-bold text-zinc-900">Klien</TableHead>
                    <TableHead className="font-bold text-zinc-900">Kategori</TableHead>
                    <TableHead className="font-bold text-zinc-900">Tanggal Terbit</TableHead>
                    <TableHead className="text-right font-bold text-zinc-900">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocs.length > 0 ? filteredDocs.map((doc) => (
                    <TableRow key={doc.id} className="hover:bg-zinc-50/80 transition-colors group">
                      <TableCell>
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-zinc-100 rounded-lg text-zinc-500 group-hover:text-teal-600 group-hover:bg-teal-50 transition-colors">
                            <FileText size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-zinc-900 leading-snug">{doc.title}</p>
                            <p className="text-xs text-zinc-500 mt-0.5 flex items-center gap-2">
                              <span>{doc.id}</span> • <span>{doc.size}</span>
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-sm font-medium text-zinc-700">
                          <Building2 size={14} className="text-teal-600" /> {doc.client}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getBadgeColor(doc.type)}>
                          {doc.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-sm text-zinc-600">
                          <Calendar size={14} /> {doc.date}
                        </div>
                        {doc.status === 'Kedaluwarsa' && (
                          <span className="text-[10px] font-bold text-red-500 mt-1 block">Kontrak Berakhir</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-teal-600 hover:bg-teal-50" title="Unduh PDF">
                            <Download size={18} />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-900">
                            <MoreVertical size={18} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-40 text-center">
                        <div className="flex flex-col items-center justify-center text-zinc-400 gap-2">
                          <Filter size={32} className="opacity-50" />
                          <p className="font-medium text-sm">Tidak ada dokumen yang cocok dengan filter saat ini.</p>
                          <Button variant="link" onClick={() => {setSearchQuery(''); setSelectedType('Semua Kategori');}} className="text-teal-600 h-auto p-0">
                            Reset Filter
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}