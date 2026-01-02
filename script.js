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

// Section WhatsApp et Dons
document.addEventListener('DOMContentLoaded', function() {
    // Copier le numéro Wave
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const number = this.getAttribute('data-number');
            navigator.clipboard.writeText(number).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copié!';
                this.classList.add('copied');
                
                // Afficher notification
                showNotification('Numéro copié dans le presse-papier!');
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.remove('copied');
                }, 2000);
            });
        });
    }
    
    // Boutons de montant de don
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const amount = this.getAttribute('data-amount');
            
            // Afficher un message avec instructions
            const message = `Pour faire un don de ${amount} FCFA :\n\n1. Ouvrez l'application Wave\n2. Allez dans "Envoyer de l'argent"\n3. Entrez le numéro: +221 77 890 12 34\n4. Confirmez le nom: AMICALE THIES BAMBEY\n5. Entrez le montant: ${amount} FCFA\n\nMerci pour votre soutien!`;
            
            // Créer une modale d'instructions
            const modal = document.createElement('div');
            modal.className = 'wave-instructions-modal';
            modal.innerHTML = `
                <div class="modal-content" style="max-width: 500px">
                    <h3><i class="fas fa-hand-holding-heart"></i> Instructions pour le don</h3>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                    <div style="display: flex; gap: 10px; justify-content: flex-end;">
                        <button class="btn copy-instructions" style="background: #6c757d; color: white">
                            <i class="far fa-copy"></i> Copier les instructions
                        </button>
                        <button class="btn close-modal-btn" style="background: var(--primary-blue); color: white">
                            Fermer
                        </button>
                    </div>
                </div>
            `;
            
            // Styles pour la modale
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.zIndex = '9999';
            
            document.body.appendChild(modal);
            
            // Bouton copier instructions
            modal.querySelector('.copy-instructions').addEventListener('click', function() {
                navigator.clipboard.writeText(message).then(() => {
                    showNotification('Instructions copiées dans le presse-papier!');
                });
            });
            
            // Bouton fermer
            modal.querySelector('.close-modal-btn').addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // Fermer en cliquant à l'extérieur
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    document.body.removeChild(modal);
                }
            });
        });
    });
    
    // Fonction pour afficher les notifications
    window.showNotification = function(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    };
});

// Section Vidéos
document.addEventListener('DOMContentLoaded', function() {
    const videoItems = document.querySelectorAll('.video-item');
    const mainVideoPlaceholder = document.getElementById('main-video');
    const videoTitle = document.getElementById('video-title');
    const videoDescription = document.getElementById('video-description');
    
    // Créer un lecteur vidéo
    let currentVideoPlayer = null;
    
    videoItems.forEach(item => {
        item.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-video');
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            
            // Mettre à jour le titre et description
            videoTitle.textContent = title;
            videoDescription.textContent = description;
            
            // Supprimer l'ancien lecteur vidéo s'il existe
            if (currentVideoPlayer) {
                currentVideoPlayer.remove();
            }
            
            // Vérifier si c'est une URL externe ou locale
            if (videoSrc.startsWith('http')) {
                // Pour les vidéos externes (YouTube, etc.)
                mainVideoPlaceholder.innerHTML = `
                    <iframe id="video-player" 
                            src="${videoSrc}" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                    </iframe>
                `;
            } else {
                // Pour les vidéos locales
                mainVideoPlaceholder.innerHTML = `
                    <video id="video-player" controls>
                        <source src="${videoSrc}" type="video/mp4">
                        Votre navigateur ne supporte pas la lecture de vidéos.
                    </video>
                `;
                
                // Si la vidéo n'existe pas, afficher un message
                const videoElement = document.getElementById('video-player');
                videoElement.onerror = function() {
                    this.parentElement.innerHTML = `
                        <div style="text-align: center; padding: 40px;">
                            <i class="fas fa-exclamation-triangle" style="font-size: 48px; color: #ffc107; margin-bottom: 20px;"></i>
                            <h3>Vidéo non disponible</h3>
                            <p>Cette vidéo est en cours de préparation.</p>
                            <p>Vous pouvez partager vos vidéos via le formulaire de contact.</p>
                        </div>
                    `;
                };
                
                currentVideoPlayer = videoElement;
            }
            
            // Surligner l'élément sélectionné
            videoItems.forEach(v => v.classList.remove('selected'));
            this.classList.add('selected');
            
            // Ajouter un style pour l'élément sélectionné
            const style = document.createElement('style');
            style.textContent = `
                .video-item.selected {
                    background: var(--primary-blue) !important;
                    color: white !important;
                }
                .video-item.selected h4,
                .video-item.selected p {
                    color: white !important;
                }
            `;
            document.head.appendChild(style);
        });
    });
    
    // Simuler un clic sur la première vidéo
    if (videoItems.length > 0) {
        setTimeout(() => {
            videoItems[0].click();
        }, 1000);
    }
    
    // Ajouter un gestionnaire pour les vidéos externes
    mainVideoPlaceholder.addEventListener('click', function(e) {
        if (e.target === this && !document.getElementById('video-player')) {
            // Si c'est le placeholder, demander à l'utilisateur de choisir une vidéo
            showNotification('Veuillez sélectionner une vidéo dans la liste', 'info');
        }
    });
});

// Ajouter un lien WhatsApp dans le header ou footer si besoin
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter un bouton WhatsApp flottant
    const whatsappFloat = document.createElement('a');
    whatsappFloat.href = 'https://wa.me/221771234567?text=Bonjour,%20je%20souhaite%20avoir%20des%20informations%20sur%20l\'Amicale';
    whatsappFloat.className = 'whatsapp-float';
    whatsappFloat.target = '_blank';
    whatsappFloat.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappFloat.title = 'Contactez-nous sur WhatsApp';
    
    // Styles pour le bouton flottant
    whatsappFloat.style.position = 'fixed';
    whatsappFloat.style.bottom = '20px';
    whatsappFloat.style.right = '20px';
    whatsappFloat.style.backgroundColor = '#25D366';
    whatsappFloat.style.color = 'white';
    whatsappFloat.style.width = '60px';
    whatsappFloat.style.height = '60px';
    whatsappFloat.style.borderRadius = '50%';
    whatsappFloat.style.display = 'flex';
    whatsappFloat.style.alignItems = 'center';
    whatsappFloat.style.justifyContent = 'center';
    whatsappFloat.style.fontSize = '30px';
    whatsappFloat.style.zIndex = '999';
    whatsappFloat.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.3)';
    whatsappFloat.style.transition = 'all 0.3s ease';
    
    whatsappFloat.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.4)';
    });
    
    whatsappFloat.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.3)';
    });
    
    document.body.appendChild(whatsappFloat);
});

// Ajouter un tracker de clics pour les statistiques (optionnel)
document.addEventListener('DOMContentLoaded', function() {
    // Suivre les clics sur les liens WhatsApp
    document.querySelectorAll('a[href*="whatsapp"], a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            const action = this.textContent.includes('Groupe') ? 'groupe_whatsapp' : 
                          this.textContent.includes('Commission') ? 'commission_whatsapp' : 
                          'contact_whatsapp';
            
            // Ici vous pourriez envoyer ces données à Google Analytics ou votre propre backend
            console.log(`WhatsApp click: ${action} - ${this.href}`);
        });
    });
    
    // Suivre les tentatives de don
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const amount = this.getAttribute('data-amount');
            console.log(`Don attempt: ${amount} FCFA`);
            
            // Vous pouvez ajouter un envoi à Google Analytics ici
            if (typeof gtag !== 'undefined') {
                gtag('event', 'don_attempt', {
                    'event_category': 'engagement',
                    'event_label': amount + '_FCFA'
                });
            }
        });
    });
});