export default function ExpenseFilter({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <section className="card">
      <div className="section-heading">
        <h3>Filter & Sort</h3>
        <p>Refine the list by category, amount, or date range.</p>
      </div>

      <div className="form-group">
        <select name="category" value={filters.category} onChange={handleChange}>
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>

        <select name="sort" value={filters.sort} onChange={handleChange}>
          <option value="date_desc">Newest First</option>
          <option value="date_asc">Oldest First</option>
        </select>
      </div>

      <div className="form-group">
        <input
          type="number"
          name="min_amount"
          placeholder="Min Amount (₹)"
          step="0.01"
          value={filters.min_amount}
          onChange={handleChange}
        />
        <input
          type="number"
          name="max_amount"
          placeholder="Max Amount (₹)"
          step="0.01"
          value={filters.max_amount}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <div className="field-stack">
          <label>Start Date</label>
          <input
            type="date"
            name="start_date"
            value={filters.start_date}
            onChange={handleChange}
          />
        </div>
        <div className="field-stack">
          <label>End Date</label>
          <input
            type="date"
            name="end_date"
            value={filters.end_date}
            onChange={handleChange}
          />
        </div>
      </div>
    </section>
  );
}