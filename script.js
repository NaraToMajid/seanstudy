document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loadingScreen = document.getElementById('loading-screen');
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainWebsite = document.getElementById('main-website');
    const navbar = document.getElementById('navbar');
    const authModal = document.getElementById('authModal');
    const percentageElement = document.getElementById('percentage');
    const progressBar = document.querySelector('.loading-progress');
    const statusWrapper = document.getElementById('statusWrapper');
    const startButton = document.getElementById('startButton');
    const authBtn = document.getElementById('authBtn');
    const mobileAuthBtn = document.getElementById('mobileAuthBtn');
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');
    const closeModal = document.getElementById('closeModal');
    const authForm = document.getElementById('authForm');
    const submitAuth = document.getElementById('submitAuth');
    const submitText = document.getElementById('submitText');
    const switchText = document.getElementById('switchText');
    const switchLink = document.getElementById('switchLink');
    const usernameField = document.getElementById('usernameField');
    const passwordField = document.getElementById('passwordField');
    const confirmPasswordField = document.getElementById('confirmPasswordField');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const confirmPasswordInput = document.getElementById('confirmPasswordInput');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const featureCards = document.querySelectorAll('.feature-card');
    const interactiveElements = document.querySelectorAll('.interactive-cursor');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const mobileDarkModeToggle = document.getElementById('mobileDarkModeToggle');
    const body = document.body;

    // Variables
    let progress = 0;
    let currentStatusIndex = 0;
    let isLoginMode = true;
    let lastScrollTop = 0;
    let isDarkMode = false;
    let isTransitioning = false;
    
    // Status data
    const statusData = [
        { text: "Menginisialisasi sistem pembelajaran" },
        { text: "Menyiapkan materi edukasi" },
        { text: "Memuat platform interaktif" },
        { text: "Mengoptimasi pengalaman belajar" },
        { text: "Memvalidasi konten edukasi" },
        { text: "Menyiapkan fitur kolaborasi" },
        { text: "Memuat aset pembelajaran" },
        { text: "Menginisialisasi progress tracking" },
        { text: "Platform siap digunakan" }
    ];
    
    // Functions
    function populateStatusItems() {
        statusData.forEach((status) => {
            const statusItem = document.createElement('div');
            statusItem.className = 'status-item';
            statusItem.innerHTML = `<div class="status-text">${status.text}</div>`;
            statusWrapper.appendChild(statusItem);
        });
    }
    
    function updateStatus() {
        const itemHeight = 40;
        const newPosition = -currentStatusIndex * itemHeight;
        statusWrapper.style.transform = `translateY(${newPosition}px)`;
        
        if (currentStatusIndex < statusData.length - 1) {
            currentStatusIndex++;
        }
    }
    
    function simulateLoading() {
        if (progress < 100) {
            let increment;
            
            if (progress < 30) {
                increment = Math.random() * 3 + 1;
            } else if (progress < 70) {
                increment = Math.random() * 2 + 0.5;
            } else {
                increment = Math.random() * 1 + 0.2;
            }
            
            progress = Math.min(progress + increment, 100);
            
            percentageElement.textContent = Math.round(progress) + "%";
            progressBar.style.width = progress + "%";
            
            const statusThreshold = Math.floor(progress / 11);
            if (statusThreshold > currentStatusIndex && currentStatusIndex < statusData.length) {
                updateStatus();
            }
            
            const delay = progress < 95 ? 80 : 150;
            setTimeout(simulateLoading, delay);
        } else {
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    welcomeScreen.classList.remove('hidden');
                }, 800);
            }, 500);
        }
    }
    
    function switchAuthMode() {
        isLoginMode = !isLoginMode;
        
        if (isLoginMode) {
            modalTitle.textContent = 'Masuk';
            modalSubtitle.textContent = 'Selamat datang kembali!';
            submitText.textContent = 'Masuk';
            switchText.textContent = 'Belum punya akun? ';
            switchLink.textContent = 'Daftar sekarang';
            confirmPasswordField.style.display = 'none';
            confirmPasswordInput.removeAttribute('required');
        } else {
            modalTitle.textContent = 'Daftar';
            modalSubtitle.textContent = 'Bergabunglah dengan kami!';
            submitText.textContent = 'Daftar';
            switchText.textContent = 'Sudah punya akun? ';
            switchLink.textContent = 'Masuk sekarang';
            confirmPasswordField.style.display = 'flex';
            confirmPasswordInput.setAttribute('required', 'required');
        }
        
        authForm.reset();
        togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
        passwordInput.type = 'password';
        toggleConfirmPassword.innerHTML = '<i class="fas fa-eye"></i>';
        confirmPasswordInput.type = 'password';
    }
    
    function showPage(pageId) {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        // Remove active class from all pages and nav links
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Find and activate target page
        const targetPage = document.getElementById(pageId);
        if (!targetPage) {
            isTransitioning = false;
            return;
        }
        
        // Add active class to target page
        setTimeout(() => {
            targetPage.classList.add('active');
            
            // Update active nav link
            navLinks.forEach(link => {
                if (link.dataset.page === pageId) {
                    link.classList.add('active');
                }
            });
            
            // Update URL hash without scrolling
            history.replaceState(null, null, `#${pageId}`);
            
            isTransitioning = false;
        }, 50);
    }
    
    function toggleDarkMode() {
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
            // Update mobile dark mode toggle icon
            const mobileIcon = mobileDarkModeToggle.querySelector('i');
            mobileIcon.className = 'fas fa-sun';
            mobileDarkModeToggle.querySelector('span').textContent = 'Mode Terang';
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
            // Update mobile dark mode toggle icon
            const mobileIcon = mobileDarkModeToggle.querySelector('i');
            mobileIcon.className = 'fas fa-moon';
            mobileDarkModeToggle.querySelector('span').textContent = 'Mode Gelap';
        }
        
        // Update floating particles
        updateFloatingParticles();
    }
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class on navbar
        if (scrollTop > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    }
    
    function addFloatingParticles() {
        const particleCount = isDarkMode ? 10 : 15;
        const particlesContainer = document.createElement('div');
        particlesContainer.id = 'particles-container';
        particlesContainer.style.position = 'fixed';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.pointerEvents = 'none';
        particlesContainer.style.zIndex = '-1';
        
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            
            // Random size
            const size = Math.random() * 60 + 20;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random animation
            const duration = Math.random() * 20 + 20;
            const delay = Math.random() * 5;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    function updateFloatingParticles() {
        const container = document.getElementById('particles-container');
        if (container) {
            container.remove();
        }
        addFloatingParticles();
    }
    
    function addRippleEffect(element, e) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(37, 99, 235, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
            z-index: 1;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    function togglePasswordVisibility(inputId, toggleBtn) {
        const input = document.getElementById(inputId);
        if (input.type === 'password') {
            input.type = 'text';
            toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
        } else {
            input.type = 'password';
            toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
        }
    }

    // Event Listeners
    startButton.addEventListener('click', function(e) {
        addRippleEffect(this, e);
        welcomeScreen.classList.add('fade-out');
        setTimeout(() => {
            welcomeScreen.classList.add('hidden');
            mainWebsite.style.display = 'block';
            
            setTimeout(() => {
                navbar.classList.add('show');
                showPage('beranda');
                addFloatingParticles();
            }, 100);
        }, 800);
    });
    
    authBtn.addEventListener('click', function(e) {
        addRippleEffect(this, e);
        isLoginMode = true;
        switchAuthMode();
        authModal.classList.add('show');
        mobileMenu.classList.remove('show');
    });
    
    mobileAuthBtn.addEventListener('click', function(e) {
        addRippleEffect(this, e);
        isLoginMode = true;
        switchAuthMode();
        authModal.classList.add('show');
        mobileMenu.classList.remove('show');
    });
    
    mobileToggle.addEventListener('click', function(e) {
        addRippleEffect(this, e);
        mobileMenu.classList.add('show');
    });
    
    mobileClose.addEventListener('click', function(e) {
        addRippleEffect(this, e);
        mobileMenu.classList.remove('show');
    });
    
    closeModal.addEventListener('click', function(e) {
        addRippleEffect(this, e);
        authModal.classList.remove('show');
    });
    
    authModal.addEventListener('click', function(e) {
        if (e.target === authModal) {
            authModal.classList.remove('show');
        }
    });
    
    switchLink.addEventListener('click', function(e) {
        addRippleEffect(this, e);
        switchAuthMode();
    });
    
    darkModeToggle.addEventListener('click', function(e) {
        addRippleEffect(this, e);
        toggleDarkMode();
    });
    
    mobileDarkModeToggle.addEventListener('click', function(e) {
        addRippleEffect(this, e);
        toggleDarkMode();
    });
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function(e) {
        e.preventDefault();
        togglePasswordVisibility('passwordInput', this);
    });
    
    toggleConfirmPassword.addEventListener('click', function(e) {
        e.preventDefault();
        togglePasswordVisibility('confirmPasswordInput', this);
    });
    
    authForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validasi untuk pendaftaran
        if (!isLoginMode) {
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            if (password !== confirmPassword) {
                alert('Kata sandi dan konfirmasi kata sandi tidak cocok!');
                return;
            }
            
            if (password.length < 6) {
                alert('Kata sandi minimal 6 karakter!');
                return;
            }
        }
        
        const buttonText = submitText.textContent;
        submitText.textContent = 'Memproses...';
        submitAuth.disabled = true;
        
        setTimeout(() => {
            alert(`${buttonText} berhasil!`);
            submitText.textContent = buttonText;
            submitAuth.disabled = false;
            authModal.classList.remove('show');
            authForm.reset();
            // Reset password visibility
            togglePassword.innerHTML = '<i class="fas fa-eye"></i>';
            passwordInput.type = 'password';
            toggleConfirmPassword.innerHTML = '<i class="fas fa-eye"></i>';
            confirmPasswordInput.type = 'password';
        }, 1500);
    });
    
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.dataset.page;
            
            // Add ripple effect
            addRippleEffect(this, e);
            
            // Only navigate if it's a different page
            if (!this.classList.contains('active')) {
                showPage(pageId);
            }
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                mobileMenu.classList.remove('show');
            }
        });
    });
    
    // Handle back/forward navigation
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1) || 'beranda';
        showPage(hash);
    });
    
    // Handle initial hash
    if (window.location.hash) {
        const initialPage = window.location.hash.substring(1);
        if (document.getElementById(initialPage)) {
            setTimeout(() => showPage(initialPage), 100);
        }
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('show') && 
            !mobileMenu.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            mobileMenu.classList.remove('show');
        }
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Add hover effects to feature cards
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!isTransitioning) {
                this.style.transform = 'translateY(-8px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!isTransitioning) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Add ripple effect to interactive elements
    interactiveElements.forEach(element => {
        element.addEventListener('click', function(e) {
            if (this.classList.contains('interactive-cursor')) {
                addRippleEffect(this, e);
            }
        });
    });
    
    // Initialize
    function init() {
        populateStatusItems();
        updateStatus();
        simulateLoading();
        
        // Check for saved dark mode preference
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'enabled') {
            isDarkMode = true;
            body.classList.add('dark-mode');
            // Update mobile dark mode toggle icon
            const mobileIcon = mobileDarkModeToggle.querySelector('i');
            mobileIcon.className = 'fas fa-sun';
            mobileDarkModeToggle.querySelector('span').textContent = 'Mode Terang';
        }
        
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';
    }
    
    init();
});
