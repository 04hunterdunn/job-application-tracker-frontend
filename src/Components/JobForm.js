import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

function JobForm({ onJobAdded }) {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('Applied');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  // Clear success message after a few seconds
  useEffect(() => {
    if (!success) return;
    const id = setTimeout(() => setSuccess(''), 2500);
    return () => clearTimeout(id);
  }, [success]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!company.trim() || !position.trim()) {
      setError('Please enter both a company and a position.');
      return;
    }

    setLoading(true);

    // Get the current logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setLoading(false);
      setError('You must be logged in to add a job.');
      return;
    }

    // Insert the job into Supabase
    const { data, error: insertError } = await supabase
      .from('jobs')
      .insert([
        {
          user_id: user.id,
          company: company.trim(),
          position: position.trim(),
          status: status.trim(),
          notes: notes.trim(),
        },
      ])
      .select()
      .single();

    setLoading(false);

    if (insertError) {
      console.error('Error inserting job:', insertError);
      setError('Error saving job. Please try again.');
      return;
    }

    // Clear the form
    setCompany('');
    setPosition('');
    setStatus('Applied');
    setNotes('');
    setSuccess('Job added!');

    // Notify parent if needed
    if (onJobAdded) {
      onJobAdded(data);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="job-form"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      <h2>Add a new application</h2>

      <div className="form-row">
        <label>Company</label>
        <input
          type="text"
          value={company}
          onChange={e => setCompany(e.target.value)}
          placeholder="Acme Corp"
          required
          autoFocus
        />
      </div>

      <div className="form-row">
        <label>Position</label>
        <input
          type="text"
          value={position}
          onChange={e => setPosition(e.target.value)}
          placeholder="Software Engineer"
          required
        />
      </div>

      <div className="form-row">
        <label>Status</label>
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option>Applied</option>
          <option>Interviewing</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </div>

      <div className="form-row">
        <label>Notes</label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Recruiter, salary range, referral, etc."
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            className="error"
            style={{ marginBottom: '0.75rem', fontSize: '0.85rem' }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {success && (
          <motion.div
            className="toast-success"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
          >
            {success}
          </motion.div>
        )}
      </AnimatePresence>

      <button type="submit" disabled={loading}>
        {loading ? 'Saving…' : 'Add application'}
      </button>
    </motion.form>
  );
}

export default JobForm;