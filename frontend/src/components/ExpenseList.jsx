export default function ExpenseList({ expenses, loading }) {
  const formatDate = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
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