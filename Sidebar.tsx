import React from 'react';
import { 
  LayoutDashboard, 
  Stethoscope, 
  Users, 
  Calendar, 
  FileText, 
  CreditCard, 
  Code2, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  doctorCount: number;
  patientCount: number;
  appointmentCount: number;
  pendingInvoiceCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  doctorCount,
  patientCount,
  appointmentCount,
  pendingInvoiceCount,
}) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
      badge: null,
      description: 'KPIs & Hospital Stats',
    },
    {
      id: 'doctors',
      label: 'Doctors Directory',
      icon: Stethoscope,
      badge: doctorCount,
      description: 'Doctor CRUD & Schedules',
    },
    {
      id: 'patients',
      label: 'Patients Registry',
      icon: Users,
      badge: patientCount,
      description: 'Patient Records & History',
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: Calendar,
      badge: appointmentCount,
      description: 'Schedule & Consultations',
    },
    {
      id: 'prescriptions',
      label: 'Prescriptions & Rx',
      icon: FileText,
      badge: null,
      description: 'Clinical Notes Generator',
    },
    {
      id: 'billing',
      label: 'Billing & Invoices',
      icon: CreditCard,
      badge: pendingInvoiceCount > 0 ? `${pendingInvoiceCount} Due` : null,
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      description: 'Fees & Payment Tracking',
    },
    {
      id: 'springboot',
      label: 'Java Spring Backend Code',
      icon: Code2,
      isSpecial: true,
      badge: 'Resume Hub',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      description: 'Spring Boot REST & MySQL JPA',
    },
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-900/90 border-b md:border-b-0 md:border-r border-slate-800 p-3 flex flex-col justify-between shrink-0">
      
      {/* Navigation Links */}
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Main Modules
        </div>
        
        <nav className="space-y-1" id="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                id={`sidebar-tab-${item.id}`}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs sm:text-sm font-medium transition-all group ${
                  isActive
                    ? item.isSpecial
                      ? 'bg-gradient-to-r from-emerald-950 to-slate-900 text-emerald-300 border border-emerald-500/40 shadow-lg'
                      : 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 font-semibold shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${
                    isActive 
                      ? item.isSpecial ? 'text-emerald-400' : 'text-cyan-400' 
                      : 'text-slate-400 group-hover:text-slate-200'
                  }`} />
                  <div className="truncate">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate">{item.label}</span>
                      {item.isSpecial && <Sparkles className="w-3 h-3 text-emerald-400 shrink-0 animate-spin" />}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-2">
                  {item.badge !== null && (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      item.badgeColor || (isActive ? 'bg-cyan-500/20 text-cyan-200 border-cyan-500/30' : 'bg-slate-800 text-slate-400 border-slate-700')
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600 opacity-0 group-hover:opacity-100'}`} />
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tech Stack Banner for Resume */}
      <div className="mt-6 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2 text-slate-200 font-medium">
          <Code2 className="w-4 h-4 text-cyan-400" />
          <span>Resume Tech Stack</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Frontend: <span className="text-cyan-300">React + TS + Tailwind</span><br />
          Backend: <span className="text-emerald-300">Java Spring Boot + REST API</span><br />
          Database: <span className="text-amber-300">MySQL + Spring Data JPA</span>
        </p>
      </div>

    </aside>
  );
};
