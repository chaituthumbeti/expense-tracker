export default function ExpenseList({ expenses, loading }) {
  const formatDate = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    const day = date.getDate();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    const getDaySuffix = (d) => {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    return `${day}${getDaySuffix(day)} ${month} ${year}`;
  };

  return (
    <section className="card table-container">
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="4" className="text-center">Loading...</td></tr>
          ) : expenses.length === 0 ? (
            <tr><td colSpan="4" className="text-center">No expenses found.</td></tr>
          ) : (
            expenses.map((exp) => (
              <tr key={exp.id}>
                <td className="font-bold">₹{(exp.amount / 100).toFixed(2)}</td>
                <td><span className="tag">{exp.category}</span></td>
                <td>{exp.description || "-"}</td>
                <td>{formatDate(exp.date)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
} 