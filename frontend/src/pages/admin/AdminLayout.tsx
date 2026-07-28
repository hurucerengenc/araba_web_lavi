import React, { useState } from 'react';
import VehiclesManagement from './VehiclesManagement';
import ServicesManagement from './ServicesManagement';
import GalleryManagement from './GalleryManagement';
import ReservationsManagement from './ReservationsManagement';
import './AdminLayout.css';

interface AdminLayoutProps {
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('reservations');

  const renderContent = () => {
    switch (activeTab) {
      case 'reservations': return <ReservationsManagement />;
      case 'vehicles': return <VehiclesManagement />;
      case 'services': return <ServicesManagement />;
      case 'gallery': return <GalleryManagement />;
      default: return <ReservationsManagement />;
    }
  };

  const navItems = [
    { id: 'reservations', label: 'Rezervasyon Yönetimi' },
    { id: 'vehicles', label: 'Araç Yönetimi' },
    { id: 'services', label: 'Hizmet Yönetimi' },
    { id: 'gallery', label: 'Galeri Yönetimi' },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo-container">
          <h2 className="admin-logo-title">VIP KAYSERİ</h2>
          <span className="admin-logo-subtitle">ADMİN PANELİ</span>
        </div>
        
        <nav className="admin-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`admin-nav-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="admin-logout-container">
          <button className="admin-logout-btn" onClick={onLogout}>
            Güvenli Çıkış Yap
          </button>
        </div>
      </aside>
      
      <main className="admin-main">
        {/* The active management component handles its own internal layout,
            but it will inherit global styles and spacing rules. */}
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminLayout;
