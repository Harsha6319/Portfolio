document.addEventListener("DOMContentLoaded", () => {
    // 1. Intersection Observer for robust scroll animations exactly like Framer
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-card, .animate-scale');
    animatedElements.forEach(el => scrollObserver.observe(el));

    // Animate navbar specifically after load
    setTimeout(() => {
        const nav = document.querySelector('.navbar');
        if (nav) nav.style.opacity = '1';
    }, 100);

    // 2. Dynamic Typing text cycling
    if (!document.getElementById('cursor-style')) {
        const style = document.createElement('style');
        style.id = 'cursor-style';
        style.innerHTML = `@keyframes blink { 50% { border-color: transparent; } }`;
        document.head.appendChild(style);
    }

    const roles = [
        "Software Developer.",
        "Front-End Engineer.",
        "Creative Coder.",
        "UI & UX Enthusiast.",
        "Problem Solver."
    ];

    const titleElement = document.querySelector('.dynamic-title');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function type() {
        if (!titleElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            titleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 40; // faster when deleting
        } else {
            titleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 80; // normal typing speed
        }

        // Next word logic
        if (!isDeleting && charIndex === currentRole.length) {
            // Finished typing the whole word, pause then delete
            typingDelay = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next word
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingDelay = 500;
        }

        setTimeout(type, typingDelay);
    }

    // Start the dynamic title typing loop after header reveals
    setTimeout(type, 1200);

    // 3. Scroll Spy for Navbar Active Links
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to corresponding link
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, {
        root: null,
        rootMargin: "-30% 0px -60% 0px", // Triggers when section passes the top-middle third of screen
        threshold: 0
    });

    sections.forEach(sec => scrollSpyObserver.observe(sec));

    // 4. Add pulse animation to Contact button after initial load sequence
    setTimeout(() => {
        const contactBtn = document.querySelector('.btn-primary[href="#contacts"]');
        if (contactBtn) {
            contactBtn.classList.remove('text-reveal');
            contactBtn.style.opacity = '1';
            contactBtn.style.transform = 'translateY(0)';
            contactBtn.classList.add('pulse-anim');
        }
    }, 2800);

    // 5. Custom Loading Bar Animation on Project Card clicks with unique colors
    const projectLinks = document.querySelectorAll('.project-info .btn-outline');
    const cardColors = ['#C778DD', '#00A651', '#E5C07B', '#61AFEF']; // Unique loader colors
    
    projectLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetHref = link.getAttribute('href');
            
            let loader = document.getElementById('page-loader');
            if (!loader) {
                loader = document.createElement('div');
                loader.id = 'page-loader';
                document.body.appendChild(loader);
            }
            
            // Set assigned unique color for the specific card based on its index
            const barColor = cardColors[index % cardColors.length];
            loader.style.backgroundColor = barColor;
            loader.style.boxShadow = `0 0 10px ${barColor}, 0 0 20px ${barColor}`;
            loader.style.opacity = '1';
            loader.style.width = '0%';
            
            // Start staggered loading animation logic
            setTimeout(() => { loader.style.width = '30%'; }, 50);
            setTimeout(() => { loader.style.width = '75%'; }, 400);
            
            setTimeout(() => { 
                loader.style.width = '100%'; 
                // Fake redirect phase (waits for full bar then 'redirects')
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => { loader.style.width = '0%'; }, 300);
                    // Safe external linking logic
                    if (targetHref && targetHref !== '#') {
                        if (link.getAttribute('target') === '_blank') {
                            window.open(targetHref, '_blank');
                        } else {
                            window.location.href = targetHref;
                        }
                    }
                }, 300);
            }, 800);
        });
    });
});

// Random Tech Quotes Logic
const techQuotes = [
    { text: "With great power comes great electricity bill", author: "Dr. Who" },
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
    { text: "Any fool can write code a computer can understand. Good programmers write code humans can understand.", author: "Martin Fowler" },
    { text: "Java is to JavaScript what car is to Carpet.", author: "Chris Heilmann" }
];

document.addEventListener('DOMContentLoaded', () => {
    const randomQuote = techQuotes[Math.floor(Math.random() * techQuotes.length)];
    const quoteText = document.getElementById('dynamic-quote');
    const quoteAuthor = document.getElementById('dynamic-quote-author');
    
    if (quoteText && quoteAuthor) {
        quoteText.textContent = randomQuote.text;
        quoteAuthor.textContent = "- " + randomQuote.author;
    }
});
