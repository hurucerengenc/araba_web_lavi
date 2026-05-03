import { useEffect, useState } from 'react';

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
        body: JSON.stringify({
          durum: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Rezervasyon durumu güncellenemedi.');
      }

      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.rezervasyon_id === id
            ? { ...reservation, durum: newStatus }
            : reservation
        )
      );

      setMessage('Rezervasyon durumu güncellendi.');
    } catch (error) {
      console.error('Durum güncelleme hatası:', error);
      setMessage('Durum güncellenirken bir sorun oluştu.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Beklemede':
        return '#f39c12';
      case 'Onaylandı':
        return '#3498db';
      case 'Tamamlandı':
        return '#2ecc71';
      case 'İptal Edildi':
        return '#e74c3c';
      default:
        return '#888';
    }
  };

  const formatDate = (dateValue: string) => {
    if (!dateValue) return '-';

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleDateString('tr-TR');
  };

  const formatTime = (timeValue: string) => {
    if (!timeValue) return '-';

    return timeValue.toString().slice(0, 5);
  };

  return (
    <div>
      <div style={styles.header}>
        <h2>Rezervasyon Yönetimi</h2>

        <button type="button" onClick={fetchReservations} style={styles.refreshButton}>
          Yenile
        </button>
      </div>

      {message && <p style={styles.message}>{message}</p>}

      {loading ? (
        <p style={styles.loading}>Rezervasyonlar yükleniyor...</p>
      ) : reservations.length === 0 ? (
        <p style={styles.empty}>Henüz rezervasyon kaydı bulunmuyor.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Müşteri</th>
                <th style={styles.th}>İletişim</th>
                <th style={styles.th}>Hizmet & Araç</th>
                <th style={styles.th}>Tarih & Saat</th>
                <th style={styles.th}>Rota / Not</th>
                <th style={styles.th}>Kişi</th>
                <th style={styles.th}>Durum</th>
                <th style={styles.th}>İşlem</th>
              </tr>
            </thead>

            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.rezervasyon_id}>
                  <td style={styles.td}>{reservation.ad_soyad}</td>

                  <td style={styles.td}>
                    {reservation.telefon}
                    <br />
                    <span style={styles.smallText}>{reservation.email}</span>
                  </td>

                  <td style={styles.td}>
                    {reservation.hizmet_adi || '-'}
                    <br />
                    <span style={styles.goldText}>{reservation.arac_adi || 'Araç seçilmedi'}</span>
                  </td>

                  <td style={styles.td}>
                    {formatDate(reservation.rezervasyon_tarihi)}
                    <br />
                    <span style={styles.smallText}>{formatTime(reservation.rezervasyon_saati)}</span>
                  </td>

                  <td style={styles.td}>
                    <div style={styles.routeText}>
                      <b>Alış:</b> {reservation.alis_noktasi || '-'}
                    </div>
                    <div style={styles.routeText}>
                      <b>Varış:</b> {reservation.varis_noktasi || '-'}
                    </div>
                    <div style={styles.routeText}>
                      <b>Not:</b> {reservation.guzergah_not || '-'}
                    </div>
                  </td>

                  <td style={styles.td}>{reservation.kisi_sayisi || 1}</td>

                  <td style={styles.td}>
                    <span
                      style={{
                        color: getStatusColor(reservation.durum),
                        fontWeight: 'bold',
                        fontSize: '13px',
                      }}
                    >
                      {reservation.durum}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <select
                      value={reservation.durum}
                      onChange={(e) =>
                        handleStatusChange(reservation.rezervasyon_id, e.target.value)
                      }
                      style={styles.select}
                    >
                      <option value="Beklemede">Beklemede</option>
                      <option value="Onaylandı">Onaylandı</option>
                      <option value="Tamamlandı">Tamamlandı</option>
                      <option value="İptal Edildi">İptal Edildi</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    backgroundColor: '#111',
    borderRadius: '8px',
    overflow: 'hidden',
    minWidth: '1000px',
  },
  th: {
    padding: '15px',
    textAlign: 'left' as const,
    borderBottom: '1px solid #222',
    color: '#888',
    fontSize: '12px',
  },
  td: {
    padding: '15px',
    borderBottom: '1px solid #222',
    fontSize: '13px',
  },
  select: {
    padding: '8px',
    backgroundColor: '#050505',
    border: '1px solid #333',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  refreshButton: {
    padding: '10px 14px',
    backgroundColor: '#C5A059',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  message: {
    color: '#C5A059',
    marginBottom: '15px',
    fontWeight: 'bold',
  },
  loading: {
    color: '#C5A059',
  },
  empty: {
    color: '#888',
  },
  smallText: {
    fontSize: '11px',
    color: '#888',
  },
  goldText: {
    fontSize: '11px',
    color: '#C5A059',
  },
  routeText: {
    fontSize: '11px',
    marginBottom: '3px',
  },
};

export default ReservationsManagement;