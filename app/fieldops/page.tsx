'use client';
import React, { useState } from 'react';
import { MapPin, Camera, CheckCircle, Clock, ChevronLeft, Upload } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function FieldOpsMobile() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-100 flex justify-center font-sans">
      {/* Mobile Frame Simulation */}
      <div className="w-full max-w-md bg-white min-h-screen relative flex flex-col shadow-2xl overflow-hidden">
        
        {/* App Header */}
        <header className="bg-white text-zinc-900 p-4 flex items-center justify-between border-b border-zinc-200 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <ChevronLeft size={24} className="cursor-pointer text-zinc-500 hover:text-zinc-900 transition-colors" />
            <h1 className="text-lg font-bold tracking-tight">Detail Pekerjaan</h1>
          </div>
          <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200 font-bold">
            JOB-892
          </Badge>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-5 overflow-y-auto pb-32 space-y-6">
          
          {/* Task Info Card */}
          <Card className="border-teal-100 bg-gradient-to-br from-teal-50 to-white shadow-sm">
            <CardContent className="p-5">
              <h2 className="font-extrabold text-zinc-900 text-xl mb-1">Instalasi Router WiFi</h2>
              <p className="text-zinc-500 text-sm mb-5 font-medium">Klien: PT Maju Jaya Abadi</p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-zinc-600 text-sm">
                  <MapPin size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="font-medium leading-snug">Gedung Sudirman, Lantai 4<br/>
                    <span className="text-zinc-400 font-normal">1.2 km dari lokasimu</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-zinc-600 text-sm">
                  <Clock size={18} className="text-amber-500 flex-shrink-0" />
                  <span className="font-medium">Deadline: Hari ini, 15:00 WITA</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Checklist */}
          <div>
            <h3 className="font-bold text-zinc-900 mb-3 text-xs uppercase tracking-wider">Checklist Tugas</h3>
            <div className="space-y-3">
              {['Pasang kabel optik utama', 'Konfigurasi IP Address', 'Test kecepatan jaringan (Ping)'].map((task, idx) => (
                <label key={idx} className={`flex items-center gap-3 p-4 border rounded-xl transition-all ${isCheckedIn ? 'bg-white border-zinc-200 cursor-pointer hover:border-teal-300 shadow-sm' : 'bg-zinc-50 border-zinc-100 opacity-60 cursor-not-allowed'}`}>
                  <input type="checkbox" className="w-5 h-5 accent-teal-600 rounded cursor-pointer" disabled={!isCheckedIn} />
                  <span className="text-sm font-semibold text-zinc-700">{task}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Photo Proof */}
          <div>
            <h3 className="font-bold text-zinc-900 mb-3 text-xs uppercase tracking-wider">Bukti Lapangan</h3>
            <button 
              disabled={!isCheckedIn}
              className={`w-full flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl gap-3 transition-all
              ${isCheckedIn ? 'border-teal-300 bg-teal-50/50 text-teal-700 cursor-pointer hover:bg-teal-50' : 'border-zinc-200 bg-zinc-50 text-zinc-400 cursor-not-allowed'}`}
            >
              <Camera size={36} className={isCheckedIn ? 'text-teal-600' : 'text-zinc-300'} />
              <span className="text-sm font-bold">Ambil Foto Hasil Kerja</span>
            </button>
          </div>
        </main>

        {/* Sticky Action Button */}
        <div className="absolute bottom-0 w-full p-5 bg-white border-t border-zinc-100 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] z-20">
          {!isCheckedIn ? (
            <Button 
              onClick={() => setIsCheckedIn(true)}
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-lg h-14 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2"
            >
              <MapPin size={22} />
              Check-In Lokasi (GPS)
            </Button>
          ) : !isCompleted ? (
            <Button 
              onClick={() => setIsCompleted(true)}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg h-14 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2"
            >
              <Upload size={22} />
              Lapor Pekerjaan Selesai
            </Button>
          ) : (
            <div className="w-full bg-green-50 text-green-700 border border-green-200 font-bold text-lg h-14 rounded-xl flex justify-center items-center gap-2">
              <CheckCircle size={22} />
              Tugas Selesai & Terkirim
            </div>
          )}
        </div>

      </div>
    </div>
  );
}