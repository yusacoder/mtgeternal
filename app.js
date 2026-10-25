document.addEventListener('DOMContentLoaded', () => {
  fetchData();
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

async function fetchData() {
  try {
    const response = await fetch('data.json');
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
      avatarImg.src = data.profile.avatarUrl;
      avatarImg.alt = data.profile.name || 'Profil Fotoğrafı';
    }

    if (profileName) profileName.textContent = data.profile.name || '';
    if (profileTitle) profileTitle.textContent = data.profile.title || '';
    if (profileBio) profileBio.textContent = data.profile.bio || '';

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
        const tooltipText = data.profile.verificationText || 'bu profil eternalproduction.net tarafından onaylanmıştır';
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
        flagImg.src = data.profile.flag;
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
      const linkElement = createLinkElement(link);
      linksContainer.appendChild(linkElement);
    });
  }

  // Footer
  if (data.footer && data.footer.text) {
    const footerText = document.getElementById('footer-text');
    if (footerText) footerText.textContent = data.footer.text;
  }
}

function createLinkElement(link) {
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
  title.textContent = link.title || 'Bağlantı';
  content.appendChild(title);

  if (link.subtitle) {
    const subtitle = document.createElement('span');
    subtitle.className = 'link-subtitle';
    subtitle.textContent = link.subtitle;
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
