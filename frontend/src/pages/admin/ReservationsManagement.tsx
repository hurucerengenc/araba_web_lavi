import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import './ReservationsManagement.css';

type Reservation = {
  rezervasyon_id: number;
  ad_soyad: string;
  telefon: string;
  email: string;
  hizmet_adi: string | null;
  rezervasyon_tarihi: string;
  rezervasyon_saati: string;
  kisi_sayisi: number;
  guzergah_not: string | null;
  alis_noktasi: string | null;
  varis_noktasi: string | null;
  arac_adi: string | null;
  durum: string;
};

const statusOptions = [
  { value: 'Beklemede', label: 'Beklemede' },
  { value: 'Onaylandı', label: 'Onaylandı' },
  { value: 'Tamamlandı', label: 'Tamamlandı' },
  { value: 'İptal Edildi', label: 'İptal Edildi' },
];

const ReservationsManagement = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setMessage('');

      const response = await fetch('http://localhost:5001/api/rezervasyonlar');

      if (!response.ok) {
        throw new Error('Rezervasyonlar getirilemedi.');
      }

      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error('Rezervasyon listeleme hatası:', error);
      setMessage('Rezervasyonlar yüklenirken bir sorun oluştu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      setMessage('');
      const token = localStorage.getItem('adminToken');

      const response = await fetch(`http://localhost:5001/api/rezervasyonlar/${id}/durum`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ durum: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Rezervasyon durumu güncellenemedi.');
      }

      setReservations((prev) =>
        prev.map((res) => (res.rezervasyon_id === id ? { ...res, durum: newStatus } : res))
      );
    } catch (error) {
      console.error('Durum güncelleme hatası:', error);
      setMessage('Durum güncellenirken bir sorun oluştu.');
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Beklemede': return 'warning';
      case 'Onaylandı': return 'info';
      case 'Tamamlandı': return 'success';
      case 'İptal Edildi': return 'error';
      default: return 'default';
    }
  };

  const formatDate = (dateValue: string) => {
    if (!dateValue) return '-';
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return dateValue;
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatTime = (timeValue: string) => {
    if (!timeValue) return '-';
    return timeValue.toString().slice(0, 5);
  };

  return (
    <div className="admin-reservations">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title text-gradient-gold">Rezervasyonlar</h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
            Müşteri rezervasyonlarını yönetin ve durumlarını güncelleyin.
          </p>
        </div>
        <Button variant="outline" onClick={fetchReservations} isLoading={loading}>
          Listeyi Yenile
        </Button>
      </div>

      {message && (
        <div style={{ color: 'var(--color-error)', marginBottom: 'var(--spacing-4)' }}>
          {message}
        </div>
      )}

      <div className="admin-panel-card glass-panel">
        {loading ? (
          <div className="admin-empty-state">
            <div className="ui-button__spinner" style={{ width: '2rem', height: '2rem', marginBottom: '1rem', color: 'var(--color-gold-500)' }} />
            <p>Veriler yükleniyor...</p>
          </div>
        ) : reservations.length === 0 ? (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">📁</div>
            <h3>Kayıt Bulunamadı</h3>
            <p>Sistemde henüz bir rezervasyon kaydı mevcut değil.</p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Müşteri Bilgileri</th>
                  <th>Hizmet & Araç</th>
                  <th>Tarih & Saat</th>
                  <th>Rota / Notlar</th>
                  <th>Kişi</th>
                  <th>Mevcut Durum</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res) => (
                  <tr key={res.rezervasyon_id}>
                    <td>
                      <div className="user-info">
                        <span className="user-name">{res.ad_soyad}</span>
                        <span className="user-contact">{res.telefon}</span>
                        <span className="user-contact">{res.email}</span>
                      </div>
                    </td>
                    <td>
                      <div className="service-info">
                        <span className="service-name">{res.hizmet_adi || '-'}</span>
                        <span className="service-car">{res.arac_adi || 'Araç Seçilmedi'}</span>
                      </div>
                    </td>
                    <td>
                      <div className="service-info">
                        <span className="user-name">{formatDate(res.rezervasyon_tarihi)}</span>
                        <span className="user-contact">{formatTime(res.rezervasyon_saati)}</span>
                      </div>
                    </td>
                    <td>
                      <div className="route-info">
                        {(res.alis_noktasi || res.varis_noktasi) && (
                          <>
                            <div className="route-item">
                              <span className="route-label">Alış:</span>
                              <span className="route-value">{res.alis_noktasi || '-'}</span>
                            </div>
                            <div className="route-item">
                              <span className="route-label">Varış:</span>
                              <span className="route-value">{res.varis_noktasi || '-'}</span>
                            </div>
                          </>
                        )}
                        {res.guzergah_not && (
                          <div className="route-item" style={{ marginTop: '4px', fontStyle: 'italic' }}>
                            <span className="route-value">"{res.guzergah_not}"</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>{res.kisi_sayisi || 1}</td>
                    <td>
                      <Badge variant={getStatusVariant(res.durum) as any}>
                        {res.durum}
                      </Badge>
                    </td>
                    <td>
                      <div className="status-action">
                        <Select
                          options={statusOptions}
                          value={res.durum}
                          onChange={(e) => handleStatusChange(res.rezervasyon_id, e.target.value)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationsManagement;