document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobile-schedule-btn');
    const modal = document.getElementById('schedule-modal');
    const closeModal = document.getElementById('close-modal');
    const form = document.getElementById('schedule-form');
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const stepPlans = document.getElementById('step-plans');
    const footer = document.getElementById('contato'); // Target the footer or last section
    const mobileContainer = document.getElementById('mobile-schedule-container');

    let formData = {
        time: '',
        price: ''
    };

    // Initially hide the button
    if (mobileContainer) {
        mobileContainer.style.display = 'none';
        mobileContainer.style.opacity = '0';
        mobileContainer.style.transition = 'opacity 0.5s ease';
    }

    // Intersection Observer to show button only when footer is in view
    if (footer && mobileContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Show button when footer is visible
                    mobileContainer.style.display = 'block';
                    // Small delay to allow display block to apply before opacity transition
                    setTimeout(() => {
                        mobileContainer.style.opacity = '1';
                    }, 10);
                } else {
                    // Hide button when footer is not visible
                    mobileContainer.style.opacity = '0';
                    setTimeout(() => {
                        if (mobileContainer.style.opacity === '0') {
                            mobileContainer.style.display = 'none';
                        }
                    }, 500); // Match transition duration
                }
            });
        }, {
            root: null,
            threshold: 0.1 // Trigger when 10% of footer is visible
        });

        observer.observe(footer);
    }

    // Open Modal
    mobileBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        resetForm();
    });

    // Close Modal
    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Option Logic
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.dataset.group;
            const value = btn.dataset.value;

            // Remove active class from siblings in same group
            const siblings = btn.closest('.option-group').querySelectorAll('.option-btn');
            siblings.forEach(sb => sb.classList.remove('active'));

            // Add active class
            btn.classList.add('active');

            formData[group] = value;

            // Logic to advance steps
            if (group === 'time') {
                step2.classList.remove('hidden');
            } else if (group === 'price') {
                if (value.includes('Sim')) {
                    if (stepPlans) stepPlans.classList.remove('hidden');
                } else {
                    if (stepPlans) stepPlans.classList.add('hidden');
                }
                submitContainer.classList.remove('hidden');
            }
        });
    });

    // Submit Logic
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!formData.time || !formData.price) {
            alert('Por favor, selecione todas as opções.');
            return;
        }

        const phoneNumber = '557581466368';
        const text = `Olá! Gostaria de agendar uma AULA GRÁTIS.\n\n🕒 Horário de preferência: *${formData.time}*\n💰 Dúvida sobre valores: *${formData.price}*`;

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

        window.open(url, '_blank');
        modal.classList.add('hidden');
    });

    function resetForm() {
        formData = { time: '', price: '' };
        document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('active'));
        step2.classList.add('hidden');
        if (stepPlans) stepPlans.classList.add('hidden');
        submitContainer.classList.add('hidden');
    }
});
