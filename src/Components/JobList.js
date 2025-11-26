import React from 'react';

const JobList = ({ jobs, onDelete, onUpdate }) => {
  const badgeClass = (s) => {
    const v = (s || '').toLowerCase();
    if (v.includes('applied')) return 'badge applied';
    if (v.includes('interview')) return 'badge interview';
    if (v.includes('offer')) return 'badge offer';
    if (v.includes('reject')) return 'badge rejected';
    return 'badge applied';
  };

  return (
    <div>
      <h2>Job Applications</h2>

      {jobs.length === 0 ? (
        <p>No job applications yet.</p>
      ) : (
        <div>
          {jobs.map((job) => (
            // 🔹 Here’s where you use the card class
            <div key={job.id} className="card">
              <h3>{job.companyName} — {job.position}</h3>

              {/* 🔹 Status badge */}
              <span className={badgeClass(job.status)}>
                {job.status || 'Applied'}
              </span>

              {/* 🔹 Action buttons */}
              <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <button className="button" onClick={() => onUpdate(job.id, 'Applied')}>
                  Set Applied
                </button>
                <button className="button" onClick={() => onUpdate(job.id, 'Interview')}>
                  Set Interview
                </button>
                <button className="button" onClick={() => onUpdate(job.id, 'Offer')}>
                  Set Offer
                </button>
                <button className="button" onClick={() => onUpdate(job.id, 'Rejected')}>
                  Set Rejected
                </button>
                <button className="button" onClick={() => onDelete(job.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;