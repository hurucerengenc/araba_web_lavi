import { useState, useEffect } from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './pages/adminpanel';

// @ts-ignore
import heroBg from './assets/images/giris1.JPG';
// @ts-ignore
import aracDetay from './assets/images/giris2.JPG';
// @ts-ignore
import ucuncuSol from './assets/images/ucuncukısımsol.JPG';
// @ts-ignore
import ucuncuSagUst from './assets/images/ucuncukısımsagust.JPG';
// @ts-ignore
import ucuncuSagAlt from './assets/images/ucuncukısımsagalt.jpg';
// @ts-ignore
import sehirlerarasiImg from './assets/images/ucuncukısımsagalt2.JPG';
// @ts-ignore
import kapadokyaBg from './assets/images/besincikisim2.JPG';
// @ts-ignore
import icMekanUst from './assets/images/dorduncukisimust.JPG';
// @ts-ignore
import icMekanSolAlt from './assets/images/dorduncukisimsolalt.JPG';
// @ts-ignore
import icMekanSagAlt from './assets/images/dorduncukisimsagalt.JPG';
// @ts-ignore
import galeri1 from './assets/images/besincikisim1.JPG';
// @ts-ignore
import galeri2 from './assets/images/besincikisim2.JPG';
// @ts-ignore
import galeri3 from './assets/images/besincikisim3.JPG';
// @ts-ignore
import galeri4 from './assets/images/besincikisim4.JPG';
// @ts-ignore
import galeri5 from './assets/images/besincikisim5.JPG';
// @ts-ignore
import galeri6 from './assets/images/besincikisim6.JPG';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Rezervasyon formundaki inputların değerlerini tutuyoruz.
  const [reservationForm, setReservationForm] = useState({
    ad_soyad: '',
    telefon: '',
    email: '',
    tarih: '',
    saat: '',
    hizmet_id: '',
    notlar: '',
  });

  // Kullanıcıya başarı/hata mesajı göstermek için kullanıyoruz.
  const [reservationMessage, setReservationMessage] = useState('');

  // Form gönderilirken butonun tekrar tekrar basılmasını engellemek için kullanıyoruz.
  const [reservationLoading, setReservationLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Formdaki input, select ve textarea değişince state'i güncelliyoruz.
  const handleReservationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setReservationForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Rezervasyon formu gönderilince çalışan fonksiyon.
  const handleReservationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Sayfanın yenilenmesini engeller.

    setReservationMessage('');

    // Basit zorunlu alan kontrolü.
    if (
      !reservationForm.ad_soyad ||
      !reservationForm.telefon ||
      !reservationForm.email ||
      !reservationForm.tarih ||
      !reservationForm.saat ||
      !reservationForm.hizmet_id
    ) {
      setReservationMessage(
        'Lütfen ad soyad, telefon, e-posta, tarih, saat ve hizmet alanlarını doldurun.'
      );
      return;
    }

    try {
      setReservationLoading(true);

      const response = await fetch('http://localhost:5001/api/rezervasyonlar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Form verilerini backend'e JSON olarak gönderiyoruz.
        body: JSON.stringify(reservationForm),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Rezervasyon gönderilemedi.');
      }

      setReservationMessage(
        'Rezervasyon talebiniz başarıyla alındı. Sizinle en kısa sürede iletişime geçilecektir.'
      );

      // Başarılı gönderimden sonra formu temizliyoruz.
      setReservationForm({
        ad_soyad: '',
        telefon: '',
        email: '',
        tarih: '',
        saat: '',
        hizmet_id: '',
        notlar: '',
      });
    } catch (error) {
      console.error('Rezervasyon hatası:', error);
      setReservationMessage('Rezervasyon gönderilirken bir sorun oluştu. Lütfen tekrar deneyin.');
    } finally {
      setReservationLoading(false);
    }
  };

  return (
    <Router>
      <Routes>
        {/* --- ANA SAYFA --- */}
        <Route
          path="/"
          element={
            <div className="app-wrapper">
              {/* 1. HEADER */}
              <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
                <nav className="navbar">
                  <div className="logo-box">
                    <div className="logo-text">VIP KAYSERİ</div>
                    <div className="logo-subtext">LUXURY TRANSPORTATION</div>
                  </div>

                  {/* HAMBURGER ICON */}
                  <div
                    className="hamburger"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    <div className={`line ${isMobileMenuOpen ? 'open' : ''}`}></div>
                    <div className={`line ${isMobileMenuOpen ? 'open' : ''}`}></div>
                    <div className={`line ${isMobileMenuOpen ? 'open' : ''}`}></div>
                  </div>

                  <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                    <li>
                      <a href="#araclar" onClick={() => setIsMobileMenuOpen(false)}>
                        ARAÇLARIMIZ
                      </a>
                    </li>
                    <li>
                      <a href="#hizmetler" onClick={() => setIsMobileMenuOpen(false)}>
                        HİZMETLER
                      </a>
                    </li>
                    <li>
                      <a href="#galeri" onClick={() => setIsMobileMenuOpen(false)}>
                        GALERİ
                      </a>
                    </li>
                    <li>
                      <a href="#iletisim" onClick={() => setIsMobileMenuOpen(false)}>
                        İLETİŞİM
                      </a>
                    </li>
                  </ul>

                  <div className={`header-actions ${isMobileMenuOpen ? 'active' : ''}`}>
                    <a href="#iletisim" onClick={() => setIsMobileMenuOpen(false)}>
                      <button className="rez-btn-top">REZERVASYON YAP →</button>
                    </a>
                  </div>
                </nav>
              </header>

              {/* 2. HERO SECTION */}
              <section
                className="hero"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.3)), url(${heroBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  width: '100vw',
                  height: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div className="hero-content">
                  <h1>
                    Yolculuğu <br /> <span>Bir Deneyime</span> <br /> Dönüştürüyoruz
                  </h1>
                  <p>
                    Kayseri ve Kapadokya'nın en prestijli özel ulaşım hizmeti. <br />
                    Mercedes Maybach V-Serisi ile her transfer bir ayrıcalıktır.
                  </p>

                  <div className="hero-btns">
                    <a href="#iletisim">
                      <button className="btn-gold">REZERVASYON YAP →</button>
                    </a>
                    <a href="#araclar">
                      <button className="btn-outline">ARAÇLARIMIZ</button>
                    </a>
                  </div>
                </div>
              </section>

              {/* 3. İSTATİSTİKLER */}
              <section className="stats">
                <div className="stat-box">
                  <h2>500+</h2>
                  <p>BAŞARILI TRANSFER</p>
                </div>
                <div className="stat-box">
                  <h2>7/24</h2>
                  <p>KESİNTİSİZ HİZMET</p>
                </div>
                <div className="stat-box">
                  <h2>3+</h2>
                  <p>PREMİUM ARAÇ</p>
                </div>
                <div className="stat-box">
                  <h2>100%</h2>
                  <p>MEMNUNİYET</p>
                </div>
              </section>

              {/* 4. ARAÇ FİLOMUZ */}
              <section className="best-class-section" id="araclar">
                <div className="best-class-container">
                  <div className="best-class-image-box">
                    <img src={aracDetay} alt="Mercedes Maybach" className="car-detail-img" />
                    <div className="car-badge-premium">
                      <span className="car-badge-premium-brand">MERCEDES-BENZ</span>
                      <span>Maybach V-Serisi</span>
                    </div>
                  </div>

                  <div className="best-class-text">
                    <span className="gray-subtitle">ARAÇ FİLOMUZ</span>
                    <h2>
                      Sınıfının <br /> En İyisiyle <br /> Seyahat Edin
                    </h2>
                    <p>
                      Maybach dönüşümüyle benzersiz bir lüks kabine kavuşan Mercedes
                      V-Serisi, 7 yolcuya kadar ağırladığı misafirlerini iş seyahatinin
                      veya özel yolculuğun yorgunluğundan tamamen uzaklaştırır. Her detay
                      özenle tasarlanmıştır.
                    </p>

                    <ul className="features-grid">
                      <li>Masaj Koltukları</li>
                      <li>4K Dokunmatik TV</li>
                      <li>Mood Aydınlatma</li>
                      <li>Wi-Fi Bağlantısı</li>
                      <li>Minibar & İkram</li>
                      <li>Isıtmalı Koltuklar</li>
                      <li>Gizlilik Perdeleri</li>
                      <li>Klima Sistemi</li>
                    </ul>

                    <a href="#iletisim" style={{ color: 'inherit', textDecoration: 'none' }}>
                      <button className="rez-btn-gold">REZERVASYON YAP</button>
                    </a>
                  </div>
                </div>
              </section>

              {/* 5. HİZMETLER */}
              <section className="services-section" id="hizmetler">
                <div className="services-header">
                  <span className="subtitle">HİZMETLERİMİZ</span>
                  <h2>
                    Her Yolculuk <br /> <span>Özel Bir Deneyim</span>
                  </h2>
                  <p>Havalimanından otel kapısına, şehirlerarası transferden kurumsal protokole.</p>
                </div>

                <div className="services-grid-main">
                  <div className="service-card large">
                    <img src={ucuncuSol} alt="Kapadokya" className="service-bg-img" />
                    <div className="img-overlay-very-dark"></div>
                    <div className="service-content">
                      <div className="service-icon">🔅</div>
                      <h3>Kapadokya Özel Turu</h3>
                      <p>Peri bacaları, saklı vadiler ve tarihi oteller arasında unutulmaz bir yolculuk.</p>
                      <a href="#iletisim" className="service-link">
                        REZERVASYON &gt;
                      </a>
                    </div>
                  </div>

                  <div className="services-right-column">
                    <div className="service-card">
                      <img src={ucuncuSagUst} alt="Havalimanı" className="service-bg-img" />
                      <div className="img-overlay-dark"></div>
                      <div className="service-content">
                        <div className="service-icon">✈️</div>
                        <h3>Havalimanı Transferi</h3>
                        <p>
                          ASR Kayseri Havalimanı, ESB Ankara ve tüm Türkiye'deki
                          havalimanlarında kapıdan kapıya karşılama hizmeti.
                        </p>
                        <a href="#iletisim" className="service-link">
                          REZERVASYON &gt;
                        </a>
                      </div>
                    </div>

                    <div className="service-card">
                      <img src={ucuncuSagAlt} alt="Kurumsal" className="service-bg-img" />
                      <div className="img-overlay-dark"></div>
                      <div className="service-content">
                        <div className="service-icon">💼</div>
                        <h3>Kurumsal Protokol</h3>
                        <p>
                          Şirketler, toplantılar ve kurumsal misafirleriniz için yüksek
                          standartlarda VIP transfer hizmetleri.
                        </p>
                        <a href="#iletisim" className="service-link">
                          REZERVASYON &gt;
                        </a>
                      </div>
                    </div>

                    <div className="service-card">
                      <img src={sehirlerarasiImg} alt="Şehirlerarası" className="service-bg-img" />
                      <div className="img-overlay-dark"></div>
                      <div className="service-content">
                        <div className="service-icon">🏢</div>
                        <h3>Şehirlerarası Transfer</h3>
                        <p>
                          Kayseri, Ankara, İstanbul, Nevşehir ve tüm Türkiye genelinde
                          konforlu uzun yol hizmeti.
                        </p>
                        <a href="#iletisim" className="service-link">
                          REZERVASYON &gt;
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 6. İÇ MEKAN */}
              <section className="interior-section">
                <div className="interior-container">
                  <div className="interior-visuals">
                    <div className="main-img-box">
                      <img src={icMekanUst} alt="Ana Kabin Görünümü" className="interior-img" />
                    </div>
                    <div className="sub-imgs-row">
                      <div className="sub-img-box">
                        <img src={icMekanSolAlt} alt="Detay Koltuk" className="interior-img" />
                      </div>
                      <div className="sub-img-box">
                        <img src={icMekanSagAlt} alt="Detay Teknoloji" className="interior-img" />
                      </div>
                    </div>
                  </div>

                  <div className="interior-text-content">
                    <span className="subtitle">İÇ MEKAN</span>
                    <h2 className="interior-title">
                      Sınıfsız <br />
                      <span className="gold-italic">Konfor</span> ve <br />
                      Zarafet
                    </h2>

                    <p className="interior-desc">
                      Özel konvertif Mercedes Maybach V-Serisi kabinimiz, uçuş konforu ve
                      otel zarafetini buluşturur. Amber aydınlatma, yumuşak deri yüzeyler
                      ve ileri teknoloji donanım — her transfer bir dinlenme deneyimidir.
                    </p>

                    <div className="icon-list">
                      <div className="icon-item">
                        <div className="icon-minimal">♡</div>
                        <div className="icon-text">
                          <h4>Masaj Koltukları</h4>
                          <p>Çok noktalı masaj ve ısıtma sistemi</p>
                        </div>
                      </div>

                      <div className="icon-item">
                        <div className="icon-minimal">📺</div>
                        <div className="icon-text">
                          <h4>4K Dokunmatik Ekran</h4>
                          <p>Netflix, YouTube ve medya sistemi</p>
                        </div>
                      </div>

                      <div className="icon-item">
                        <div className="icon-minimal">📶</div>
                        <div className="icon-text">
                          <h4>Hızlı Wi-Fi</h4>
                          <p>Kesintisiz internet bağlantısı</p>
                        </div>
                      </div>

                      <div className="icon-item">
                        <div className="icon-minimal">☕</div>
                        <div className="icon-text">
                          <h4>Minibar & İkram</h4>
                          <p>Soğutucu, içecek ve atıştırmalık servisi</p>
                        </div>
                      </div>

                      <div className="icon-item">
                        <div className="icon-minimal">🔆</div>
                        <div className="icon-text">
                          <h4>Mood Aydınlatma</h4>
                          <p>Kişiselleştirilebilir kabin atmosferi</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* GALERİ */}
              <section className="gallery-section" id="galeri">
                <div className="gallery-header">
                  <span className="subtitle">GALERİ</span>
                  <h2>
                    Her Karedeki <br /> Zarafet
                  </h2>
                </div>

                <div className="gallery-grid">
                  <div className="gallery-item large">
                    <img src={galeri1} alt="Galeri 1" className="gallery-img" />
                  </div>
                  <div className="gallery-item">
                    <img src={galeri2} alt="Galeri 2" className="gallery-img" />
                  </div>
                  <div className="gallery-item">
                    <img src={galeri3} alt="Galeri 3" className="gallery-img" />
                  </div>
                  <div className="gallery-item">
                    <img src={galeri4} alt="Galeri 4" className="gallery-img" />
                  </div>
                  <div className="gallery-item">
                    <img src={galeri5} alt="Galeri 5" className="gallery-img" />
                  </div>
                  <div className="gallery-item full">
                    <img src={galeri6} alt="Galeri 6" className="gallery-img" />
                  </div>
                </div>
              </section>

              {/* 7. REZERVASYON FORMU */}
              <section className="reservation-section" id="iletisim">
                <div className="rez-container">
                  <div className="rez-info">
                    <h2>
                      Yolculuğunuzu <br /> Planlayalım
                    </h2>
                    <p className="rez-desc">Formu doldurarak rezervasyon talebinde bulunun.</p>

                    <div className="contact-details">
                      <div className="contact-item">
                        <span>📞</span>
                        <p>+90 5XX XXX XX XX</p>
                      </div>
                      <div className="contact-item">
                        <span>📧</span>
                        <p>info@vipkayseri.com</p>
                      </div>
                    </div>

                    <button type="button" className="wp-btn">
                      WHATSAPP İLE ULAŞIN
                    </button>
                  </div>

                  <form className="rez-form" onSubmit={handleReservationSubmit}>
                    <div className="form-row">
                      <input
                        type="text"
                        name="ad_soyad"
                        placeholder="AD SOYAD *"
                        value={reservationForm.ad_soyad}
                        onChange={handleReservationChange}
                      />

                      <input
                        type="text"
                        name="telefon"
                        placeholder="TELEFON *"
                        value={reservationForm.telefon}
                        onChange={handleReservationChange}
                      />
                    </div>

                    <div className="form-row">
                      <input
                        type="email"
                        name="email"
                        placeholder="E-POSTA *"
                        value={reservationForm.email}
                        onChange={handleReservationChange}
                      />

                      <input
                        type="date"
                        name="tarih"
                        value={reservationForm.tarih}
                        onChange={handleReservationChange}
                      />
                    </div>

                    <div className="form-row">
                      <input
                        type="text"
                        name="saat"
                        placeholder="SAAT KAÇTA GELECEKSİNİZ? *"
                        value={reservationForm.saat}
                        onChange={handleReservationChange}
                        onFocus={(e) => (e.target.type = 'time')}
                        onBlur={(e) => {
                          if (!e.target.value) {
                            e.target.type = 'text';
                          }
                        }}
                      />
                    </div>

                 <select
  name="hizmet_id"
  value={reservationForm.hizmet_id}
  onChange={handleReservationChange}
>
  <option value="" disabled>
    HİZMET TÜRÜ SEÇİN...
  </option>
  <option value={1}>Havalimanı Transferi</option>
  <option value={2}>Kapadokya Özel Turu</option>
  <option value={3}>Şehirlerarası Transfer</option>
  <option value={4}>Kurumsal Protokol</option>
</select>

                    <textarea
                      name="notlar"
                      placeholder="GÜZERGAH / NOTLAR"
                      value={reservationForm.notlar}
                      onChange={handleReservationChange}
                    ></textarea>

                    {reservationMessage && (
                      <p
                        style={{
                          color: '#d4af37',
                          marginTop: '10px',
                          marginBottom: '10px',
                          fontWeight: 'bold',
                          fontSize: '14px',
                        }}
                      >
                        {reservationMessage}
                      </p>
                    )}

                    <button type="submit" className="btn-gold-full" disabled={reservationLoading}>
                      {reservationLoading ? 'GÖNDERİLİYOR...' : 'REZERVASYON TALEBİ GÖNDER'}
                    </button>
                  </form>
                </div>
              </section>

              {/* 8. FOOTER */}
              <footer className="footer">
                <div className="footer-grid">
                  <div>
                    <h3>VIP KAYSERİ</h3>
                    <p>Kayseri'nin prestijli ulaşım markası.</p>
                  </div>
                  <div>
                    <h4>HİZMETLER</h4>
                    <p>Transfer / Tur</p>
                  </div>
                  <div>
                    <h4>İLETİŞİM</h4>
                    <p>7/24 Destek</p>
                  </div>
                </div>
              </footer>
            </div>
          }
        />

        {/* --- ADMİN PANELİ --- */}
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;