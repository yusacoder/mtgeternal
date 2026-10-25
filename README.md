# MTG - Modern Tanıtım, Link & Şikâyet Sayfası (Glassmorphism)

Bu proje, **Eternal Production / MTG** için özel olarak hazırlanmış, modern ve estetik glassmorphism (buzlu cam) tasarımına sahip **tanıtım, sosyal medya bağlantı ve şikâyet platformudur**.

---

## ✨ Öne Çıkan Özellikler

- **iPhone Tarzı Saydam Alt Navbar (Glassmorphism):** Ekranın altında yüzen `backdrop-filter: blur(16px)` buzlu cam efektine sahip navigasyon barı.
- **Ayrı Kullanıcı Şikâyet Sayfası:** Şikâyet bildirimleri için ayrı Türkçe ve İngilizce rotalar.
- **FormSubmit E-posta Entegrasyonu:** AJAX ile `destek@eternalproduction.net` adresine anlık bildirim gönderimi.
- **Türkçe & İngilizce Dil Desteği (TR | EN):** Dinamik veya route bazlı dil geçişleri (`/`, `/en`, `/sikayet`, `/en/report`).
- **Tamamen JSON İle Yönetilebilir (`data.json`):** Profil bilgileri ve sosyal medya bağlantıları kolayca düzenlenebilir.
- **Mobil ve Masaüstü Uyumlu (Responsive):** Safe-area destekli responsive arayüz.

---

## 🌐 Sayfa Rotaları (Routes)

- `/` → Türkçe Ana Sayfa
- `/en` → İngilizce Ana Sayfa
- `/sikayet` → Türkçe Şikâyet Sayfası
- `/en/report` → İngilizce Şikâyet Sayfası

---

## 📧 FormSubmit Aktivasyon Kurulumu (Önemli)

FormSubmit.co servisi ilk defa e-posta gönderirken doğrulama gerektirmektedir:

1. İlk şikâyet formu gönderildiğinde `destek@eternalproduction.net` e-posta adresine **FormSubmit Activate Form** başlıklı bir e-posta ulaşacaktır.
2. E-postadaki **"Activate Form"** butonuna tıklanarak aktivasyon tamamlanır.
3. Aktivasyon tamamlandıktan sonra tüm şikâyetler otomatik olarak gelen kutusuna e-posta olarak düşer.

---

## 📁 Proje Yapısı

```
.
├── assets/
│   └── flags/          # Yerel bayrak görselleri
├── en/
│   ├── index.html      # İngilizce Ana Sayfa (/en)
│   └── report/
│       └── index.html  # İngilizce Şikâyet Sayfası (/en/report)
├── sikayet/
│   └── index.html      # Türkçe Şikâyet Sayfası (/sikayet)
├── app.js              # Uygulama ve form logic motoru
├── data.json           # Profil ve link verileri
├── index.html          # Türkçe Ana Sayfa (/)
├── styles.css          # Glassmorphism ve duyarlı CSS stilleri
├── vercel.json         # Vercel route yönlendirmeleri
└── README.md           # Proje kullanım kılavuzu
```

---

## 🚀 Yerel Sunucuda Çalıştırma

Terminalde proje klasörüne gelip yerel sunucuyu başlatabilirsiniz:

```bash
python3 -m http.server 8000
```
Daha sonra tarayıcınızda `http://localhost:8000` adresine gidebilirsiniz.
