export function criarModalEdicao(onSave) {
    const modalHtml = `
      <div class="modal fade" id="modal-editar" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Editar Jogo</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input type="hidden" id="editar-id">
              <input type="text" id="editar-nome" class="form-control mb-2" placeholder="Nome do Jogo" required>
              <input type="text" id="editar-descricao" class="form-control mb-2" placeholder="Descrição" required>
              <input type="text" id="editar-produtora" class="form-control mb-2" placeholder="Produtora" required>
              <input type="date" id="editar-ano" class="form-control mb-2" placeholder="Ano" required>
              <input type="number" id="editar-idade-minima" class="form-control mb-2" placeholder="Idade Mínima" required>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
              <button type="button" id="salvar-edicao" class="btn btn-primary">Salvar Alterações</button>
            </div>
          </div>
        </div>
      </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div);

    const btnSalvar = div.querySelector('#salvar-edicao');
    btnSalvar.addEventListener('click', () => {
      const jogoEditado = {
        id: document.getElementById('editar-id').value,
        nome: document.getElementById('editar-nome').value,
        descricao: document.getElementById('editar-descricao').value,
        produtora: document.getElementById('editar-produtora').value,
        ano: document.getElementById('editar-ano').value,
        idadeMinima: parseInt(document.getElementById('editar-idade-minima').value),
      };

      onSave(jogoEditado);
    });
  }
