'use client';

import React, { useState } from 'react';
import { 
  Building2, MapPin, DollarSign, ArrowRight, Zap, Users, 
  CheckCircle2, X, BrainCircuit, Plus, Calendar, Clock, GripHorizontal 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Import Layout Components
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

interface Deal {
  id: string;
  clientName: string;
  projectName: string;
  value: number;
  location: string;
  scope: string;
  slaDays: number;
  stage: 'lead' | 'survey' | 'negotiation' | 'deal_won';
  techniciansNeeded: number;
}

export default function CRMPipelinePage() {
  const [deals, setDeals] = useState<Deal[]>([
    { id: 'DEAL-8831', clientName: 'PT Grand Graha Mall', projectName: 'Instalasi 30 Unit AC', value: 75000000, location: 'Makassar', scope: 'Instalasi kompresor', slaDays: 3, stage: 'negotiation', techniciansNeeded: 4 },
    { id: 'DEAL-8832', clientName: 'RS Stella Maris', projectName: 'Deep Cleaning Steril', value: 32000000, location: 'Makassar', scope: 'Sanitasi HEPA filter', slaDays: 1, stage: 'survey', techniciansNeeded: 2 },
    { id: 'DEAL-8833', clientName: 'Logistik Nusantara', projectName: 'Pemasangan CCTV', value: 18500000, location: 'Pelabuhan', scope: '16 Titik Kamera', slaDays: 4, stage: 'lead', techniciansNeeded: 2 }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ text: string, type: 'success' | 'info' } | null>(null);
  const [aiSimulation, setAiSimulation] = useState<{ isOpen: boolean, dealName: string, step: number }>({ isOpen: false, dealName: '', step: 0 });
  const [formData, setFormData] = useState({ clientName: '', projectName: '', value: '', location: '', slaDays: '2', techniciansNeeded: '2', scope: '' });

  // ==========================================
  // LOGIKA DRAG & DROP
  // ==========================================
  
  // 1. Saat Kartu Mulai Ditarik
  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    e.dataTransfer.setData('dealId', dealId);
    // Opsional: Membuat tampilan kartu yang ditarik sedikit transparan
    setTimeout(() => { (e.target as HTMLElement).style.opacity = '0.5'; }, 0);
  };

  // 2. Saat Kartu Dilepas (Kembalikan opacity)
  const handleDragEnd = (e: React.DragEvent) => {
    (e.target as HTMLElement).style.opacity = '1';
  };

  // 3. Mengizinkan kolom menerima drop (Mencegah default browser)
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // 4. Saat Kartu Dijatuhkan ke Kolom Baru
  const handleDrop = (e: React.DragEvent, targetStage: Deal['stage']) => {
    e.preventDefault();
    const draggedDealId = e.dataTransfer.getData('dealId');
    if (draggedDealId) {
      moveStage(draggedDealId, targetStage);
    }
  };

  // ==========================================
  // LOGIKA BISNIS
  // ==========================================

  const moveStage = (dealId: string, nextStage: Deal['stage']) => {
    setDeals(prev => prev.map(d => {
      if (d.id === dealId) {
        // Jika dilempar ke Deal Won, picu animasi AI
        if (nextStage === 'deal_won' && d.stage !== 'deal_won') {
          triggerAutoWorkOrder(d);
        }
        return { ...d, stage: nextStage };
      }
      return d;
    }));
  };

  const triggerAutoWorkOrder = (deal: Deal) => {
    setAiSimulation({ isOpen: true, dealName: deal.clientName, step: 1 });
    setTimeout(() => setAiSimulation(prev => ({ ...prev, step: 2 })), 1500);
    setTimeout(() => setAiSimulation(prev => ({ ...prev, step: 3 })), 3500);
    setTimeout(() => {
      setAiSimulation({ isOpen: false, dealName: '', step: 0 });
      showToast(`SPK untuk ${deal.clientName} berhasil diteruskan ke FieldOps!`, 'success');
    }, 6000);
  };

  // C. Menangani Submit Form (Buat Deal Baru)
  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate ID unik berbasis timestamp agar tidak bentrok
    const newId = `DEAL-${Math.floor(1000 + Math.random() * 9000)}`; 
    
    const newDeal: Deal = {
      id: newId,
      clientName: formData.clientName,
      projectName: formData.projectName,
      value: Number(formData.value),
      location: formData.location || 'Tidak spesifik',
      scope: formData.scope || 'Sesuai standar operasional',
      slaDays: Number(formData.slaDays),
      techniciansNeeded: Number(formData.techniciansNeeded),
      stage: 'lead', 
    };

    setDeals([...deals, newDeal]);
    
    setIsModalOpen(false);
    showToast(`Project ${newDeal.projectName} berhasil ditambahkan ke Pipeline!`, 'success');

    setFormData({
      clientName: '', projectName: '', value: '', location: '', slaDays: '2', techniciansNeeded: '2', scope: ''
    });
  };

  const showToast = (text: string, type: 'success' | 'info') => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg(null), 5000);
  };

  const stages: { key: Deal['stage']; title: string; badgeBg: string; borderColor: string }[] = [
    { key: 'lead', title: '1. Lead & Inquiry', badgeBg: 'bg-zinc-100 text-zinc-700', borderColor: 'border-zinc-300' },
    { key: 'survey', title: '2. Site Survey', badgeBg: 'bg-blue-100 text-blue-700', borderColor: 'border-blue-300' },
    { key: 'negotiation', title: '3. Proposal & SLA', badgeBg: 'bg-amber-100 text-amber-800', borderColor: 'border-amber-300' },
    { key: 'deal_won', title: '4. Deal Won (Dispatched)', badgeBg: 'bg-teal-100 text-teal-800', borderColor: 'border-teal-300' },
  ];

  const totalPipelineValue = deals.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="flex h-screen bg-[#f8fafc] text-zinc-900">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <Header title="CRM Pipeline & Handoff" subtitle="Pintu gerbang otomatisasi kontrak B2B menuju eksekusi operasional">
          <Button onClick={() => setIsModalOpen(true)} className="bg-teal-600 hover:bg-teal-700 text-white gap-2 font-bold shadow-md">
            <Plus size={18} /> Buat Project Deal Baru
          </Button>
        </Header>

        {toastMsg && (
          <div className={`absolute top-20 left-1/2 -translate-x-1/2 z-40 px-6 py-3 rounded-full flex items-center gap-2 font-bold text-sm shadow-xl animate-in fade-in slide-in-from-top-4 ${toastMsg.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-teal-600 text-white'}`}>
            {toastMsg.type === 'success' ? <CheckCircle2 size={18} /> : <Zap size={18} />}
            {toastMsg.text}
          </div>
        )}

        <div className="p-6 md:p-8 overflow-y-auto space-y-8 flex-1 pb-20">
          
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-1">Total Pipeline Value</p>
              <h2 className="text-3xl font-black text-zinc-900">Rp {totalPipelineValue.toLocaleString('id-ID')}</h2>
            </div>
            <div className="flex gap-4">
              <div className="bg-zinc-50 px-4 py-2 rounded-xl border border-zinc-100 text-center">
                <p className="text-2xl font-black text-teal-600">{deals.length}</p>
                <p className="text-xs font-bold text-zinc-500 uppercase">Active Deals</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {stages.map((st) => {
              const stageDeals = deals.filter(d => d.stage === st.key);
              return (
                <div 
                  key={st.key} 
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, st.key)}
                  className="flex flex-col bg-zinc-100/50 p-4 rounded-2xl border border-zinc-200 min-h-[600px] transition-colors"
                >
                  <div className={`flex items-center justify-between mb-4 pb-3 border-b-2 ${st.borderColor}`}>
                    <span className="font-extrabold text-sm text-zinc-800 uppercase tracking-wide">{st.title}</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-black ${st.badgeBg}`}>{stageDeals.length}</span>
                  </div>

                  <div className="space-y-4 flex-1">
                    {stageDeals.map((deal) => (
                      <div
                        key={deal.id}
                        draggable={true}
                        onDragStart={(e) => handleDragStart(e, deal.id)}
                        onDragEnd={handleDragEnd}
                        className="cursor-grab active:cursor-grabbing transition-transform active:scale-[0.98]"
                      >
                        <Card className="bg-white border-zinc-200 shadow-sm hover:shadow-md hover:border-teal-300 transition-all rounded-xl overflow-hidden group">
                          <div className={`h-1.5 w-full ${st.badgeBg.split(' ')[0]}`}></div>
                          <CardContent className="p-4 space-y-3 relative">
                            
                            {/* Grip Icon penanda bisa di-drag */}
                            <div className="absolute top-3 right-3 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                              <GripHorizontal size={16} />
                            </div>

                            <div className="flex justify-between items-start pe-6">
                              <span className="text-[11px] font-black text-zinc-400 tracking-wider">{deal.id}</span>
                              <div className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                <Clock size={10} /> SLA: {deal.slaDays} Hari
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-bold text-sm text-zinc-900 flex items-start gap-1.5 leading-snug pe-4">
                                <Building2 size={16} className="text-teal-600 shrink-0 mt-0.5" />
                                {deal.clientName}
                              </h4>
                              <p className="text-xs text-zinc-600 font-medium mt-1.5 line-clamp-2">{deal.projectName}</p>
                            </div>
                            
                            <div className="bg-zinc-50 rounded-lg p-3 space-y-2 text-xs border border-zinc-100">
                              <div className="flex justify-between items-center">
                                <span className="text-zinc-500 font-medium">Estimasi Nilai</span>
                                <span className="font-bold text-zinc-900">Rp {deal.value.toLocaleString('id-ID')}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-zinc-500 font-medium">Target Teknisi</span>
                                <span className="font-bold text-zinc-900">{deal.techniciansNeeded} Personil</span>
                              </div>
                            </div>
                            
                            {/* Jika sudah Deal Won, sembunyikan tombol karena otomatis terkirim */}
                            {st.key === 'deal_won' && (
                              <div className="pt-2">
                                <div className="w-full text-center text-teal-700 text-[11px] font-black bg-teal-50 py-2 rounded-lg border border-teal-200 flex items-center justify-center gap-1.5"><CheckCircle2 size={14} /> Terkirim ke Operasional</div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                    
                    {/* Placeholder Area Kosong (petunjuk jika kolom kosong) */}
                    {stageDeals.length === 0 && (
                      <div className="h-24 border-2 border-dashed border-zinc-200 rounded-xl flex items-center justify-center text-xs text-zinc-400 font-bold">
                        Tarik kartu ke sini
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* MODAL: FORM BUAT DEAL BARU */}
        {/* ========================================== */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
              <div className="px-6 py-4 bg-zinc-900 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-lg text-white">Buat Project Deal Baru</h3>
                  <p className="text-xs text-zinc-400 font-medium">Pipeline ini terintegrasi langsung dengan operasional AI.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white transition-colors bg-zinc-800 p-1.5 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateDeal} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
                <div className="space-y-4 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                  <h4 className="text-xs font-black text-zinc-400 uppercase tracking-wider mb-2">Informasi Bisnis</h4>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">Nama Perusahaan Klien *</label>
                    <input type="text" required placeholder="PT Contoh Sukses Mandiri" value={formData.clientName} onChange={e => setFormData({...formData, clientName: e.target.value})} className="w-full text-sm px-3 py-2.5 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-teal-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">Nama Proyek / Layanan *</label>
                    <input type="text" required placeholder="Pengadaan Jaringan Gedung" value={formData.projectName} onChange={e => setFormData({...formData, projectName: e.target.value})} className="w-full text-sm px-3 py-2.5 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-teal-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">Estimasi Nilai Kontrak (Rp) *</label>
                    <input type="number" required placeholder="50000000" min="0" value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} className="w-full text-sm px-3 py-2.5 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-teal-500 outline-none" />
                  </div>
                </div>

                <div className="space-y-4 bg-teal-50/30 p-4 rounded-xl border border-teal-100/50">
                  <h4 className="text-xs font-black text-teal-600 uppercase tracking-wider mb-2">Spesifikasi Operasional (Scope-Lock)</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1.5">Target SLA (Hari Kerja) *</label>
                      <input type="number" required min="1" value={formData.slaDays} onChange={e => setFormData({...formData, slaDays: e.target.value})} className="w-full text-sm px-3 py-2.5 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-teal-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1.5">Estimasi Teknisi</label>
                      <input type="number" min="1" value={formData.techniciansNeeded} onChange={e => setFormData({...formData, techniciansNeeded: e.target.value})} className="w-full text-sm px-3 py-2.5 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-teal-500 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">Lokasi Pengerjaan</label>
                    <input type="text" placeholder="Detail area atau wilayah" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full text-sm px-3 py-2.5 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-teal-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">Checklist Tugas Utama (Scope)</label>
                    <textarea rows={2} placeholder="Sebutkan output kunci yang wajib diselesaikan teknisi..." value={formData.scope} onChange={e => setFormData({...formData, scope: e.target.value})} className="w-full text-sm px-3 py-2.5 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-teal-500 outline-none resize-none" />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
                  <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="font-bold text-zinc-500 hover:text-zinc-800">Batal</Button>
                  <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6">Simpan ke Pipeline</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* MODAL SIMULASI AI HANDOFF */}
        {/* ========================================== */}
        {aiSimulation.isOpen && (
          <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden p-8 text-center animate-in zoom-in-95 duration-300">
              <div className="w-24 h-24 mx-auto bg-teal-50 rounded-full flex items-center justify-center mb-6 relative">
                {aiSimulation.step < 3 ? (
                  <>
                    <BrainCircuit size={48} className="text-teal-600 animate-pulse relative z-10" />
                    <div className="absolute inset-0 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
                  </>
                ) : (
                  <CheckCircle2 size={56} className="text-emerald-500" />
                )}
              </div>

              <h3 className="text-xl font-black text-zinc-900 mb-2">Deal Won! Memicu AI Copilot...</h3>
              
              <div className="space-y-3 mt-8 text-sm font-bold text-left bg-zinc-50 p-5 rounded-xl border border-zinc-100">
                <div className={`flex items-start gap-3 transition-opacity ${aiSimulation.step >= 1 ? 'text-zinc-900 opacity-100' : 'text-zinc-400 opacity-30'}`}>
                  <CheckCircle2 size={18} className={`shrink-0 mt-0.5 ${aiSimulation.step >= 1 ? 'text-teal-500' : 'text-zinc-300'}`} />
                  <span>Meneruskan kontrak <span className="text-teal-700">{aiSimulation.dealName}</span> ke operasional.</span>
                </div>
                <div className={`flex items-start gap-3 transition-opacity ${aiSimulation.step >= 2 ? 'text-zinc-900 opacity-100' : 'text-zinc-400 opacity-30'}`}>
                  <CheckCircle2 size={18} className={`shrink-0 mt-0.5 ${aiSimulation.step >= 2 ? 'text-teal-500' : 'text-zinc-300'}`} />
                  <span>Kalkulasi <em className="text-zinc-500">Hierarchical Clustering</em> untuk membagi beban.</span>
                </div>
                <div className={`flex items-start gap-3 transition-opacity ${aiSimulation.step >= 3 ? 'text-zinc-900 opacity-100' : 'text-zinc-400 opacity-30'}`}>
                  <CheckCircle2 size={18} className={`shrink-0 mt-0.5 ${aiSimulation.step >= 3 ? 'text-emerald-500' : 'text-zinc-300'}`} />
                  <span><strong className="text-emerald-600">Sukses!</strong> SPK otomatis terkirim ke FieldOps teknisi.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}