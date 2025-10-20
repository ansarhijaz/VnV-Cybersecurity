	const formLoadTime = Date.now();

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


// --- Contact Form Logic ---

// Add this CSS to hide the honeypot field.
const honeypotStyles = document.createElement('style');
honeypotStyles.innerHTML = `.required-frm-field { display: none; }`;
document.head.appendChild(honeypotStyles);

const contactForm = document.getElementById('contact-form');
const planSelect = document.getElementById('plan');
const servicesWrapper = document.getElementById('services-wrapper');
const servicesContainer = document.getElementById('services-container');

// Logic for dynamic service fields based on plan selection
if (planSelect && servicesWrapper && servicesContainer) {
    const servicesData = {
        "Governance services": ["Cybersecurity Strategy services", "Legal & Regulatory Compliance services", "Policies, Standards, and Procedures services", "Risk & Control Management services"],
        "Implementation services": ["Control Automation/ Application Advisory services", "Control Implementation services"],
        "Measurement services": ["Benchmarking services", "Key Performance Indicators (KPIs) & Key Risk Indicators (KRIs) services", "Maturity Model Assessment services", "Reporting & Dashboards services"],
        "Testing services": ["Audit/ Independent Assessment services", "External Audits & Certifications services", "Penetration Testing & Red Teaming services", "Three Lines of Defense services"],
        "Training services": ["Security Awareness & Training Strategy services", "Security Culture Assessment services"]
    };

    const populateServicesList = () => {
        servicesContainer.innerHTML = ''; // Clear previous content
        let allServicesHtml = '';
        for (const group in servicesData) {
            allServicesHtml += `<div class="checkbox-group-header">${group}</div>`;
            servicesData[group].forEach(service => {
                const serviceId = `service-${service.replace(/[\s&/]+/g, '-')}`;
                allServicesHtml += `
                    <div class="checkbox-item">
                        <input type="checkbox" id="${serviceId}" name="services" value="${service}" class="service-checkbox">
                        <label for="${serviceId}">${service}</label>
                    </div>`;
            });
        }
        servicesContainer.innerHTML = allServicesHtml;
    };

    planSelect.addEventListener('change', () => {
        if (planSelect.value === 'A la carte') {
            populateServicesList();
            servicesWrapper.style.display = 'block';
        } else {
            servicesWrapper.style.display = 'none';
            servicesContainer.innerHTML = '';
        }
    });
}


// Form submission rate limiting
const SUBMISSION_LIMIT = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function getSubmissionCount() {
    const submissions = JSON.parse(sessionStorage.getItem('formSubmissions') || '[]');
    const now = Date.now();
    // Filter submissions within the last hour
    const recentSubmissions = submissions.filter(time => now - time < RATE_LIMIT_WINDOW);
    sessionStorage.setItem('formSubmissions', JSON.stringify(recentSubmissions));
    return recentSubmissions.length;
}

function recordSubmission() {
    const submissions = JSON.parse(sessionStorage.getItem('formSubmissions') || '[]');
    submissions.push(Date.now());
    sessionStorage.setItem('formSubmissions', JSON.stringify(submissions));
}

// Validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    // Accepts various phone formats: (123) 456-7890, 123-456-7890, 1234567890, +91 1234567890, etc.
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,6}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function validateName(name) {
    return name.trim().length >= 4;
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearError(fieldId) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

// Get device type
function getDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
        return 'Tablet';
    }
    if (/mobile|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
        return 'Mobile';
    }
    return 'Desktop';
}

// Get approximate geolocation (country/region)
async function getGeoLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return `${data.city}, ${data.region}, ${data.country_name}`;
    } catch (error) {
        console.error('Geolocation error:', error);
        return 'Unknown';
    }
}

	// Contact form submission handler
	if (contactForm) {
		// Real-time validation
		const nameField = document.getElementById('name');
		const emailField = document.getElementById('email');
		const phoneField = document.getElementById('phone');
		const consentCheckbox = document.getElementById('consent_marketing');

		if (nameField) {
			nameField.addEventListener('blur', () => {
				if (!validateName(nameField.value)) {
					showError('name', 'Please enter a valid name');
				} else {
					clearError('name');
				}
			});
		}

		if (emailField) {
			emailField.addEventListener('blur', () => {
				if (!validateEmail(emailField.value)) {
					showError('email', 'Please enter a valid email address');
				} else {
					clearError('email');
				}
			});
		}

		if (phoneField) {
			phoneField.addEventListener('blur', () => {
				if (!validatePhone(phoneField.value)) {
					showError('phone', 'Please enter a valid phone number');
				} else {
					clearError('phone');
				}
			});
		}

		contactForm.addEventListener('submit', async (e) => {
			e.preventDefault();

			// Clear all previous errors
			['name', 'email', 'phone', 'consent'].forEach(field => clearError(field));

			// Check rate limiting
			if (getSubmissionCount() >= SUBMISSION_LIMIT) {
				document.getElementById('form-status').innerHTML = 
					'<p style="color: #e74c3c; margin-top: 1rem;">You have reached the submission limit. Please try again later.</p>';
				return;
			}

			// Get form values
			const name = document.getElementById('name').value.trim();
			const email = document.getElementById('email').value.trim();
			const phone = document.getElementById('phone').value.trim();
			const plan = document.getElementById('plan').value;
			const message = document.getElementById('message').value.trim();
			const comments = document.getElementById('comments').value; // Honeypot
			const consentMarketing = document.getElementById('consent_marketing').checked;

			// Honeypot check - if filled, it's a bot
			if (comments) {
				console.log('Bot detected via honeypot');
				window.location.reload();
				return;
			}

			// Validate mandatory fields
			let hasError = false;

			if (!validateName(name)) {
				showError('name', 'Please enter a valid name');
				hasError = true;
			}

			if (!validateEmail(email)) {
				showError('email', 'Please enter a valid email address');
				hasError = true;
			}

			if (!validatePhone(phone)) {
				showError('phone', 'Please enter a valid phone number');
				hasError = true;
			}

			if (!plan) {
				document.getElementById('form-status').innerHTML = 
					'<p style="color: #e74c3c; margin-top: 1rem;">Please select a plan</p>';
				hasError = true;
			}

			if (!consentMarketing) {
				showError('consent', 'You must agree to the terms and consent to marketing communications');
				hasError = true;
			}

			if (hasError) {
				return;
			}

			// Get selected services (if any)
			const selectedServices = [];
			if (plan === 'A la carte') {
				document.querySelectorAll('.service-checkbox:checked').forEach(checkbox => {
					selectedServices.push(checkbox.value);
				});
			}

			// Get hidden field values
			const geoLocation = await getGeoLocation();
			const deviceType = getDeviceType();
			const submitTime = Math.floor((Date.now() - formLoadTime) / 1000); // Time in seconds
			const referrerUrl = document.referrer || 'Direct';

			// Check Turnstile captcha
			const turnstileResponse = document.querySelector('[name="cf-turnstile-response"]');
			const captchaPass = turnstileResponse && turnstileResponse.value ? 'Yes' : 'No';

			// Prepare form data
			const formData = {
				timestamp: new Date().toISOString(),
				submission_id: `SUB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
				form_version: '1.0',
				source_page: window.location.href,
				name: name,
				email: email,
				phone: phone,
				plan: plan,
				services: selectedServices.join(', '),
				message: message,
				comments: '', // Always empty for legitimate users
				consent_marketing: consentMarketing ? 'Yes' : 'No',
				referrer_url: referrerUrl,
				geo_location: geoLocation,
				device_type: deviceType,
				submit_time: submitTime,
				captcha_pass: captchaPass
			};

			// Show loading state
			const submitButton = contactForm.querySelector('button[type="submit"]');
			const originalButtonText = submitButton.textContent;
			submitButton.textContent = 'Sending...';
			submitButton.disabled = true;

			try {
				// Google Apps Script web app URL
				const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx5ILur1CziDLJfXEAQc8114K7d_Ap5S2DVGy6bFd6GdYgrvNf7Rs0yJq_qzRMeGlRFCg/exec';
				
				// Convert formData to URL parameters for better compatibility
				const params = new URLSearchParams();
				for (const key in formData) {
					params.append(key, formData[key]);
				}
				
				const response = await fetch(SCRIPT_URL + '?' + params.toString(), {
					method: 'POST',
					redirect: 'follow'
				});

				// Record successful submission
				recordSubmission();

				// Show success message
				document.getElementById('form-status').innerHTML = 
					'<p style="color: #27ae60; margin-top: 1rem; font-weight: 500;">✓ Thank you! Your message has been sent successfully. We\'ll get back to you soon.</p>';
				
				// Reset form
				contactForm.reset();
				
				// Hide services wrapper if visible
				if (servicesWrapper) {
					servicesWrapper.style.display = 'none';
				}

			} catch (error) {
				console.error('Form submission error:', error);
				document.getElementById('form-status').innerHTML = 
					'<p style="color: #e74c3c; margin-top: 1rem;">An error occurred. Please try again later or contact us directly on phone.</p>';
			} finally {
				// Restore button state
				submitButton.textContent = originalButtonText;
				submitButton.disabled = false;
			}
		});
	}



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

    // --- Security Tip Widget ---
    const tipToggleButton = document.getElementById('tip-toggle-btn');
    const tipContentBox = document.getElementById('tip-content-box');
    const tipCloseButton = document.querySelector('.tip-close-btn');
    if (tipToggleButton && tipContentBox && tipCloseButton) {
        tipToggleButton.addEventListener('click', () => tipContentBox.classList.toggle('show'));
        tipCloseButton.addEventListener('click', () => tipContentBox.classList.remove('show'));
        document.addEventListener('click', (event) => {
            if (!tipContentBox.contains(event.target) && !tipToggleButton.contains(event.target)) {
                tipContentBox.classList.remove('show');
            }
        });
    }


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

reactionBtns.forEach(reactionBtn => {
    reactionBtn.addEventListener('click', () => {
        let reactions = JSON.parse(localStorage.getItem('tipReactions')) || { like: 0};
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

	// Feature Elaboration Toggle functionality (non-intrusive details)
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

