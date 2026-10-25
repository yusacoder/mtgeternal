document.addEventListener('DOMContentLoaded', () => {
  const currentLang = document.body.getAttribute('data-lang') || 'tr';
  const pageType = document.body.getAttribute('data-page') || 'home';

  // Initialize Language Switcher state preservation
  initLanguageSwitcher();

  // Load theme and page data
  if (pageType === 'home') {
    fetchData();
  } else if (pageType === 'report') {
    fetchThemeData();
    initReportForm();
  }
});

// Icon class mapping helper
const ICON_MAP = {
  instagram: 'fa-brands fa-instagram',
  tiktok: 'fa-brands fa-tiktok',
  youtube: 'fa-brands fa-youtube',
  discord: 'fa-brands fa-discord',
  twitch: 'fa-brands fa-twitch',
  twitter: 'fa-brands fa-x-twitter',
  x: 'fa-brands fa-x-twitter',
  spotify: 'fa-brands fa-spotify',
  github: 'fa-brands fa-github',
  linkedin: 'fa-brands fa-linkedin',
  telegram: 'fa-brands fa-telegram',
  website: 'fa-solid fa-globe',
  link: 'fa-solid fa-link',
  email: 'fa-solid fa-envelope'
};

/* Language Switcher Logic */
function initLanguageSwitcher() {
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (document.body.getAttribute('data-page') === 'report') {
        saveReportFormState();
      }
    });
  });

  if (document.body.getAttribute('data-page') === 'report') {
    restoreReportFormState();
  }
}

function saveReportFormState() {
  const form = document.getElementById('complaint-form');
  if (!form) return;

  const formData = {
    fullName: document.getElementById('fullName')?.value || '',
    countryCode: document.getElementById('countryCode')?.value || '+90',
    phone: document.getElementById('phone')?.value || '',
    reportedUser: document.getElementById('reportedUser')?.value || '',
    categoryIndex: document.getElementById('category')?.selectedIndex || 0,
    description: document.getElementById('description')?.value || '',
    termsAgreement: document.getElementById('termsAgreement')?.checked || false
  };

  try {
    sessionStorage.setItem('ep_report_form_draft', JSON.stringify(formData));
  } catch (err) {
    console.warn('Session storage error:', err);
  }
}

function restoreReportFormState() {
  try {
    const saved = sessionStorage.getItem('ep_report_form_draft');
    if (!saved) return;
    const formData = JSON.parse(saved);

    if (formData.fullName && document.getElementById('fullName')) {
      document.getElementById('fullName').value = formData.fullName;
    }
    if (formData.countryCode && document.getElementById('countryCode')) {
      document.getElementById('countryCode').value = formData.countryCode;
    }
    if (formData.phone && document.getElementById('phone')) {
      document.getElementById('phone').value = formData.phone;
    }
    if (formData.reportedUser && document.getElementById('reportedUser')) {
      document.getElementById('reportedUser').value = formData.reportedUser;
    }
    if (formData.categoryIndex && document.getElementById('category')) {
      document.getElementById('category').selectedIndex = formData.categoryIndex;
    }
    if (formData.description && document.getElementById('description')) {
      document.getElementById('description').value = formData.description;
      updateCharCount();
    }
    if (formData.termsAgreement && document.getElementById('termsAgreement')) {
      document.getElementById('termsAgreement').checked = formData.termsAgreement;
    }
  } catch (err) {
    console.warn('Error restoring form draft:', err);
  }
}

/* Theme & Background Loader for Non-Home Pages */
async function fetchThemeData() {
  try {
    const response = await fetch('/data.json');
    if (response.ok) {
      const data = await response.json();
      if (data.theme) {
        const bgBlur = document.getElementById('bg-blur');
        if (bgBlur && data.theme.backgroundImageUrl) {
          bgBlur.style.backgroundImage = `url('${data.theme.backgroundImageUrl}')`;
        }
        if (bgBlur && data.theme.blurAmount) {
          bgBlur.style.filter = `blur(${data.theme.blurAmount}) brightness(${data.theme.brightness || '75%'})`;
        }
      }
    }
  } catch (e) {
    console.error('Theme background load error:', e);
  }
}

/* Home Page Data Loading & Rendering */
async function fetchData() {
  try {
    const response = await fetch('/data.json');
    if (!response.ok) {
      throw new Error(`HTTP hatası! Durum: ${response.status}`);
    }
    const data = await response.json();
    renderPage(data);
  } catch (error) {
    console.error('Veri yüklenirken hata oluştu:', error);
    showErrorState();
  }
}

function renderPage(data) {
  const currentLang = document.body.getAttribute('data-lang') || 'tr';

  // Theme & Background
  if (data.theme) {
    const bgBlur = document.getElementById('bg-blur');
    if (bgBlur && data.theme.backgroundImageUrl) {
      bgBlur.style.backgroundImage = `url('${data.theme.backgroundImageUrl}')`;
    }
    if (data.theme.blurAmount) {
      bgBlur.style.filter = `blur(${data.theme.blurAmount}) brightness(${data.theme.brightness || '75%'})`;
    }
  }

  // Profile Header
  if (data.profile) {
    const avatarImg = document.getElementById('avatar-img');
    const profileName = document.getElementById('profile-name');
    const profileTitle = document.getElementById('profile-title');
    const profileBio = document.getElementById('profile-bio');
    const flagImg = document.getElementById('flag-img');
    const flagContainer = document.getElementById('flag-badge-container');

    if (avatarImg && data.profile.avatarUrl) {
      avatarImg.src = data.profile.avatarUrl.startsWith('http') || data.profile.avatarUrl.startsWith('/')
        ? data.profile.avatarUrl
        : '/' + data.profile.avatarUrl;
      avatarImg.alt = data.profile.name || 'Profil Fotoğrafı';
    }

    if (profileName) profileName.textContent = data.profile.name || '';
    if (profileTitle) profileTitle.textContent = data.profile.title || '';

    if (profileBio) {
      if (currentLang === 'en' && data.profile.bio_en) {
        profileBio.textContent = data.profile.bio_en;
      } else if (currentLang === 'en' && data.profile.bio) {
        profileBio.textContent = "Hello, I am MTG. I create content about Alisa Mikhailovna Kujou (Alya). My goal is to make more people love Alya and offer fun, engaging content for Alya fans.";
      } else {
        profileBio.textContent = data.profile.bio || '';
      }
    }

    // Verified badge
    const badgeContainer = document.getElementById('verified-badge-container');
    if (badgeContainer) {
      badgeContainer.innerHTML = '';
      if (data.profile.verified) {
        const badgeLink = document.createElement('a');
        badgeLink.href = data.profile.verificationUrl || 'https://eternalproduction.net';
        badgeLink.target = '_blank';
        badgeLink.rel = 'noopener noreferrer';
        badgeLink.className = 'verified-badge';
        const tooltipText = currentLang === 'en'
          ? (data.profile.verificationText_en || 'this profile is verified by eternalproduction.net')
          : (data.profile.verificationText || 'bu profil eternalproduction.net tarafından onaylanmıştır');

        badgeLink.setAttribute('data-tooltip', tooltipText);
        badgeLink.setAttribute('aria-label', tooltipText);

        const badgeIcon = document.createElement('i');
        badgeIcon.className = 'fa-solid fa-circle-check verified-icon';

        badgeLink.appendChild(badgeIcon);
        badgeContainer.appendChild(badgeLink);
      }
    }

    if (data.profile.flag) {
      if (flagImg) {
        flagImg.src = data.profile.flag.startsWith('/') ? data.profile.flag : '/' + data.profile.flag;
        flagImg.alt = data.profile.flagAlt || 'Bayrak';
      }
    } else if (flagContainer) {
      flagContainer.style.display = 'none';
    }
  }

  // Links
  const linksContainer = document.getElementById('links-container');
  if (linksContainer && Array.isArray(data.links)) {
    linksContainer.innerHTML = ''; // Clear skeleton/placeholders

    data.links.forEach(link => {
      const linkElement = createLinkElement(link, currentLang);
      linksContainer.appendChild(linkElement);
    });
  }

  // Footer
  if (data.footer) {
    const footerText = document.getElementById('footer-text');
    if (footerText) {
      footerText.textContent = (currentLang === 'en' && data.footer.text_en)
        ? data.footer.text_en
        : (data.footer.text || '© 2026 MTG. Tüm hakları saklıdır.');
    }
  }
}

function createLinkElement(link, currentLang) {
  const a = document.createElement('a');
  a.href = link.url || '#';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.className = `link-btn ${link.highlight ? 'highlight' : ''}`;

  // Icon container
  const iconContainer = document.createElement('div');
  iconContainer.className = 'link-icon-container';

  const iconKey = (link.icon || '').toLowerCase();
  const iconClass = ICON_MAP[iconKey] || 'fa-solid fa-link';

  const iconElement = document.createElement('i');
  iconElement.className = iconClass;
  iconContainer.appendChild(iconElement);

  // Content (Title & Subtitle)
  const content = document.createElement('div');
  content.className = 'link-content';

  const title = document.createElement('span');
  title.className = 'link-title';
  title.textContent = (currentLang === 'en' && link.title_en) ? link.title_en : (link.title || 'Bağlantı');
  content.appendChild(title);

  const subtitleText = (currentLang === 'en' && link.subtitle_en) ? link.subtitle_en : link.subtitle;
  if (subtitleText) {
    const subtitle = document.createElement('span');
    subtitle.className = 'link-subtitle';
    subtitle.textContent = subtitleText;
    content.appendChild(subtitle);
  }

  // Arrow Icon
  const arrowContainer = document.createElement('div');
  arrowContainer.className = 'link-arrow';
  const arrowIcon = document.createElement('i');
  arrowIcon.className = 'fa-solid fa-chevron-right';
  arrowContainer.appendChild(arrowIcon);

  // Assemble
  a.appendChild(iconContainer);
  a.appendChild(content);
  a.appendChild(arrowContainer);

  return a;
}

function showErrorState() {
  const profileBio = document.getElementById('profile-bio');
  if (profileBio) {
    profileBio.textContent = 'Veriler yüklenirken bir sorun oluştu. Lütfen data.json dosyasını kontrol edin.';
  }
}

function updateCharCount() {
  const descArea = document.getElementById('description');
  const countSpan = document.getElementById('desc-char-count');
  if (descArea && countSpan) {
    countSpan.textContent = descArea.value.length;
  }
}

function initReportForm() {
  const form = document.getElementById('complaint-form');
  const descArea = document.getElementById('description');
  if (descArea) {
    descArea.addEventListener('input', updateCharCount);
    updateCharCount();
  }

  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
}

/* Form Validation & Submission Handler */
function validateForm() {
  const currentLang = document.body.getAttribute('data-lang') || 'tr';
  let isValid = true;

  // Clear previous errors
  document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
  document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(el => el.classList.remove('invalid'));

  // Full Name validation
  const fullNameInput = document.getElementById('fullName');
  if (fullNameInput) {
    const val = fullNameInput.value.trim();
    if (!val || val.length < 2) {
      showFieldError('fullName', currentLang === 'en'
        ? 'Please enter your full name (at least 2 characters).'
        : 'Lütfen adınızı ve soyadınızı giriniz (en az 2 karakter).');
      isValid = false;
    }
  }

  // Phone validation
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    const val = phoneInput.value.trim();
    const digitsOnly = val.replace(/\D/g, '');
    if (!val || digitsOnly.length < 7 || digitsOnly.length > 15) {
      showFieldError('phone', currentLang === 'en'
        ? 'Please enter a valid phone number.'
        : 'Lütfen geçerli bir telefon numarası giriniz.');
      isValid = false;
    }
  }

  // Reported User validation
  const reportedUserInput = document.getElementById('reportedUser');
  if (reportedUserInput) {
    const val = reportedUserInput.value.trim();
    if (!val) {
      showFieldError('reportedUser', currentLang === 'en'
        ? 'Please enter reported username or profile link.'
        : 'Lütfen şikâyet edilen kullanıcı adını veya profil bağlantısını giriniz.');
      isValid = false;
    }
  }

  // Category selection validation
  const categorySelect = document.getElementById('category');
  if (categorySelect) {
    const val = categorySelect.value;
    if (!val) {
      showFieldError('category', currentLang === 'en'
        ? 'Please select a reason for the report.'
        : 'Lütfen bir şikâyet nedeni seçiniz.');
      isValid = false;
    }
  }

  // Description validation
  const descriptionInput = document.getElementById('description');
  if (descriptionInput) {
    const val = descriptionInput.value.trim();
    if (!val || val.length < 30) {
      showFieldError('description', currentLang === 'en'
        ? 'Report description must be at least 30 characters.'
        : 'Şikâyet açıklaması en az 30 karakter olmalıdır.');
      isValid = false;
    }
  }

  // Terms Agreement validation
  const termsCheckbox = document.getElementById('termsAgreement');
  if (termsCheckbox && !termsCheckbox.checked) {
    showFieldError('termsAgreement', currentLang === 'en'
      ? 'You must confirm the accuracy of information to submit.'
      : 'Devam etmek için paylaştığınız bilgilerin doğruluğunu onaylamalısınız.');
    isValid = false;
  }

  return isValid;
}

function showFieldError(fieldId, message) {
  const errSpan = document.getElementById(`err-${fieldId}`);
  if (errSpan) {
    errSpan.textContent = message;
  }
  const inputEl = document.getElementById(fieldId);
  if (inputEl) {
    inputEl.classList.add('invalid');
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const currentLang = document.body.getAttribute('data-lang') || 'tr';
  const formAlert = document.getElementById('form-alert');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
  const btnSpinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;

  // Honeypot check
  const honey = document.querySelector('input[name="_honey"]');
  if (honey && honey.value) {
    console.warn('Bot detection triggered.');
    return;
  }

  if (!validateForm()) {
    showAlert(currentLang === 'en'
      ? 'Please fix the errors above before submitting.'
      : 'Lütfen göndermeden önce yukarıdaki hataları düzeltin.', 'error');
    return;
  }

  // Collect form values
  const fullName = document.getElementById('fullName').value.trim();
  const countryCode = document.getElementById('countryCode').value;
  const rawPhone = document.getElementById('phone').value.trim();
  const fullPhone = `${countryCode} ${rawPhone}`;
  const reportedUser = document.getElementById('reportedUser').value.trim();
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value.trim();
  const timestamp = new Date().toLocaleString(currentLang === 'en' ? 'en-US' : 'tr-TR');

  // FormSubmit AJAX Payload
  const payload = {
    "_subject": "[Eternal Production] Yeni Kullanıcı Şikâyeti",
    "Ad Soyad": fullName,
    "Telefon Ülke Kodu": countryCode,
    "Telefon Numarası": fullPhone,
    "Şikâyet Edilen Kullanıcı": reportedUser,
    "Şikâyet Kategorisi": category,
    "Şikâyet Açıklaması": description,
    "Kullanılan Dil": currentLang.toUpperCase(),
    "Gönderim Tarihi": timestamp
  };

  // UI Loading State
  if (submitBtn) submitBtn.disabled = true;
  if (btnText) btnText.style.opacity = '0.5';
  if (btnSpinner) btnSpinner.classList.remove('hidden');

  try {
    const response = await fetch('https://formsubmit.co/ajax/destek@eternalproduction.net', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok && (result.success === "true" || result.success === true)) {
      showAlert(currentLang === 'en'
        ? 'Thank you! Your report has been submitted successfully.'
        : 'Teşekkürler! Şikâyetiniz başarıyla iletildi.', 'success');

      // Reset form and clear draft
      document.getElementById('complaint-form').reset();
      updateCharCount();
      sessionStorage.removeItem('ep_report_form_draft');
    } else {
      throw new Error(result.message || 'Submission failed');
    }
  } catch (error) {
    console.error('Form submit error:', error);
    showAlert(currentLang === 'en'
      ? 'An error occurred while submitting your report. Please try again later.'
      : 'Şikâyetiniz gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.', 'error');
  } finally {
    if (submitBtn) submitBtn.disabled = false;
    if (btnText) btnText.style.opacity = '1';
    if (btnSpinner) btnSpinner.classList.add('hidden');
  }
}

function showAlert(message, type) {
  const alertBox = document.getElementById('form-alert');
  if (!alertBox) return;

  alertBox.className = `form-alert ${type}`;
  const iconClass = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-triangle-exclamation';
  alertBox.innerHTML = `<i class="${iconClass}"></i> <span>${message}</span>`;
  alertBox.classList.remove('hidden');

  alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
