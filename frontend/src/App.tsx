// src/App.tsx
import { useState, useEffect } from 'react' // Bunu en üste eklemelisin
import './index.css'

function App() {
  // Sayfanın kaydırılıp kaydırılmadığını takip eden State
  const [isScrolled, setIsScrolled] = useState(false)

  // Scroll (Kaydırma) olayını dinleyen Hook
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true) // 50px aşağı kayınca Header belirsin
      } else {
        setIsScrolled(false) // En üstteyken şeffaf olsun
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app-wrapper">
      {/* HEADER: isScrolled state'ine göre 'scrolled' sınıfı ekleniyor */}
      <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="navbar">
          <div className="logo-box">
            <div className="logo-text">VIP KAYSERİ</div>
            <div className="logo-subtext">LUXURY TRANSPORTATION</div>
          </div>

          <ul className="nav-menu">
            <li><a href="#araclar">ARAÇLARIMIZ</a></li>
            <li><a href="#hizmetler">HİZMETLER</a></li>
            <li><a href="#galeri">GALERİ</a></li>
            <li><a href="#iletisim">İLETİŞİM</a></li>
          </ul>

          <div className="header-actions">
            <button className="rez-btn-top">REZERVASYON YAP →</button>
          </div>
        </nav>
      </header>

      {/* Diğer kodların (Hero, Stats vs.) aynen kalacak... */}

      {/* 2. HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Yolculuğu <br /> <span>Bir Deneyime</span> <br /> Dönüştürüyoruz</h1>
          <p>Kayseri ve Kapadokya'nın en prestijli özel ulaşım hizmeti. <br /> Mercedes Maybach V-Serisi ile her transfer bir ayrıcalıktır.</p>
          <div className="hero-btns">
            <button className="btn-gold">REZERVASYON YAP →</button>
            <button className="btn-outline">ARAÇLARIMIZ</button>
          </div>
        </div>
      </section>

      {/* 3. İSTATİSTİKLER */}
      <section className="stats">
        <div className="stat-box"><h2>500+</h2><p>BAŞARILI TRANSFER</p></div>
        <div className="stat-box"><h2>7/24</h2><p>KESİNTİSİZ HİZMET</p></div>
        <div className="stat-box"><h2>3+</h2><p>PREMİUM ARAÇ</p></div>
        <div className="stat-box"><h2>100%</h2><p>MEMNUNİYET</p></div>
      </section>

    
     {/* 4. Sınıfının En İyisi (Araç Detay) */}
<section className="best-class-section" id="araclar">
  <div className="best-class-container">
    <div className="best-class-image">
      <div className="placeholder-image-box">
        {/* Videodaki o karakteristik sağ alt etiket */}
        <div className="black-badge">
          MERCEDES-BENZ <br/> <span>Maybach V-Serisi</span>
        </div>
      </div>
    </div>
    
    <div className="best-class-content">
      <span className="upper-title">ARAÇ FİLOMUZ</span>
      <h2>Sınıfının <br/> En İyisiyle <br/> <span>Seyahat Edin</span></h2>
      <p>
        Maybach dönüşümüyle benzersiz bir lüks kabine kavuşan Mercedes V-Serisi, 
        7 yolcuya kadar ağırladığı misafirlerini konforun zirvesine taşır.
      </p>
      <ul className="features-grid">
        <li>Masajlı Koltuklar</li><li>4K Dokunmatik TV</li>
        <li>Mood Aydınlatma</li><li>Wi-Fi Bağlantısı</li>
        <li>Minibar & İkram</li><li>Isıtmalı Koltuklar</li>
        <li>Gizlilik Perdeleri</li><li>Klima Sistemi</li>
      </ul>
      <button className="btn-gold">REZERVASYON YAP</button>
    </div>
  </div>
</section>

  
      {/* 5. HİZMETLER (Her Yolculuk Özel Deneyim) */}
<section className="services-section" id="hizmetler">
  <div className="services-header">
    <span className="subtitle">HİZMETLERİMİZ</span>
    <h2>Her Yolculuk <br /> <span>Özel Bir Deneyim</span></h2>
    <p>Havalimanından otel kapısına, şehirlerarası transferden kurumsal protokole.</p>
  </div>

  <div className="services-grid">
    {/* SOL TARAF: Büyük Kart (Havalimanı) */}
    <div className="service-card large">
      <div className="service-img-placeholder">
        {/* Yarın buraya src="/havalimani.jpg" gelecek */}
        <div className="img-overlay"></div>
      </div>
      <div className="service-content">
        <div className="service-icon">✈️</div>
        <h3>Havalimanı Transferi</h3>
        <p>ASR Kayseri Havalimanı ve çevre illere konforlu ulaşım.</p>
        <button className="service-btn">REZERVASYON →</button>
      </div>
    </div>

    {/* SAĞ TARAF: Üstteki Kart (Kapadokya) */}
    <div className="service-card">
      <div className="service-img-placeholder">
        <div className="img-overlay"></div>
      </div>
      <div className="service-content">
        <div className="service-icon">🎈</div>
        <h3>Kapadokya Özel Turu</h3>
        <p>Size özel rotalarla masalsı bir gezi deneyimi.</p>
        <button className="service-btn">REZERVASYON →</button>
      </div>
    </div>

    {/* SAĞ TARAF: Alttaki Kart (Şehirlerarası) */}
    <div className="service-card">
      <div className="service-img-placeholder">
        <div className="img-overlay"></div>
      </div>
      <div className="service-content">
        <div className="service-icon">🛣️</div>
        <h3>Şehirlerarası Transfer</h3>
        <p>Türkiye'nin her noktasına VIP standartlarda yolculuk.</p>
        <button className="service-btn">REZERVASYON →</button>
      </div>
    </div>
  </div>
</section>

      {/* 6. İÇ MEKAN (Sınırsız Konfor ve Zarafet) */}
<section className="interior-section">
  <div className="interior-container">
    
    {/* SOL TARAF: Görsel Grubu */}
    <div className="interior-visuals">
      <div className="main-img-box">
        <div className="placeholder-label">Ana Kabin Görünümü</div>
      </div>
      <div className="sub-imgs-row">
        <div className="sub-img-box">Detay: Koltuk</div>
        <div className="sub-img-box">Detay: Teknoloji</div>
      </div>
    </div>

    {/* SAĞ TARAF: Yazı ve İkonlar */}
    <div className="interior-text-content">
      <span className="subtitle">İÇ MEKAN</span>
      <h2>Sınırsız <br /> <span>Konfor ve</span> <br /> Zarafet</h2>
      
      <div className="icon-list">
        <div className="icon-item">
          <div className="icon-circle">💺</div>
          <div className="icon-text">
            <h4>Masajlı Koltuklar</h4>
            <p>Yolculuk boyunca vücudunuzu dinlendiren çok noktalı masaj sistemi.</p>
          </div>
        </div>

        <div className="icon-item">
          <div className="icon-circle">📺</div>
          <div className="icon-text">
            <h4>Eğlence Sistemi</h4>
            <p>4K çözünürlüklü dokunmatik ekranlar ve yüksek kaliteli ses sistemi.</p>
          </div>
        </div>

        <div className="icon-item">
          <div className="icon-circle">🍾</div>
          <div className="icon-text">
            <h4>Özel İkramlar</h4>
            <p>Soğuk içecekler ve seçkin ikramlarla donatılmış minibar ünitesi.</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>

      {/* 7. GALERİ */}
      <section className="gallery-section" id="galeri">
        <div className="gallery-header">
          <span className="subtitle">GALERİ</span>
          <h2>Her Karedeki Zarafet</h2>
        </div>
        <div className="gallery-grid">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="gallery-item"><div className="placeholder-box">Resim {i}</div></div>
          ))}
        </div>
      </section>

     {/* 8. REZERVASYON FORMU */}
<section className="reservation-section" id="iletisim">
  <div className="rez-container">
    <div className="rez-info">
      <h2>Yolculuğunuzu <br /> Planlayalım</h2>
      <p className="rez-desc">Formu doldurarak rezervasyon talebinde bulunun, size en kısa sürede dönüş yapalım.</p>
      
      <div className="contact-details">
        <div className="contact-item"><span>📞</span> <p>+90 5XX XXX XX XX</p></div>
        <div className="contact-item"><span>📧</span> <p>info@vipkayseri.com</p></div>
        <div className="contact-item"><span>📍</span> <p>Kayseri, Türkiye</p></div>
      </div>
      
      <button className="wp-btn">WHATSAPP İLE ULAŞIN</button>
    </div>

    <form className="rez-form">
      <div className="form-row">
        <input type="text" placeholder="AD SOYAD *" />
        <input type="text" placeholder="TELEFON *" />
      </div>
      
      {/* Videodaki açılır liste (Dropdown) */}
      <select defaultValue="">
        <option value="" disabled>HİZMET TÜRÜ SEÇİN...</option>
        <option value="havalimani">Havalimanı Transferi</option>
        <option value="kapadokya">Kapadokya Özel Turu</option>
        <option value="sehirlerarasi">Şehirlerarası Transfer</option>
      </select>
      
      {/* Videodaki Tarih ve Kişi Sayısı satırı */}
      <div className="form-row">
        <input type="date" />
        <input type="number" placeholder="KİŞİ SAYISI" />
      </div>
      
      <textarea placeholder="GÜZERGAH / NOTLAR"></textarea>
      
      <button type="submit" className="btn-gold-full">REZERVASYON TALEBİ GÖNDER</button>
    </form>
  </div>
</section>
      {/* 9. FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div><h3>VIP KAYSERİ</h3><p>Kayseri'nin prestijli ulaşım markası.</p></div>
          <div><h4>HİZMETLER</h4><p>Transfer</p><p>Tur</p></div>
          <div><h4>İLETİŞİM</h4><p>7/24 Destek</p></div>
        </div>
      </footer>
    </div>
  )
}
export default App