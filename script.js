document.addEventListener('DOMContentLoaded', () => {
    // Les clés sont les textes français exacts de index.html (un nœud texte = une clé).
    const translations = {
        en: {
            'À propos': 'About',
            'Expérience': 'Experience',
            'Compétences': 'Skills',
            'Projets': 'Projects',
            'Développeur full stack · étudiant ingénieur': 'Full stack developer · engineering student',
            'Salut, moi c\'est Aurélien.': 'Hi, I\'m Aurélien.',
            'Je développe des applications web en Angular et C#/.NET chez Pragmatism IT, en alternance avec mon cycle ingénieur à Polytech Lille.': 'I build web applications with Angular and C#/.NET at Pragmatism IT, as an apprentice alongside my engineering degree at Polytech Lille.',
            'À côté, je code des jeux et je résous des puzzles d\'algo sur': 'On the side, I make games and solve algorithm puzzles on',
            'Mon CV (PDF)': 'My résumé (PDF)',
            'Me contacter': 'Get in touch',
            'École': 'School',
            '2e année du cycle ingénieur à Polytech Lille, spécialité Informatique, IA et Statistiques.': 'Second year of the engineering program at Polytech Lille, majoring in Computer Science, AI and Statistics.',
            'Travail': 'Work',
            'Développeur full stack en alternance chez Pragmatism IT depuis septembre 2024.': 'Full stack developer apprentice at Pragmatism IT since September 2024.',
            'Langues': 'Languages',
            'Français, anglais (TOEIC 875).': 'French, English (TOEIC 875).',
            'Ailleurs': 'Elsewhere',
            'La marche en nature, surtout en montagne, et les Lego.': 'Hiking, especially in the mountains, and building Lego.',
            'À l\'école j\'apprends l\'IA et les statistiques, en entreprise je fais du développement web. Ce qui m\'intéresse, c\'est l\'endroit où les deux se rejoignent : des applications qui se servent de modèles là où ils apportent vraiment quelque chose.': 'At school I study AI and statistics; at work I do web development. What interests me is where the two meet: applications that use models where they genuinely add something.',
            'sept. 2024 – aujourd\'hui': 'Sept. 2024 – present',
            'Développeur full stack (alternance), Pragmatism IT': 'Full stack developer (apprenticeship), Pragmatism IT',
            'Je développe les interfaces en Angular 18 et les API REST en NestJS et en C#/.NET.': 'I build the front end in Angular 18 and the REST APIs in NestJS and C#/.NET.',
            'J\'ai réécrit une partie des requêtes, ce qui a': 'I rewrote part of the queries, which',
            'divisé par deux': 'halved',
            'le nombre d\'appels API.': 'the number of API calls.',
            'J\'écris les tests end-to-end avec Cypress.': 'I write the end-to-end tests with Cypress.',
            'Je pars des besoins fonctionnels pour arriver à une solution technique, puis je l\'implémente.': 'I take functional requirements, turn them into a technical solution, then implement it.',
            'IA & data': 'AI & data',
            'Python, statistiques, analyse de données': 'Python, statistics, data analysis',
            'Outils': 'Tools',
            'Capture d\'écran de HGPTE Engine': 'Screenshot of HGPTE Engine',
            'Survolez l\'image pour voir le jeu en mouvement.': 'Hover over the image to see the game in motion.',
            'Un jeu en C# avec Unity : physique, détection de collisions, inventaire et ennemis pilotés par une IA simple.': 'A game in C# with Unity: physics, collision detection, inventory, and enemies driven by a simple AI.',
            'Le reste de mon code est sur': 'The rest of my code is on',
            'Une question, une opportunité ? Le formulaire m\'envoie directement un mail. Je suis aussi sur': 'A question or an opportunity? The form sends me an email directly. I\'m also on',
            'Nom': 'Name',
            'Envoyer': 'Send',
            'Code source du site': 'Site source code'
        }
    };

    // Textes français d'origine, pour pouvoir revenir au français sans recharger.
    const originalText = new Map();
    const originalAlt = new Map();

    const translate = (dictionary, text) => {
        const trimmed = text.trim();
        return trimmed && dictionary[trimmed] ? text.replace(trimmed, dictionary[trimmed]) : text;
    };

    const translatePage = (language) => {
        const dictionary = translations[language] || {};
        document.documentElement.lang = language;
        document.title = language === 'en'
            ? 'Aurélien Teilhet, full stack developer'
            : 'Aurélien Teilhet, développeur full stack';

        const cvDownload = document.getElementById('cvDownload');
        if (cvDownload) cvDownload.href = language === 'en' ? 'cv_anglais.pdf' : 'cv.pdf';

        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            if (!originalText.has(node)) originalText.set(node, node.nodeValue);
            node.nodeValue = translate(dictionary, originalText.get(node));
        }

        document.querySelectorAll('img[alt]').forEach((img) => {
            if (!originalAlt.has(img)) originalAlt.set(img, img.alt);
            img.alt = translate(dictionary, originalAlt.get(img));
        });

        document.querySelectorAll('.language-button').forEach((button) => {
            button.setAttribute('aria-pressed', String(button.dataset.language === language));
        });
    };

    const readLanguage = () => {
        try { return localStorage.getItem('portfolio-language') || 'fr'; } catch { return 'fr'; }
    };

    translatePage(readLanguage());

    document.querySelectorAll('.language-button').forEach((button) => {
        button.addEventListener('click', () => {
            const language = button.dataset.language;
            try { localStorage.setItem('portfolio-language', language); } catch { /* navigation privée */ }
            translatePage(language);
        });
    });

    // Formulaire de contact (Formspree)
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const isEnglish = document.documentElement.lang === 'en';
            const originalBtnText = submitBtn.textContent;
            const name = document.getElementById('name').value;

            submitBtn.textContent = isEnglish ? 'Sending...' : 'Envoi en cours...';
            submitBtn.disabled = true;
            formStatus.hidden = true;

            try {
                const response = await fetch('https://formspree.io/f/xykvezzz', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email: document.getElementById('email').value,
                        message: document.getElementById('message').value,
                        _subject: `Nouveau contact Portfolio : ${name}`
                    })
                });

                if (!response.ok) throw new Error(`Formspree: ${response.status}`);

                formStatus.textContent = isEnglish ? 'Message sent, thanks! I\'ll get back to you soon.' : 'Message envoyé, merci ! Je vous réponds rapidement.';
                formStatus.className = 'form-status ok';
                contactForm.reset();
            } catch (error) {
                formStatus.textContent = isEnglish
                    ? 'The message could not be sent. Try again, or reach me on LinkedIn.'
                    : 'Le message n\'est pas parti. Réessayez, ou écrivez-moi sur LinkedIn.';
                formStatus.className = 'form-status error';
            }

            formStatus.hidden = false;
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
    }

    // GIF du projet : chargé seulement au premier survol (il pèse ~7 Mo)
    document.querySelectorAll('[data-gif]').forEach((media) => {
        const gif = media.querySelector('.project-gif');
        const load = () => { if (gif && !gif.src) gif.src = media.dataset.gif; };
        media.addEventListener('mouseenter', load, { once: true });
        media.addEventListener('focus', load, { once: true });
    });

    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Lien actif dans la navigation
    const navLinks = document.querySelectorAll('.site-nav a');
    const scrollSpy = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((link) => {
                link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: '-40% 0px -60% 0px' });

    document.querySelectorAll('section[id]').forEach((section) => scrollSpy.observe(section));
});
