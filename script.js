    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Hamburger Menu ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Close menu when a link is clicked
        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }

// Current year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Animate elements on scroll
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        entry.target.classList.add('visible');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Add 'visible' class to trigger animation
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
    .fade-in.visible {
        animation: fadeIn 0.8s ease forwards;
    }
`;
document.head.appendChild(styleSheet);


// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Back to top button functionality
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Accordion functionality for the concepts section
document.querySelectorAll('.iam-card-header').forEach(header => {
    header.addEventListener('click', () => {
        const isExpanded = header.getAttribute('aria-expanded') === 'true';
        header.setAttribute('aria-expanded', !isExpanded);
        header.nextElementSibling.setAttribute('aria-hidden', isExpanded);
    });
});

// Expand All / Collapse All buttons
const expandAllBtn = document.getElementById('expand-all');
const collapseAllBtn = document.getElementById('collapse-all');

if (expandAllBtn && collapseAllBtn) {
    expandAllBtn.addEventListener('click', () => {
        document.querySelectorAll('.iam-card-header').forEach(header => {
            header.setAttribute('aria-expanded', 'true');
            header.nextElementSibling.setAttribute('aria-hidden', 'false');
        });
    });

    collapseAllBtn.addEventListener('click', () => {
        document.querySelectorAll('.iam-card-header').forEach(header => {
            header.setAttribute('aria-expanded', 'false');
            header.nextElementSibling.setAttribute('aria-hidden', 'true');
        });
    });
}

// Function to expand a specific card
const expandCard = (header) => {
    const isExpanded = header.getAttribute('aria-expanded') === 'true';
    if (!isExpanded) {
        header.setAttribute('aria-expanded', 'true');
        header.nextElementSibling.setAttribute('aria-hidden', 'false');
		    } else {
		header.setAttribute('aria-expanded', 'false');
        header.nextElementSibling.setAttribute('aria-hidden', 'true');	
    }
};

// Navigation sidebar link click functionality
const navLinks = document.querySelectorAll('.concepts-nav ul li a');
const iamCardHeaders = document.querySelectorAll('.iam-card-header')

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        // Scroll to the target element
        targetElement.scrollIntoView({ behavior: 'smooth' });

        // Expand the content of the selected panel
        const header = targetElement.querySelector('.iam-card-header');
        if (header) {
            expandCard(header);
        }

        // Highlight the active link
        navLinks.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

// Tab functionality inside each panel
document.querySelectorAll('.tabs').forEach(tabContainer => {
    tabContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-btn')) {
            const tabBtn = e.target;
            const tabId = tabBtn.getAttribute('data-tab');
            const tabPanel = document.getElementById(tabId);
            
            // Deactivate all sibling buttons and panels
            tabBtn.parentNode.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            tabBtn.closest('.tabs').querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));

            // Activate the clicked button and corresponding panel
            tabBtn.classList.add('active');
            if (tabPanel) {
                tabPanel.classList.add('active');
            }
        }
    });
});



// Security Tip of the Day functionality
const tips = [
    { text: "<strong>Enable Multi-Factor Authentication (MFA) on all your accounts.</strong> MFA adds an essential layer of security by requiring a second form of verification, making it much harder for unauthorized users to gain access, even if they have your password." },
    { text: "<strong>Use a unique, strong password for every account.</strong> Using the same password everywhere is a major risk. A password manager can help you create and remember complex, unique passwords." },
    { text: "<strong>Be cautious of phishing attempts.</strong> Always double-check the sender's email address and the URL of any links before clicking. Never share sensitive information in response to an unsolicited email." },
    { text: "<strong>Keep your software and operating system up to date.</strong> Software updates often include critical security patches that protect against newly discovered vulnerabilities. Enable automatic updates where possible." },
    { text: "<strong>Back up your important data regularly.</strong> In the event of a ransomware attack or hardware failure, having recent backups can save you from losing critical files and ensure business continuity." }
];

const tipContent = document.querySelector('.tip-text');
const tipToggleBtn = document.getElementById('tip-toggle-btn');
const tipCloseBtn = document.querySelector('.tip-close-btn');
const securityTipWidget = document.querySelector('.security-tip-widget');
const reactionBtns = document.querySelectorAll('.tip-reaction');

// Function to get a tip for the day
function getTipOfTheDay() {
    const today = new Date().toDateString();
    let tipIndex = localStorage.getItem('dailyTipIndex');
    let lastViewDate = localStorage.getItem('lastViewDate');

    if (lastViewDate !== today) {
        // It's a new day, pick a new random tip
        tipIndex = Math.floor(Math.random() * tips.length);
        localStorage.setItem('dailyTipIndex', tipIndex);
        localStorage.setItem('lastViewDate', today);
        // Reset counts for the new tip
        localStorage.setItem('tipReactions', JSON.stringify({ like: 0, dislike: 0 }));
    } else {
        tipIndex = parseInt(tipIndex);
    }

    tipContent.innerHTML = tips[tipIndex].text;
}

// Function to update the displayed counts
function updateReactionCounts() {
    const reactions = JSON.parse(localStorage.getItem('tipReactions')) || { like: 0 };
    document.querySelector('[data-reaction="like"]').innerHTML = `<i class="fas fa-thumbs-up"></i> <span class="reaction-count">${reactions.like}</span>`;
}


// Function to open the tip box
function openTipBox() {
    securityTipWidget.classList.add('expanded');
    tipToggleBtn.style.display = 'none'; // Hide the button when expanded
}

// Function to close the tip box
function closeTipBox() {
    securityTipWidget.classList.remove('expanded');
    tipToggleBtn.style.display = 'flex'; // Show the button when collapsed
}

// Event listeners
if (tipToggleBtn) {
    tipToggleBtn.addEventListener('click', openTipBox);
}

if (tipCloseBtn) {
    tipCloseBtn.addEventListener('click', closeTipBox);
}

reactionBtns.forEach(reactionBtn => {
    reactionBtn.addEventListener('click', () => {
        let reactions = JSON.parse(localStorage.getItem('tipReactions')) || { like: 0, dislike: 0 };
        const reactionType = reactionBtn.getAttribute('data-reaction');
        reactions[reactionType] += 1;
        localStorage.setItem('tipReactions', JSON.stringify(reactions));
        updateReactionCounts();
    });
});

// Load the tip and counts on page load
document.addEventListener('DOMContentLoaded', () => {
    getTipOfTheDay();
    updateReactionCounts();
});

// Navigation buttons smooth animation
document.querySelectorAll('.page-nav-button').forEach(button => {
    button.addEventListener('click', (e) => {

        // Add the animation class
        button.classList.add('clicked');

        // Remove the class after the animation is complete
        button.addEventListener('animationend', () => {
            button.classList.remove('clicked');
        }, { once: true });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.toggle-features');

    toggleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            // Find the parent card body
            const cardBody = button.closest('.card-body');
            // Select all hidden features within that card body
            const features = cardBody.querySelectorAll('.feature-hidden');

            // Toggle visibility for each hidden feature and the button text
            const isExpanded = button.classList.contains('is-expanded');

            features.forEach(feature => {
                // Toggle the 'is-expanded' class, which CSS uses to set display: list-item
                feature.classList.toggle('is-expanded');
            });

            // Update the button text and class
            if (isExpanded) {
                button.innerHTML = '+ Add-ons*';
                button.classList.remove('is-expanded');
            } else {
                button.innerHTML = '– Add-ons*';
                button.classList.add('is-expanded');
            }
        });
    });

});

// New Feature Elaboration Toggle functionality (non-intrusive details)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.feature-has-detail').forEach(listItem => {
        // Elements to interact with
        const mainLine = listItem.querySelector('.feature-main-line');
        const toggleIcon = listItem.querySelector('.detail-toggle-icon');
        const elaboration = listItem.querySelector('.feature-elaboration');

        // Add click event listener to the main line to toggle the detail
        if (mainLine) {
            mainLine.addEventListener('click', (e) => {
                // Prevent default action and stop propagation if nested in complex elements
                e.preventDefault();
                e.stopPropagation();

                const isExpanded = toggleIcon.getAttribute('aria-expanded') === 'true';
                
                // Toggle the classes and attributes
                if (isExpanded) {
                    elaboration.classList.add('is-hidden');
                    toggleIcon.setAttribute('aria-expanded', 'false');
                } else {
                    elaboration.classList.remove('is-hidden');
                    toggleIcon.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });
});

// Search functionality for the concepts section
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('concept-search');
    const cards = document.querySelectorAll('.iam-cards');
    const navLinks = document.querySelectorAll('.concepts-nav ul li');

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.trim().toLowerCase();

            // 1. Filter the concept cards
            cards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                const isMatch = cardText.includes(query);
                card.hidden = !isMatch;
            });

            // 2. Filter the navigation links
            navLinks.forEach(linkListItem => {
                const link = linkListItem.querySelector('a');
                const targetId = link.getAttribute('href').substring(1);
                const targetCard = document.getElementById(targetId);

                // Hide the nav item if its corresponding card is hidden
                if (targetCard) {
                    linkListItem.style.display = targetCard.hidden ? 'none' : '';
                }
            });
        });
    }
});