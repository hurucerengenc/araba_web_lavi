import { useState } from 'react';

const GalleryManagement = () => {
  const [images] = useState([
    { id: 1, title: 'Maybach İç Mekan', category: 'Araç İçi', isCover: true, order: 1 }
  ]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div style={styles.header}>
        <h2>Galeri Yönetimi</h2>
        <button style={styles.addBtn} onClick={() => setShowModal(true)}>+ Yeni Görsel Ekle</button>
      </div>
      
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Başlık</th>
            <th style={styles.th}>Kategori</th>
            <th style={styles.th}>Sıra</th>
            <th style={styles.th}>Kapak Mı?</th>
            <th style={styles.th}>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {images.map(img => (
            <tr key={img.id}>
              <td style={styles.td}>{img.title}</td>
              <td style={styles.td}>{img.category}</td>
              <td style={styles.td}>{img.order}</td>
              <td style={styles.td}>{img.isCover ? 'Evet' : 'Hayır'}</td>
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
            <h3>Yeni Görsel Ekle</h3>
            <form style={styles.form}>
              <input type="text" placeholder="Başlık / Açıklama" style={styles.input} />
              <input type="text" placeholder="Kategori (Örn: İç Mekan, Dış Mekan)" style={styles.input} />
              <input type="number" placeholder="Sıralama Numarası" style={styles.input} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                <input type="checkbox" id="isCover" />
                <label htmlFor="isCover">Kapak Görseli Yap</label>
              </div>
              <select style={styles.input} defaultValue="">
                <option value="" disabled>İlgili Aracı Seçin (Opsiyonel)</option>
                <option value="1">Mercedes Maybach V-Serisi</option>
              </select>
              <input type="file" style={{color: 'white', marginTop: '10px'}} />
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
  modalOverlay: { position: 'fixed' as const, top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modal: { backgroundColor: '#111', padding: '30px', borderRadius: '8px', width: '500px', border: '1px solid #222' },
  form: { display: 'flex', flexDirection: 'column' as const, gap: '15px', marginTop: '20px' },
  input: { padding: '12px', backgroundColor: '#050505', border: '1px solid #333', color: 'white', borderRadius: '4px' },
  modalActions: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' },
  cancelBtn: { padding: '10px 20px', background: 'transparent', color: 'white', border: '1px solid #444', cursor: 'pointer', borderRadius: '4px' },
  saveBtn: { padding: '10px 20px', background: '#C5A059', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }
};

export default GalleryManagement;
