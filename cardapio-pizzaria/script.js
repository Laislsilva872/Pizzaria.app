
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        const contador = document.querySelector("#cart-count");
        const lista = document.querySelector("#carrinho-lista");
        const totalEl= document.querySelector("#carrinho-total");
        const botoes = document.querySelectorAll(".btn-add");

         
        function formatar(valor) {
            return valor.toLocaleString("pt-BR", {
                style: "currency", currency:"BRL"});
        }
         
        function atualizarTela() {
            let total = 0;
            let quantidade = 0;
            let html = "";
        

        carrinho.forEach(function(item,posicao){
            total +=item.preco * item.qtd;
            quantidade += item.qtd;
        
            html += `
            <div class="d-flex justify-content-between align-items-center border-bottom py-2">
               <div>
                <div class="fw-semibold">${item.nome}</div>
                <small class="text-muted">${formatar(item.preco)} cada</small>
                </div>
                <div class="d-flex align-items-center gap-2">
                <button class="btn btn-outline-secondary btn-sm" data-acao="menos" data-pos="${posicao}" aria-label="Diminuir ${item.nome}"><i class="bi bi-dash-lg" aria-hidden="true"></i>
                </button>
                <span>${item.qtd}</span>
                <button class="btn btn-qtd btn-sm" data-acao="mais" data-pos="${posicao}" aria-label="Aumentar ${item.nome}"><i class="bi bi-plus-lg" aria-hidden="true"></i>
                </button>
                </div>
            </div>`;
        });

        if (carrinho.length === 0) {
            html = '<p class="text-muted mb-0">Seu carrinho está vazio</p>';
        }

        lista.innerHTML = html;
        totalEl.textContent = formatar(total);
        contador.textContent = quantidade;
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }

        botoes.forEach(function(botao) {
            botao.addEventListener("click", function () {
               const nome = botao.dataset.nome;
               const preco = Number(botao.dataset.preco);

               const existente = carrinho.find(function (item){
                return item.nome === nome;
               });

               if (existente) {
                existente.qtd++;
               } else {
                carrinho.push({ nome: nome, preco: preco, qtd: 1});
               }

               atualizarTela();
            });
        });

        lista.addEventListener("click", function (e){
            const botao = e.target.closest("button");
            if (!botao) return;

            const posicao = Number(botao.dataset.pos);

            if (botao.dataset.acao === "mais") {
                carrinho[posicao].qtd++;
            } else if (botao.dataset.acao === "menos") {
                carrinho[posicao].qtd--;
               if (carrinho[posicao].qtd === 0){
                carrinho.splice(posicao, 1);
            }
        }

           atualizarTela();
        });
        
           atualizarTela();