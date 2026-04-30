import { useState } from "react";

export default function ExpenseForm({ apiUrl, onExpenseAdded }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payLoad = {
      ...formData,
      amount: Math.round(parseFloat(formData.amount) * 100),
    };
    try {
      const res = await fetch(`${apiUrl}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payLoad),
      });
      if (res.ok) {
        setFormData({
          amount: "",
          category: "",
          description: "",
          date: new Date().toISOString().split("T")[0],
        });
        onExpenseAdded();

      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error || "Failed to add expense"}`);
      }
    } catch (err) {
      console.error("Submit error", err);
      alert("Failed to add expense. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="card">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="field-stack">
            <label>Amount</label>
            <input
              type="number"
              placeholder="Amount (Rupees)"
              step="0.01"
              required
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>

          <div className="field-stack">
            <label>Category</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="" disabled>Select Category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="field-stack">
            <label>Description</label>
            <input
              type="text"
              placeholder="Description (optional)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="field-stack">
            <label>Date</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group action-row">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Expense"}
          </button>
        </div>
      </form>
    </section>
  );

}