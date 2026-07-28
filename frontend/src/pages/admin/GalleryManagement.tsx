import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import './ReservationsManagement.css'; // Reusing table CSS

const GalleryManagement = () => {
  const [images, setImages] = useState([
    { id: 1, title: 'Maybach İç Mekan', category: 'Araç İçi', isCover: true, order: 1 }
  ]);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id: number) => {
    if (window.confirm('Bu görseli silmek istediğinize emin misiniz?')) {
      setImages(images.filter(img => img.id !== id));
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
          <h2 className="admin-page-title text-gradient-gold">Galeri Yönetimi</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
            Web sitesinde gösterilecek araç ve hizmet görsellerini yönetin.
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          + Yeni Görsel Ekle
        </Button>
      </div>
      
      <div className="admin-panel-card glass-panel">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Görsel Başlığı</th>
                <th>Kategori</th>
                <th>Sıralama</th>
                <th>Öne Çıkan (Kapak)</th>
                <th style={{ textAlign: 'right' }}>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {images.map(img => (
                <tr key={img.id}>
                  <td>
                    <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{img.title}</span>
                  </td>
                  <td>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{img.category}</span>
                  </td>
                  <td>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{img.order}</span>
                  </td>
                  <td>
                    {img.isCover ? (
                      <Badge variant="success">Evet</Badge>
                    ) : (
                      <Badge variant="default">Hayır</Badge>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <Button variant="ghost" size="sm" onClick={() => setShowModal(true)}>Düzenle</Button>
                      <Button variant="ghost" size="sm" style={{ color: 'var(--color-error)' }} onClick={() => handleDelete(img.id)}>Sil</Button>
                    </div>
                  </td>
                </tr>
              ))}
              {images.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 'var(--spacing-8)', color: 'var(--color-text-muted)' }}>
                    Kayıtlı görsel bulunamadı.
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
        title="Görsel Ekle / Düzenle"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowModal(false)}>İptal</Button>
            <Button variant="primary" onClick={handleSave}>Kaydet</Button>
          </>
        }
      >
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          <Input type="text" label="Başlık / Açıklama" placeholder="Örn: VIP İç Mekan" required />
          
          <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
            <Input type="text" label="Kategori" placeholder="Örn: Araç İçi" required />
            <Input type="number" label="Sıralama Numarası" placeholder="1" required />
          </div>
          
          <div className="ui-input-wrapper" style={{ flexDirection: 'row', alignItems: 'center' }}>
            <input type="checkbox" id="isCover" style={{ width: '16px', height: '16px', accentColor: 'var(--color-gold-500)' }} />
            <label htmlFor="isCover" style={{ color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
              Kapak Görseli Olarak Ayarla
            </label>
          </div>
          
          <Select 
            label="İlgili Araç (Opsiyonel)"
            options={[
              { value: '', label: 'Seçiniz...' },
              { value: '1', label: 'Mercedes Maybach V-Serisi' }
            ]}
          />
          
          <div className="ui-input-wrapper">
            <label className="ui-input-label">Görsel Yükle</label>
            <div style={{ 
              border: '1px dashed var(--color-border)', 
              borderRadius: 'var(--radius-md)', 
              padding: 'var(--spacing-6)', 
              textAlign: 'center',
              backgroundColor: 'var(--color-bg-surface)',
              cursor: 'pointer'
            }}>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>Dosya seçmek için tıklayın veya sürükleyin</p>
              <input type="file" style={{ display: 'none' }} id="file-upload" />
              <Button type="button" variant="outline" size="sm" style={{ marginTop: 'var(--spacing-3)' }} onClick={() => document.getElementById('file-upload')?.click()}>
                Dosya Seç
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default GalleryManagement;
