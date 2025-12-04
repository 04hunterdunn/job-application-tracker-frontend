// src/pages/SignIn.jsx
import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function SignIn({onLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn(e) {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);


    if (error) {
        alert(error.message);
    } else {
        console.log('Sign in result:', data);
        alert('Login successful!');
        const user = data?.session?.user;
        if (user && onLogin) {
            onLogin(user);
        }
    }
    
  }

  return (
    <form onSubmit={handleSignIn} className="max-w-md mx-auto p-4">
      <h2 className="text-xl mb-4">Log in</h2>

      <input
        type="email"
        required
        placeholder="Email"
        className="w-full mb-2 p-2 border rounded"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        required
        placeholder="Password"
        className="w-full mb-4 p-2 border rounded"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? 'Logging in...' : 'Log in'}
      </button>
    </form>
  );
}