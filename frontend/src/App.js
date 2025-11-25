// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Greeting from './Components/Welcome.js';
import JobList from './Components/JobList.js';
import JobForm from './Components/JobForm';
import './App.css'; // make sure this exists

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/jobs`)
      .then(res => setJobs(res.data))
      .catch(e => setErr('Failed to load jobs'))
      .finally(() => setLoading(false));
  }, []);

  const handleJobAdded = (newJob) => setJobs(prev => [...prev, newJob]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/jobs/${id}`);
      setJobs(prev => prev.filter(j => j.id !== id));
    } catch {
      alert('Error deleting job.');
    }
  };

  const handleUpdate = async (id, newStatus) => {
    const job = jobs.find(j => j.id === id);
    if (!job) return;
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/jobs/${id}`,
        { ...job, status: newStatus }
      );
      setJobs(prev => prev.map(j => (j.id === id ? data : j)));
    } catch {
      alert('Error updating job.');
    }
  };

  if (loading) return <div className="container"><p className="muted">Loading applications…</p></div>;
  if (err)     return <div className="container error">{err}</div>;

  return (
    <div className="container">
      <Greeting name="Hunter" />
      <JobForm onJobAdded={handleJobAdded} />
      {jobs.length === 0 ? (
        <div className="empty">
          <h3>No applications yet</h3>
          <p>Add your first one above.</p>
        </div>
      ) : (
        <JobList
          jobs={jobs}
          setJobs={setJobs}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default App;