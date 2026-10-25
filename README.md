# MTG - Modern Tanıtım & Link Sayfası (Glassmorphism)

Bu proje, **MTG** için özel olarak hazırlanmış, modern ve estetik glassmorphism (buzlu cam) tasarımına sahip **tanıtım ve sosyal medya bağlantı platformudur**. Sayfadaki tüm içerikler (profil bilgileri, arka plan görseli, bulanıklık derecesi, bayrak görseli ve tüm bağlantılar) tamamen **`data.json`** dosyası üzerinden dinamik olarak yönetilmektedir.

---

## ✨ Öne Çıkan Özellikler

- **Tamamen JSON İle Yönetilebilir (`data.json`):** Kod değiştirmeye gerek kalmadan profil adı, biyografi, sosyal medya bağlantıları ve arka plan resimleri kolayca düzenlenir.
- **Dinamik Arka Plan & Bulanıklık (Blur):** Arka plan fotoğrafı internet adresi (URL) üzerinden çekilir ve CSS backdrop filter ile estetik şekilde bulanıklaştırılır.
- **Profil ve Yerel Bayrak Simgesi:** Profil resminin sağ alt köşesinde `assets/flags/` klasörüne ekleyeceğiniz yerel bayrak dosyaları (SVG, PNG vb.) dinamik olarak görüntülenir.
- **Sosyal Medya İkonları:** TikTok, Instagram, YouTube, Discord, Twitch, X (Twitter), Spotify ve özel web siteleri için modern FontAwesome ikon desteği.
- **Öne Çıkan Link Vurgusu (Highlight):** Özel veya önemli linkleri `highlight: true` seçeneğiyle renkli ve parlak gradient efektleriyle öne çıkarabilirsiniz.
- **Mobil ve Masaüstü Uyumlu (Responsive):** Tüm ekran boyutlarında kusursuz çalışan, duyarlı ve modern arayüz.

---

## 📁 Proje Yapısı

```
.
├── assets/
│   └── flags/          # Yerel bayrak görsellerinin yer aldığı klasör (ör. tr.svg)
├── app.js              # data.json verilerini okuyup DOM'a aktaran JavaScript motoru
├── data.json           # Tüm bilgilerin ve bağlantıların yönetildiği yapılandırma dosyası
├── index.html          # Ana HTML yapısı
├── styles.css          # Glassmorphism ve duyarlı CSS stilleri
└── README.md           # Proje kullanım kılavuzu
```

---

## ⚙️ `data.json` Dosyası Nasıl Düzenlenir?

Tüm özelleştirmelerinizi `data.json` dosyasını açarak gerçekleştirebilirsiniz:

```json
{
  "profile": {
    "name": "MTG",
    "title": "@mtgofficial",
    "bio": "İçerik Üreticisi & Dijital Medya Tasarımcısı ✨ | Gaming, Tech & Lifestyle",
    "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    "flag": "assets/flags/tr.svg",
    "flagAlt": "Türkiye Bayrağı"
  },
  "theme": {
    "backgroundImageUrl": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80",
    "blurAmount": "18px",
    "brightness": "75%"
  },
  "links": [
    {
      "title": "Instagram",
      "subtitle": "Günlük gönderiler ve hikayeler",
      "url": "https://instagram.com",
      "icon": "instagram",
      "highlight": true
    },
    {
      "title": "TikTok",
      "subtitle": "Kısa videolar ve trend içerikler",
      "url": "https://tiktok.com",
      "icon": "tiktok",
      "highlight": false
    }
  ],
  "footer": {
    "text": "© 2025 MTG. Tüm hakları saklıdır."
  }
}
```

### Parametre Açıklamaları:

- **`profile.name`**: Ekranın üstünde görünen isim.
- **`profile.title`**: Kullanıcı adı veya unvan.
- **`profile.bio`**: Profil açıklaması / Biyografi.
- **`profile.avatarUrl`**: Profil fotoğrafının internet adresi (URL).
- **`profile.flag`**: `assets/flags/` içerisine eklediğiniz bayrak dosyasının yolu (Örn: `assets/flags/tr.svg`).
- **`theme.backgroundImageUrl`**: Arka planda duracak yüksek çözünürlüklü fotoğrafın internet adresi (URL).
- **`theme.blurAmount`**: Arka planın bulanıklık seviyesi (Örn: `15px`, `20px`).
- **`links`**: Eklenecek bağlantıların listesi.
  - **`title`**: Bağlantı başlığı.
  - **`subtitle`**: Bağlantı alt açıklaması.
  - **`url`**: Tıklanınca açılacak internet adresi.
  - **`icon`**: İkon adı (`instagram`, `tiktok`, `youtube`, `discord`, `twitch`, `twitter`, `x`, `spotify`, `website`, `github`, `linkedin`, `email`).
  - **`highlight`**: `true` yapılırsa buton vurgulu ve renkli gradient efektiyle gösterilir.

---

## 🚩 Bayrak Ekleme Talimatı

1. Bayrak görselinizi (örneğin `us.svg`, `tr.png` veya `de.svg`) `assets/flags/` klasörü içine yapıştırın.
2. `data.json` içerisindeki `"flag"` değerini `"assets/flags/us.svg"` şeklinde güncelleyin.

---

## 🚀 Yerel Sunucuda Çalıştırma

Modern tarayıcıların `fetch` güvenlik kısıtlamalarından (CORS) dolayı `data.json` dosyasının okunabilmesi için projenin yerel bir web sunucusu üzerinden çalıştırılması tavsiye edilir.

### Yöntem 1: Python ile
Terminalde proje klasörüne gelip şu komutu çalıştırın:
```bash
python3 -m http.server 8000
```
Daha sonra tarayıcınızda `http://localhost:8000` adresine gidin.

### Yöntem 2: Node.js / `npx serve` ile
```bash
npx serve .
```

---

## 🎨 Özelleştirme ve Geliştirme

`styles.css` içerisindeki `--glass-bg`, `--accent-color`, `--glass-border` değişkenlerini değiştirerek kart renklerini, şeffaflık seviyesini veya vurgu renklerini kolayca kendi tarzınıza uyarlayabilirsiniz.
