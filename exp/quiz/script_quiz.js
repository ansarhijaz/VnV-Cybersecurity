// Data for the quiz questions
const questionsData = [
    { id: 'Q1', level: 'Level 1', text: 'Does your leadership team have a cybersecurity strategy & roadmap that aligns to your business goals?', options: ['Yes', 'No', "Don't know"], type: 'single' },
    { id: 'Q1.1', level: 'Level 2', text: 'Does your business have an executive leadership team dedicated to cybersecurity & data privacy (like CISO, CIO, CDO, CPO, etc.)?', options: ['Yes', 'No', "Don't know"], type: 'single' },
    { id: 'Q1.2', level: 'Level 2', text: 'Does your organization have formal plans to mature their cybersecurity posture commensurate to business growth?', options: ['Yes', 'No', "Don't know"], type: 'single' },
    { id: 'Q1.3', level: 'Level 2', text: 'Does your organization allocate a dedicated budget for cybersecurity initiatives?', options: ['Yes', 'No', "Don't know"], type: 'single' },
    { id: 'Q2', level: 'Level 1', text: 'Has your organization ever been affected by a major cybersecurity incident (hacking, data leak, system compromise, insider threat, etc.)?', options: ['Yes', 'No', "Don't know"], type: 'single' },
    { id: 'Q2.1', level: 'Level 2', text: 'How quickly were you able to recover critical systems and affected processes?', options: ['Within hours', 'Within a day', 'Within a week', "Don't know"], type: 'single' },
    { id: 'Q3', level: 'Level 1', text: 'How would you rate the cybersecurity culture at your organization?', options: ['Highly organized & mature', 'Some functions are mature, other are growing in maturity', 'Informal guidelines only', 'Non-existent'], type: 'single' },
    { id: 'Q4', level: 'Level 1', text: 'How often does your workforce receive cybersecurity, IT risk, and data privacy training?', options: ['At least once a year with periodic refresher courses', 'Occasionally, but not consistently', 'Only for IT staff', 'Never'], type: 'single' },
    { id: 'Q4.1', level: 'Level 2', text: 'How do you measure the effectiveness of cybersecurity trainings?', options: ['Operational metrics (e.g., phishing click-through rates)', 'Quiz scores and feedback surveys', 'Completion rates', 'No metrics collected'], type: 'single' },
    { id: 'Q4.2', level: 'Level 2', text: 'Does your organization simulate phishing exercises to raise cybersecurity awareness?', options: ['Yes', 'No', "Don't know"], type: 'single' },
    { id: 'Q4.3', level: 'Level 2', text: 'What percentage of your workforce is given process-level and role-based training?', options: ['76-100%', '51-75%', '26-50%', '0-25%'], type: 'single' },
    { id: 'Q5', level: 'Level 1', text: 'How often do you conduct cybersecurity risk assessments?', options: ['Continuously', 'Annually', 'Ad-hoc', 'Never'], type: 'single' },
    { id: 'Q5.1', level: 'Level 2', text: 'Does your organization maintain a list of IT risks with owners, controls, and issues?', options: ['Yes', 'No', "Don't know"], type: 'single' },
    { id: 'Q6', level: 'Level 1', text: 'Does your organization have formal IT policies and procedures?', options: ['Yes', 'No', 'Informal/ Verbal guidelines only'], type: 'single' },
    { id: 'Q6.1', level: 'Level 2', text: 'Do your IT policies and procedures address: management intent, roles & responsibilities, measurement criteria, and exceptions?', options: ['Advanced coverage', 'Intermediate coverage', 'Limited coverage', 'No'], type: 'single' },
    {
        id: 'Q6.2', level: 'Level 2', text: 'How many of the following control domains do your IT policies and procedures cover?', type: 'multi', subOptions: [
            'Identity & Access Management',
            'IT Asset & Configuration Management',
            'IT Risk Management',
            'Data Protection & Endpoint Security',
            'Cloud, Email & Web Security',
            'Network & Cryptography Management',
            'Change & Release Management',
            'Vulnerability & Patch Management',
            'System Acquisition & Software Development Lifecycle (SDLC)',
            'Issue, Problem, and Incident Response Management',
            'Artificial Intelligence (AI) and Autonomous Technologies Management',
            'Backup Management, Disaster Recovery, and Contingency Planning',
            'Physical & Environmental Security',
            'Third-Party Risk Management (TPRM)',
            'Data Governance & Data Privacy'
        ]
    },
    { id: 'Q6.3', level: 'Level 2', text: 'Are your IT polices & procedures mapped to your risk & control framework?', options: ['Yes', 'No', 'We do not have a risk & controls framework'], type: 'single' },
    { id: 'Q6.4', 'Level 2': 'Level 2', text: 'Does your organization maintain a robust RACI (Responsible, Accountable, Consulted, Informed) matrix for IT processes?', options: ['Yes', 'No', "Don't know"], type: 'single' },
    { id: 'Q6.5', level: 'Level 2', text: 'How often are your IT polices reviewed and updated?', options: ['Annually', 'As needed', 'Never'], type: 'single' },
    { id: 'Q7', level: 'Level 1', text: 'Do you have controls in place to monitor, detect, prevent, and respond to common cybersecurity attacks (DDoS, phishing, malware, ransomware, etc.)?', options: ['Yes', 'Yes - some controls', 'No', "Don't know"], type: 'single' },
    { id: 'Q7.1', level: 'Level 2', text: 'Does your organization leverage cybersecurity frameworks (such as NIST CSF, COBIT, ISO 27001, etc.) to implement controls?', options: ['Yes', 'No', "Don't know"], type: 'single' },
    {
        id: 'Q7.2', level: 'Level 2', text: 'How many of the following control domains do your standards & baselines cover?', type: 'multi', subOptions: [
            'Identity & Access Management',
            'IT Asset & Configuration Management',
            'IT Risk Management',
            'Data Protection & Endpoint Security',
            'Cloud, Email & Web Security',
            'Network & Cryptography Management',
            'Change & Release Management',
            'Vulnerability & Patch Management',
            'System Acquisition & Software Development Lifecycle (SDLC)',
            'Issue, Problem, and Incident Response Management',
            'Artificial Intelligence (AI) and Autonomous Technologies Management',
            'Backup Management, Disaster Recovery, and Contingency Planning',
            'Physical & Environmental Security',
            'Third-Party Risk Management (TPRM)',
            'Data Governance & Data Privacy'
        ]
    },
    { id: 'Q7.3', level: 'Level 2', text: 'What percentage of your IT processes & controls are measured and reported to leadership?', options: ['76-100%', '51-75%', '26-50%', '0-25%'], type: 'single' },
    { id: 'Q8', level: 'Level 1', text: 'Do you have an inventory of all hardware and software used by your business? Do you classify IT assets and data based on criticality?', options: ['Yes', 'No', "Don't know"], type: 'single' },
    { id: 'Q8.1', level: 'Level 1', text: 'Does your organization leverage best-practice standards and create security baselines for IT resources?', options: ['Yes', 'No', "Don't know"], type: 'single' },
    { id: 'Q9', level: 'Level 1', text: 'Does your organization store, process, or transmit - personal/ confidential data like identification documents, financial statements, personally identifiable information, etc.?', options: ['Yes', 'No', "Don't know"], type: 'single' },
    { id: 'Q9.1', level: 'Level 2', text: 'Does your organization track compliance with legal & regulatory requirements of data privacy?', options: ['Yes', 'No', "Don't know"], type: 'single' },
    { id: 'Q10', level: 'Level 1', text: 'Does your organization regulate/ monitor the use of personal devices, personal cloud, WhatsApp, AI chatbots, etc.?', options: ['Yes', 'No', "Don't know"], type: 'single' },
    { id: 'Q11', level: 'Level 1', text: 'Do you perform risk assessments for your vendors, third-parties, and fourth parties?', options: ['Yes', 'No', "Don't know"], type: 'single' },
    { id: 'Q11.1', level: 'Level 2', text: 'Do you modify contracts with vendors/ third-parties to include cybersecurity clauses to protect your data?', options: ['Yes', 'No', "Don't know"], type: 'single' },
    { id: 'Q12', level: 'Level 1', text: 'Do you have mechanisms in place to independently test processes & controls?', options: ['independent testing (by internal audit, risk, or external experts)', 'Either Second Line of Defence/ Internal Audit', 'QA/ QC team or First Line of Defence', 'No'], type: 'single' },
    { id: 'Q12.1', level: 'Level 1', text: 'What percentage of your business processes undergo control self-assessments?', options: ['76-100%', '51-75%', '26-50%', '0-25%'], type: 'single' },
    { id: 'Q13', level: 'Level 1', text: 'Is your organization ISO 27001 certified? Or about to undergo an IT Audit (SOC/ ITGC/ Application Audit)?', options: ['Yes', 'No', "Don't know"], type: 'single' },
    { id: 'Q14', level: 'Level 1', text: 'Has your IT environment ever undergone penetration testing?', options: ['Yes - Favourable results', 'Yes - Room for minor improvements', 'Yes - Room for major improvements', 'No'], type: 'single' },
    { id: 'Q15', level: 'Level 1', text: 'Do you leverage automation and applications to manage IT processes and controls?', options: ['Yes', 'No', "Don't know"], type: 'single' },
    { id: 'Q15.1', level: 'Level 2', text: 'What percentage of your IT processes & controls are automated/ managed by applications?', options: ['76-100%', '51-75%', '26-50%', '0-25%'], type: 'single' }
];

const quizContainer = document.getElementById('quiz-container');
const quizIntro = document.getElementById('quiz-intro');
const quizResults = document.getElementById('quiz-results');
const flashcardContent = document.getElementById('flashcard-content');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const skipBtn = document.getElementById('skip-btn');
const submitBtn = document.getElementById('submit-btn');
const contactForm = document.getElementById('contact-form');
const maturityLevelDisplay = document.getElementById('maturity-level');
const totalScoreDisplay = document.getElementById('total-score');
const summaryText = document.getElementById('summary-text');
const comingSoonModal = document.getElementById('coming-soon-modal');
const modalCloseBtn = document.querySelector('.modal-close');
const copyResultsBtn = document.getElementById('copy-results-btn');
const themeToggleBtn = document.getElementById('theme-toggle-btn');

// Replace with your deployed Google Apps Script URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwsPGEpywxfUCRxuaR6zFP54bgbv0mdksiZnPmN8nuSSPFUOhf7ofqyRuUnoy9uKQgqSg/exec';

let currentStep = 0;
let userAnswers = {};
let visibleQuestions = [];
let quizStarted = false;

// Theme toggle functionality
themeToggleBtn.addEventListener('click', () => {
    const body = document.body;
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.classList.add('light-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

function showSection(sectionId) {
    document.querySelectorAll('.quiz-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function updateVisibleQuestions() {
    visibleQuestions = questionsData.filter(q => {
        if (q.level === 'Level 1') {
            return true;
        } else if (q.level === 'Level 2') {
            const parentId = q.id.split('.')[0];
            const parentAnswer = userAnswers[parentId];
            return parentAnswer === 'Yes' || parentAnswer === 'Yes - Favourable results' || parentAnswer === 'Yes - Room for minor improvements' || parentAnswer === 'Yes - Room for major improvements' || parentAnswer === 'Yes - some controls';
        }
        return false;
    });
}

function renderQuestion(direction = 'next') {
    if (visibleQuestions.length === 0) {
        return;
    }

    const question = visibleQuestions[currentStep];
    if (!question) {
        return;
    }

    const newQuestionCard = document.createElement('div');
    newQuestionCard.classList.add('flashcard-front');
    let optionsHtml = '';

    if (question.type === 'multi') {
        const selectedCount = userAnswers[question.id] ? userAnswers[question.id].length : 0;
        optionsHtml = `
            <ul class="options-list multi-select">
                ${question.subOptions.map(option => `
                    <li class="option-item" data-value="${option}">
                        <input type="checkbox" id="${question.id}-${option}" value="${option}" style="display:none;" />
                        <label for="${question.id}-${option}">${option}</label>
                    </li>
                `).join('')}
            </ul>
            <div class="selection-counter">${selectedCount} of ${question.subOptions.length} selected</div>
        `;
    } else {
        optionsHtml = `
            <ul class="options-list" data-type="${question.type}">
                ${question.options.map(option => `
                    <li class="option-item" data-value="${option}">
                        ${option}
                    </li>
                `).join('')}
            </ul>
        `;
    }

    newQuestionCard.innerHTML = `
        <h2>${question.text}</h2>
        ${optionsHtml}
    `;

    // Add event listeners to options
    newQuestionCard.querySelectorAll('.option-item').forEach(item => {
        item.addEventListener('click', () => {
            const isMultiSelect = question.type === 'multi';
            if (isMultiSelect) {
                item.classList.toggle('selected');
                const checkbox = item.querySelector('input[type="checkbox"]');
                checkbox.checked = !checkbox.checked;
                userAnswers[question.id] = Array.from(newQuestionCard.querySelectorAll('.option-item.selected')).map(el => el.getAttribute('data-value'));
                const selectedCount = userAnswers[question.id] ? userAnswers[question.id].length : 0;
                newQuestionCard.querySelector('.selection-counter').textContent = `${selectedCount} of ${question.subOptions.length} selected`;
            } else {
                newQuestionCard.querySelectorAll('.option-item').forEach(li => li.classList.remove('selected'));
                item.classList.add('selected');
                userAnswers[question.id] = item.getAttribute('data-value');
                if (question.level === 'Level 1') {
                    updateVisibleQuestions();
                }
                setTimeout(() => navigateNext(), 300);
            }
            updateNavigationButtons();
        });
    });

    const existingCard = flashcardContent.querySelector('.flashcard-front');
    if (existingCard) {
        existingCard.style.opacity = 0;
        setTimeout(() => {
            flashcardContent.innerHTML = '';
            newQuestionCard.style.opacity = 0;
            flashcardContent.appendChild(newQuestionCard);
            setTimeout(() => newQuestionCard.style.opacity = 1, 50);
        }, 300);
    } else {
        flashcardContent.appendChild(newQuestionCard);
        setTimeout(() => newQuestionCard.style.opacity = 1, 50);
    }

    // Set selected answer if it exists
    if (userAnswers[question.id]) {
        const selectedValue = userAnswers[question.id];
        if (Array.isArray(selectedValue)) {
            selectedValue.forEach(value => {
                const item = newQuestionCard.querySelector(`[data-value="${value}"]`);
                if (item) {
                    item.classList.add('selected');
                    item.querySelector('input[type="checkbox"]').checked = true;
                }
            });
            const selectedCount = selectedValue.length;
            newQuestionCard.querySelector('.selection-counter').textContent = `${selectedCount} of ${question.subOptions.length} selected`;
        } else {
            const item = newQuestionCard.querySelector(`[data-value="${selectedValue}"]`);
            if (item) {
                item.classList.add('selected');
            }
        }
    }
}

function navigateNext() {
    if (currentStep < visibleQuestions.length - 1) {
        currentStep++;
        renderQuestion('next');
    } else {
        calculateResults();
    }
    updateNavigationButtons();
}

function navigatePrev() {
    if (currentStep > 0) {
        currentStep--;
        updateVisibleQuestions();
        renderQuestion('prev');
    }
    updateNavigationButtons();
}

function skipQuestion() {
    navigateNext();
}

function updateNavigationButtons() {
    const isFirstQuestion = currentStep === 0;
    const isLastQuestion = currentStep === visibleQuestions.length - 1;
    const currentQuestion = visibleQuestions[currentStep];

    prevBtn.style.display = isFirstQuestion ? 'none' : 'inline-block';
    nextBtn.style.display = 'inline-block';
    skipBtn.style.display = 'inline-block';
    submitBtn.style.display = 'none';

    if (isLastQuestion) {
        nextBtn.style.display = 'none';
        skipBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
    }
}

function calculateResults() {
    // Disable the submit button to prevent double submissions
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submit Responses';

    let score = 0;

    questionsData.forEach(q => {
        const answer = userAnswers[q.id];
        if (q.type === 'multi') {
            const count = answer ? answer.length : 0;
            if (q.id === 'Q6.2') {
                if (count >= 15) score += 4;
                else if (count >= 10) score += 3;
                else if (count >= 5) score += 2;
                else score += 1;
            } else if (q.id === 'Q7.2') {
                if (count >= 15) score += 3;
                else if (count >= 10) score += 3;
                else if (count >= 5) score += 2;
                else score += 1;
            }
        } else {
            switch (q.id) {
                case 'Q1':
                case 'Q1.1':
                case 'Q2':
                case 'Q5.1':
                case 'Q6.1':
                case 'Q6.3':
                case 'Q7':
                case 'Q7.1':
                case 'Q8.1':
                case 'Q9':
                case 'Q11':
                case 'Q12':
                case 'Q12.1':
                case 'Q15.1':
                    if (answer === 'Yes' || answer === 'Yes - Favourable results' || answer === 'independent testing (by internal audit, risk, or external experts)' || answer === '76-100%' || answer === 'Advanced coverage') score += 5;
                    else score += 1;
                    break;
                case 'Q1.2':
                case 'Q1.3':
                case 'Q2.1':
                case 'Q3':
                case 'Q4.2':
                case 'Q4.3':
                case 'Q5':
                case 'Q6.4':
                case 'Q6.5':
                case 'Q9.1':
                case 'Q10':
                case 'Q13':
                case 'Q14':
                case 'Q15':
                    if (answer === 'Within hours' || answer === 'Highly organized & mature' || answer === 'Yes' || answer === '76-100%' || answer === 'Annually' || answer === 'Yes - Favourable results') score += 4;
                    else if (answer === 'Within a day' || answer === 'Some functions are mature, other are growing in maturity' || answer === '51-75%' || answer === 'Annually' || answer === 'Yes' || answer === 'Yes - Room for minor improvements') score += 3;
                    else if (answer === 'Within a week' || answer === 'Informal guidelines only' || answer === '26-50%' || answer === 'As needed' || answer === 'Yes - Room for major improvements') score += 2;
                    else score += 1;
                    break;
                case 'Q4':
                    if (answer === 'At least once a year with periodic refresher courses') score += 5;
                    else if (answer === 'Occasionally, but not consistently') score += 3;
                    else if (answer === 'Only for IT staff') score += 2;
                    else score += 1;
                    break;
                case 'Q4.1':
                    if (answer === 'Operational metrics (e.g., phishing click-through rates)') score += 5;
                    else if (answer === 'Quiz scores and feedback surveys') score += 3;
                    else if (answer === 'Completion rates') score += 2;
                    else score += 1;
                    break;
                case 'Q6':
                    if (answer === 'Yes') score += 3;
                    else if (answer === 'Informal/ Verbal guidelines only') score += 2;
                    else score += 1;
                    break;
                case 'Q7':
                    if (answer === 'Yes') score += 5;
                    else if (answer === 'Yes - some controls') score += 2;
                    else score += 1;
                    break;
                case 'Q8':
                    if (answer === 'Yes') score += 3;
                    else score += 1;
                    break;
                case 'Q11.1':
                    if (answer === 'Yes') score += 3;
                    else score += 1;
                    break;
                default:
                    score += 0;
            }
        }
    });

    const maturityLevel = getMaturityLevel(score);
    const summary = getSummaryText(maturityLevel);

    const submissionData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        company: document.getElementById('company').value,
        role: document.getElementById('role').value,
        country: document.getElementById('country').value,
        consent_privacy: document.getElementById('consent_privacy').checked,
        consent_marketing: document.getElementById('consent_marketing').checked,
        ...userAnswers,
        notes_internal: `Score: ${score}, Maturity: ${maturityLevel}`,
    };

    // Send data to Google Apps Script
    sendDataToAppsScript(submissionData, score);
}

function sendDataToAppsScript(data, score) {
    fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        // Handle successful response
        console.log('Submission sent to Apps Script.');
        // Display the results AFTER the submission is sent
        displayResults(score);
        // Re-enable the button and reset its text on successful submission
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
    })
    .catch(error => {
        // Re-enable the button and reset its text on submission failure
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
        console.error('Error submitting data:', error);
        alert('There was an issue submitting your results. Please try again.');
    });
}

function getMaturityLevel(score) {
    if (score >= 125) return 'Advanced';
    if (score >= 100) return 'Managed';
    if (score >= 70) return 'Defined';
    if (score >= 35) return 'Developing';
    return 'Basic/ Ad-hoc';
}

function getSummaryText(level) {
    const summaries = {
        'Advanced': 'Your organization demonstrates a high level of cybersecurity maturity. Your proactive approach and strong controls align with industry best practices, making you well-prepared to handle modern threats. We can help you maintain this leadership position.',
        'Managed': 'Your cybersecurity posture is well-defined and consistently managed across the organization. You have established processes and controls to mitigate risks effectively. We can assist you in moving towards an optimized state by implementing advanced analytics and threat intelligence.',
        'Defined': 'Your organization has a foundational cybersecurity program in place, with documented policies and procedures. However, there may be inconsistencies in implementation. We recommend focusing on a more structured and comprehensive approach to solidify your defenses.',
        'Developing': 'Your organization is taking important first steps in cybersecurity, but lacks a formal, repeatable program. Security practices are often ad-hoc and reactive. We can help you build a structured framework to improve your security posture and reduce risk.',
        'Basic/ Ad-hoc': 'Your organization has limited to no cybersecurity measures in place. Security is likely handled on a case-by-case basis without a formal strategy. We can provide a comprehensive roadmap to help you establish a strong foundation.',
    };
    return summaries[level] || 'No summary available.';
}

function triggerConfetti() {
    confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: 0.6 }
    });
}

function displayResults(score) {
    const maturityLevel = getMaturityLevel(score);
    const summary = getSummaryText(maturityLevel);

    maturityLevelDisplay.textContent = maturityLevel;
    totalScoreDisplay.textContent = `${score} points`;
    summaryText.textContent = summary;

    showSection('quiz-results');
    triggerConfetti();
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const contactInfo = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        company: document.getElementById('company').value,
        role: document.getElementById('role').value,
        country: document.getElementById('country').value,
        consent_privacy: document.getElementById('consent_privacy').checked,
        consent_marketing: document.getElementById('consent_marketing').checked
    };

    if (contactForm.checkValidity()) {
        currentStep = 0;
        userAnswers = {};
        updateVisibleQuestions();
        showSection('quiz-container');
        renderQuestion('next');
    } else {
        contactForm.reportValidity();
    }
});

prevBtn.addEventListener('click', navigatePrev);
nextBtn.addEventListener('click', navigateNext);
skipBtn.addEventListener('click', skipQuestion);
submitBtn.addEventListener('click', calculateResults);

modalCloseBtn.addEventListener('click', () => {
    comingSoonModal.style.display = 'none';
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

copyResultsBtn.addEventListener('click', () => {
    const maturity = maturityLevelDisplay.textContent;
    const score = totalScoreDisplay.textContent;
    const message = summaryText.textContent;
    const textToCopy = `Cybersecurity Self-Assessment Results:\n\nYour Maturity Level: ${maturity}\nYour Score: ${score} points\n\nSummary: ${message}\n\nFind your own cybersecurity maturity at: YOUR_WEBSITE_URL_HERE`;

    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = copyResultsBtn.textContent;
        copyResultsBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyResultsBtn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy results: ', err);
    });
});