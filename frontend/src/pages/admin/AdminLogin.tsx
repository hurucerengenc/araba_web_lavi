import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: (token: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5001/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          sifre: sifre,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Email veya şifre hatalı');
        return;
      }

      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminBilgi', JSON.stringify(data.admin));

      onLogin(data.token);
    } catch (err) {
      setError('Sunucuya bağlanırken hata oluştu.');
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
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Şifre"
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
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