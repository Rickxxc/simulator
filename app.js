class SimuladoApp {
  constructor() {
    this.cargos = {
      inss: {
        'Técnico do Seguro Social': {
          disciplinas: ['Direito Constitucional', 'Direito Administrativo', 'Ética no Serviço Público', 'Legislação Previdenciária', 'Informática Básica', 'Atendimento ao Público'],
          banca: 'Cebraspe',
          tipo: 'certo_errado'
        },
        'Analista do Seguro Social': {
          disciplinas: ['Direito Constitucional', 'Direito Administrativo', 'Direito Previdenciário', 'Legislação Previdenciária', 'Gestão Pública', 'Serviço Social'],
          banca: 'Cebraspe',
          tipo: 'certo_errado'
        }
      },
      bb: {
        'Escriturário - Agente Comercial': {
          disciplinas: ['Matemática Financeira', 'Probabilidade e Estatística', 'Conhecimentos Bancários', 'Vendas e Negociação', 'Atendimento', 'Português'],
          banca: 'Cesgranrio',
          tipo: 'multipla_escolha',
          alternativas: 5
        },
        'Escriturário - Agente de Tecnologia': {
          disciplinas: ['Probabilidade e Estatística', 'Tecnologia da Informação', 'Banco de Dados', 'Desenvolvimento de Sistemas', 'Agile', 'Segurança da Informação'],
          banca: 'Cesgranrio',
          tipo: 'multipla_escolha',
          alternativas: 5
        }
      },
      caixa: {
        'Técnico Bancário Novo': {
          disciplinas: ['Matemática Financeira', 'Conhecimentos Bancários', 'Atendimento', 'Português', 'Legislação Específica', 'Tecnologia da Informação'],
          banca: 'Cesgranrio',
          tipo: 'multipla_escolha',
          alternativas: 5
        }
      },
      correios: {
        'Carteiro': {
          disciplinas: ['Conhecimentos Específicos', 'Matemática', 'Português', 'Informática', 'Legislação dos Correios', 'Atendimento ao Cliente'],
          banca: 'FGV',
          tipo: 'multipla_escolha',
          alternativas: 4
        },
        'Operador de Triagem': {
          disciplinas: ['Logística', 'Matemática', 'Português', 'Raciocínio Lógico', 'Legislação dos Correios', 'Operações Postais'],
          banca: 'FGV',
          tipo: 'multipla_escolha',
          alternativas: 4
        }
      },
      petrobras: {
        'Técnico de Administração e Controle': {
          disciplinas: ['Matemática', 'Português', 'Conhecimentos Específicos', 'Inglês', 'Legislação', 'Informática'],
          banca: 'Cesgranrio',
          tipo: 'multipla_escolha',
          alternativas: 5
        },
        'Técnico de Operação': {
          disciplinas: ['Matemática', 'Física', 'Química', 'Segurança Industrial', 'Legislação', 'Inglês'],
          banca: 'Cesgranrio',
          tipo: 'multipla_escolha',
          alternativas: 5
        }
      }
    };
    
    this.simuladoAtual = null;
    this.GEMINI_API_KEY = 'AIzaSyCqtL3txurKLN1G051WZmtq6koAutlZ-6I';
    this.initializeElements();
    this.setupEventListeners();
  }

  initializeElements() {
    this.setupForm = document.getElementById('setup-form');
    this.simuladoContainer = document.getElementById('simulado-container');
    this.resultadoContainer = document.getElementById('resultado-container');
    this.orgaoSelect = document.getElementById('orgao');
    this.cargoSelect = document.getElementById('cargo');
    this.materiaSelect = document.getElementById('materia');
    this.qtdQuestoesInput = document.getElementById('qtd-questoes');
    this.gerarSimuladoBtn = document.getElementById('gerar-simulado');
    this.finalizarBtn = document.getElementById('finalizar');
    this.novoSimuladoBtn = document.getElementById('novo-simulado');
    this.questoesContainer = document.getElementById('questoes');
    this.progressBar = document.querySelector('.progress');
  }

  setupEventListeners() {
    this.orgaoSelect.addEventListener('change', () => this.updateCargos());
    this.cargoSelect.addEventListener('change', () => this.updateMaterias());
    this.gerarSimuladoBtn.addEventListener('click', () => this.gerarSimulado());
    this.finalizarBtn.addEventListener('click', () => this.finalizarSimulado());
    this.novoSimuladoBtn.addEventListener('click', () => this.reiniciarSimulado());
  }

  updateCargos() {
    const orgao = this.orgaoSelect.value;
    this.cargoSelect.innerHTML = '<option value="">Selecione o cargo</option>';
    this.materiaSelect.innerHTML = '<option value="">Selecione a matéria</option>';
    
    if (orgao && this.cargos[orgao]) {
      Object.keys(this.cargos[orgao]).forEach(cargo => {
        const option = document.createElement('option');
        option.value = cargo;
        option.textContent = cargo;
        this.cargoSelect.appendChild(option);
      });
    }
  }

  updateMaterias() {
    const orgao = this.orgaoSelect.value;
    const cargo = this.cargoSelect.value;
    this.materiaSelect.innerHTML = '<option value="">Selecione a matéria</option>';
    
    if (orgao && cargo && this.cargos[orgao][cargo]) {
      this.cargos[orgao][cargo].disciplinas.forEach(materia => {
        const option = document.createElement('option');
        option.value = materia;
        option.textContent = materia;
        this.materiaSelect.appendChild(option);
      });
    }
  }

  async gerarQuestoesViaIA(orgao, cargo, materia, qtdQuestoes) {
    this.questoesContainer.innerHTML = `
      <div class="loading">
        <p>Gerando questões personalizadas sobre ${materia}...</p>
        <p>Banca: ${this.cargos[orgao][cargo].banca}</p>
      </div>
    `;

    const tipo = this.cargos[orgao][cargo].tipo;
    const numAlternativas = this.cargos[orgao][cargo].alternativas || 2;

    try {
      let prompt;
      
      if (tipo === 'certo_errado') {
        prompt = `Você é um especialista em elaborar questões de concurso público para a banca ${this.cargos[orgao][cargo].banca}.
          Gere ${qtdQuestoes} questões de Certo ou Errado sobre ${materia} para o concurso ${orgao} - ${cargo}.
          
          Requisitos importantes:
          - Questões realistas no estilo da banca ${this.cargos[orgao][cargo].banca}
          - Enunciados claros e objetivos
          - Apenas Certo ou Errado como opções
          - Explicação detalhada do gabarito
          
          Responda APENAS com um JSON array onde cada questão tem este formato:
          {
            "id": number,
            "enunciado": "texto da questão",
            "tipo": "certo_errado",
            "gabarito": "C ou E",
            "explicacao": "explicação detalhada da resposta"
          }`;
      } else {
        prompt = `Você é um especialista em elaborar questões de concurso público para a banca ${this.cargos[orgao][cargo].banca}.
          Gere ${qtdQuestoes} questões de múltipla escolha sobre ${materia} para o concurso ${orgao} - ${cargo}.
          
          Requisitos importantes:
          - Questões realistas no estilo da banca ${this.cargos[orgao][cargo].banca}
          - Enunciados claros e bem estruturados
          - ${numAlternativas} alternativas plausíveis (${Array.from({length: numAlternativas}, (_, i) => String.fromCharCode(65 + i)).join(', ')})
          - Apenas uma alternativa correta
          - Explicação detalhada do gabarito
          - Revise as questões para não haver erros de enunciado ou gabarito
          
          Responda APENAS com um JSON array onde cada questão tem este formato:
          {
            "id": number,
            "enunciado": "texto da questão",
            "tipo": "multipla_escolha",
            "alternativas": [
              {"id": "a", "texto": "texto da alternativa a"},
              ...
            ],
            "gabarito": "letra correta",
            "explicacao": "explicação detalhada da resposta"
          }`;
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/ gemini-1.5-flash-8b-001:generateContent?key=${this.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.8,
            maxOutputTokens: 8192,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Resposta da API inválida');
      }

      const textContent = data.candidates[0].content.parts[0].text;
      const jsonStr = textContent.replace(/```json\n?|\n?```/g, '').trim();
      let questoes = JSON.parse(jsonStr);

      questoes = questoes.map((q, index) => ({
        ...q,
        id: index + 1,
        tipo: tipo,
        alternativas: tipo === 'multipla_escolha' ? 
          q.alternativas.map(a => ({
            id: a.id.toLowerCase(),
            texto: a.texto
          })) :
          [
            { id: 'c', texto: 'Certo' },
            { id: 'e', texto: 'Errado' }
          ]
      }));

      return questoes;

    } catch (error) {
      console.error('Erro ao gerar questões:', error);
      alert('Houve um erro ao gerar as questões. Por favor, tente novamente.');
      throw error;
    }
  }

  async gerarSimulado() {
    const orgao = this.orgaoSelect.value;
    const cargo = this.cargoSelect.value;
    const materia = this.materiaSelect.value;
    const qtdQuestoes = parseInt(this.qtdQuestoesInput.value);

    if (!orgao || !cargo || !materia || !qtdQuestoes) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    this.setupForm.classList.add('hidden');
    this.simuladoContainer.classList.remove('hidden');
    
    const questoes = await this.gerarQuestoesViaIA(orgao, cargo, materia, qtdQuestoes);
    
    this.simuladoAtual = {
      questoes,
      respostas: new Array(questoes.length).fill(null),
      concluido: false
    };

    this.renderizarQuestoes();
  }

  renderizarQuestoes() {
    this.questoesContainer.innerHTML = '';
    
    this.simuladoAtual.questoes.forEach((questao, index) => {
      const questaoElement = document.createElement('div');
      questaoElement.className = 'questao';
      questaoElement.innerHTML = `
        <div class="questao-header">
          <span class="questao-numero">Questão ${questao.id}</span>
          <div class="questao-status"></div>
        </div>
        <div class="questao-content">
          <p class="questao-enunciado">${questao.enunciado}</p>
          ${questao.tipo === 'multipla_escolha' ? 
            `<div class="alternativas">
              ${questao.alternativas.map(alt => `
                <div class="alternativa" data-questao="${index}" data-alternativa="${alt.id}">
                  <div class="alternativa-marker">${alt.id.toUpperCase()}</div>
                  <div class="alternativa-content">
                    <input type="radio" id="q${index}${alt.id}" name="questao${index}" value="${alt.id}" 
                      ${this.simuladoAtual.respostas[index] === alt.id ? 'checked' : ''}>
                    <label for="q${index}${alt.id}">${alt.texto}</label>
                  </div>
                </div>
              `).join('')}
            </div>` : 
            `<div class="alternativas">
              <div class="alternativa" data-questao="${index}" data-alternativa="c">
                <div class="alternativa-marker">C</div>
                <div class="alternativa-content">
                  <input type="radio" id="q${index}c" name="questao${index}" value="c" 
                    ${this.simuladoAtual.respostas[index] === 'c' ? 'checked' : ''}>
                  <label for="q${index}c">Certo</label>
                </div>
              </div>
              <div class="alternativa" data-questao="${index}" data-alternativa="e">
                <div class="alternativa-marker">E</div>
                <div class="alternativa-content">
                  <input type="radio" id="q${index}e" name="questao${index}" value="e" 
                    ${this.simuladoAtual.respostas[index] === 'e' ? 'checked' : ''}>
                  <label for="q${index}e">Errado</label>
                </div>
              </div>
            </div>`
          }
          <div class="feedback"></div>
        </div>
      `;
      
      this.questoesContainer.appendChild(questaoElement);
    });

    this.setupAlternativasListeners();
  }

  setupAlternativasListeners() {
    const alternativas = document.querySelectorAll('.alternativa');
    alternativas.forEach(alt => {
      alt.addEventListener('click', (e) => {
        const questaoIndex = parseInt(alt.dataset.questao);
        const alternativa = alt.dataset.alternativa;
        
        if (!this.simuladoAtual.concluido) {
          this.simuladoAtual.respostas[questaoIndex] = alternativa;
          this.atualizarProgressBar();
        }
      });
    });
  }

  atualizarProgressBar() {
    const respondidas = this.simuladoAtual.respostas.filter(r => r !== null).length;
    const total = this.simuladoAtual.questoes.length;
    const progresso = (respondidas / total) * 100;
    this.progressBar.style.width = `${progresso}%`;
  }

  finalizarSimulado() {
    if (this.simuladoAtual.respostas.includes(null)) {
      alert('Por favor, responda todas as questões antes de finalizar');
      return;
    }

    this.simuladoAtual.concluido = true;
    this.mostrarResultado();
  }

  mostrarResultado() {
    const resultado = this.calcularResultado();
    
    this.simuladoContainer.classList.add('hidden');
    this.resultadoContainer.classList.remove('hidden');
    
    document.getElementById('score').textContent = `${resultado.percentual}%`;
    document.getElementById('acertos').textContent = resultado.acertos;
    document.getElementById('erros').textContent = resultado.erros;
    
    this.mostrarRevisao(resultado);
  }

  calcularResultado() {
    let acertos = 0;
    let erros = 0;
    const total = this.simuladoAtual.questoes.length;
    
    this.simuladoAtual.questoes.forEach((questao, index) => {
      const respostaUsuario = this.simuladoAtual.respostas[index].toLowerCase();
      const gabarito = questao.gabarito.toLowerCase();
      
      if (respostaUsuario === gabarito) {
        acertos++;
      } else {
        erros++;
      }
    });
    
    const percentual = Math.round((acertos / total) * 100);
    
    return {
      acertos,
      erros,
      percentual,
      total
    };
  }

  mostrarRevisao(resultado) {
    const reviewContainer = document.getElementById('review-container');
    reviewContainer.innerHTML = '';

    this.simuladoAtual.questoes.forEach((questao, index) => {
      const respostaUsuario = this.simuladoAtual.respostas[index].toLowerCase();
      const gabarito = questao.gabarito.toLowerCase();
      const correta = respostaUsuario === gabarito;
      
      const questaoReview = document.createElement('div');
      questaoReview.className = `questao-review questao ${correta ? 'correta' : 'incorreta'}`;
      
      let alternativasHtml = '';
      if (questao.tipo === 'multipla_escolha') {
        alternativasHtml = questao.alternativas.map(alt => `
          <div class="alternativa-review ${alt.id === respostaUsuario ? 'sua-resposta' : ''} ${alt.id === gabarito ? 'gabarito' : ''}">
            <span class="alternativa-letra">${alt.id.toUpperCase()})</span>
            <span class="alternativa-texto">${alt.texto}</span>
            ${alt.id === respostaUsuario ? '<span class="marker sua-resposta">Sua resposta</span>' : ''}
            ${alt.id === gabarito ? '<span class="marker gabarito">Gabarito</span>' : ''}
          </div>
        `).join('');
      } else {
        alternativasHtml = `
          <div class="alternativas-ce">
            <div class="alternativa-review ${respostaUsuario === 'c' ? 'sua-resposta' : ''} ${gabarito === 'c' ? 'gabarito' : ''}">
              <span class="alternativa-letra">CERTO</span>
              ${respostaUsuario === 'c' ? '<span class="marker sua-resposta">Sua resposta</span>' : ''}
              ${gabarito === 'c' ? '<span class="marker gabarito">Gabarito</span>' : ''}
            </div>
            <div class="alternativa-review ${respostaUsuario === 'e' ? 'sua-resposta' : ''} ${gabarito === 'e' ? 'gabarito' : ''}">
              <span class="alternativa-letra">ERRADO</span>
              ${respostaUsuario === 'e' ? '<span class="marker sua-resposta">Sua resposta</span>' : ''}
              ${gabarito === 'e' ? '<span class="marker gabarito">Gabarito</span>' : ''}
            </div>
          </div>
        `;
      }
      
      questaoReview.innerHTML = `
        <div class="questao-header">
          <h4>Questão ${questao.id}</h4>
          <span class="resultado-questao ${correta ? 'correta' : 'incorreta'}">
            ${correta ? 'CORRETA' : 'INCORRETA'}
          </span>
        </div>
        <div class="questao-content">
          <p class="questao-enunciado">${questao.enunciado}</p>
          <div class="alternativas-container">
            ${alternativasHtml}
          </div>
          <div class="explicacao">
            <h5>Explicação:</h5>
            <p>${questao.explicacao}</p>
          </div>
        </div>
      `;
      
      reviewContainer.appendChild(questaoReview);
    });
  }

  reiniciarSimulado() {
    this.resultadoContainer.classList.add('hidden');
    this.setupForm.classList.remove('hidden');
    this.progressBar.style.width = '0%';
    this.simuladoAtual = null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SimuladoApp();
});
