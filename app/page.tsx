'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Briefcase, BrainCircuit, Smartphone, 
  HardDrive, Zap, ShieldCheck, Clock, ChevronRight, PlayCircle,
  BarChart3, Users, LayoutTemplate
} from 'lucide-react';
import { Button } from "@/components/ui/button";

// Variabel Animasi
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 20 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function PortalAwalPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Prompt:wght@500;700;900&display=swap');
        .font-prompt { font-family: 'Prompt', sans-serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .bento-hover:hover { transform: translateY(-5px); box-shadow: 0 25px 50px -12px rgba(232, 127, 36, 0.15); border-color: rgba(232, 127, 36, 0.4); }
      `}} />

      <div className="min-h-screen bg-zinc-50 font-poppins text-zinc-900 overflow-x-hidden selection:bg-[#E87F24] selection:text-white">
        
        {/* ========================================== */}
        {/* 1. NAVBAR GLASSMORPHISM */}
        {/* ========================================== */}
        <motion.nav 
          initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed w-full top-0 z-50 px-6 py-4"
        >
          <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-xl border border-white rounded-full px-6 py-3 flex items-center justify-between shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E87F24] to-[#FFC81E] flex items-center justify-center shadow-lg shadow-[#E87F24]/20">
                <Zap className="text-white fill-white" size={16} />
              </div>
              <span className="text-xl font-prompt font-black tracking-tight text-zinc-900">
                Duluin<span className="text-[#E87F24]">360</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-zinc-600">
              <a href="#fitur" className="hover:text-[#E87F24] transition-colors">Platform</a>
              <a href="#keunggulan" className="hover:text-[#E87F24] transition-colors">AI Copilot</a>
              <a href="#harga" className="hover:text-[#E87F24] transition-colors">Pricing</a>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" className="hidden md:flex font-bold text-zinc-700 hover:text-[#E87F24] hover:bg-[#FEFDDF] rounded-full">
                Masuk
              </Button>
              <Button className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold px-6 shadow-md gap-2 rounded-full font-poppins transition-transform hover:scale-105">
                Coba Gratis <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </motion.nav>

        {/* ========================================== */}
        {/* 2. HERO SECTION (Floating Dashboard Style) */}
        {/* ========================================== */}
        <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
          {/* Latar Belakang Mesh Gradient (Cream & Oranye) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-gradient-to-b from-[#FEFDDF] to-transparent rounded-full blur-3xl -z-10 opacity-70"></div>
          
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="relative z-10 w-full flex flex-col items-center">
            
            <motion.div variants={fadeUp} className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-zinc-200 shadow-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-[#E87F24] animate-ping"></span>
              <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider">Duluin ERP v2.0 Rilis</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-prompt text-5xl md:text-7xl lg:text-8xl font-black text-zinc-900 leading-[1.05] tracking-tight max-w-5xl">
              Sinkronisasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E87F24] to-[#FFC81E]">Tanpa Batas.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="mt-6 text-lg md:text-xl text-zinc-500 font-medium max-w-2xl">
              Satu *platform* untuk mengelola kesepakatan penjualan, membagi tugas lapangan secara otomatis, hingga menerbitkan *invoice*.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex gap-4">
              <Button className="bg-[#E87F24] hover:bg-[#c96a1a] text-white font-bold px-8 h-14 rounded-full shadow-xl shadow-[#E87F24]/20 text-base transition-transform hover:scale-105">
                Mulai Gunakan Sistem
              </Button>
            </motion.div>

            {/* MOCKUP DASHBOARD MELAYANG */}
            <motion.div 
              variants={fadeUp}
              className="mt-20 w-full max-w-5xl relative perspective-[2000px]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-transparent to-transparent z-10 bottom-0 h-1/2"></div>
              <motion.div 
                initial={{ rotateX: 20, y: 50, opacity: 0 }}
                animate={{ rotateX: 0, y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                className="bg-white rounded-t-3xl border border-zinc-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden"
              >
                {/* Header Mockup */}
                <div className="h-12 bg-zinc-50 border-b border-zinc-100 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                {/* Body Mockup */}
                <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
                  <div className="col-span-2 h-40 bg-zinc-100 rounded-2xl animate-pulse"></div>
                  <div className="h-40 bg-[#FEFDDF] rounded-2xl border border-[#FFC81E]/30"></div>
                  <div className="h-32 bg-zinc-100 rounded-2xl animate-pulse"></div>
                  <div className="h-32 bg-zinc-100 rounded-2xl animate-pulse"></div>
                  <div className="h-32 bg-zinc-100 rounded-2xl animate-pulse"></div>
                </div>
              </motion.div>
            </motion.div>

          </motion.div>
        </section>

        {/* ========================================== */}
        {/* 3. BENTO GRID FEATURES (Desain Paling Modern) */}
        {/* ========================================== */}
        <section id="fitur" className="py-24 bg-white relative z-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-prompt text-3xl md:text-5xl font-black text-zinc-900">Arsitektur Modular.</h2>
              <p className="text-zinc-500 font-medium mt-4 text-lg">Setiap divisi memiliki ruang kerjanya sendiri, terhubung dalam satu database.</p>
            </motion.div>

            {/* Susunan Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
              
              {/* Card 1 (Besar/Lebar) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                className="md:col-span-2 bg-gradient-to-br from-zinc-50 to-zinc-100 rounded-[2.5rem] p-8 border border-zinc-200 bento-hover transition-all relative overflow-hidden group"
              >
                <div className="relative z-10 w-2/3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 flex items-center justify-center mb-4 shadow-sm">
                    <Briefcase className="text-[#E87F24]" size={24} />
                  </div>
                  <h3 className="font-prompt text-2xl font-bold text-zinc-900 mb-2">CRM Pipeline</h3>
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed">Otomatisasi transisi dari kesepakatan penjualan langsung menjadi Surat Perintah Kerja operasional.</p>
                </div>
                {/* Dekorasi Visual */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white rounded-3xl border border-zinc-200 shadow-xl opacity-50 rotate-12 group-hover:rotate-6 transition-transform duration-500"></div>
              </motion.div>

              {/* Card 2 (Kotak Kecil) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }}
                className="bg-[#E87F24] text-white rounded-[2.5rem] p-8 border border-[#E87F24] bento-hover transition-all flex flex-col justify-between group overflow-hidden relative"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <BrainCircuit size={24} />
                </div>
                <div>
                  <h3 className="font-prompt text-xl font-bold mb-1">WorkPulse AI</h3>
                  <p className="text-sm text-white/80 font-medium leading-relaxed">Pembagian SPK otomatis.</p>
                </div>
              </motion.div>

              {/* Card 3 (Kotak Kecil) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                className="bg-[#FEFDDF] rounded-[2.5rem] p-8 border border-[#FFC81E]/40 bento-hover transition-all flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-[#FFC81E]/50 shadow-sm">
                  <Smartphone className="text-[#E87F24]" size={24} />
                </div>
                <div>
                  <h3 className="font-prompt text-xl font-bold text-zinc-900 mb-1">FieldOps</h3>
                  <p className="text-sm text-zinc-600 font-medium leading-relaxed">GPS & Checklist teknisi lapangan.</p>
                </div>
              </motion.div>

              {/* Card 4 (Lebar Bawah) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                className="md:col-span-2 bg-zinc-900 text-white rounded-[2.5rem] p-8 border border-zinc-800 bento-hover transition-all relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center border border-zinc-700 mb-4">
                  <HardDrive className="text-[#FFC81E]" size={24} />
                </div>
                <h3 className="font-prompt text-2xl font-bold mb-2">Vault Archive</h3>
                <p className="text-sm text-zinc-400 font-medium leading-relaxed max-w-sm">Penyimpanan BAST dan *Invoice* yang di-generate langsung dari data lapangan tanpa perlu rekap manual.</p>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* 4. FOOTER MODERN */}
        {/* ========================================== */}
        <footer className="bg-zinc-950 text-zinc-400 pt-20 pb-10 border-t border-zinc-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-16">
              <div className="max-w-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Zap size={24} className="text-[#E87F24]" />
                  <span className="font-prompt text-2xl font-black text-white">Duluin<span className="text-[#E87F24]">360</span></span>
                </div>
                <p className="text-sm font-medium leading-relaxed opacity-70">
                  Membangun fondasi digital bagi perusahaan B2B masa depan. Menghancurkan sekat antar divisi dengan otomatisasi AI.
                </p>
              </div>
              <div className="flex gap-16">
                <div>
                  <h4 className="text-white font-bold mb-4">Produk</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-[#FFC81E] transition-colors">CRM Pipeline</a></li>
                    <li><a href="#" className="hover:text-[#FFC81E] transition-colors">WorkPulse AI</a></li>
                    <li><a href="#" className="hover:text-[#FFC81E] transition-colors">FieldOps</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-4">Perusahaan</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-[#FFC81E] transition-colors">Tentang Kami</a></li>
                    <li><a href="#" className="hover:text-[#FFC81E] transition-colors">Kontak</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-zinc-800 text-sm text-center md:text-left opacity-50 flex flex-col md:flex-row justify-between">
              <p>&copy; 2026 Duluin Systems. All rights reserved.</p>
              <div className="flex gap-4 mt-4 md:mt-0 justify-center">
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}