import React, { useState } from 'react';
import LoanForm from './components/LoanForm';
import LoanSummary from './components/LoanSummary';

function App() {
  const [calculationResult, setCalculationResult] = useState(null);

  const calculatePenalty = (data) => {
    const { loanAmount, delayDays } = data;
    let penaltyRate = 0;

    if (delayDays <= 15) {
      penaltyRate = 0;
    } else if (delayDays >= 16 && delayDays <= 30) {
      penaltyRate = 0.03;
    } else if (delayDays >= 31 && delayDays <= 60) {
      penaltyRate = 0.06;
    } else {
      penaltyRate = 0.12;
    }

    const penaltyAmount = loanAmount * penaltyRate;
    const totalAmount = loanAmount + penaltyAmount;

    setCalculationResult({
      ...data,
      penaltyRate,
      penaltyAmount,
      totalAmount
    });
  };

  return (
    <div className="container" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'row',
      gap: '4rem',
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }}>
      <LoanForm onCalculate={calculatePenalty} />
      <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
        {calculationResult ? (
          <LoanSummary loanDetails={calculationResult} isVisible={true} />
        ) : (
          <div className="glass-panel p-8 flex flex-col items-center justify-center text-center animate-fade-in"
            style={{ padding: '3rem', width: '100%', maxWidth: '400px', height: '300px', opacity: 0.5 }}>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/loan-repayment-4581412-3814812.png"
              alt="Loan Illustration"
              style={{ width: '150px', marginBottom: '1rem', objectFit: 'contain', filter: 'grayscale(100%) opacity(0.5)' }}
              onError={(e) => e.target.style.display = 'none'} // Fallback if image fails
            />
            <p className="text-muted" style={{ color: 'var(--text-muted)' }}>
              Fill in the form to see the penalty calculation and payment summary here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
