import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';

function SignIn({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (error) {
      console.error('Error signing in:', error);
      setErr(error.message || 'Error signing in.');
      return;
    }

    if (typeof onLogin === 'function') {
      // refresh user in App via setUser
      onLogin(data.user);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        maxWidth: '360px',
        padding: '1rem',
        borderRadius: '1rem',
        border: '1px solid rgba(51, 65, 85, 0.9)',
        background: 'rgba(15, 23, 42, 0.95)',
        boxShadow: '0 14px 30px rgba(15, 23, 42, 0.8)',
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: '0.85rem',
          fontSize: '1.1rem',
          color: '#e5e7eb',
        }}
      >
        Log in
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
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          autoFocus
          style={{
            width: '100%',
            padding: '0.45rem 0.7rem',
            borderRadius: '0.6rem',
            border: '1px solid rgba(148, 163, 184, 0.7)',
            background: 'rgba(15, 23, 42, 0.9)',
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
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.45rem 0.7rem',
            borderRadius: '0.6rem',
            border: '1px solid rgba(148, 163, 184, 0.7)',
            background: 'rgba(15, 23, 42, 0.9)',
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
        {loading ? 'Signing in…' : 'Log in'}
      </button>
    </motion.form>
  );
}

export default SignIn;