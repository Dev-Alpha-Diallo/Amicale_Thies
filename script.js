// Variables globales
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');
const contactForm = document.getElementById('contactForm');
const galleryModal = document.getElementById('galleryModal');
const closeModal = document.getElementById('closeModal');
const modalImage = document.getElementById('modalImage');
const currentYear = document.getElementById('currentYear');

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Mettre à jour l'année dans le footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Gestion du logo
    const logoImg = document.getElementById('logo-img');
    // Si le logo n'est pas trouvé dans assets/img, on utilise un logo par défaut
    logoImg.onerror = function() {
        this.src = 'https://via.placeholder.com/60x60/0066cc/ffffff?text=AT';
        console.log("Logo non trouvé, utilisation du logo par défaut");
    };
    
    // Animation initiale des éléments
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 200);
    });
});

// Gestion du scroll pour l'animation du header
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Animation des éléments au scroll
    const fadeElements = document.querySelectorAll('.fade-in:not(.visible)');
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
});

// Menu mobile
mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Fermer le menu mobile en cliquant sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Gestion du formulaire de contact
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Récupérer les données du formulaire
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const recipient = this.querySelector('select').value;
    const recipientText = recipient === 'president' ? 'Président de l\'Amicale' : 'Président de la Commission Sociale';
    const subject = this.querySelectorAll('input[type="text"]')[1].value;
    const message = this.querySelector('textarea').value;
    
    // Simulation d'envoi avec animation
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simuler un délai d'envoi
    setTimeout(() => {
        // Ici, normalement on enverrait les données à un serveur
        // Pour cet exemple, on simule un envoi réussi
        
        // Afficher un message de succès avec animation
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin-top: 20px; border: 1px solid #c3e6cb; animation: fadeIn 0.5s ease;">
                <i class="fas fa-check-circle"></i> 
                <strong>Message envoyé avec succès!</strong><br>
                Merci ${name}! Votre message a été envoyé à ${recipientText}.<br>
                Nous vous répondrons à ${email} dans les plus brefs délais.
            </div>
        `;
        
        // Ajouter le message après le formulaire
        this.parentNode.insertBefore(successMessage, this.nextSibling);
        
        // Réinitialiser le bouton
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Réinitialiser le formulaire
        this.reset();
        
        // Supprimer le message après 5 secondes
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
        
    }, 1500);
});

// Galerie modale
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        
        if (img) {
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            galleryModal.style.display = 'flex';
            
            // Animation d'entrée
            setTimeout(() => {
                document.querySelector('.modal-content').style.transform = 'scale(1)';
                document.querySelector('.modal-content').style.opacity = '1';
            }, 10);
        }
    });
});

// Fermer la modale
closeModal.addEventListener('click', function() {
    galleryModal.style.display = 'none';
});

// Fermer la modale en cliquant à l'extérieur
galleryModal.addEventListener('click', function(e) {
    if (e.target === this) {
        galleryModal.style.display = 'none';
    }
});

// Fermer la modale avec la touche Échap
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && galleryModal.style.display === 'flex') {
        galleryModal.style.display = 'none';
    }
});

// Effet de parallaxe sur la section hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Animation des cartes de contact au survol
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Ajout d'un effet de confetti au clic sur le bouton principal
const primaryBtn = document.querySelector('.btn-primary');
if (primaryBtn) {
    primaryBtn.addEventListener('click', function(e) {
        // Créer des confettis
        for (let i = 0; i < 20; i++) {
            createConfetti(e.clientX, e.clientY);
        }
    });
}

function createConfetti(x, y) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.borderRadius = '50%';
    confetti.style.left = x + 'px';
    confetti.style.top = y + 'px';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    
    document.body.appendChild(confetti);
    
    // Animation
    const animation = confetti.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${Math.random() * 100 - 50}px) translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
        duration: 1000,
        easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
    });
    
    animation.onfinish = () => confetti.remove();
}

function getRandomColor() {
    const colors = ['#4da6ff', '#3399ff', '#0066cc', '#e6f2ff'];
    return colors[Math.floor(Math.random() * colors.length)];
}