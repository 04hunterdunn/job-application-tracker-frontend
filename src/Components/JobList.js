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

  if (!jobs || jobs.length === 0) {
    return (
      <p className="empty">
        No job applications yet. Click the + button in the corner to add your first one.
      </p>
    );
  }

  return (
    <div className="job-list">
      {jobs.map((job) => {
        const company = job.companyName || job.company || 'Unknown company';
        const position = job.position || 'Unknown position';

        return (
          <div key={job.id} className="job-card">
            <div className="job-title">{position}</div>
            <div className="job-company">{company}</div>

            <div className="job-meta">
              {/* Status badge */}
              <span className={badgeClass(job.status)}>
                {job.status || 'Applied'}
              </span>

              {job.location && <span>{job.location}</span>}
              {job.created_at && (
                <span>
                  Created:{' '}
                  {new Date(job.created_at).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              )}
            </div>

            {job.notes && (
              <p className="job-notes">
                <strong>Notes:</strong> {job.notes}
              </p>
            )}

            <div
              className="job-actions"
              style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}
            >
              <button className="btn" onClick={() => onUpdate(job.id, 'Applied')}>
                Set Applied
              </button>
              <button className="btn" onClick={() => onUpdate(job.id, 'Interview')}>
                Set Interview
              </button>
              <button className="btn" onClick={() => onUpdate(job.id, 'Offer')}>
                Set Offer
              </button>
              <button className="btn" onClick={() => onUpdate(job.id, 'Rejected')}>
                Set Rejected
              </button>
              <button className="btn btn-danger" onClick={() => onDelete(job.id)}>
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default JobList;