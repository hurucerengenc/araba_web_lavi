import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
// Using the same table CSS from Reservations for consistency
import './ReservationsManagement.css'; 

const VehiclesManagement = () => {
  const [vehicles, setVehicles] = useState([
    { id: 1, name: 'Mercedes Maybach', brand: 'Mercedes-Benz', model: 'V-Serisi', pax: 7, luggage: 5, status: 'active' }
  ]);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (id: number) => {
    if (window.confirm('Bu aracı silmek veya pasif yapmak istediğinize emin misiniz?')) {
      setVehicles(vehicles.filter(v => v.id !== id));
      // alert('Araç silindi.');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <div className="admin-reservations">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title text-gradient-gold">Araç Yönetimi</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
            Filodaki araçları yönetin, kapasiteleri belirleyin ve araç durumlarını güncelleyin.
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          + Yeni Araç Ekle
        </Button>
      </div>
      
      <div className="admin-panel-card glass-panel">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Ad</th>
                <th>Marka / Model</th>
                <th>Kapasite</th>
                <th>Durum</th>
                <th style={{ textAlign: 'right' }}>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map(v => (
                <tr key={v.id}>
                  <td>
                    <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{v.name}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ color: 'var(--color-text-secondary)' }}>{v.brand}</span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gold-500)' }}>{v.model}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ color: 'var(--color-text-secondary)' }}>{v.pax} Yolcu</span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{v.luggage} Bagaj</span>
                    </div>
                  </td>
                  <td>
                    <Badge variant={v.status === 'active' ? 'success' : 'error'}>
                      {v.status === 'active' ? 'Aktif' : 'Pasif'}
                    </Badge>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <Button variant="ghost" size="sm" onClick={() => setShowModal(true)}>Düzenle</Button>
                      <Button variant="ghost" size="sm" style={{ color: 'var(--color-error)' }} onClick={() => handleDelete(v.id)}>Sil</Button>
                    </div>
                  </td>
                </tr>
              ))}
              {vehicles.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 'var(--spacing-8)', color: 'var(--color-text-muted)' }}>
                    Kayıtlı araç bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        title="Araç Ekle / Düzenle"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowModal(false)}>İptal</Button>
            <Button variant="primary" onClick={handleSave}>Kaydet</Button>
          </>
        }
      >
        <form id="vehicle-form" onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          <Input type="text" label="Araç Adı" placeholder="Örn: Mercedes Maybach" required />
          
          <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
            <Input type="text" label="Marka" placeholder="Örn: Mercedes-Benz" required />
            <Input type="text" label="Model" placeholder="Örn: V-Serisi" required />
          </div>
          
          <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
            <Input type="number" label="Yolcu Kapasitesi" placeholder="Örn: 7" required />
            <Input type="number" label="Bagaj Kapasitesi" placeholder="Örn: 5" required />
          </div>
          
          <div className="ui-input-wrapper">
            <label className="ui-input-label">Açıklama</label>
            <textarea 
              className="ui-input" 
              placeholder="Araç özellikleri hakkında bilgi..."
              style={{ minHeight: '100px', resize: 'vertical' }}
            />
          </div>
          
          <Input type="text" label="Görsel URL" placeholder="https://..." />
        </form>
      </Modal>
    </div>
  );
};

export default VehiclesManagement;
