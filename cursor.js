document.addEventListener('mousemove', function(e) {
    const orb = document.querySelector('.orb-effect');
    if (orb) {
        // Obter as coordenadas do mouse
        const x = e.clientX;
        const y = e.clientY;
        
        // Atualizar a posição do 'orb' para seguir o mouse
        orb.style.transform = `translate(${x}px, ${y}px)`;
    }
});