import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [info, setInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setInfo(null);

    if (!fullName.trim()) {
      setErr('Please enter your name.');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
      options: {
        data: {
          full_name: fullName.trim(),
        },
      },
    });

    setLoading(false);

    if (error) {
      console.error('Error signing up:', error);
      setErr(error.message || 'Error creating your account.');
      return;
    }

    // If email confirmation is ON, user may need to check email
    if (!data.session) {
      setInfo('Check your email to confirm your account, then log in.');
    } else {
      setInfo('Account created successfully!');
    }

    // Optional: clear password field, keep email/name so they see what they entered
    setPassword('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        maxWidth: '360px',
        padding: '1rem',
        borderRadius: '1rem',
        border: '1px solid rgba(51,65,85,0.9)',
        background: 'rgba(15,23,42,0.95)',
        boxShadow: '0 14px 30px rgba(15,23,42,0.8)',
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: '0.85rem',
          fontSize: '1.1rem',
          color: '#e5e7eb',
        }}
      >
        Create an account
      </h2>

      <div style={{ marginBottom: '0.75rem' }}>
        <label
          style={{
            display: 'block',
            fontSize: '0.85rem',
            marginBottom: '0.25rem',
            color: '#e5e7eb',
          }}
        >
          Name
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Hunter Dunn"
          required
          style={{
            width: '100%',
            padding: '0.45rem 0.7rem',
            borderRadius: '0.6rem',
            border: '1px solid rgba(148,163,184,0.7)',
            background: 'rgba(15,23,42,0.9)',
            color: '#e5e7eb',
            fontSize: '0.9rem',
          }}
        />
      </div>

      <div style={{ marginBottom: '0.75rem' }}>
        <label
          style={{
            display: 'block',
            fontSize: '0.85rem',
            marginBottom: '0.25rem',
            color: '#e5e7eb',
          }}
        >
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          style={{
            width: '100%',
            padding: '0.45rem 0.7rem',
            borderRadius: '0.6rem',
            border: '1px solid rgba(148,163,184,0.7)',
            background: 'rgba(15,23,42,0.9)',
            color: '#e5e7eb',
            fontSize: '0.9rem',
          }}
        />
      </div>

      <div style={{ marginBottom: '0.75rem' }}>
        <label
          style={{
            display: 'block',
            fontSize: '0.85rem',
            marginBottom: '0.25rem',
            color: '#e5e7eb',
          }}
        >
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.45rem 0.7rem',
            borderRadius: '0.6rem',
            border: '1px solid rgba(148,163,184,0.7)',
            background: 'rgba(15,23,42,0.9)',
            color: '#e5e7eb',
            fontSize: '0.9rem',
          }}
        />
      </div>

      {err && (
        <div
          className="error"
          style={{ marginBottom: '0.75rem', fontSize: '0.85rem' }}
        >
          {err}
        </div>
      )}

      {info && (
        <div
          style={{
            marginBottom: '0.75rem',
            fontSize: '0.85rem',
            color: '#bbf7d0',
          }}
        >
          {info}
        </div>
      )}

      <button
        type="submit"
        className="btn"
        disabled={loading}
        style={{
          width: '100%',
          justifyContent: 'center',
          display: 'inline-flex',
          fontSize: '0.9rem',
        }}
      >
        {loading ? 'Creating account…' : 'Sign up'}
      </button>
    </form>
  );
}

export default SignUp;