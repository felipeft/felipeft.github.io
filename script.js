document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.id;
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${currentId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

document.querySelectorAll(".expand-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".project-card");
        card.classList.toggle("active");

        if (card.classList.contains("active")) {
            btn.innerHTML = 'Ocultar detalhes <i class="fa-solid fa-chevron-up"></i>';
        } else {
            btn.innerHTML = 'Ver detalhes <i class="fa-solid fa-chevron-down"></i>';
        }
    });
});