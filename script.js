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

    // BUSCAR IMAGENS DO GITHUB
    const fetchGitHubPreviews = async () => {
        const projects = document.querySelectorAll('.github-project');

        for (const project of projects) {
            const repoUrl = project.dataset.repoUrl;
            const imageContainer = project.querySelector('.project-image-container');

            if (!repoUrl || !imageContainer) continue;

            // Usamos um proxy para evitar problemas de CORS
            // O 'allorigins.win' é um serviço gratuito que nos ajuda com isso
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(repoUrl)}`;

            try {
                const response = await fetch(proxyUrl);
                const data = await response.json();
                
                // O conteúdo do HTML do GitHub vem como uma string
                const htmlContent = data.contents;

                // Criamos um elemento temporário para poder 'ler' o HTML
                const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
                
                // Buscamos a meta tag 'og:image'
                const imageUrl = doc.querySelector('meta[property="og:image"]')?.getAttribute('content');

                if (imageUrl) {
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    img.alt = `Preview do projeto ${repoUrl}`;
                    imageContainer.innerHTML = ''; // Limpa a mensagem "Carregando..."
                    imageContainer.appendChild(img);
                } else {
                    imageContainer.textContent = 'Preview não disponível';
                }
            } catch (error) {
                console.error('Erro ao buscar preview do GitHub:', error);
                imageContainer.textContent = 'Erro ao carregar preview';
            }
        }
    };

    fetchGitHubPreviews();
});
