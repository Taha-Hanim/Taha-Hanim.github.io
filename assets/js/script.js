// ===== EMAIL JS CONFIGURATION =====
const EMAILJS_PUBLIC_KEY = 'WscvrXMfDVMWv9lSd';
const EMAILJS_SERVICE_ID = 'service_cusbjlp';
const EMAILJS_TEMPLATE_ID = 'template_ztn6e8p';
const CONTACT_RECEIVER_NAME = 'Taha Hanim';

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== RESUME DOWNLOAD =====
const downloadResumeBtn = document.getElementById('download-resume-btn');
if (downloadResumeBtn) {
  downloadResumeBtn.addEventListener('click', async function (e) {
    e.preventDefault();

    const resumePath = this.getAttribute('href');
    const downloadName = this.getAttribute('download') || 'resume.pdf';

    if (!resumePath) {
      return;
    }

    try {
      const response = await fetch(resumePath, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Failed to fetch resume: ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.href = blobUrl;
      tempLink.download = downloadName;
      document.body.appendChild(tempLink);
      tempLink.click();
      tempLink.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      // Fallback: if hosted environment blocks fetch, use direct navigation.
      window.location.href = resumePath;
    }
  });
}

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  if (window.emailjs) {
    emailjs.init({
      publicKey: EMAILJS_PUBLIC_KEY,
    });
  }

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const senderName = document.getElementById('name').value.trim();
    const senderEmail = document.getElementById('email').value.trim();
    const senderMessage = document.getElementById('message').value.trim();

    if (!senderName || !senderEmail || !senderMessage) {
      alert('Please fill in all fields before sending your message.');
      return;
    }

    const formData = {
      to_name: CONTACT_RECEIVER_NAME,
      from_name: senderName,
      reply_to: senderEmail,
      from_email: senderEmail,
      message: senderMessage,
      subject: `New portfolio message from ${senderName}`,
      sent_at: new Date().toLocaleString(),
    };

    // Check if EmailJS is configured
    if (window.emailjs) {
      const originalBtnText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      emailjs
        .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData)
        .then(
          function () {
            alert('✅ Message sent successfully! I\'ll get back to you soon.');
            contactForm.reset();
          },
          function (error) {
            console.error('EmailJS Error:', error);
            const errorText = error && (error.text || error.message)
              ? `${error.text || error.message}`
              : 'Unknown EmailJS error';
            alert(`❌ Failed to send message. ${errorText}`);
          }
        )
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
          }
        });
    } else {
      alert('⚠️ EmailJS is not configured. Replace the IDs in script.js to enable email sending.');
      console.log('Form Data (logged):', formData);
    }
  });
}

// ===== NAVBAR MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close menu only when a link is clicked (not on toggle)
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards for animation
document.querySelectorAll('.skill-card, .project-card, .highlight-box').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

// ===== ACTIVE NAV LINK HIGHLIGHT =====
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.style.color = '#3498db';
    } else {
      link.style.color = 'inherit';
    }
  });
});

// ===== BUTTON FEEDBACK =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    if (this.classList.contains('disabled')) return;
    
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple 0.6s ease-out';

    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    from {
      transform: scale(1);
      opacity: 1;
    }
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===== PYTHON BOT CODE MODAL =====
const botCodeModal = document.getElementById('bot-code-modal');
const openBotCodeModalBtn = document.getElementById('open-bot-code-modal');
const closeBotCodeModalBtn = document.getElementById('close-bot-code-modal');
const botCodeContent = document.getElementById('bot-code-content');
const botCodeFallbackSource = document.getElementById('python-bot-code-fallback');

const getFallbackBotCode = () => {
  if (botCodeFallbackSource && botCodeFallbackSource.textContent) {
    return botCodeFallbackSource.textContent.trim();
  }

  return '# Python voice bot source code is unavailable right now.';
};

const loadBotCode = async () => {
  try {
    const response = await fetch('./python_voice_bot_2022.py', { cache: 'no-store' });
    if (response.ok) {
      const code = await response.text();
      if (code.trim()) {
        return code;
      }
    }
  } catch (error) {
    // Some hosts block .py file serving; fallback keeps the modal working.
  }

  return getFallbackBotCode();
};

if (botCodeModal && openBotCodeModalBtn && closeBotCodeModalBtn && botCodeContent) {
  botCodeContent.textContent = 'Loading code...';
  loadBotCode().then((code) => {
    botCodeContent.textContent = code;
  });

  const openModal = () => {
    botCodeModal.classList.add('is-open');
    botCodeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    botCodeModal.classList.remove('is-open');
    botCodeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openBotCodeModalBtn.addEventListener('click', openModal);
  closeBotCodeModalBtn.addEventListener('click', closeModal);

  botCodeModal.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.closeModal === 'true') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && botCodeModal.classList.contains('is-open')) {
      closeModal();
    }
  });
}
