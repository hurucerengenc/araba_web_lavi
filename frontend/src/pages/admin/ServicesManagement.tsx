import { useState } from 'react';

const ServicesManagement = () => {
  const [services] = useState([
    { id: 1, name: 'Havalimanı Transferi', status: 'active' },
    { id: 2, name: 'Kapadokya Özel Turu', status: 'active' },
    { id: 3, name: 'Kurumsal Protokol', status: 'active' }
  ]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div style={styles.header}>
        <h2>Hizmet Yönetimi</h2>
        <button style={styles.addBtn} onClick={() => setShowModal(true)}>+ Yeni Hizmet Ekle</button>
      </div>
      
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Hizmet Adı</th>
            <th style={styles.th}>Durum</th>
            <th style={styles.th}>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {services.map(s => (
            <tr key={s.id}>
              <td style={styles.td}>{s.name}</td>
              <td style={styles.td}>
                <span style={s.status === 'active' ? styles.statusActive : styles.statusInactive}>Aktif</span>
              </td>
              <td style={styles.td}>
                <button style={styles.actionBtn}>Düzenle</button>
                <button style={{...styles.actionBtn, color: '#ff4d4f'}}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Yeni Hizmet Ekle</h3>
            <form style={styles.form}>
              <input type="text" placeholder="Hizmet Adı (Örn: Şehirlerarası Transfer)" style={styles.input} />
              <textarea placeholder="Açıklama" style={styles.textarea}></textarea>
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

export default ServicesManagement;
