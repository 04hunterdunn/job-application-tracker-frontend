import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function JobForm({ onJobAdded }) {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('Applied');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // Get the current logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setLoading(false);
      alert('You must be logged in to add a job.');
      return;
    }

    // Insert the job into Supabase
    const { data, error } = await supabase
      .from('jobs')
      .insert([
        {
          user_id: user.id,
          company,
          position,
          status,
          notes,
        },
      ])
      .select()
      .single(); // return the one inserted row

    setLoading(false);

    if (error) {
      console.error('Error inserting job:', error);
      alert('Error saving job. Please try again.');
      return;
    }

    // Clear the form
    setCompany('');
    setPosition('');
    setStatus('Applied');
    setNotes('');

    // Tell parent (JobsPage) about the new job so it appears immediately
    if (onJobAdded) {
      onJobAdded(data);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <h2>Add a new application</h2>

      <div className="form-row">
        <label>Company</label>
        <input
          type="text"
          value={company}
          onChange={e => setCompany(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label>Position</label>
        <input
          type="text"
          value={position}
          onChange={e => setPosition(e.target.value)}
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
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Saving…' : 'Add application'}
      </button>
    </form>
  );
}

export default JobForm;