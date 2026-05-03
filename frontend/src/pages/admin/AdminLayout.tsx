import React, { useState } from 'react';
import VehiclesManagement from './VehiclesManagement';
import ServicesManagement from './ServicesManagement';
import GalleryManagement from './GalleryManagement';
import ReservationsManagement from './ReservationsManagement';

interface AdminLayoutProps {
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('vehicles');

  const renderContent = () => {
    switch (activeTab) {
      case 'vehicles': return <VehiclesManagement />;
      case 'services': return <ServicesManagement />;
      case 'gallery': return <GalleryManagement />;
      case 'reservations': return <ReservationsManagement />;
      default: return <VehiclesManagement />;
    }
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <div style={styles.logo}>
          <h2 style={{ fontSize: '18px', letterSpacing: '2px', color: 'white' }}>VIP KAYSERİ</h2>
          <span style={{ fontSize: '10px', color: '#C5A059', letterSpacing: '1px' }}>ADMİN PANELİ</span>
        </div>
        <nav style={styles.nav}>
          <button style={activeTab === 'vehicles' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('vehicles')}>Araç Yönetimi</button>
          <button style={activeTab === 'services' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('services')}>Hizmet Yönetimi</button>
          <button style={activeTab === 'gallery' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('gallery')}>Galeri Yönetimi</button>
          <button style={activeTab === 'reservations' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('reservations')}>Rezervasyon Yönetimi</button>
        </nav>
        <button style={styles.logoutBtn} onClick={onLogout}>Çıkış Yap</button>
      </aside>
      <main style={styles.mainContent}>
        {renderContent()}
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#050505',
    color: 'white',
    fontFamily: "'Montserrat', sans-serif"
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#111',
    borderRight: '1px solid #222',
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '20px 0',
  },
  logo: {
    padding: '0 20px 30px',
    borderBottom: '1px solid #222',
    marginBottom: '20px',
    textAlign: 'center' as const,
  },
  nav: {
    display: 'flex',
    flexDirection: 'column' as const,
    flex: 1,
  },
  tab: {
    padding: '15px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#888',
    textAlign: 'left' as const,
    cursor: 'pointer',
    fontSize: '14px',
    transition: '0.3s',
  },
  activeTab: {
    padding: '15px 20px',
    backgroundColor: '#222',
    border: 'none',
    color: '#C5A059',
    textAlign: 'left' as const,
    cursor: 'pointer',
    fontSize: '14px',
    borderRight: '3px solid #C5A059',
  },
  logoutBtn: {
    padding: '15px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    borderTop: '1px solid #222',
    color: '#ff4d4f',
    textAlign: 'left' as const,
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: 'auto',
  },
  mainContent: {
    flex: 1,
    padding: '40px',
    overflowY: 'auto' as const,
  }
};

export default AdminLayout;
