import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Search, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  Printer, 
  Trash2, 
  X,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { Invoice, InvoiceItem, Patient, Doctor, PaymentStatus } from '../types';

interface BillingManagerProps {
  invoices: Invoice[];
  patients: Patient[];
  doctors: Doctor[];
  onCreateInvoice: (invData: Partial<Invoice>) => void;
  onPayInvoice: (id: string, paymentMethod: string) => void;
}

export const BillingManager: React.FC<BillingManagerProps> = ({
  invoices,
  patients,
  doctors,
  onCreateInvoice,
  onPayInvoice,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const [isCreating, setIsCreating] = useState(false);
  const [selectedInvoiceToPrint, setSelectedInvoiceToPrint] = useState<Invoice | null>(null);

  // Form State
  const [selectedPatientId, setSelectedPatientId] = useState<string>(patients[0]?.id || '');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(doctors[0]?.id || '');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('Pending');

  const [lineItems, setLineItems] = useState<InvoiceItem[]>([
    { id: '1', description: 'Specialist Consultation Fee', category: 'Consultation', amount: 150 },
    { id: '2', description: 'Complete Blood Count (CBC) Lab Panel', category: 'Laboratory', amount: 60 },
  ]);

  const handleAddItem = () => {
    setLineItems([
      ...lineItems,
      {
        id: Date.now().toString(),
        description: 'Hospital Service Charge',
        category: 'Consultation',
        amount: 50,
      }
    ]);
  };

  const handleRemoveItem = (id: string) => {
    setLineItems(lineItems.filter(i => i.id !== id));
  };

  const handleUpdateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setLineItems(
      lineItems.map(i => (i.id === id ? { ...i, [field]: value } : i))
    );
  };

  const calculateSubtotal = () => lineItems.reduce((acc, i) => acc + (Number(i.amount) || 0), 0);
  const calculateTax = () => calculateSubtotal() * 0.05;
  const calculateTotal = () => Math.max(0, calculateSubtotal() + calculateTax() - discountAmount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pat = patients.find(p => p.id === selectedPatientId) || patients[0];
    const doc = doctors.find(d => d.id === selectedDoctorId);

    if (!pat) return;

    onCreateInvoice({
      patientId: pat.id,
      patientName: pat.name,
      doctorId: doc?.id,
      doctorName: doc?.name,
      items: lineItems,
      subtotal: calculateSubtotal(),
      taxAmount: calculateTax(),
      discountAmount,
      totalAmount: calculateTotal(),
      paymentStatus,
      paymentMethod: paymentStatus === 'Paid' ? 'Credit Card' : undefined,
    });

    setIsCreating(false);
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.invoiceCode.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || inv.paymentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6" id="billing-manager-container">
      
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-cyan-400" />
            Hospital Billing & Patient Revenue Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Generate itemized invoices, log insurance or card payments, and print tax receipts.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          id="generate-invoice-btn"
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Generate New Invoice</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="billing-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Patient Name or Invoice Code (INV-2026-XXX)..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <select
            id="billing-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="All">All Payment Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl animate-scaleUp my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-cyan-400" />
                Generate Patient Hospital Invoice
              </h2>
              <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Patient *</label>
                  <select
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:ring-2 focus:ring-cyan-500"
                  >
                    {patients.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.mrn})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Attending Physician</label>
                  <select
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:ring-2 focus:ring-cyan-500"
                  >
                    {doctors.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Line items */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Itemized Charges</span>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Service Line
                  </button>
                </div>

                {lineItems.map(item => (
                  <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <input
                      type="text"
                      className="col-span-6 px-2 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                      value={item.description}
                      onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                    />
                    <select
                      className="col-span-3 px-2 py-1 bg-slate-900 border border-slate-800 rounded-lg text-[11px] text-slate-300"
                      value={item.category}
                      onChange={(e) => handleUpdateItem(item.id, 'category', e.target.value as any)}
                    >
                      <option value="Consultation">Consultation</option>
                      <option value="Laboratory">Laboratory</option>
                      <option value="Pharmacy">Pharmacy</option>
                      <option value="Room Charge">Room Charge</option>
                      <option value="Procedure">Procedure</option>
                    </select>
                    <input
                      type="number"
                      className="col-span-2 px-2 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs text-emerald-400 font-bold"
                      value={item.amount}
                      onChange={(e) => handleUpdateItem(item.id, 'amount', Number(e.target.value))}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="col-span-1 text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Tax (5%):</span>
                  <span>${calculateTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-bold text-sm pt-1 border-t border-slate-800">
                  <span>Total Due:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl text-xs shadow-md"
                >
                  Generate & Save Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoices List */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 font-semibold uppercase text-[11px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Invoice #</th>
                <th className="p-4">Patient Name</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Payment Status</th>
                <th className="p-4">Issue Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No invoices matching query.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-cyan-400">{inv.invoiceCode}</td>
                    <td className="p-4 font-bold text-white">{inv.patientName}</td>
                    <td className="p-4 font-bold text-emerald-400">${inv.totalAmount.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                        inv.paymentStatus === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                        inv.paymentStatus === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                        'bg-red-500/10 text-red-400 border-red-500/30'
                      }`}>
                        {inv.paymentStatus} {inv.paymentMethod && `(${inv.paymentMethod})`}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400">{inv.issueDate}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {inv.paymentStatus !== 'Paid' && (
                          <button
                            onClick={() => onPayInvoice(inv.id, 'Credit Card')}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors"
                          >
                            Mark Paid
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedInvoiceToPrint(inv)}
                          className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg"
                          title="Print Hospital Receipt"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Invoice Modal */}
      {selectedInvoiceToPrint && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200">
              <span className="text-xs font-bold text-slate-500">INVOICE & TAX RECEIPT</span>
              <button onClick={() => setSelectedInvoiceToPrint(null)} className="text-slate-500 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center pb-3 border-b border-slate-200">
              <h2 className="text-2xl font-black text-blue-900 tracking-tight bg-gradient-to-r from-blue-900 via-cyan-800 to-blue-900 bg-clip-text text-transparent">
                BHARATH REDDY MEDICAL SCIENCES
              </h2>
              <p className="text-xs font-bold text-blue-700">CarePulse Hospital Management System</p>
              <p className="text-xs text-slate-500 mt-0.5">Invoice Ref: {selectedInvoiceToPrint.invoiceCode}</p>
            </div>

            <div className="text-xs space-y-1">
              <p><strong>Billed To:</strong> {selectedInvoiceToPrint.patientName}</p>
              <p><strong>Attending Doctor:</strong> {selectedInvoiceToPrint.doctorName || 'Hospital Desk'}</p>
              <p><strong>Date:</strong> {selectedInvoiceToPrint.issueDate}</p>
            </div>

            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b text-slate-500 uppercase text-[10px]">
                  <th className="text-left py-1">Description</th>
                  <th className="text-right py-1">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y text-slate-800">
                {selectedInvoiceToPrint.items.map((it, idx) => (
                  <tr key={idx}>
                    <td className="py-2">{it.description} ({it.category})</td>
                    <td className="text-right py-2">${it.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-t pt-2 text-xs space-y-1 text-right">
              <p>Subtotal: ${selectedInvoiceToPrint.subtotal.toFixed(2)}</p>
              <p>Tax (5%): ${selectedInvoiceToPrint.taxAmount.toFixed(2)}</p>
              <p className="text-sm font-bold text-blue-900">Total Paid/Due: ${selectedInvoiceToPrint.totalAmount.toFixed(2)}</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-1.5 bg-blue-600 text-white font-bold rounded-lg text-xs"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
