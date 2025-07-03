describe('Board', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Nova Tarefa Teste Padrão');
      cy.stub(win, 'confirm').returns(true);
    });
  })

  it('deve carregar a pagina', () => {
    cy.get('[data-cy="board-title"]').should('contain', 'Board');

    const listaTitulos = ["A fazer", "Em Andamento", "Em Revisão", "Concluído"];
    listaTitulos.forEach(titulo => {
      const dataCyTitulo = `titulo-lista-${titulo.toLowerCase().replace(/\s/g, '-')}`;
      cy.get(`[data-cy="${dataCyTitulo}"]`).should('be.visible').and('contain', titulo);
    });

    // Verificar se as tarefas iniciais estão presentes
    cy.get('[data-cy="tarefa-titulo-1"]').should('contain', 'Estudar React');
    cy.get('[data-cy="tarefa-titulo-2"]').should('contain', 'Comprar leite');
    cy.get('[data-cy="tarefa-titulo-3"]').should('contain', 'Ler documentação do React');
    cy.get('[data-cy="tarefa-titulo-4"]').should('contain', 'Fazer exercício');
  });

  it('deve criar uma nova tarefa na lista "A fazer"', () => {
    const novaTarefaNome = 'Dar banho no Tyrion Lannister';

    cy.window().then((win) => {
      (win.prompt as any).restore(); 
      cy.stub(win, 'prompt').returns(novaTarefaNome);
    });

    cy.get('[data-cy="criar-tarefa-button-a-fazer"]').click();
    // Verifica se a nova tarefa aparece na lista "A fazer"
    cy.get('[data-cy="lista-itens-a-fazer"]')
      .contains('h3', novaTarefaNome)
      .should('be.visible');
  });

  it('deve editar uma tarefa', () => {
    const idTarefaParaEditar = 1; // ID de uma tarefa 
    const novoNomeTarefa = 'Estudar Cypress com React e Tailwind';
    // Sobrescreve o stub para retornar o novo nome da tarefa para ESTE teste
    cy.window().then((win) => {
      (win.prompt as any).restore();
      cy.stub(win, 'prompt').returns(novoNomeTarefa);
    });

    cy.get(`[data-cy="editar-tarefa-${idTarefaParaEditar}"]`).click();
    // Verifica se o título da tarefa foi atualizado
    cy.get(`[data-cy="tarefa-titulo-${idTarefaParaEditar}"]`).should('contain', novoNomeTarefa);
  });

  it('deve excluir uma tarefa ', () => {
    const idTarefaParaExcluir = 1; // ID de uma tarefa 

    // Garante que a tarefa existe antes de tentar excluir
    cy.get(`[data-cy="tarefa-item-${idTarefaParaExcluir}"]`).should('exist');
    // O stub de confirm já está definido para confirmar exclusão
    cy.get(`[data-cy="excluir-tarefa-${idTarefaParaExcluir}"]`).click();
    // Verifica se a tarefa foi removida do DOM
    cy.get(`[data-cy="tarefa-item-${idTarefaParaExcluir}"]`).should('not.exist');
  });

  it('deve exibir o rodapé', () => {
    cy.get('[data-cy="app-footer"]').should('be.visible');
    cy.get('[data-cy="app-footer"]').should('contain', 'Desenvolvido com 🤍 por Daniely & Maria de Fátima');
    cy.get('[data-cy="daniely-github-link"]').should('have.attr', 'href', 'https://github.com/DanielyVasconcelos2024');
    cy.get('[data-cy="fatima-github-link"]').should('have.attr', 'href', 'https://github.com/alvesmariadefatima');
  });
});