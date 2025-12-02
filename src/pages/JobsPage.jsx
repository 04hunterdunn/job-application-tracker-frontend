import React, { useState, useEffect, useMemo } from 'react';
import Greeting from '../Components/Welcome.js';
import JobList from '../Components/JobList.js';
import FloatingAddButton from '../Components/FloatingAddButton';
import { supabase } from '../supabaseClient';

function JobsPage({ onAddJobClick }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // NEW: search + sort state
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('created_at'); // 'created_at' | 'company' | 'position'
  const [sortDir, setSortDir] = useState('desc');     // 'asc' | 'desc'

  useEffect(() => {
    async function loadJobs() {
      setLoading(true);
      setErr(null);

      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading jobs from Supabase:', error);
        setErr('Failed to load jobs');
      } else {
        setJobs(data || []);
      }

      setLoading(false);
    }

    loadJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return;

    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(error);
      alert('Error deleting job.');
      return;
    }

    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const handleUpdate = async (id, newStatus) => {
    const { data, error } = await supabase
      .from('jobs')
      .update({ status: newStatus })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(error);
      alert('Error updating job.');
      return;
    }

    setJobs((prev) => prev.map((j) => (j.id === id ? data : j)));
  };

  // 🔍 + 🔀 Filter + sort jobs on the client
  const processedJobs = useMemo(() => {
    let list = [...jobs];

    if (search.trim()) {
      const term = search.toLowerCase();
      list = list.filter(
        (job) =>
          (job.company || '').toLowerCase().includes(term) ||
          (job.position || '').toLowerCase().includes(term)
      );
    }

    list.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;

      if (sortBy === 'created_at') {
        const aDate = new Date(a.created_at);
        const bDate = new Date(b.created_at);
        return dir * (aDate - bDate);
      }

      const av = (a[sortBy] || '').toString().toLowerCase();
      const bv = (b[sortBy] || '').toString().toLowerCase();
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });

    return list;
  }, [jobs, search, sortBy, sortDir]);

  if (loading) {
    return (
      <div className="app-main">
        <div className="loading-container">
          <div className="spinner" />
          <div>Loading your applications…</div>
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="app-main">
        <div className="error">{err}</div>
      </div>
    );
  }

  return (
    <div className="app-main" style={{ position: 'relative' }}>
      {/* Friendly greeting under the main header */}
      <div style={{ marginBottom: '0.75rem' }}>
        <Greeting name="Hunter" />
      </div>

      {/* Search + sort controls */}
      <div
        style={{
          marginBottom: '0.9rem',
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
        }}
      >
        <input
          type="text"
          placeholder="Search by company or position…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: '1 1 220px',
            padding: '0.4rem 0.7rem',
            borderRadius: '999px',
            border: '1px solid rgba(148,163,184,0.6)',
            background: 'rgba(15,23,42,0.9)',
            color: '#e5e7eb',
            fontSize: '0.85rem',
          }}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '0.4rem 0.7rem',
            borderRadius: '999px',
            border: '1px solid rgba(148,163,184,0.6)',
            background: 'rgba(15,23,42,0.9)',
            color: '#e5e7eb',
            fontSize: '0.85rem',
          }}
        >
          <option value="created_at">Sort by: Date created</option>
          <option value="company">Sort by: Company</option>
          <option value="position">Sort by: Position</option>
        </select>

        <button
          type="button"
          onClick={() =>
            setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
          }
          style={{
            padding: '0.4rem 0.7rem',
            borderRadius: '999px',
            border: '1px solid rgba(148,163,184,0.6)',
            background: 'rgba(15,23,42,0.9)',
            color: '#e5e7eb',
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
        >
          {sortDir === 'asc' ? '↑ Asc' : '↓ Desc'}
        </button>
      </div>

      {/* Empty vs list */}
      {processedJobs.length === 0 ? (
        <div className="empty">
          <h3>No applications yet</h3>
          <p>Click the + button in the corner to add your first one.</p>
        </div>
      ) : (
        <JobList
          jobs={processedJobs}
          setJobs={setJobs}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}

      <FloatingAddButton onClick={onAddJobClick} />
    </div>
  );
}

export default JobsPage;