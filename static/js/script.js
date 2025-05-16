document.addEventListener('DOMContentLoaded', function() {
  // Initialize particles.js
  particlesJS('particles-js', {
    particles: {
    number: {
      value: 60,
      density: { enable: true, value_area: 1000 }
    },
    color: {
      value: ["#ff0000", "#ffffff", "#00ffff"]
    },
    shape: {
      type: ["circle", "triangle"],
      stroke: { width: 0 },
      polygon: { nb_sides: 5 }
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0.1 }
    },
    size: {
      value: 4,
      random: true,
      anim: { enable: true, speed: 4, size_min: 0.3 }
    },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#ff0000",
      opacity: 0.4,
      width: 1,
      shadow: { enable: true, color: "#ff0000", blur: 5 }
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      out_mode: "out",
      attract: { enable: true, rotateX: 800, rotateY: 1600 }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      push: { particles_nb: 6 }
    }
  },
  retina_detect: true
});

  const form = document.getElementById('downloadForm');
  const message = document.getElementById('message');
  const downloadBtn = document.querySelector('.download-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('url').value.trim();
    
    if (!url) {
      message.textContent = "❌ Please enter a YouTube URL";
      return;
    }

    // Show loading state
    message.textContent = "Processing your download...";
    message.classList.add('loading');
    downloadBtn.disabled = true;
    downloadBtn.innerHTML = '<span>Downloading...</span><div class="spinner"></div>';

    try {
      const response = await fetch('/download', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ url })
      });

      const data = await response.json();
      
      if (data.success) {
        message.classList.remove('loading');
        message.innerHTML = `✅ Download ready! <a class="download-link" href="${data.filename}" download>Click here if it doesn't start automatically</a>`;
        
        // Auto-start download
        window.location.href = data.filename;
      } else {
        throw new Error(data.error || 'Failed to download video');
      }
    } catch (error) {
      message.classList.remove('loading');
      message.textContent = `❌ Error: ${error.message}`;
    } finally {
      downloadBtn.disabled = false;
      downloadBtn.innerHTML = '<span>Download</span><svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/></svg>';

      // Footer adjustment function
  function adjustMainContainer() {
    const footerHeight = document.querySelector('.footer').offsetHeight;
    document.querySelector('.container').style.paddingBottom = `${footerHeight + 20}px`;
  }

window.addEventListener('load', adjustMainContainer);
window.addEventListener('resize', adjustMainContainer);

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved user preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
                    (prefersDarkScheme.matches ? 'dark' : 'light');
document.body.classList.toggle('light-mode', currentTheme === 'light');

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  
  // Update particle.js colors if needed
  if (typeof particlesJS !== 'undefined') {
    updateParticleColors(isLight);
  }
});

// Optional: Update particle colors when theme changes
function updateParticleColors(isLight) {
  particlesJS('particles-js', {
    particles: {
      color: {
        value: isLight ? '#333333' : '#ffffff'
      },
      line_linked: {
        color: isLight ? '#333333' : '#ffffff'
      }
    }
  });
}

// Initialize particles with correct theme colors
if (typeof particlesJS !== 'undefined') {
  const isLight = document.body.classList.contains('light-mode');
  updateParticleColors(isLight);
}
    }
  });
});