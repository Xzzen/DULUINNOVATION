'use client';

import React, { useState } from 'react';
import { 
  MapPin, Camera, CheckCircle2, Clock, ChevronLeft, Navigation, 
  Image as ImageIcon, CheckSquare, AlertCircle, Smartphone, Monitor, 
  UserCheck, ShieldCheck, XCircle, Search, Map, Briefcase, 
  PlayCircle, FileText, UploadCloud, Coffee, FileSpreadsheet
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Import Layout Components
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export default function FieldOpsPage() {
  // ==========================================
  // STATE: PENGALIH ROLE (ADA 3 TAMPILAN)
  // ==========================================
  const [viewRole, setViewRole] = useState<'admin' | 'technician' | 'office'>('admin');

  // ==========================================
  // VIEW 1: TEKNISI LAPANGAN (MOBILE)
  // ==========================================
  const TechnicianMobileView = () => {
    const [jobStatus, setJobStatus] = useState<'PENDING' | 'IN_PROGRESS' | 'COMPLETED'>('PENDING');
    const [hasPhoto, setHasPhoto] = useState(false);
    const [tasks, setTasks] = useState([
      { id: 1, text: 'Verifikasi jalur kabel optik utama', done: false },
      { id: 2, text: 'Pemasangan & konfigurasi Router', done: false },
      { id: 3, text: 'Uji kecepatan jaringan (Ping Test)', done: false },
    ]);

    const completedTasks = tasks.filter(t => t.done).length;
    const progressPercent = Math.round((completedTasks / tasks.length) * 100);
    const isReadyToComplete = progressPercent === 100 && hasPhoto;

    const toggleTask = (id: number) => {
      if (jobStatus !== 'IN_PROGRESS') return;
      setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    return (
      <div className="min-h-screen bg-zinc-800 flex justify-center font-sans py-4">
        <div className="w-full max-w-[400px] h-[850px] bg-white relative flex flex-col shadow-2xl overflow-hidden rounded-[2.5rem] border-[8px] border-zinc-900 ring-4 ring-zinc-700">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 rounded-b-2xl z-50"></div>
          
          <header className="bg-white/90 backdrop-blur-md px-5 pt-10 pb-4 flex items-center justify-between border-b border-zinc-100 sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <button className="p-2 -ml-2 rounded-full hover:bg-zinc-100 text-zinc-600 transition-colors">
                <ChevronLeft size={24} />
              </button>
              <div className="flex flex-col">
                <h1 className="text-base font-bold text-zinc-900 leading-tight">SPK-1029</h1>
                <p className="text-[11px] font-medium text-teal-600">Instalasi Jaringan</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${jobStatus === 'PENDING' ? 'bg-amber-100 text-amber-700' : jobStatus === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {jobStatus === 'PENDING' ? 'Menunggu' : jobStatus === 'IN_PROGRESS' ? 'Berjalan' : 'Selesai'}
            </div>
          </header>

          <main className="flex-1 overflow-y-auto pb-32">
            <div className="p-5">
              <div className="bg-zinc-900 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <h2 className="text-xl font-extrabold mb-1">PT Grand Graha Mall</h2>
                <p className="text-zinc-400 text-sm mb-6 flex items-center gap-2">
                  <Clock size={14} className="text-amber-400" /> Deadline: 15:00 WITA
                </p>
                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white/20 rounded-full shrink-0"><MapPin size={16} className="text-white" /></div>
                    <div>
                      <p className="text-sm font-semibold leading-snug">Gedung Sudirman, Lt. 4</p>
                      <p className="text-xs text-teal-300 mt-1 font-medium flex items-center gap-1">
                        {jobStatus === 'PENDING' ? <><Navigation size={12} className="animate-pulse"/> 1.2 km dari lokasimu</> : <><MapPin size={12}/> Titik GPS Terverifikasi</>}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 space-y-6">
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-2"><CheckSquare size={18} className="text-teal-600"/> Scope-Lock Checklist</h3>
                  <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-md">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-100 rounded-full mb-4 overflow-hidden">
                  <div className="h-full bg-teal-500 transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }}></div>
                </div>
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div key={task.id} onClick={() => toggleTask(task.id)} className={`flex items-start gap-3 p-3.5 rounded-2xl border-2 transition-all duration-200 select-none ${jobStatus === 'PENDING' ? 'bg-zinc-50 border-zinc-100 opacity-60 cursor-not-allowed' : task.done ? 'bg-teal-50/50 border-teal-500 cursor-pointer' : 'bg-white border-zinc-200 cursor-pointer hover:border-teal-300'}`}>
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 shrink-0 ${task.done ? 'bg-teal-500 border-teal-500 text-white' : 'border-zinc-300'}`}>
                        {task.done && <CheckCircle2 size={14} strokeWidth={3} />}
                      </div>
                      <span className={`text-sm font-semibold ${task.done ? 'text-zinc-400 line-through' : 'text-zinc-800'}`}>{task.text}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-2 mb-3"><Camera size={18} className="text-teal-600"/> Bukti Penyelesaian (Wajib)</h3>
                {!hasPhoto ? (
                  <button onClick={() => { if(jobStatus!=='PENDING') setHasPhoto(true) }} disabled={jobStatus === 'PENDING'} className={`w-full flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl gap-2 transition-all ${jobStatus === 'PENDING' ? 'border-zinc-200 bg-zinc-50 text-zinc-400 cursor-not-allowed' : 'border-zinc-300 bg-zinc-50 text-zinc-600 cursor-pointer hover:border-teal-400 hover:bg-teal-50/50'}`}>
                    <div className="p-3 bg-white rounded-full shadow-sm"><Camera size={24} className={jobStatus === 'PENDING' ? 'text-zinc-300' : 'text-teal-600'} /></div>
                    <span className="text-sm font-bold mt-1">Ambil Foto Hasil Kerja</span>
                  </button>
                ) : (
                  <div className="relative w-full h-40 bg-zinc-900 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-teal-900/40 flex items-center justify-center"><ImageIcon size={40} className="text-white/50" /></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                      <div>
                        <p className="text-white text-xs font-bold flex items-center gap-1"><CheckCircle2 size={12} className="text-emerald-400"/> Tersimpan</p>
                        <p className="text-zinc-300 text-[10px] mt-0.5">Akurasi GPS: Tinggi</p>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            </div>
          </main>

          <div className="absolute bottom-0 w-full bg-white border-t border-zinc-100 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)] z-20 pb-8 pt-4 px-5">
            {jobStatus === 'PENDING' ? (
              <Button onClick={() => setJobStatus('IN_PROGRESS')} className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-[15px] h-14 rounded-2xl shadow-xl flex items-center gap-2">
                <MapPin size={20} /> Check-In Lokasi Sekarang
              </Button>
            ) : jobStatus === 'IN_PROGRESS' ? (
              <Button onClick={() => setJobStatus('COMPLETED')} disabled={!isReadyToComplete} className={`w-full font-bold text-[15px] h-14 rounded-2xl flex items-center gap-2 ${isReadyToComplete ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg' : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'}`}>
                <CheckCircle2 size={20} /> Lapor Pekerjaan Selesai
              </Button>
            ) : (
              <div className="w-full bg-emerald-50 text-emerald-700 border-2 border-emerald-500/20 font-bold text-[15px] h-14 rounded-2xl flex justify-center items-center gap-2">
                <CheckCircle2 size={22} className="text-emerald-600" /> Berhasil Terkirim!
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // VIEW 2: PEGAWAI KANTORAN (DESKTOP DESKOPS)
  // ==========================================
  const OfficeDesktopView = () => {
    const [shiftStatus, setShiftStatus] = useState<'NOT_STARTED' | 'WORKING' | 'ENDED'>('NOT_STARTED');
    const [fileUploaded, setFileUploaded] = useState(false);
    const [officeTasks, setOfficeTasks] = useState([
      { id: 1, text: 'Verifikasi BAST (Berita Acara) SPK-1028', done: false },
      { id: 2, text: 'Generate & Terbitkan Invoice ke PT Maju Jaya', done: false },
      { id: 3, text: 'Kirim Invoice via Email', done: false },
    ]);

    const completedCount = officeTasks.filter(t => t.done).length;
    const isReadyToSubmit = completedCount === officeTasks.length && fileUploaded;

    const toggleTask = (id: number) => {
      if (shiftStatus !== 'WORKING') return;
      setOfficeTasks(officeTasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    return (
      <div className="flex h-screen bg-[#f8fafc] text-zinc-900 w-full">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden relative">
          <Header title="DeskOps Dashboard" subtitle="Ruang Kerja Karyawan Administrasi & Back-Office">
            <Button variant="outline" className="gap-2 text-zinc-600 border-zinc-300 font-bold">
              <Coffee size={16} /> Ajukan Cuti/Izin
            </Button>
          </Header>

          <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 pb-20">
            {/* Shift Status Card */}
            <Card className={`shadow-sm border-2 transition-colors ${shiftStatus === 'WORKING' ? 'border-teal-400 bg-teal-50/20' : 'border-zinc-200 bg-white'}`}>
              <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl ${shiftStatus === 'WORKING' ? 'bg-teal-100 text-teal-600' : 'bg-zinc-100 text-zinc-500'}`}>
                    <Clock size={32} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900">
                      {shiftStatus === 'NOT_STARTED' ? 'Anda belum memulai shift hari ini.' : shiftStatus === 'WORKING' ? 'Shift Sedang Berjalan' : 'Shift Hari Ini Selesai'}
                    </h2>
                    <p className="text-sm text-zinc-500 mt-1">
                      {shiftStatus === 'WORKING' ? 'Waktu tercatat melalui IP Jaringan Kantor' : 'Silakan mulai shift untuk membuka daftar tugas harian Anda.'}
                    </p>
                  </div>
                </div>
                
                {shiftStatus === 'NOT_STARTED' && (
                  <Button onClick={() => setShiftStatus('WORKING')} className="bg-teal-600 hover:bg-teal-700 text-white font-bold h-12 px-8 rounded-xl shadow-md gap-2">
                    <PlayCircle size={20} /> Mulai Shift (Clock-in)
                  </Button>
                )}
                {shiftStatus === 'WORKING' && (
                  <Button variant="outline" onClick={() => setShiftStatus('ENDED')} className="text-red-600 border-red-200 hover:bg-red-50 font-bold h-12 px-8 rounded-xl gap-2">
                    Akhiri Shift Sekarang
                  </Button>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kolom 1: Checklist Tugas Kantoran */}
              <Card className="shadow-sm border-zinc-200">
                <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 pb-4">
                  <CardTitle className="text-base font-bold text-zinc-900 flex items-center gap-2">
                    <CheckSquare size={18} className="text-teal-600"/> Daftar Tugas Administrasi
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  {officeTasks.map((task) => (
                    <div 
                      key={task.id} 
                      onClick={() => toggleTask(task.id)} 
                      className={`flex items-center gap-3 p-4 rounded-xl border transition-all select-none
                        ${shiftStatus === 'NOT_STARTED' ? 'bg-zinc-50 border-zinc-100 opacity-50 cursor-not-allowed' : 
                          task.done ? 'bg-teal-50 border-teal-200 cursor-pointer' : 'bg-white border-zinc-200 cursor-pointer hover:border-teal-300'}`}
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center border-2 shrink-0 transition-colors
                        ${task.done ? 'bg-teal-500 border-teal-500 text-white' : 'border-zinc-300'}`}>
                        {task.done && <CheckCircle2 size={14} />}
                      </div>
                      <span className={`text-sm font-medium ${task.done ? 'text-zinc-500 line-through' : 'text-zinc-800'}`}>
                        {task.text}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Kolom 2: Upload File / Dokumen */}
              <Card className="shadow-sm border-zinc-200">
                <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 pb-4">
                  <CardTitle className="text-base font-bold text-zinc-900 flex items-center gap-2">
                    <UploadCloud size={18} className="text-teal-600"/> Laporan / Bukti Dokumen
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  {!fileUploaded ? (
                    <button 
                      disabled={shiftStatus !== 'WORKING'}
                      onClick={() => shiftStatus === 'WORKING' && setFileUploaded(true)}
                      className={`w-full flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-2xl gap-3 transition-all
                        ${shiftStatus !== 'WORKING' ? 'border-zinc-200 bg-zinc-50 text-zinc-400 cursor-not-allowed' : 'border-zinc-300 bg-white text-zinc-600 hover:border-teal-400 hover:bg-teal-50/30'}`}
                    >
                      <FileSpreadsheet size={40} className={shiftStatus !== 'WORKING' ? 'text-zinc-300' : 'text-teal-600'} />
                      <div className="text-center">
                        <span className="text-sm font-bold block mb-1">Upload Laporan (PDF/Excel)</span>
                        <span className="text-xs font-medium text-zinc-400">Klik atau drag & drop file ke sini</span>
                      </div>
                    </button>
                  ) : (
                    <div className="bg-white border border-teal-200 rounded-2xl p-5 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl"><FileText size={24} /></div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-zinc-900 leading-tight">Draft_Invoice_PT_Maju_Jaya.pdf</p>
                          <p className="text-xs text-zinc-500 mt-1">245 KB • Berhasil diunggah</p>
                        </div>
                        <button onClick={() => setFileUploaded(false)} className="text-xs font-bold text-red-500 hover:bg-red-50 px-2 py-1 rounded">Hapus</button>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 pt-4 border-t border-zinc-100">
                    <Button 
                      disabled={!isReadyToSubmit || shiftStatus !== 'WORKING'}
                      className={`w-full h-12 font-bold text-sm rounded-xl transition-all gap-2
                        ${isReadyToSubmit ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-md' : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'}`}
                    >
                      <CheckCircle2 size={18} /> Simpan Pekerjaan & Arsipkan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    );
  };

  // ==========================================
  // VIEW 3: ADMIN DISPATCHER (DESKTOP)
  // ==========================================
  const AdminDesktopView = () => {
    return (
      <div className="flex h-screen bg-[#f8fafc] text-zinc-900 w-full">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden relative">
          <Header title="FieldOps Command Center" subtitle="Pemantauan live GPS dan verifikasi bukti kerja lapangan">
            <Button variant="outline" className="gap-2 text-zinc-600 border-zinc-300 font-bold">
              <Map size={16} /> Buka Peta Full-Screen
            </Button>
          </Header>

          <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 pb-20">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="shadow-sm border-zinc-200">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><UserCheck size={24}/></div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-500">Teknisi Aktif Lapangan</p>
                    <p className="text-2xl font-extrabold text-zinc-900">8 / 12 <span className="text-xs font-medium text-zinc-500">Personil</span></p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-sm border-teal-200 bg-teal-50/30">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="p-3 bg-teal-100 text-teal-600 rounded-xl"><ShieldCheck size={24}/></div>
                  <div>
                    <p className="text-sm font-semibold text-teal-700">Bukti Perlu Diverifikasi</p>
                    <p className="text-2xl font-extrabold text-teal-900">2 <span className="text-xs font-medium text-teal-600">Dokumen</span></p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-sm border-zinc-200">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="p-3 bg-red-100 text-red-600 rounded-xl"><AlertCircle size={24}/></div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-500">Peringatan GPS Hilang</p>
                    <p className="text-2xl font-extrabold text-zinc-900">0</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Kolom Kiri: Tabel Live Tracking */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="shadow-sm border-zinc-200">
                  <CardHeader className="border-b border-zinc-100 bg-white pb-4 flex flex-row items-center justify-between">
                    <CardTitle className="text-base font-bold text-zinc-900 flex items-center gap-2">
                      <MapPin size={18} className="text-teal-600"/> Live Tracking Teknisi
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-zinc-50">
                        <TableRow>
                          <TableHead className="font-bold text-zinc-900">Personil</TableHead>
                          <TableHead className="font-bold text-zinc-900">Status & Lokasi GPS</TableHead>
                          <TableHead className="font-bold text-zinc-900">Tugas Saat Ini</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="hover:bg-zinc-50/50">
                          <TableCell className="font-bold text-zinc-900">Budi Santoso <span className="block font-normal text-xs text-zinc-500">Installer</span></TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-transparent mb-1">Di Lokasi (Checked-in)</Badge>
                            <div className="text-xs text-zinc-500 flex items-center gap-1"><MapPin size={10}/> PT Grand Graha Mall</div>
                          </TableCell>
                          <TableCell className="text-sm font-medium text-zinc-700">SPK-1029 (Instalasi AC)</TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-zinc-50/50">
                          <TableCell className="font-bold text-zinc-900">Citra Amelia <span className="block font-normal text-xs text-zinc-500">Maintenance</span></TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-blue-100 text-blue-700 border-transparent mb-1">Dalam Perjalanan</Badge>
                            <div className="text-xs text-zinc-500 flex items-center gap-1"><MapPin size={10}/> Menuju RS Stella Maris</div>
                          </TableCell>
                          <TableCell className="text-sm font-medium text-zinc-700">SPK-1030 (Deep Cleaning)</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {/* Kolom Kanan: Verifikasi Bukti Foto (TOMBOL SUDAH DIPERBAIKI DENGAN GRID) */}
              <div className="space-y-6">
                <Card className="shadow-sm border-teal-200">
                  <CardHeader className="border-b border-teal-100 bg-teal-50/30 pb-4">
                    <CardTitle className="text-base font-bold text-teal-800 flex items-center gap-2">
                      <Camera size={18}/> Antrean Verifikasi
                    </CardTitle>
                    <p className="text-xs text-zinc-500 mt-1">Setujui bukti untuk menerbitkan Invoice.</p>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    
                    {/* Item Bukti 1 */}
                    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="h-32 bg-zinc-200 relative flex items-center justify-center">
                        <ImageIcon size={32} className="text-zinc-400" />
                        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded font-medium">GPS Matched</div>
                      </div>
                      <div className="p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-xs font-bold text-zinc-900">SPK-1028 (Andi)</p>
                            <p className="text-[10px] text-zinc-500">Logistik Nusantara</p>
                          </div>
                          <span className="text-[10px] bg-zinc-100 px-1.5 py-0.5 rounded font-bold text-zinc-600">100% Checklist</span>
                        </div>
                        
                        {/* PERBAIKAN TOMBOL: Menggunakan Grid agar dibagi persis 50% */}
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <Button size="sm" variant="outline" className="w-full text-xs px-0 text-red-600 border-red-200 hover:bg-red-50">
                            <XCircle size={14} className="mr-1"/> Tolak
                          </Button>
                          <Button size="sm" className="w-full text-xs px-0 bg-teal-600 hover:bg-teal-700 text-white">
                            <CheckCircle2 size={14} className="mr-1"/> Setujui
                          </Button>
                        </div>
                        
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  };

  // ==========================================
  // RENDER UTAMA DENGAN TOGGLE DI ATAS
  // ==========================================
  return (
    <div className="flex flex-col min-h-screen bg-zinc-100">
      
      {/* TOGGLE BAR UNTUK DEMO PROTOTIPE */}
      <div className="bg-zinc-900 text-white py-3 px-4 md:px-6 flex flex-col md:flex-row items-start md:items-center justify-between text-sm z-50 shadow-md gap-3">
        <div className="flex items-center gap-2 font-medium shrink-0">
          <ShieldCheck size={16} className="text-teal-400" /> Mode Peninjau Prototipe
        </div>
        <div className="flex flex-wrap md:flex-nowrap bg-zinc-800 rounded-lg p-1 gap-1 w-full md:w-auto">
          <button 
            onClick={() => setViewRole('admin')} 
            className={`flex-1 md:flex-none flex justify-center items-center gap-2 px-3 py-1.5 rounded-md text-[11px] md:text-xs font-bold transition-all ${viewRole === 'admin' ? 'bg-teal-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white hover:bg-zinc-700'}`}
          >
            <Monitor size={14} /> Admin Dispatch
          </button>
          <button 
            onClick={() => setViewRole('technician')} 
            className={`flex-1 md:flex-none flex justify-center items-center gap-2 px-3 py-1.5 rounded-md text-[11px] md:text-xs font-bold transition-all ${viewRole === 'technician' ? 'bg-teal-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white hover:bg-zinc-700'}`}
          >
            <Smartphone size={14} /> Teknisi Mobile
          </button>
          <button 
            onClick={() => setViewRole('office')} 
            className={`flex-1 md:flex-none flex justify-center items-center gap-2 px-3 py-1.5 rounded-md text-[11px] md:text-xs font-bold transition-all ${viewRole === 'office' ? 'bg-teal-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white hover:bg-zinc-700'}`}
          >
            <Briefcase size={14} /> Staff Kantor
          </button>
        </div>
      </div>

      {/* Tampilkan komponen berdasarkan state */}
      {viewRole === 'admin' ? <AdminDesktopView /> : viewRole === 'technician' ? <TechnicianMobileView /> : <OfficeDesktopView />}
      
    </div>
  );
}