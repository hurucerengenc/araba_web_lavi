import { useState } from 'react';

const VehiclesManagement = () => {
  const [vehicles, setVehicles] = useState([
    { id: 1, name: 'Mercedes Maybach', brand: 'Mercedes-Benz', model: 'V-Serisi', pax: 7, luggage: 5, status: 'active' }
  ]);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (id: number) => {
    if (window.confirm('Bu aracı silmek/pasif yapmak istediğinize emin misiniz?')) {
      // await api.delete(`/admin/vehicles/${id}`);
      setVehicles(vehicles.filter(v => v.id !== id));
      alert('Araç silindi.');
    }
  };

  return (
    <div>
      <div style={styles.header}>
        <h2>Araç Yönetimi</h2>
        <button style={styles.addBtn} onClick={() => setShowModal(true)}>+ Yeni Araç Ekle</button>
      </div>
      
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Ad</th>
            <th style={styles.th}>Marka</th>
            <th style={styles.th}>Model</th>
            <th style={styles.th}>Kapasite</th>
            <th style={styles.th}>Durum</th>
            <th style={styles.th}>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(v => (
            <tr key={v.id}>
              <td style={styles.td}>{v.name}</td>
              <td style={styles.td}>{v.brand}</td>
              <td style={styles.td}>{v.model}</td>
              <td style={styles.td}>{v.pax} Kişi</td>
              <td style={styles.td}>
                <span style={v.status === 'active' ? styles.statusActive : styles.statusInactive}>
                  {v.status === 'active' ? 'Aktif' : 'Pasif'}
                </span>
              </td>
              <td style={styles.td}>
                <button style={styles.actionBtn}>Düzenle</button>
                <button style={{...styles.actionBtn, color: '#ff4d4f'}} onClick={() => handleDelete(v.id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Yeni Araç Ekle</h3>
            <form style={styles.form}>
              <input type="text" placeholder="Araç Adı" style={styles.input} />
              <input type="text" placeholder="Marka" style={styles.input} />
              <input type="text" placeholder="Model" style={styles.input} />
              <input type="number" placeholder="Kişi Kapasitesi" style={styles.input} />
              <input type="number" placeholder="Bagaj Kapasitesi" style={styles.input} />
              <textarea placeholder="Açıklama" style={styles.textarea}></textarea>
              <input type="text" placeholder="Resim Yolu / URL" style={styles.input} />
              <div style={styles.modalActions}>
                <button type="button" onClick={() => setShowModal(false)} style={styles.cancelBtn}>İptal</button>
                <button type="submit" style={styles.saveBtn}>Kaydet</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  addBtn: { backgroundColor: '#C5A059', color: '#000', border: 'none', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' },
  table: { width: '100%', borderCollapse: 'collapse' as const, backgroundColor: '#111', borderRadius: '8px', overflow: 'hidden' },
  th: { padding: '15px', textAlign: 'left' as const, borderBottom: '1px solid #222', color: '#888', fontSize: '13px' },
  td: { padding: '15px', borderBottom: '1px solid #222', fontSize: '14px' },
  actionBtn: { background: 'transparent', border: 'none', color: '#C5A059', cursor: 'pointer', marginRight: '15px' },
  statusActive: { backgroundColor: 'rgba(37, 211, 102, 0.1)', color: '#25D366', padding: '5px 10px', borderRadius: '20px', fontSize: '12px' },
  statusInactive: { backgroundColor: 'rgba(255, 77, 79, 0.1)', color: '#ff4d4f', padding: '5px 10px', borderRadius: '20px', fontSize: '12px' },
  modalOverlay: { position: 'fixed' as const, top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modal: { backgroundColor: '#111', padding: '30px', borderRadius: '8px', width: '500px', border: '1px solid #222' },
  form: { display: 'flex', flexDirection: 'column' as const, gap: '15px', marginTop: '20px' },
  input: { padding: '12px', backgroundColor: '#050505', border: '1px solid #333', color: 'white', borderRadius: '4px' },
  textarea: { padding: '12px', backgroundColor: '#050505', border: '1px solid #333', color: 'white', borderRadius: '4px', height: '80px', resize: 'none' as const },
  modalActions: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' },
  cancelBtn: { padding: '10px 20px', background: 'transparent', color: 'white', border: '1px solid #444', cursor: 'pointer', borderRadius: '4px' },
  saveBtn: { padding: '10px 20px', background: '#C5A059', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }
};

export default VehiclesManagement;
