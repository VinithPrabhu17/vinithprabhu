// Matrix rain effect for contact section
document.addEventListener('DOMContentLoaded', function() {
    // Create a wrapper for the contact section upper part if it doesn't exist
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;
    
    // Create contact-matrix-bg div if it doesn't exist
    let contactMatrixBg = document.getElementById('contact-matrix-bg');
    if (!contactMatrixBg) {
        contactMatrixBg = document.createElement('div');
        contactMatrixBg.id = 'contact-matrix-bg';
        contactMatrixBg.style.position = 'absolute';
        contactMatrixBg.style.top = '0';
        contactMatrixBg.style.left = '0';
        contactMatrixBg.style.width = '100%';
        contactMatrixBg.style.height = '100%'; // Cover full height of the contact section
        contactMatrixBg.style.overflow = 'hidden';
        contactMatrixBg.style.zIndex = '0';
        
        // Find the container in contact section
        const contactContainer = contactSection.querySelector('.container');
        if (contactContainer) {
            // Insert the matrix background before the container
            contactSection.insertBefore(contactMatrixBg, contactContainer);
        } else {
            contactSection.prepend(contactMatrixBg);
        }
    }
    
    // Create canvas for matrix effect
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.opacity = '0.08'; // Slightly reduce opacity for better readability
    contactMatrixBg.appendChild(canvas);
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = contactMatrixBg.offsetWidth;
        canvas.height = contactMatrixBg.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    // Draw matrix rain
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff9d';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    // Animation loop
    setInterval(draw, 33);
}); 