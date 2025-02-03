class Menu {
  static create() {
    const header = document.createElement('header');
    header.innerHTML = `
      <h1>Simulado IA para Concursos</h1>
      <div class="mascot">
        <svg width="80" height="80" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4M12,6C10.9,6 10,6.9 10,8C10,9.1 10.9,10 12,10C13.1,10 14,9.1 14,8C14,6.9 13.1,6 12,6M7,14C7,15.66 9.34,17 12,17C14.66,17 17,15.66 17,14V12H7V14Z"/>
        </svg>
      </div>
    `;
    return header;
  }
}

export default Menu;
