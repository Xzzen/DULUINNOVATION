'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Camera,
  CheckCircle2,
  Clock,
  ChevronLeft,
  Navigation,
  Image as ImageIcon,
  CheckSquare,
  AlertCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function FieldOpsMobile() {
  const [jobStatus, setJobStatus] = useState<'PENDING' | 'IN_PROGRESS' | 'COMPLETED'>('PENDING');
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Verifikasi jalur kabel optik utama', done: false },
    { id: 2, text: 'Pemasangan & konfigurasi Router', done: false },
    { id: 3, text: 'Uji kecepatan jaringan (Ping Test)', done: false },
  ]);
  const [hasPhoto, setHasPhoto] = useState(false);

  const completedTasks = tasks.filter(t => t.done).length;
  const progressPercent = Math.round((completedTasks / tasks.length) * 100);
  const isReadyToComplete = progressPercent === 100 && hasPhoto;

  const toggleTask = (id: number) => {
    if (jobStatus !== 'IN_PROGRESS') return;
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handlePhotoUpload = () => {
    if (jobStatus !== 'IN_PROGRESS') return;
    setHasPhoto(true);
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex justify-center font-sans">
      <div className="w-full max-w-md bg-white min-h-screen relative flex flex-col shadow-2xl overflow-hidden selection:bg-teal-100">

        {/* App Header */}
        <header className="bg-white/90 backdrop-blur-md px-5 py-4 flex items-center justify-between border-b border-zinc-100 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button className="p-2 -ml-2 rounded-full hover:bg-zinc-100 text-zinc-600 transition-colors">
              <ChevronLeft size={24} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-base font-bold text-zinc-900 leading-tight">SPK-1029</h1>
              <p className="text-[11px] font-medium text-teal-600">Instalasi Jaringan</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${jobStatus === 'PENDING' ? 'bg-amber-100 text-amber-700' :
              jobStatus === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' :
                'bg-emerald-100 text-emerald-700'
            }`}>
            {jobStatus === 'PENDING' ? 'Menunggu' : jobStatus === 'IN_PROGRESS' ? 'Berjalan' : 'Selesai'}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-32">

          {/* Hero Task Info */}
          <div className="p-5">
            <div className="bg-zinc-900 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>

              <h2 className="text-xl font-extrabold mb-1">PT Grand Graha Mall</h2>
              <p className="text-zinc-400 text-sm mb-6 flex items-center gap-2">
                <Clock size={14} className="text-amber-400" /> Deadline: Hari ini, 15:00
              </p>

              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/20 rounded-full shrink-0">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-snug">Gedung Sudirman, Lantai 4, Ruang Server A</p>
                    <p className="text-xs text-teal-300 mt-1 font-medium flex items-center gap-1">
                      {jobStatus === 'PENDING' ? (
                        <>
                          <Navigation size={12} className="animate-pulse" /> 1.2 km dari lokasimu
                        </>
                      ) : (
                        <>
                          <MapPin size={12} /> Titik GPS Terverifikasi (Di Lokasi)
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 space-y-8">

            {/* Checklist Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-2">
                  <CheckSquare size={18} className="text-teal-600" /> Scope-Lock Checklist
                </h3>
                <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-md">
                  {progressPercent}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-zinc-100 rounded-full mb-4 overflow-hidden">
                <div
                  className="h-full bg-teal-500 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all duration-200 select-none
                      ${jobStatus === 'PENDING' ? 'bg-zinc-50 border-zinc-100 opacity-60 cursor-not-allowed' :
                        task.done ? 'bg-teal-50/50 border-teal-500 cursor-pointer shadow-sm' :
                          'bg-white border-zinc-200 cursor-pointer hover:border-teal-300'
                      }
                    `}
                  >
                    <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 shrink-0 transition-colors
                      ${task.done ? 'bg-teal-500 border-teal-500 text-white' : 'border-zinc-300 bg-transparent'}
                    `}>
                      {task.done && <CheckCircle2 size={16} strokeWidth={3} />}
                    </div>
                    <span className={`text-sm font-semibold transition-all ${task.done ? 'text-zinc-400 line-through' : 'text-zinc-800'}`}>
                      {task.text}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Photo Proof Section */}
            <section>
              <h3 className="font-bold text-zinc-900 text-sm flex items-center gap-2 mb-4">
                <Camera size={18} className="text-teal-600" /> Bukti Penyelesaian (Wajib)
              </h3>

              {!hasPhoto ? (
                <button
                  onClick={handlePhotoUpload}
                  disabled={jobStatus === 'PENDING'}
                  className={`w-full flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl gap-3 transition-all
                  ${jobStatus === 'PENDING'
                      ? 'border-zinc-200 bg-zinc-50 text-zinc-400 cursor-not-allowed'
                      : 'border-zinc-300 bg-zinc-50 text-zinc-600 cursor-pointer hover:border-teal-400 hover:bg-teal-50/50'
                    }`}
                >
                  <div className="p-4 bg-white rounded-full shadow-sm">
                    <Camera size={28} className={jobStatus === 'PENDING' ? 'text-zinc-300' : 'text-teal-600'} />
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-bold block mb-1">Ambil Foto Hasil Kerja</span>
                    <span className="text-xs font-medium text-zinc-400">Pastikan area kerja terlihat jelas</span>
                  </div>
                </button>
              ) : (
                <div className="relative w-full h-48 bg-zinc-900 rounded-2xl overflow-hidden group">
                  {/* Simulasi Gambar Terupload */}
                  <div className="absolute inset-0 bg-teal-900/40 flex items-center justify-center">
                    <ImageIcon size={48} className="text-white/50" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <p className="text-white text-sm font-bold flex items-center gap-1">
                        <CheckCircle2 size={14} className="text-emerald-400" /> Foto Tersimpan
                      </p>
                      <p className="text-zinc-300 text-xs mt-0.5">14:32 WITA • Akurasi GPS: Tinggi</p>
                    </div>
                    <button onClick={() => setHasPhoto(false)} className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg backdrop-blur-md transition-colors font-semibold">
                      Ubah
                    </button>
                  </div>
                </div>
              )}
            </section>

          </div>
        </main>

        {/* Sticky Action Bottom Bar */}
        <div className="absolute bottom-0 w-full bg-white border-t border-zinc-100 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)] z-20 pb-safe">
          <div className="p-5">
            {jobStatus === 'PENDING' ? (
              <Button
                onClick={() => setJobStatus('IN_PROGRESS')}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-[15px] h-14 rounded-2xl shadow-xl transition-transform active:scale-[0.98] flex items-center gap-2"
              >
                <MapPin size={20} />
                Check-In Lokasi Sekarang
              </Button>
            ) : jobStatus === 'IN_PROGRESS' ? (
              <div className="space-y-3">
                {!isReadyToComplete && (
                  <p className="text-[11px] text-amber-600 font-bold text-center flex items-center justify-center gap-1">
                    <AlertCircle size={14} /> Selesaikan semua checklist & foto sebelum melapor.
                  </p>
                )}
                <Button
                  onClick={() => setJobStatus('COMPLETED')}
                  disabled={!isReadyToComplete}
                  className={`w-full font-bold text-[15px] h-14 rounded-2xl shadow-lg transition-all active:scale-[0.98] flex items-center gap-2
                    ${isReadyToComplete
                      ? 'bg-teal-600 hover:bg-teal-700 text-white'
                      : 'bg-zinc-100 text-zinc-400 cursor-not-allowed shadow-none'
                    }`}
                >
                  <CheckCircle2 size={20} />
                  Lapor Pekerjaan Selesai
                </Button>
              </div>
            ) : (
              <div className="w-full bg-emerald-50 text-emerald-700 border-2 border-emerald-500/20 font-bold text-[15px] h-14 rounded-2xl flex justify-center items-center gap-2">
                <CheckCircle2 size={22} className="text-emerald-600" />
                Tugas Berhasil Terkirim!
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}