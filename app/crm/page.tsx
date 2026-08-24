'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  Bell, 
  Menu, 
  Activity, 
  Briefcase, 
  Settings, 
  Plus, 
  Building2, 
  Calendar, 
  MapPin, 
  DollarSign, 
  ArrowRight, 
  Zap,
  Clock,
  ShieldCheck,
  CheckCircle2,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    {
      id: 'DEAL-001',
      clientName: 'PT Grand Graha Mall',
      projectName: 'Instalasi & Maintenance 30 Unit AC Central',
      value: 75000000,
      location: 'Makassar (Pusat Kota)',
      scope: 'Instalasi kompresor, ducting, uji tekanan',
      slaDays: 3,
      stage: 'deal_won',
      techniciansNeeded: 4,
    },
    {
      id: 'DEAL-002',
      clientName: 'RS Stella Maris',
      projectName: 'Deep Cleaning & Sanitasi Ruang Operasi',
      value: 32000000,
      location: 'Makassar (Zona Steril)',
      scope: 'Sanitasi HEPA filter, disinfeksi lantai medis',
      slaDays: 1,
      stage: 'negotiation',
      techniciansNeeded: 2,
    },
    {
      id: 'DEAL-003',
      clientName: 'Hotel Aston Perintis',
      projectName: 'Inspeksi & Re-wiring Jaringan Genset',
      value: 48000000,
      location: 'Maros - Daya',
      scope: 'Survei beban daya listrik, cek panel otomatis',
      slaDays: 2,
      stage: 'survey',
      techniciansNeeded: 3,
    },
    {
      id: 'DEAL-004',
      clientName: 'Logistik Cepat Nusantara',
      projectName: 'Pemasangan CCTV & Smart Geofence',
      value: 18500000,
      location: 'Gudang Pelabuhan',
      scope: '16 Titik Kamera IP + Integrasi NVR',
      slaDays: 4,
      stage: 'lead',
      techniciansNeeded: 2,
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Form State
  const [clientName, setClientName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [value, setValue] = useState('');
  const [location, setLocation] = useState('');
  const [scope, setScope] = useState('');
  const [slaDays, setSlaDays] = useState('2');
  const [techniciansNeeded, setTechniciansNeeded] = useState('2');

  const moveStage = (dealId: string, nextStage: Deal['stage']) => {
    setDeals(prev => prev.map(d => {
      if (d.id === dealId) {
        if (nextStage === 'deal_won') {
          triggerAutoWorkOrder(d);
        }
        return { ...d, stage: nextStage };
      }
      return d;
    }));
  };

  const triggerAutoWorkOrder = (deal: Deal) => {
    setNotification(`⚡ [Upstream Trigger]: Deal "${deal.clientName}" resmi berstatus DEAL WON! Surat Perintah Kerja (SPK) otomatis diterbitkan ke WorkPulse & FieldOps.`);
    setTimeout(() => setNotification(null), 7000);
  };

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !projectName || !value) return;

    const newDeal: Deal = {
      id: `DEAL-00${deals.length + 1}`,
      clientName,
      projectName,
      value: Number(value),
      location: location || 'Makassar',
      scope: scope || 'Sesuai kesepakatan penawaran',
      slaDays: Number(slaDays),
      stage: 'lead',
      techniciansNeeded: Number(techniciansNeeded),
    };

    setDeals([newDeal, ...deals]);
    setIsModalOpen(false);
    setClientName('');
    setProjectName('');
    setValue('');
    setLocation('');
    setScope('');
  };

  const stages: { key: Deal['stage']; title: string; color: string; badgeBg: string }[] = [
    { key: 'lead', title: '1. Lead & Inquiry', color: 'border-zinc-200', badgeBg: 'bg-zinc-100 text-zinc-700' },
    { key: 'survey', title: '2. Site Survey', color: 'border-blue-200', badgeBg: 'bg-blue-100 text-blue-700' },
    { key: 'negotiation', title: '3. Proposal & SLA', color: 'border-amber-200', badgeBg: 'bg-amber-100 text-amber-800' },
    { key: 'deal_won', title: '4. Deal Won (Auto-Dispatch)', color: 'border-teal-300', badgeBg: 'bg-teal-100 text-teal-800' },
  ];

  const totalPipelineValue = deals.reduce((acc, curr) => acc + curr.value, 0);
  const totalWonValue = deals.filter(d => d.stage === 'deal_won').reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      
      {/* Sidebar - Duluin Ecosystem */}
      <aside className="w-72 bg-white border-r border-zinc-200 flex flex-col justify-between hidden md:flex shadow-sm z-10">
        <div>
          <div className="h-16 flex items-center px-6 border-b border-zinc-100">
            <div className="flex items-center gap-2 font-extrabold text-xl text-zinc-900 tracking-tight">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white shadow-md">
                D
              </div>
              Duluin<span className="text-teal-500">360</span>
            </div>
          </div>
          
          <div className="p-4 space-y-6">
            <div>
              <div className="text-[11px] font-bold text-zinc-400 mb-2 px-3 tracking-widest uppercase">Analytics & AI</div>
              <nav className="space-y-1">
                <a href="/" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 rounded-xl font-medium transition-all group">
                  <Activity size={18} className="group-hover:text-teal-600 transition-colors" /> AI Copilot
                </a>
                <a href="/" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 rounded-xl font-medium transition-all group">
                  <LayoutDashboard size={18} className="group-hover:text-teal-600 transition-colors" /> WorkPulse
                </a>
              </nav>
            </div>

            <div>
              <div className="text-[11px] font-bold text-zinc-400 mb-2 px-3 tracking-widest uppercase">Operational</div>
              <nav className="space-y-1">
                <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 rounded-xl font-medium transition-all group">
                  <Users size={18} className="group-hover:text-teal-600 transition-colors" /> FieldOps
                  <span className="ml-auto bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-[10px] font-bold shadow-sm">3 Alert</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 rounded-xl font-medium transition-all group">
                  <Briefcase size={18} className="group-hover:text-teal-600 transition-colors" /> VendorFlow
                </a>
              </nav>
            </div>

            <div>
              <div className="text-[11px] font-bold text-zinc-400 mb-2 px-3 tracking-widest uppercase">Business</div>
              <nav className="space-y-1">
                <a href="/crm" className="flex items-center gap-3 px-3 py-2.5 bg-teal-50 text-teal-700 rounded-xl font-semibold transition-all border border-teal-100/50 shadow-sm">
                  <CheckSquare size={18} /> CRM Pipeline
                </a>
              </nav>
            </div>
          </div>
        </div>

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
        <header className="bg-white/80 backdrop-blur-md h-16 border-b border-zinc-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-3 text-zinc-600">
            <Menu size={24} className="cursor-pointer md:hidden" />
            <div>
              <h1 className="font-bold text-lg text-zinc-900 leading-none">B2B Deal Pipeline & Scope-Lock</h1>
              <p className="text-xs text-zinc-500 mt-1">Hulu otomatisasi kontrak menuju alokasi kerja operasional (FieldOps)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setIsModalOpen(true)} className="bg-teal-600 hover:bg-teal-700 text-white gap-2 font-semibold shadow-sm">
              <Plus size={16} /> Buat Project Deal Baru
            </Button>
            <Button variant="outline" size="icon" className="rounded-full relative">
              <Bell size={18} className="text-zinc-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </Button>
          </div>
        </header>

        {/* Real-time Notification Banner */}
        {notification && (
          <div className="bg-teal-600 text-white px-8 py-3 flex items-center justify-between text-sm font-medium animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-amber-300 animate-pulse" />
              {notification}
            </div>
            <button onClick={() => setNotification(null)} className="text-teal-200 hover:text-white">
              <X size={16} />
            </button>
          </div>
        )}

        <div className="p-8 overflow-y-auto space-y-8 flex-1 pb-20">
          
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="shadow-sm border-zinc-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Total Pipeline Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-extrabold text-zinc-900">
                  Rp {totalPipelineValue.toLocaleString('id-ID')}
                </div>
                <p className="text-xs text-zinc-500 mt-1 font-medium">{deals.length} Kontrak Aktif</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-teal-200 bg-teal-50/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold text-teal-700 uppercase tracking-wider">Closed-Won (Dispatched)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-extrabold text-teal-900">
                  Rp {totalWonValue.toLocaleString('id-ID')}
                </div>
                <p className="text-xs text-teal-700 mt-1 font-medium">Siap/Sedang dikerjakan teknisi</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-zinc-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Kebutuhan Teknisi Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-extrabold text-zinc-900 flex items-center gap-2">
                  <Users size={22} className="text-blue-600" />
                  {deals.reduce((acc, curr) => acc + curr.techniciansNeeded, 0)} Personil
                </div>
                <p className="text-xs text-zinc-500 mt-1 font-medium">Berdasarkan kalkulasi SLA</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-zinc-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Otomasi Scope-Lock</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-extrabold text-emerald-600 flex items-center gap-2">
                  <ShieldCheck size={24} /> 100% Locked
                </div>
                <p className="text-xs text-zinc-500 mt-1 font-medium">Mencegah tugas fiktif di lapangan</p>
              </CardContent>
            </Card>
          </div>

          {/* Kanban Board */}
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-zinc-900">Papan Alur Eksekusi Kontrak (Pipeline Board)</h2>
              <p className="text-sm text-zinc-500">Geser deal ke tahapan berikutnya untuk mengalirkan data ke WorkPulse & FieldOps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stages.map((st) => {
                const stageDeals = deals.filter(d => d.stage === st.key);
                return (
                  <div key={st.key} className="flex flex-col bg-zinc-100/70 p-4 rounded-2xl border border-zinc-200/80 min-h-[500px]">
                    <div className="flex items-center justify-between mb-3 px-1">
                      <span className="font-bold text-sm text-zinc-800">{st.title}</span>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${st.badgeBg}`}>
                        {stageDeals.length}
                      </span>
                    </div>

                    <div className="space-y-4 flex-1">
                      {stageDeals.map((deal) => (
                        <Card key={deal.id} className="bg-white border-zinc-200 shadow-sm hover:shadow-md transition-all rounded-xl">
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-zinc-400">{deal.id}</span>
                              <Badge variant="outline" className="text-[10px] bg-zinc-50 border-zinc-200">
                                SLA: {deal.slaDays} Hari
                              </Badge>
                            </div>

                            <div>
                              <h4 className="font-bold text-sm text-zinc-900 leading-snug flex items-center gap-1.5">
                                <Building2 size={14} className="text-teal-600 flex-shrink-0" />
                                {deal.clientName}
                              </h4>
                              <p className="text-xs text-zinc-600 font-medium mt-1">{deal.projectName}</p>
                            </div>

                            <div className="p-2.5 bg-zinc-50 rounded-lg text-xs space-y-1.5 border border-zinc-100">
                              <div className="flex items-center justify-between text-zinc-700">
                                <span className="text-zinc-500 flex items-center gap-1"><DollarSign size={13}/> Nilai:</span>
                                <span className="font-bold text-zinc-900">Rp {deal.value.toLocaleString('id-ID')}</span>
                              </div>
                              <div className="flex items-center justify-between text-zinc-700">
                                <span className="text-zinc-500 flex items-center gap-1"><MapPin size={13}/> Lokasi:</span>
                                <span className="font-medium text-zinc-800">{deal.location}</span>
                              </div>
                              <div className="flex items-center justify-between text-zinc-700">
                                <span className="text-zinc-500 flex items-center gap-1"><Users size={13}/> Tim Diperlukan:</span>
                                <span className="font-semibold text-zinc-900">{deal.techniciansNeeded} Teknisi</span>
                              </div>
                            </div>

                            <div className="text-[11px] text-zinc-500 italic bg-amber-50/50 p-2 rounded border border-amber-100/60">
                              <strong>Scope-Lock:</strong> {deal.scope}
                            </div>

                            {/* Stage Action Buttons */}
                            <div className="pt-2 border-t border-zinc-100 flex justify-end gap-1.5">
                              {st.key === 'lead' && (
                                <Button size="sm" variant="outline" onClick={() => moveStage(deal.id, 'survey')} className="text-xs h-8 text-blue-600 border-blue-200 hover:bg-blue-50">
                                  Ke Survei <ArrowRight size={12} className="ml-1" />
                                </Button>
                              )}
                              {st.key === 'survey' && (
                                <Button size="sm" variant="outline" onClick={() => moveStage(deal.id, 'negotiation')} className="text-xs h-8 text-amber-700 border-amber-200 hover:bg-amber-50">
                                  Bahas SLA <ArrowRight size={12} className="ml-1" />
                                </Button>
                              )}
                              {st.key === 'negotiation' && (
                                <Button size="sm" onClick={() => moveStage(deal.id, 'deal_won')} className="text-xs h-8 bg-teal-600 hover:bg-teal-700 text-white font-semibold">
                                  Deal Won & Dispatch <Zap size={12} className="ml-1" />
                                </Button>
                              )}
                              {st.key === 'deal_won' && (
                                <div className="text-teal-700 text-xs font-bold flex items-center gap-1 py-1">
                                  <CheckCircle2 size={14} /> Terkirim ke WorkPulse
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Modal Buat Deal Baru */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl border border-zinc-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-zinc-900">Tambah Kesepakatan Proyek Baru</h3>
                <p className="text-xs text-zinc-500">Detail kontrak ini akan otomatis menjadi instruksi tugas teknisi.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateDeal} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">Nama Perusahaan Klien</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: PT Telkom Akses"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">Nama Proyek / Layanan</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contoh: Penggantian Kabel Fiber Optic 5 Gedung"
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">Nilai Kontrak (Rp)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="25000000"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">Target SLA (Hari)</label>
                  <input 
                    type="number" 
                    required
                    value={slaDays}
                    onChange={e => setSlaDays(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">Lokasi Pengerjaan</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: Panakkukang, Makassar"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">Estimasi Teknisi</label>
                  <input 
                    type="number" 
                    value={techniciansNeeded}
                    onChange={e => setTechniciansNeeded(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">Scope-Lock Checklist (Tugas Kunci)</label>
                <textarea 
                  rows={2}
                  placeholder="Tuliskan butir checklist teknis lapangan yang wajib tuntas..."
                  value={scope}
                  onChange={e => setScope(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-zinc-100">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold">
                  Simpan ke Pipeline
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}