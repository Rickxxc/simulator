class Menu {
  static create() {
    const header = document.createElement('header');
    header.innerHTML = `
      <nav class="main-nav">
        <button class="menu-toggle" aria-label="Toggle Menu">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/>
          </svg>
        </button>
        
        <div class="logo-container">
          <h1>Simulado IA para Concursos</h1>
          <div class="mascot">
            <svg width="40" height="40" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4M12,6C10.9,6 10,6.9 10,8C10,9.1 10.9,10 12,10C13.1,10 14,9.1 14,8C14,6.9 13.1,6 12,6M7,14C7,15.66 9.34,17 12,17C14.66,17 17,15.66 17,14V12H7V14Z"/>
            </svg>
          </div>
        </div>
      </nav>

      <div class="side-menu">
        <div class="side-menu-overlay"></div>
        <div class="side-menu-content">
          <div class="side-menu-header">
            <button class="close-menu" aria-label="Close Menu">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
              </svg>
            </button>
          </div>
          
          <div class="menu-items">
            <a href="go:sim" class="menu-item">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
              </svg>
              <span>Home</span>
            </a>
            <button class="menu-item" data-modal="sobre">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
              </svg>
              <span>Sobre</span>
            </button>
            <button class="menu-item" data-modal="contato">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
              </svg>
              <span>Contato</span>
            </button>
            <button class="menu-item" data-modal="politica-privacidade">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z"/>
              </svg>
              <span>Política de Privacidade</span>
            </button>
            <button class="menu-item" data-modal="termos-uso">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"/>
              </svg>
              <span>Termos de Uso</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Modais -->
      <div class="modal" id="sobre">
        <div class="modal-content">
          <h2>Sobre</h2>
          <p>Simulado IA para Concursos é uma plataforma inovadora desenvolvida por Ricardo Braga, que utiliza inteligência artificial para gerar simulados personalizados para diversos concursos públicos.</p>
          <p>Nossa missão é auxiliar candidatos em sua preparação, oferecendo questões realistas e feedback detalhado para maximizar o aprendizado.</p>
          <button class="modal-close">Fechar</button>
        </div>
      </div>

      <div class="modal" id="contato">
        <div class="modal-content">
          <h2>Contato</h2>
          <p>Para dúvidas, sugestões ou suporte, entre em contato através do e-mail:</p>
          <p class="email">dev.braga@gmail.com</p>
          <button class="modal-close">Fechar</button>
        </div>
      </div>

      <div class="modal" id="politica-privacidade">
        <div class="modal-content">
          <h2>Política de Privacidade</h2>
          <p>Valorizamos sua privacidade e nos comprometemos a proteger seus dados pessoais. Esta política descreve como coletamos, usamos e protegemos suas informações ao utilizar nossa plataforma.</p>
          <h3>Coleta de Dados</h3>
          <p>Coletamos apenas informações necessárias para melhorar sua experiência de estudo.</p>
          <h3>Uso de Dados</h3>
          <p>Suas informações são utilizadas exclusivamente para personalizar seu conteúdo de estudo e melhorar nossos serviços.</p>
          <button class="modal-close">Fechar</button>
        </div>
      </div>

      <div class="modal" id="termos-uso">
        <div class="modal-content">
          <h2>Termos de Uso</h2>
          <p>Ao utilizar nossa plataforma, você concorda com estes termos de uso.</p>
          <h3>Uso do Serviço</h3>
          <p>Nossa plataforma deve ser utilizada exclusivamente para fins educacionais e de preparação para concursos.</p>
          <h3>Responsabilidades</h3>
          <p>O usuário é responsável por manter a confidencialidade de sua conta e por todas as atividades realizadas.</p>
          <button class="modal-close">Fechar</button>
        </div>
      </div>
    `;

    // Add event listeners after creating the elements
    const menuToggle = header.querySelector('.menu-toggle');
    const closeMenu = header.querySelector('.close-menu');
    const sideMenu = header.querySelector('.side-menu');
    const overlay = header.querySelector('.side-menu-overlay');
    const menuItems = header.querySelectorAll('.menu-item[data-modal]');
    const modals = header.querySelectorAll('.modal');
    const modalCloseButtons = header.querySelectorAll('.modal-close');

    menuToggle.addEventListener('click', () => {
      sideMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    const closeMenuHandler = () => {
      sideMenu.classList.remove('open');
      document.body.style.overflow = '';
    };

    closeMenu.addEventListener('click', closeMenuHandler);
    overlay.addEventListener('click', closeMenuHandler);

    // Modal handlers
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        const modalId = item.getAttribute('data-modal');
        const modal = header.querySelector(`#${modalId}`);
        modal.classList.add('active');
        closeMenuHandler();
      });
    });

    modalCloseButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        modal.classList.remove('active');
      });
    });

    modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    });

    return header;
  }
}

export default Menu;
