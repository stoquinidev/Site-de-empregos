// Menu Hamburguer - Código Corrigido
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const sidebarClose = document.getElementById('sidebarClose');
    
    console.log('Script carregado!');
    console.log('Elementos:', {menuBtn, sidebar, overlay, sidebarClose});
    
    // Função para abrir menu
    function openMenu() {
        console.log('Abrindo menu');
        sidebar.classList.add('active');
        menuBtn.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('menu-open'); // Adiciona classe para esconder o botão
        document.body.style.overflow = 'hidden';
    }
    
    // Função para fechar menu
    function closeMenu() {
        console.log('Fechando menu');
        sidebar.classList.remove('active');
        menuBtn.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open'); // Remove classe para mostrar o botão
        document.body.style.overflow = '';
    }
    
    // Event listeners
    if (menuBtn) {
        menuBtn.addEventListener('click', openMenu);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }
    
    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeMenu);
    }
    
    // Fechar menu ao clicar em um link
    const menuLinks = document.querySelectorAll('.side-nav a');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Tema dark/light
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('i');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Aplicar tema salvo
    function applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    }
    
    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        
        if (theme === 'dark') {
            themeIcon.className = 'bx bx-moon';
            themeIcon.style.color = '#fbbf24';
        } else {
            themeIcon.className = 'bx bx-sun';
            themeIcon.style.color = '#f59e0b';
        }
    }
    
    function toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    }
    
    // Inicializar tema
    applyTheme(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});

// Restante do código para funcionalidades existentes
const checkboxes = document.querySelectorAll('.checkbox input');
const bookmarkIcons = document.querySelectorAll('.card-header .bookmark-icon');
const jobCards = document.querySelectorAll('.card');
const filterItems = document.querySelectorAll('.filters .item');
const applyButtons = document.querySelectorAll('.apply-btn');

// Funcionalidade dos checkboxes
checkboxes.forEach(c => {
    c.addEventListener("change", () => {
        const label = document.querySelector(`label[for="${c.id}"]`);
        if (c.checked) {
            label.style.color = '#4361ee';
            label.style.fontWeight = '600';
        } else {
            const currentTheme = document.body.getAttribute('data-theme');
            label.style.color = currentTheme === 'dark' ? '#e2e8f0' : '#1a1d29';
            label.style.fontWeight = '500';
        }
    });
});

// Funcionalidade de bookmark
bookmarkIcons.forEach(icon => {
    icon.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('bxs-bookmark');
        this.classList.toggle('bx-bookmark-plus');
        
        if (this.classList.contains('bxs-bookmark')) {
            this.style.color = '#4361ee';
        } else {
            const currentTheme = document.body.getAttribute('data-theme');
            this.style.color = currentTheme === 'dark' ? '#94a3b8' : '#6c757d';
        }
    });
});

// Funcionalidade dos cards
jobCards.forEach(card => {
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('bx-bookmark-plus') && 
            !e.target.classList.contains('bx-bookmark') &&
            !e.target.classList.contains('apply-btn')) {
            console.log('Card clicado:', card.querySelector('.job-title').textContent);
        }
    });
});

// Funcionalidade dos botões de candidatura
applyButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const jobTitle = this.closest('.card').querySelector('.job-title').textContent;
        console.log('Candidatando-se para:', jobTitle);
        alert(`Candidatura enviada para: ${jobTitle}`);
        this.textContent = 'Candidatura Enviada ✓';
        this.style.background = 'var(--success)';
        this.disabled = true;
    });
});

// Funcionalidade dos filtros
filterItems.forEach(item => {
    const clearBtn = item.querySelector('.title a');
    clearBtn.addEventListener('click', () => {
        const checkboxesInItem = item.querySelectorAll('input[type="checkbox"]');
        checkboxesInItem.forEach(checkbox => {
            checkbox.checked = false;
            const label = document.querySelector(`label[for="${checkbox.id}"]`);
            const currentTheme = document.body.getAttribute('data-theme');
            label.style.color = currentTheme === 'dark' ? '#e2e8f0' : '#1a1d29';
            label.style.fontWeight = '500';
        });
    });
});