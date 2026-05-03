import { useState } from 'react';

const ReservationsManagement = () => {
  const [reservations, setReservations] = useState([
    {
      id: 1,
      customer: 'Ahmet Yılmaz',
      phone: '0555 123 4567',
      email: 'ahmet@example.com',
      service: 'Havalimanı Transferi',
      date: '2026-05-10',
      time: '14:30',
      pax: 4,
      pickup: 'Kayseri Erkilet Havalimanı',
      dropoff: 'Nevşehir Kapadokya',
      vehicle: 'Mercedes Maybach V-Serisi',
      status: 'Beklemede'
    }
  ]);

  const handleStatusChange = (id: number, newStatus: string) => {
    // await api.put(`/admin/reservations/${id}/status`, { status: newStatus });
    setReservations(reservations.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Beklemede': return '#f39c12';
      case 'Onaylandı': return '#3498db';
      case 'Tamamlandı': return '#2ecc71';
      case 'İptal Edildi': return '#e74c3c';
      default: return '#888';
    }
  };

  return (
    <div>
      <div style={styles.header}>
        <h2>Rezervasyon Yönetimi</h2>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Müşteri</th>
              <th style={styles.th}>İletişim</th>
              <th style={styles.th}>Hizmet & Araç</th>
              <th style={styles.th}>Tarih & Saat</th>
              <th style={styles.th}>Rota</th>
              <th style={styles.th}>Kişi</th>
              <th style={styles.th}>Durum</th>
              <th style={styles.th}>İşlem (Durum Güncelle)</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(r => (
              <tr key={r.id}>
                <td style={styles.td}>{r.customer}</td>
                <td style={styles.td}>
                  {r.phone}<br/>
                  <span style={{fontSize: '11px', color: '#888'}}>{r.email}</span>
                </td>
                <td style={styles.td}>
                  {r.service}<br/>
                  <span style={{fontSize: '11px', color: '#C5A059'}}>{r.vehicle}</span>
                </td>
                <td style={styles.td}>
                  {r.date}<br/>
                  <span style={{fontSize: '11px', color: '#888'}}>{r.time}</span>
                </td>
                <td style={styles.td}>
                  <div style={{fontSize: '11px'}}><b>Alış:</b> {r.pickup}</div>
                  <div style={{fontSize: '11px'}}><b>Varış:</b> {r.dropoff}</div>
                </td>
                <td style={styles.td}>{r.pax}</td>
                <td style={styles.td}>
                  <span style={{ color: getStatusColor(r.status), fontWeight: 'bold', fontSize: '13px' }}>
                    {r.status}
                  </span>
                </td>
                <td style={styles.td}>
                  <select 
                    value={r.status} 
                    onChange={(e) => handleStatusChange(r.id, e.target.value)}
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
    </div>
  );
};

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  table: { width: '100%', borderCollapse: 'collapse' as const, backgroundColor: '#111', borderRadius: '8px', overflow: 'hidden', minWidth: '1000px' },
  th: { padding: '15px', textAlign: 'left' as const, borderBottom: '1px solid #222', color: '#888', fontSize: '12px' },
  td: { padding: '15px', borderBottom: '1px solid #222', fontSize: '13px' },
  select: { padding: '8px', backgroundColor: '#050505', border: '1px solid #333', color: 'white', borderRadius: '4px', cursor: 'pointer' }
};

export default ReservationsManagement;
