document.addEventListener('DOMContentLoaded', () => {
    // Le français est dans index.html ; chaque élément à traduire porte une clé data-i18n.
    const translations = {
        en: {
            'nav.about': 'About',
            'nav.experience': 'Experience',
            'nav.skills': 'Skills',
            'nav.projects': 'Projects',
            'intro.meta': 'Full stack developer · engineering student',
            'intro.title': 'Hi, I\'m Aurélien.',
            'intro.lede': 'I build web applications with Angular and C#/.NET at Pragmatism IT, as an apprentice alongside my engineering degree at Polytech Lille.',
            'intro.side': 'On the side, I make games and solve algorithm puzzles on',
            'intro.cv': 'My résumé (PDF)',
            'intro.contact': 'Get in touch',
            'about.school': 'School',
            'about.schoolText': 'Engineering degree at Polytech Lille, majoring in Computer Science, AI and Statistics, graduating in 2027.',
            'about.work': 'Work',
            'about.workText': 'Full stack developer apprentice at Pragmatism IT since September 2024.',
            'about.languages': 'Languages',
            'about.languagesText': 'French, English (TOEIC 875).',
            'about.elsewhere': 'Elsewhere',
            'about.elsewhereText': 'Hiking, especially in the mountains, and building Lego.',
            'about.text': 'At school I study AI and statistics; at work I do web development. What interests me is where the two meet: applications that use models where they genuinely add something.',
            'pragmatism.dates': 'Sept. 2024 – present',
            'pragmatism.title': 'Full stack developer (apprenticeship), Pragmatism IT',
            'pragmatism.stack': 'I build the front end in Angular 18 and the REST APIs in NestJS and C#/.NET.',
            'pragmatism.queries': 'I rewrote part of the queries, which <strong>halved</strong> the number of API calls.',
            'pragmatism.tests': 'I write the end-to-end tests with Cypress.',
            'pragmatism.specs': 'I take functional requirements, turn them into a technical solution, then implement it.',
            'alloa.dates': 'Mar. – July 2024',
            'alloa.title': 'Python and Go developer (internship), Alloa Voyages',
            'alloa.go': 'I built internal software in Go, with gRPC.',
            'alloa.django': 'I built user interfaces for the website and their back-end integrations, in Django.',
            'skills.data': 'AI &amp; data',
            'skills.dataList': 'Python, statistics, data analysis',
            'skills.tools': 'Tools',
            'projects.hgpte': 'A game in C# with Unity: physics, collision detection, inventory, and enemies driven by a simple AI.',
            'projects.more': 'The rest of my code is on',
            'contact.text': 'A question or an opportunity? The form sends me an email directly. I\'m also on',
            'contact.name': 'Name',
            'contact.send': 'Send',
            'footer.source': 'Site source code'
        }
    };

    const i18nElements = document.querySelectorAll('[data-i18n]');
    // Contenu français d'origine, pour pouvoir revenir au français sans recharger.
    const originalHtml = new Map([...i18nElements].map((element) => [element, element.innerHTML]));

    const translatePage = (language) => {
        const dictionary = translations[language];
        document.documentElement.lang = language;
        document.title = language === 'en'
            ? 'Aurélien Teilhet, full stack developer'
            : 'Aurélien Teilhet, développeur full stack';

        const cvDownload = document.getElementById('cvDownload');
        if (cvDownload) cvDownload.href = language === 'en' ? 'cv_en.pdf' : 'cv_fr.pdf';

        i18nElements.forEach((element) => {
            const key = element.dataset.i18n;
            if (dictionary && !(key in dictionary)) console.warn(`Traduction manquante (${language}) : ${key}`);
            element.innerHTML = dictionary?.[key] ?? originalHtml.get(element);
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

    // Formulaire de contact (Formspree). Sans JS, le formulaire poste directement sur l'action.
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const isEnglish = document.documentElement.lang === 'en';
            const originalBtnText = submitBtn.textContent;
            const data = Object.fromEntries(new FormData(contactForm));
            data._subject = `Nouveau contact Portfolio : ${data.name}`;

            submitBtn.textContent = isEnglish ? 'Sending...' : 'Envoi en cours...';
            submitBtn.disabled = true;
            formStatus.hidden = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
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

    // Vidéo du projet : chargée et lancée seulement quand elle est à l'écran.
    // Avec « réduire les animations », on reste sur l'écran titre (le poster).
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(({ target, isIntersecting }) => {
                // play() est refusé en mode économie d'énergie sur iOS : le poster reste affiché
                if (isIntersecting) target.play().catch(() => {});
                else target.pause();
            });
        });
        document.querySelectorAll('.project-media video').forEach((video) => videoObserver.observe(video));
    }

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
