import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import './ReservationsManagement.css'; // Reusing table CSS

const ServicesManagement = () => {
  const [services, setServices] = useState([
    { id: 1, name: 'Havalimanı Transferi', status: 'active', description: 'VIP karşılama ile havalimanı transferi.' },
    { id: 2, name: 'Kapadokya Özel Turu', status: 'active', description: 'Tam gün özel şoförlü Kapadokya turu.' },
    { id: 3, name: 'Kurumsal Protokol', status: 'active', description: 'Kurumsal misafirler için özel protokol.' }
  ]);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id: number) => {
    if (window.confirm('Bu hizmeti silmek veya pasif yapmak istediğinize emin misiniz?')) {
      setServices(services.filter(s => s.id !== id));
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
          <h2 className="admin-page-title text-gradient-gold">Hizmet Yönetimi</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
            Sunulan VIP hizmetleri yönetin, yenilerini ekleyin veya mevcut olanları düzenleyin.
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          + Yeni Hizmet Ekle
        </Button>
      </div>
      
      <div className="admin-panel-card glass-panel">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Hizmet Adı</th>
                <th>Açıklama</th>
                <th>Durum</th>
                <th style={{ textAlign: 'right' }}>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {services.map(s => (
                <tr key={s.id}>
                  <td>
                    <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{s.name}</span>
                  </td>
                  <td>
                    <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>{s.description}</span>
                  </td>
                  <td>
                    <Badge variant={s.status === 'active' ? 'success' : 'error'}>
                      {s.status === 'active' ? 'Aktif' : 'Pasif'}
                    </Badge>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <Button variant="ghost" size="sm" onClick={() => setShowModal(true)}>Düzenle</Button>
                      <Button variant="ghost" size="sm" style={{ color: 'var(--color-error)' }} onClick={() => handleDelete(s.id)}>Sil</Button>
                    </div>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: 'var(--spacing-8)', color: 'var(--color-text-muted)' }}>
                    Kayıtlı hizmet bulunamadı.
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
        title="Hizmet Ekle / Düzenle"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowModal(false)}>İptal</Button>
            <Button variant="primary" onClick={handleSave}>Kaydet</Button>
          </>
        }
      >
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          <Input type="text" label="Hizmet Adı" placeholder="Örn: Şehirlerarası Transfer" required />
          
          <div className="ui-input-wrapper">
            <label className="ui-input-label">Açıklama</label>
            <textarea 
              className="ui-input" 
              placeholder="Hizmet hakkında kısa bilgi..."
              style={{ minHeight: '100px', resize: 'vertical' }}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ServicesManagement;
