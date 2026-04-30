
export default function Header({ totalAmount }) {
  return (
    <header className="page-header">
      <div className="brand-block">
        <p className="eyebrow">Personal finance dashboard</p>
        <h1>Expense Tracker</h1>
      </div>

      <div className="balance-card">
        <span className="balance-label">Total spent</span>
        <h2 className="total-amount">₹{Number(totalAmount || 0).toFixed(2)}</h2>
      </div>
    </header>
  )
}