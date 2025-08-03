// Modern Portfolio JavaScript with Animations and Interactivity

// DOM Elements
const header = document.querySelector('.glass-header');
const hamburger = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');
const navItems = document.querySelector('.nav-items');
const navLinks = document.querySelectorAll('.nav-link');
const progressBar = document.querySelector('.progress-bar');
const sections = document.querySelectorAll('section');
const terminalInput = document.getElementById('terminal-input');
const terminalBody = document.getElementById('terminal-body');

// Particle Background Configuration
const particlesContainer = document.getElementById('particles-bg');
const particleCount = window.innerWidth < 768 ? 50 : 100;
const particles = [];

// Create Particle Class
class Particle {
  constructor() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.element = document.createElement('div');
    this.element.className = 'particle';
    this.element.style.cssText = `
      position: absolute;
      width: ${this.size}px;
      height: ${this.size}px;
      background: rgba(0, 212, 255, 0.5);
      border-radius: 50%;
      left: ${this.x}px;
      top: ${this.y}px;
      pointer-events: none;
      box-shadow: 0 0 ${this.size * 2}px rgba(0, 212, 255, 0.3);
    `;
    particlesContainer.appendChild(this.element);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > window.innerWidth) this.x = 0;
    if (this.x < 0) this.x = window.innerWidth;
    if (this.y > window.innerHeight) this.y = 0;
    if (this.y < 0) this.y = window.innerHeight;

    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  }
}

// Initialize Particles
function initParticles() {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  animateParticles();
}

// Animate Particles
function animateParticles() {
  particles.forEach(particle => particle.update());
  requestAnimationFrame(animateParticles);
}

// Header Scroll Effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Update Progress Bar
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = (window.scrollY / scrollHeight) * 100;
  progressBar.style.width = scrollProgress + '%';
});

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navItems.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navItems.classList.remove('active');
  });
});

// Active Navigation Link
const observerOptions = {
  threshold: 0.7,
  rootMargin: '-80px 0px -80px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const activeId = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => {
  sectionObserver.observe(section);
});

// Smooth Scroll for Navigation Links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      const headerOffset = 80;
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// AOS-like Scroll Animations
const animateOnScroll = () => {
  const elements = document.querySelectorAll('[data-aos]');
  
  elements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
      element.classList.add('aos-animate');
    }
  });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Typewriter Effect
const typewriterElement = document.querySelector('.typewriter');
if (typewriterElement) {
  const text = typewriterElement.textContent;
  typewriterElement.textContent = '';
  let index = 0;

  function type() {
    if (index < text.length) {
      typewriterElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100);
    }
  }

  // Start typing after a delay
  setTimeout(type, 1000);
}

// Terminal Functionality
const commands = {
  help: `Available commands:
  • about - Learn more about me
  • skills - View my technical skills
  • projects - See my projects
  • contact - Get my contact information
  • education - View my education background
  • clear - Clear the terminal
  • matrix - Enter the Matrix
  • joke - Tell me a programming joke`,
  
  about: `Aaron M. Dykes - Full Stack Developer
  
I'm a self-taught developer from Boston with a passion for building clean, smart, and purposeful applications. Currently focused on full-stack JavaScript with a solid Python foundation.`,
  
  skills: `Technical Skills:
  • Languages: JavaScript, Python, HTML5, CSS3, SQL
  • Frontend: React, Redux, Responsive Design
  • Backend: Node.js, Express (learning)
  • Database: PostgreSQL
  • Tools: Git, GitHub, Terminal, VS Code`,
  
  projects: `My Projects:
  1. Jammming - React app with Spotify API integration
  2. Reddit Minimal - Clean Reddit client built with React/Redux
  3. Poolio (In Development) - Group savings and investing platform`,
  
  contact: `Contact Information:
  • Email: aaronmdykes@gmail.com
  • LinkedIn: linkedin.com/in/aaron-dykes-/
  • GitHub: github.com/CodeWizardX1`,
  
  education: `Education:
  • Computer Science Career Path - Codecademy
  • Full-Stack Engineer Path - Codecademy (In Progress)
  • Intermediate Python 3 - Codecademy`,
  
  joke: getRandomJoke(),
  
  matrix: () => {
    startMatrix();
    return 'Entering the Matrix... Type "exit" to return.';
  }
};

function getRandomJoke() {
  const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "How many programmers does it take to change a light bulb? None. It's a hardware problem.",
    "Why do Java developers wear glasses? Because they don't C#!",
    "What's a programmer's favorite hangout place? Foo Bar!",
    "Why did the programmer quit his job? Because he didn't get arrays!",
    "What do you call a programmer from Finland? Nerdic!",
    "Why do programmers always mix up Halloween and Christmas? Because Oct 31 == Dec 25!",
    "A SQL query goes into a bar, walks up to two tables and asks: 'Can I join you?'"
  ];
  return jokes[Math.floor(Math.random() * jokes.length)];
}

// Terminal Input Handler
if (terminalInput) {
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const input = terminalInput.value.trim().toLowerCase();
      terminalInput.value = '';
      
      // Add user input to terminal
      addTerminalLine(`$ ${input}`, 'user');
      
      // Process command
      if (input === 'clear') {
        clearTerminal();
      } else if (commands[input]) {
        const response = typeof commands[input] === 'function' ? commands[input]() : commands[input];
        addTerminalLine(response, 'system');
      } else if (input === 'exit' && document.body.classList.contains('matrix-mode')) {
        exitMatrix();
      } else if (input) {
        addTerminalLine(`Command not found: ${input}. Type 'help' for available commands.`, 'error');
      }
      
      // Scroll to bottom
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });
}

function addTerminalLine(text, type = 'system') {
  const line = document.createElement('div');
  line.className = 'terminal-line';
  
  if (type === 'user') {
    line.innerHTML = `<span class="terminal-prompt">$</span><span class="terminal-text">${text.substring(2)}</span>`;
  } else if (type === 'error') {
    line.innerHTML = `<span class="terminal-text" style="color: #ff006e;">${text}</span>`;
  } else {
    // Format multiline responses
    const formattedText = text.replace(/\n/g, '<br>').replace(/•/g, '<span style="color: #00d4ff;">•</span>');
    line.innerHTML = `<span class="terminal-text">${formattedText}</span>`;
  }
  
  terminalBody.appendChild(line);
}

function clearTerminal() {
  terminalBody.innerHTML = `
    <div class="terminal-line">
      <span class="terminal-prompt">$</span>
      <span class="terminal-text">Terminal cleared. Type 'help' for available commands.</span>
    </div>
  `;
}

// Matrix Effect
function startMatrix() {
  document.body.classList.add('matrix-mode');
  const canvas = document.createElement('canvas');
  canvas.id = 'matrix-canvas';
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9998;
    pointer-events: none;
  `;
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
  const matrixArray = matrix.split("");
  const fontSize = 10;
  const columns = canvas.width / fontSize;
  const drops = [];
  
  for (let x = 0; x < columns; x++) {
    drops[x] = 1;
  }
  
  function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff00';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  
  window.matrixInterval = setInterval(drawMatrix, 35);
}

function exitMatrix() {
  document.body.classList.remove('matrix-mode');
  const canvas = document.getElementById('matrix-canvas');
  if (canvas) {
    canvas.remove();
  }
  if (window.matrixInterval) {
    clearInterval(window.matrixInterval);
  }
  addTerminalLine('Exited the Matrix. Welcome back to reality.', 'system');
}

// Mouse Parallax Effect for Hero Section
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
  heroSection.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;
    
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.transform = `translate(${x}px, ${y}px)`;
    }
  });
}

// Skill Progress Animation
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBars = entry.target.querySelectorAll('.skill-progress');
      progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = width;
        }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
  skillObserver.observe(skillsSection);
}

// Project Card Flip Handler
function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('click', function() {
      // Toggle flipped class on clicked card
      this.classList.toggle('flipped');
      
      // Optional: Close other flipped cards
      projectCards.forEach(otherCard => {
        if (otherCard !== this && otherCard.classList.contains('flipped')) {
          otherCard.classList.remove('flipped');
        }
      });
    });
    
    // Prevent text selection on double click
    card.addEventListener('selectstart', (e) => {
      e.preventDefault();
    });
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initProjectCards();
  
  // Add loading animation
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
});

// Resize handler for particles
window.addEventListener('resize', () => {
  const canvas = document.getElementById('matrix-canvas');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});