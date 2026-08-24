'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Briefcase, 
  Clock, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  UserCircle, 
  Mail, 
  Lock, 
  Phone,
  CalendarDays,
  UploadCloud
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Company Profile
    companyName: '',
    industry: '',
    companySize: '',
    address: '',
    logoName: '', // State baru untuk menyimpan nama file logo
    // Step 2: Admin Account
    adminName: '',
    adminEmail: '',
    adminPhone: '',
    password: '',
    // Step 3: Operational
    timezone: 'Asia/Makassar',
    workingDays: 'Senin - Jumat',
    divisions: ''
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  // Fungsi untuk menangani upload logo
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Dalam implementasi nyata, Anda akan mengunggah file ini ke cloud storage (seperti AWS S3 atau Supabase)
      setFormData({ ...formData, logoName: file.name });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi pengiriman data ke API (Prisma)
    console.log("Data Onboarding Tersimpan:", formData);
    alert("Setup Workspace Perusahaan Selesai! Mengarahkan ke Dashboard...");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 md:p-8 py-12">
      <div className="max-w-3xl w-full">
        
        {/* Header Setup */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 text-white rounded-2xl shadow-lg mb-5 text-2xl font-black ring-4 ring-teal-600/20">
            D
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Setup Workspace Duluin360</h1>
          <p className="text-zinc-500 mt-2 text-sm md:text-base max-w-lg mx-auto">
            Lengkapi konfigurasi awal untuk menyesuaikan sistem dengan alur kerja (workflow) perusahaan Anda.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-8 relative px-2">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-zinc-200 -z-10 rounded-full"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-teal-600 -z-10 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
          
          {[
            { num: 1, label: 'Perusahaan' },
            { num: 2, label: 'Admin' },
            { num: 3, label: 'Operasional' },
            { num: 4, label: 'Konfirmasi' }
          ].map((item) => (
            <div key={item.num} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 transition-all duration-300 ${step >= item.num ? 'bg-teal-600 border-teal-100 text-white shadow-md' : 'bg-white border-zinc-200 text-zinc-400'}`}>
                {step > item.num ? <CheckCircle2 size={20} /> : item.num}
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-wider ${step >= item.num ? 'text-teal-700' : 'text-zinc-400'} hidden md:block`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Formulir Card */}
        <Card className="shadow-xl border-zinc-200/60 bg-white/80 backdrop-blur-sm">
          <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 pb-6 rounded-t-xl">
            <CardTitle className="text-xl text-zinc-900">
              {step === 1 && "Informasi Perusahaan"}
              {step === 2 && "Akun Super Admin"}
              {step === 3 && "Pengaturan Operasional"}
              {step === 4 && "Tinjauan Akhir"}
            </CardTitle>
            <CardDescription className="text-zinc-500 mt-1">
              {step === 1 && "Data legal dan identitas perusahaan yang akan tampil di faktur & laporan."}
              {step === 2 && "Akun ini akan memiliki akses penuh untuk mengelola pengguna dan penagihan."}
              {step === 3 && "Konfigurasi dasar untuk pembagian tugas dan kalkulasi SLA oleh AI."}
              {step === 4 && "Pastikan semua data sudah benar sebelum workspace di-generate."}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }} className="space-y-6">
              
              {/* STEP 1: PROFIL PERUSAHAAN */}
              {step === 1 && (
                <div className="space-y-5 animate-in slide-in-from-right-4 fade-in duration-300">
                  
                  {/* Bagian Upload Logo */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 flex items-center gap-2 uppercase tracking-wide">
                      <UploadCloud size={14} className="text-teal-600"/> Logo Perusahaan
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-zinc-300 border-dashed rounded-xl hover:border-teal-500 transition-colors bg-zinc-50/50">
                      <div className="space-y-1 text-center">
                        <UploadCloud className="mx-auto h-10 w-10 text-zinc-400" />
                        <div className="flex text-sm text-zinc-600 justify-center">
                          <label htmlFor="logo-upload" className="relative cursor-pointer bg-transparent rounded-md font-bold text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500">
                            <span>Upload logo</span>
                            <input id="logo-upload" name="logo-upload" type="file" className="sr-only" accept="image/png, image/jpeg, image/jpg" onChange={handleLogoUpload} />
                          </label>
                          <p className="pl-1">atau drag and drop</p>
                        </div>
                        <p className="text-xs text-zinc-500">PNG, JPG up to 2MB</p>
                        
                        {/* Preview nama file yang diupload */}
                        {formData.logoName && (
                          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-bold border border-teal-200">
                            <CheckCircle2 size={12} /> {formData.logoName}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex items-center gap-2 uppercase tracking-wide"><Building2 size={14} className="text-teal-600"/> Nama Perusahaan</label>
                      <input type="text" required placeholder="PT Contoh Sukses Mandiri" className="w-full text-sm p-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex items-center gap-2 uppercase tracking-wide"><Briefcase size={14} className="text-teal-600"/> Sektor Industri</label>
                      <select required className="w-full text-sm p-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-white" value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})}>
                        <option value="" disabled>Pilih Industri...</option>
                        <option value="telekomunikasi">Infrastruktur & Telekomunikasi</option>
                        <option value="outsourcing">Jasa Outsourcing / Cleaning</option>
                        <option value="maintenance">Maintenance & Engineering</option>
                        <option value="logistik">Distribusi & Logistik</option>
                        <option value="lainnya">Lainnya</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 flex items-center gap-2 uppercase tracking-wide"><Users size={14} className="text-teal-600"/> Skala Perusahaan (Estimasi Pegawai)</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['1-50', '51-200', '201-500', '500+'].map(size => (
                        <button 
                          key={size} type="button" 
                          onClick={() => setFormData({...formData, companySize: size})}
                          className={`p-2.5 text-sm rounded-xl border font-medium transition-all ${formData.companySize === size ? 'bg-teal-50 border-teal-500 text-teal-700 shadow-sm' : 'bg-white border-zinc-200 text-zinc-600 hover:border-teal-300'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 flex items-center gap-2 uppercase tracking-wide"><MapPin size={14} className="text-teal-600"/> Alamat Kantor Pusat</label>
                    <textarea rows={2} required placeholder="Gedung Perkantoran Lt. 3, Jl. Sudirman..." className="w-full text-sm p-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all resize-none" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                  </div>
                </div>
              )}

              {/* STEP 2: ADMIN ACCOUNT */}
              {step === 2 && (
                <div className="space-y-5 animate-in slide-in-from-right-4 fade-in duration-300">
                  <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl mb-2">
                    <p className="text-xs text-blue-800 leading-relaxed font-medium">
                      Anda sedang membuat profil <strong>Super Admin</strong>. Akun ini akan digunakan untuk login dan mengelola seluruh aspek sistem, termasuk todolist dan penambahan user lain.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex items-center gap-2 uppercase tracking-wide"><UserCircle size={14} className="text-teal-600"/> Nama Lengkap</label>
                      <input type="text" required placeholder="John Doe" className="w-full text-sm p-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-teal-500 outline-none" value={formData.adminName} onChange={e => setFormData({...formData, adminName: e.target.value})} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex items-center gap-2 uppercase tracking-wide"><Phone size={14} className="text-teal-600"/> No. WhatsApp/Telepon</label>
                      <input type="tel" required placeholder="08123456789" className="w-full text-sm p-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-teal-500 outline-none" value={formData.adminPhone} onChange={e => setFormData({...formData, adminPhone: e.target.value})} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex items-center gap-2 uppercase tracking-wide"><Mail size={14} className="text-teal-600"/> Email Kerja</label>
                      <input type="email" required placeholder="john@perusahaan.com" className="w-full text-sm p-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-teal-500 outline-none" value={formData.adminEmail} onChange={e => setFormData({...formData, adminEmail: e.target.value})} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex items-center gap-2 uppercase tracking-wide"><Lock size={14} className="text-teal-600"/> Password Sistem</label>
                      <input type="password" required placeholder="••••••••" className="w-full text-sm p-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-teal-500 outline-none" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: DIVISI & WAKTU */}
              {step === 3 && (
                <div className="space-y-5 animate-in slide-in-from-right-4 fade-in duration-300">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 flex items-center gap-2 uppercase tracking-wide"><Users size={14} className="text-teal-600"/> Divisi Pekerja Lapangan (FieldOps)</label>
                    <input type="text" required placeholder="Contoh: Teknisi Jaringan, Installer AC, Kurir" className="w-full text-sm p-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-teal-500 outline-none" value={formData.divisions} onChange={e => setFormData({...formData, divisions: e.target.value})} />
                    <p className="text-[11px] text-zinc-500 font-medium">Pisahkan dengan koma. Sistem akan mengelompokkan penugasan (SPK) berdasarkan divisi ini.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex items-center gap-2 uppercase tracking-wide"><Clock size={14} className="text-teal-600"/> Zona Waktu (Timezone)</label>
                      <select className="w-full text-sm p-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-teal-500 outline-none bg-white" value={formData.timezone} onChange={e => setFormData({...formData, timezone: e.target.value})}>
                        <option value="Asia/Jakarta">WIB (Waktu Indonesia Barat)</option>
                        <option value="Asia/Makassar">WITA (Waktu Indonesia Tengah)</option>
                        <option value="Asia/Jayapura">WIT (Waktu Indonesia Timur)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700 flex items-center gap-2 uppercase tracking-wide"><CalendarDays size={14} className="text-teal-600"/> Hari Operasional</label>
                      <select className="w-full text-sm p-3 rounded-xl border border-zinc-300 focus:ring-2 focus:ring-teal-500 outline-none bg-white" value={formData.workingDays} onChange={e => setFormData({...formData, workingDays: e.target.value})}>
                        <option value="Senin - Jumat">Senin - Jumat</option>
                        <option value="Senin - Sabtu">Senin - Sabtu</option>
                        <option value="Buka Setiap Hari (24/7)">Setiap Hari (Termasuk Shift)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: KONFIRMASI */}
              {step === 4 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                  
                  <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200 space-y-4">
                    <h3 className="font-bold text-zinc-800 text-sm uppercase tracking-wider mb-2 flex items-center gap-2"><Building2 size={16} className="text-teal-600"/> Profil Perusahaan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                      <div><p className="text-zinc-500 text-xs">Nama Perusahaan</p><p className="font-semibold text-zinc-900">{formData.companyName || '-'}</p></div>
                      <div><p className="text-zinc-500 text-xs">Industri</p><p className="font-semibold text-zinc-900 capitalize">{formData.industry || '-'}</p></div>
                      <div><p className="text-zinc-500 text-xs">Skala Karyawan</p><p className="font-semibold text-zinc-900">{formData.companySize || '-'}</p></div>
                      <div><p className="text-zinc-500 text-xs">Logo</p><p className="font-semibold text-zinc-900">{formData.logoName || 'Belum diunggah'}</p></div>
                      <div className="col-span-1 md:col-span-2"><p className="text-zinc-500 text-xs">Alamat</p><p className="font-semibold text-zinc-900 truncate">{formData.address || '-'}</p></div>
                    </div>
                  </div>

                  <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200 space-y-4">
                    <h3 className="font-bold text-zinc-800 text-sm uppercase tracking-wider mb-2 flex items-center gap-2"><UserCircle size={16} className="text-teal-600"/> Super Admin</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                      <div><p className="text-zinc-500 text-xs">Nama PIC</p><p className="font-semibold text-zinc-900">{formData.adminName || '-'}</p></div>
                      <div><p className="text-zinc-500 text-xs">Email Login</p><p className="font-semibold text-zinc-900">{formData.adminEmail || '-'}</p></div>
                    </div>
                  </div>

                  <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200 space-y-4">
                    <h3 className="font-bold text-zinc-800 text-sm uppercase tracking-wider mb-2 flex items-center gap-2"><Briefcase size={16} className="text-teal-600"/> Konfigurasi Sistem</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                      <div><p className="text-zinc-500 text-xs">Zona Waktu</p><p className="font-semibold text-zinc-900">{formData.timezone}</p></div>
                      <div><p className="text-zinc-500 text-xs">Divisi Operasional</p><p className="font-semibold text-zinc-900">{formData.divisions || '-'}</p></div>
                    </div>
                  </div>

                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between pt-6 border-t border-zinc-100 mt-8">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep} className="font-semibold px-6 border-zinc-300 text-zinc-700 hover:bg-zinc-50">
                    Kembali
                  </Button>
                ) : <div></div>}
                
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 shadow-md">
                  {step === 4 ? "Generate Workspace" : "Lanjutkan"} <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}