import React, { useState } from 'react';


interface AdminLoginProps {
  onLogin: (token: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Mock logic as instructed (frontend only)
      // Real code would be:
      // const res = await api.post('/admin/login', { email, password });
      // const token = res.data.token;
      
      if (email === 'admin@vipkayseri.com' && password === 'admin123') {
        const fakeToken = "mock_admin_token_123";
        onLogin(fakeToken);
      } else {
        throw new Error('Email veya şifre hatalı');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Email veya şifre hatalı');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Girişi</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email (admin@vipkayseri.com)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Şifre (admin123)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>GİRİŞ YAP</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#0a0a0a',
    color: 'white',
    fontFamily: "'Montserrat', sans-serif"
  },
  card: {
    backgroundColor: '#111',
    padding: '40px',
    borderRadius: '8px',
    border: '1px solid #222',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center' as const
  },
  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '32px',
    marginBottom: '20px',
    fontWeight: 300,
  },
  error: {
    color: '#ff4d4f',
    marginBottom: '15px',
    fontSize: '14px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px',
  },
  input: {
    padding: '15px',
    backgroundColor: '#050505',
    border: '1px solid #333',
    color: 'white',
    fontSize: '14px',
    outline: 'none',
  },
  button: {
    padding: '15px',
    backgroundColor: '#C5A059',
    color: '#000',
    border: 'none',
    fontWeight: 700,
    cursor: 'pointer',
    marginTop: '10px',
  }
};

export default AdminLogin;
