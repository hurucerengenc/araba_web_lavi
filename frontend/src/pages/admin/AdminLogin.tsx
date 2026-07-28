import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import '../../styles/animations.css';
import './AdminLogin.css';

interface AdminLoginProps {
  onLogin: (token: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

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
      setError('Sunucuya bağlanırken hata oluştu. Lütfen bağlantınızı kontrol edin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card glass-panel">
        <div className="admin-login-header">
          <h2 className="admin-login-title text-gradient-gold">VIP KAYSERİ</h2>
          <p className="admin-login-subtitle">Yönetim Paneli Girişi</p>
        </div>

        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleLogin} className="admin-login-form">
          <Input
            type="email"
            label="E-posta Adresi"
            placeholder="admin@vipkayseri.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <Input
            type="password"
            label="Şifre"
            placeholder="••••••••"
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
            required
            autoComplete="current-password"
          />

          <Button 
            type="submit" 
            variant="primary" 
            size="lg" 
            fullWidth 
            isLoading={isLoading}
            style={{ marginTop: '0.5rem' }}
          >
            SİSTEME GİRİŞ YAP
          </Button>
        </form>

        <div className="admin-login-footer">
          &copy; {new Date().getFullYear()} VIP Kayseri. Tüm hakları saklıdır.
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;