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
        style={{ marginBottom: '1rem' }}
      >
        ← Back to jobs
      </button>

      <Greeting name="Hunter" />
      <JobForm onJobAdded={handleJobAdded} />
    </div>
  );
}

export default NewJobPage;