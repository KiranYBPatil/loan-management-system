import React from 'react';
import { BadgeDollarSign, CalendarClock, Percent, Wallet } from 'lucide-react';

const LoanSummary = ({ loanDetails, isVisible }) => {
  if (!isVisible) return null;

  const { loanAmount, delayDays, penaltyRate, penaltyAmount, totalAmount } = loanDetails;

  return (
    <div className="glass-panel p-6 w-full max-w-md animate-fade-in" style={{ padding: '2rem' }}>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Wallet className="text-secondary" color="var(--secondary)" />
        Payment Summary
      </h2>

      <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* Principal */}
        <div className="flex justify-between items-center p-3 rounded-lg bg-surface" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem' }}>
          <span className="text-muted flex items-center gap-2" style={{ color: 'var(--text-muted)', display: 'flex', gap: '0.5rem' }}>
            <BadgeDollarSign size={18} /> Principal Amount
          </span>
          <span className="font-semibold" style={{ fontWeight: 600 }}>${loanAmount.toFixed(2)}</span>
        </div>

        {/* Delay Info */}
        <div className="flex justify-between items-center p-3 rounded-lg bg-surface" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem' }}>
          <span className="text-muted flex items-center gap-2" style={{ color: 'var(--text-muted)', display: 'flex', gap: '0.5rem' }}>
            <CalendarClock size={18} /> Delay Period
          </span>
          <span className={`font-semibold ${delayDays > 15 ? 'text-error' : 'text-success'}`} style={{ fontWeight: 600, color: delayDays > 15 ? 'var(--error)' : 'var(--success)' }}>
            {delayDays} Days
          </span>
        </div>

        {/* Penalty Rate */}
        <div className="flex justify-between items-center p-3 rounded-lg bg-surface" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem' }}>
          <span className="text-muted flex items-center gap-2" style={{ color: 'var(--text-muted)', display: 'flex', gap: '0.5rem' }}>
            <Percent size={18} /> Penalty Rate
          </span>
          <span className="font-semibold" style={{ fontWeight: 600 }}>{(penaltyRate * 100).toFixed(0)}%</span>
        </div>

        {/* Penalty Amount */}
        <div className="flex justify-between items-center p-3 rounded-lg bg-surface" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem' }}>
          <span className="text-muted" style={{ color: 'var(--text-muted)' }}>Penalty Amount</span>
          <span className="font-semibold text-error" style={{ fontWeight: 600, color: 'var(--error)' }}>+ ${penaltyAmount.toFixed(2)}</span>
        </div>

        <div className="h-px bg-white/10 my-4" style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '1rem 0' }}></div>

        {/* Total */}
        <div className="flex justify-between items-end" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <span className="text-muted" style={{ color: 'var(--text-muted)' }}>Total Payable</span>
          <span className="text-3xl font-bold text-accent" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent)' }}>
            ${totalAmount.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoanSummary;
