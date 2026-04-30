import { useState, useEffect } from 'react';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseFilter from './components/ExpenseFilter';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [filters, setFilters] = useState({
    category: "",
    sort: "date_desc",
    min_amount: "",
    max_amount: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams();

        if (filters.sort) params.append('sort', filters.sort);
        if (filters.category) params.append('category', filters.category);

        if (filters.min_amount)
          params.append('min_amount', Math.round(parseFloat(filters.min_amount) * 100));

        if (filters.max_amount)
          params.append('max_amount', Math.round(parseFloat(filters.max_amount) * 100));

        if (filters.start_date) params.append('start_date', filters.start_date);
        if (filters.end_date) params.append('end_date', filters.end_date);

        const res = await fetch(`${API_URL}/expenses?${params.toString()}`);

        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();
        setExpenses(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [filters, refreshTrigger]);

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0) / 100;

  return (
    <div className="container">
      <Header totalAmount={totalAmount} />

      <ExpenseForm
        apiUrl={API_URL}
        onExpenseAdded={() => {

          setRefreshTrigger(prev => prev + 1);
        }}
      />

      <ExpenseFilter filters={filters} setFilters={setFilters} />

      <ExpenseList expenses={expenses} loading={loading} />
    </div>
  );
}

export default App;