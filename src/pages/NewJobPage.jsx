import React from 'react';
import Greeting from '../Components/Welcome';
import JobForm from '../Components/JobForm';
import '../App.css';

function NewJobPage({ onBack }) {
  function handleJobAdded() {
    // After a successful add, just go back to jobs.
    // JobsPage will re-mount and re-fetch from Supabase.
    if (onBack) onBack();
  }

  return (
    <div className="container">
      <button
        type="button"
        onClick={onBack}
        className="btn-back"
        >
        ← Back to jobs
    </button>
      <h1 className="page-title">Add a New Job</h1>
      <p className="page-subtitle">Track details about a job you’re applying for.</p>
      
      <JobForm onJobAdded={handleJobAdded} />
    </div>
  );
}

export default NewJobPage;