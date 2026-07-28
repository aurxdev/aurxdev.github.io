/**
 * Portfolio - Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: {
            'À propos': 'About',
            'Expérience': 'Experience',
            'Compétences': 'Skills',
            'Projets': 'Projects',
            'Développeur': 'Full Stack',
            'Full Stack.': 'Developer.',
            'Bonjour, je suis Aurélien Teilhet.': 'Hello, I am Aurélien Teilhet.',
            'Développeur passionné par l\'intelligence artificielle, l\'algorithmie et la création d\'applications web.': 'Developer passionate about artificial intelligence, algorithms, and building web applications.',
            'Voir mes projets': 'View my projects',
            'Télécharger mon CV': 'Download my résumé',
            'À propos': 'About',
            'Actuellement étudiant en 2ème année de cycle ingénieur à': 'Currently a second-year engineering student at',
            '(Informatique, IA et Statistiques) et': '(Computer Science, AI, and Statistics) and a',
            'développeur Full Stack': 'Full Stack developer',
            'en alternance chez': 'apprentice at',
            'J\'aborde le développement avec un regard pragmatique : j\'aime le code propre, les architectures solides et les interfaces qui vont à l\'essentiel. L\'intelligence artificielle est pour moi un outil puissant pour repousser les limites de nos applications.': 'I take a pragmatic approach to development: I value clean code, solid architectures, and focused interfaces. Artificial intelligence is a powerful tool for extending what applications can achieve.',
            'Français': 'French',
            'Anglais (TOEIC)': 'English (TOEIC)',
            'ans': 'years',
            'd\'expérience en entreprise': 'of professional experience',
            'Double profil': 'Dual profile',
            'Ingénierie logicielle & Intelligence artificielle': 'Software engineering & artificial intelligence',
            'Expérience Professionnelle': 'Professional experience',
            'Développeur Full Stack (Alternance)': 'Full Stack Developer (Apprenticeship)',
            'Septembre 2024 - Présent': 'September 2024 – Present',
            'Développement d’interfaces utilisateurs dynamiques et réactives avec': 'Built dynamic and responsive user interfaces with',
            'Conception et implémentation d’API REST avec': 'Designed and implemented REST APIs with',
            'Optimisation des performances applicatives avec une': 'Improved application performance, achieving a',
            'réduction de 50%': '50% reduction',
            'des appels API grâce à la refonte des requêtes.': 'in API calls by redesigning queries.',
            'Réalisation de tests E2E avec': 'Created E2E tests with',
            'pour assurer la qualité des livrables.': 'to ensure deliverable quality.',
            'Traduction des': 'Translated',
            'exigences fonctionnelles': 'functional requirements',
            'en': 'into',
            'solutions techniques': 'technical solutions',
            'adaptées.': 'tailored to needs.',
            'Compétences techniques': 'Technical skills',
            'Analyse & Stat.': 'Analytics & Statistics',
            'Outils & DevOps': 'Tools & DevOps',
            'Projets récents': 'Recent projects',
            'Création d\'un jeu vidéo gérant la physique, un système avancé de détection de collisions, la gestion d\'inventaire et des intelligences artificielles (IA) ennemies basiques.': 'Built a video game featuring physics, advanced collision detection, inventory management, and basic enemy AI.',
            'Game Design': 'Game Design',
            'Plateforme interactive pour réviser la certification Azure AZ-900, développée avec Python et déployée sur Azure App Service.': 'Interactive study platform for the Azure AZ-900 certification, built with Python and deployed on Azure App Service.',
            'Contact': 'Contact',
            'Me': 'Get in',
            'contacter': 'touch',
            'Directement via les réseaux :': 'Reach out through:',
            'Ou': 'Or',
            'Nom': 'Name',
            'Message': 'Message',
            'Envoyer le message': 'Send message',
            'Envoi en cours...': 'Sending...',
            'Message envoyé avec succès !': 'Message sent successfully!',
            'Erreur lors de l\'envoi. Veuillez réessayer.': 'Something went wrong. Please try again.'
        }
    };

    const translatePage = (language) => {
        const dictionary = translations[language] || {};
        document.documentElement.lang = language;
        document.title = language === 'en' ? 'Aurélien Teilhet | Full Stack Developer' : 'Aurélien Teilhet | Développeur Full Stack';

        const cvDownload = document.getElementById('cvDownload');
        if (cvDownload) {
            cvDownload.href = language === 'en'
                ? 'https://aurxdev.github.io/cv_anglais.pdf'
                : 'https://aurxdev.github.io/cv.pdf';
        }

        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const textNodes = [];
        let node;
        while ((node = walker.nextNode())) textNodes.push(node);

        textNodes.forEach((textNode) => {
            const original = textNode.nodeValue;
            const trimmed = original.trim();
            if (!trimmed || !dictionary[trimmed]) return;
            textNode.nodeValue = original.replace(trimmed, dictionary[trimmed]);
        });

        document.querySelectorAll('.language-button').forEach((button) => {
            const isActive = button.dataset.language === language;
            button.setAttribute('aria-pressed', String(isActive));
            button.classList.toggle('bg-white', isActive);
            button.classList.toggle('text-zinc-950', isActive);
            button.classList.toggle('text-zinc-500', !isActive);
        });
    };

    const initialLanguage = localStorage.getItem('portfolio-language') || 'fr';
    translatePage(initialLanguage);

    document.querySelectorAll('.language-button').forEach((button) => {
        button.addEventListener('click', () => {
            const language = button.dataset.language;
            localStorage.setItem('portfolio-language', language);
            window.location.reload();
        });
    });

    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const originalBtnText = submitBtn.textContent;
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                _subject: `Nouveau contact Portfolio : ${document.getElementById('name').value}`
            };
            
            // Loading state
            const isEnglish = document.documentElement.lang === 'en';
            submitBtn.textContent = isEnglish ? 'Sending...' : 'Envoi en cours...';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-70', 'cursor-not-allowed');
            formStatus.classList.add('hidden');
            
            try {
                // Send to Formspree via AJAX
                const response = await fetch('https://formspree.io/f/xykvezzz', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                if (response.ok) {
                    formStatus.textContent = isEnglish ? 'Message sent successfully!' : 'Message envoyé avec succès !';
                    formStatus.className = 'text-sm text-center mt-2 text-emerald-500 block';
                    contactForm.reset();
                } else {
                    throw new Error('Erreur');
                }
            } catch (error) {
                formStatus.textContent = isEnglish ? 'Something went wrong. Please try again.' : "Erreur lors de l'envoi. Veuillez réessayer.";
                formStatus.className = 'text-sm text-center mt-2 text-red-500 block';
            }
            
            // Reset button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Scroll Animation (Fade in up)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Une fois animée, on arrête d'observer cette section
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // On applique la classe de base et on observe toutes les sections de la page
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-up');
        sectionObserver.observe(section);
    });

    // On injecte l'année en cours dans le footer
    const annee = new Date().getFullYear();
    document.getElementById("current-year").textContent = new Date().getFullYear();

    // Scrollspy (Active Navbar Links)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]:not([href="#"])'); // Exclut le bouton Logo

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${currentId}`) {
                        // Rendre le lien actif (blanc et un peu plus gras)
                        link.classList.add('text-white', 'font-semibold');
                        link.classList.remove('text-zinc-400');
                    } else {
                        // Remettre le lien inactif
                        link.classList.remove('text-white', 'font-semibold');
                        link.classList.add('text-zinc-400');
                    }
                });
            }
        });
    }, { rootMargin: '-40% 0px -60% 0px' }); // Déclenche quand la section arrive au milieu de l'écran

    sections.forEach(section => scrollSpyObserver.observe(section));

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
                backToTopBtn.classList.add('opacity-100', 'translate-y-0');
            } else {
                backToTopBtn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
                backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
