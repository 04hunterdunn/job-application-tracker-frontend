import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import JobsPage from './pages/JobsPage';
import NewJobPage from './pages/NewJobPage';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

function App() {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [user, setUser] = useState(null);
  const displayName =
    user?.user_metadata?.full_name ||
    (user?.email ? user.email.split('@')[0] : 'there');
  const [loadingUser, setLoadingUser] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // Check current session on load + listen for auth changes
  useEffect(() => {
    // initial check
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoadingUser(false);
    });

    // subscribe to future auth changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  // If not logged in, force URL to /login (so routing makes sense)
  useEffect(() => {
    if (!loadingUser && !user && location.pathname !== '/login') {
      navigate('/login', { replace: true });
    }
  }, [loadingUser, user, location.pathname, navigate]);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/login', { replace: true });
  }

  // While we don't know if the user is logged in yet
  if (loadingUser) {
    return (
      <div className="app-root">
        <div className="app-shell">
          <div className="loading-container">
            <div className="spinner" />
            <div>Checking your session…</div>
          </div>
        </div>
      </div>
    );
  }

  // If no user: show login/signup UI (at /login)
  if (!user) {
    return (
      <div className="auth-layout">
        <div className="auth-header">
          <h1 className="app-title">Job Tracker</h1>
          <p className="auth-subtitle">
            Keep your job search organized in one place.
          </p>
        </div>

        <div className="auth-toggle">
          <button
            type="button"
            className={mode === 'login' ? 'auth-tab active' : 'auth-tab'}
            onClick={() => setMode('login')}
          >
            Log in
          </button>
          <button
            type="button"
            className={mode === 'signup' ? 'auth-tab active' : 'auth-tab'}
            onClick={() => setMode('signup')}
          >
            Sign up
          </button>
        </div>

        <div className="auth-card">
          {mode === 'login' ? (
            <SignIn onLogin={setUser} />
          ) : (
            <SignUp />
          )}
        </div>
      </div>
    );
  }

  // If user IS logged in: show Jobs routes + header
  return (
    <div className="app-root">
      <div className="app-shell">
        <header className="app-header">
          <div>
            <h1 className="app-title">
              Job Tracker
              <span className="app-title-pill">Supabase</span>
            </h1>
            <div
              style={{
                fontSize: '0.85rem',
                color: '#9ca3af',
                marginTop: '0.15rem',
              }}
            >
              Track your applications, statuses, and progress in one dashboard.
            </div>
          </div>

          <div className="app-user">
            <div>
              <div style={{ fontSize: '0.8rem', color: '#e5e7eb' }}>{user.email}</div>
              <div style={{ fontSize: '0.75rem' }}>Signed in</div>
            </div>
            <button
              onClick={handleLogout}
              className="btn"
              style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}
            >
              Log out
            </button>
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route
              path="/jobs"
              element={
                <JobsPage
                  onAddJobClick={() => navigate('/jobs/new')}
                  displayName={displayName}
                />
              }
            />
            <Route
              path="/jobs/new"
              element={
                <NewJobPage
                  onBack={() => navigate('/jobs')}
                  displayName={displayName}
                />
              }
            />
            <Route path="*" element={<Navigate to="/jobs" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;