/* ===== INTERSECTION OBSERVER PARA NAV ATIVA ===== */
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});

/* ===== TOGGLE EMBEDDED PROJECTS ===== */
document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.toggle-embedded');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const group = button.getAttribute('data-group');
            
            // Encontrar o projects-grid correspondente
            const projectsGroup = button.closest('.projects-group');
            const projectsGrid = projectsGroup.querySelector('.projects-grid.collapsed');

            if (projectsGrid) {
                projectsGrid.classList.toggle('open');
                button.classList.toggle('open');
                
                if (projectsGrid.classList.contains('open')) {
                    if (group === 'backend') {
                        button.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Ocultar experiência em desenvolvimento web';
                    } else if (group === 'embedded') {
                        button.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Ocultar sistemas distribuídos e embarcados';
                    }
                } else {
                    if (group === 'backend') {
                        button.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Mostrar experiência em desenvolvimento web';
                    } else if (group === 'embedded') {
                        button.innerHTML = '<i class="fa-solid fa-chevron-down"></i> Mostrar sistemas distribuídos e embarcados';
                    }
                }
            }
        });
    });
});

/* ===== SMOOTH SCROLL BEHAVIOR ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ===== ANIMAÇÕES DE ENTRADA ===== */
const observerAnimation = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.project-card, .expertise-category, .highlight-box, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observerAnimation.observe(el);
});

/* ===== ANIMATED COUNTER ===== */
const animateCounter = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.innerText);
        let current = 0;
        const increment = target / 60;
        
        const updateCount = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.floor(current) + (counter.innerText.includes('+') ? '+' : counter.innerText.includes('%') ? '%' : '');
                setTimeout(updateCount, 1000 / 60);
            } else {
                counter.innerText = counter.innerText;
            }
        };
        
        // Observar quando o elemento entra na viewport
        const singleObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                singleObserver.unobserve(counter);
            }
        }, { threshold: 0.5 });
        
        singleObserver.observe(counter);
    });
};

document.addEventListener('DOMContentLoaded', animateCounter);

/* ===== MOBILE MENU (se necessário adicionar no futuro) ===== */
// Placeholder para menu mobile que pode ser adicionado depois

/* ===== PARALLAX EFFECT (SUAVE) ===== */
window.addEventListener('scroll', () => {
    const orbEffect = document.querySelector('.orb-effect');
    if (orbEffect) {
        const scrollY = window.scrollY;
        orbEffect.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
});

/* ===== KEYBOARD SHORTCUTS ===== */
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K para ir ao topo
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

console.log('Portfolio de Felipe Feitosa carregado com sucesso! 🚀');
