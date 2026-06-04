// DADOS FALSOS 
const produtos = [
    { id: 1, nome: "Composto Antiox", categoria: "estetica", descricao: "Rejuvenescimento e brilho da pele.", imagem: "assets/imagens/MascFemPote.png" },
    { id: 2, nome: "Whey Isolado Roval", categoria: "fitness", descricao: "Ganho de massa magra com alta pureza.", imagem: "assets/imagens/MascMasFit.png" },
    { id: 3, nome: "Pré-Treino Explosão", categoria: "fitness", descricao: "Energia e foco para seus treinos.", imagem: "assets/imagens/MascFemFit.png" },
    { id: 4, nome: "Melatonina Gotas", categoria: "sono", descricao: "Para noites de sono profundo e reparador.", imagem: "assets/imagens/MascFemPote.png" },
    { id: 5, nome: "Polivitamínico", categoria: "nutricao", descricao: "Imunidade e disposição para o dia a dia.", imagem: "assets/imagens/MascMasFit.png" }
];

const consultoras = [
    { nome: "Y", foto: "assets/imagens/MascFem.png", whatsapp: "5581900000000" },
    { id: 2, nome: "X", foto: "assets/imagens/MascMas.png", whatsapp: "5581911111111" }
];

//SELEÇÃO DE ELEMENTOS DA TELA
const productsContainer = document.querySelector('.products-container');
const categoryButtons = document.querySelectorAll('.category-btn');
const btnSorteio = document.getElementById('btnSorteio');
const modal = document.getElementById('modalConsultora');
const fecharModalBtn = document.getElementById('fecharModal');

// FUNÇÃO: RENDERIZAR PRODUTOS
function renderizarProdutos(categoriaFiltro) {
    productsContainer.innerHTML = '';

    const produtosFiltrados = categoriaFiltro === 'todos'
        ? produtos
        : produtos.filter(produto => produto.categoria === categoriaFiltro);

    produtosFiltrados.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" class="product-img">
            <h3>${produto.nome}</h3>
            <button class="view-more-btn" data-id="${produto.id}">Ver Detalhes</button>
        `;
        productsContainer.appendChild(card);
    });
}

// EVENTO: CLIQUE NAS CATEGORIAS
categoryButtons.forEach(botao => {
    botao.addEventListener('click', () => {
        // Remove a classe 'active' de todos os botões
        categoryButtons.forEach(b => b.classList.remove('active'));
        // Adiciona a classe 'active' só no botão clicado
        botao.classList.add('active');

        // Pega a categoria do botão (data-category do HTML) e renderiza
        const categoriaEscolhida = botao.getAttribute('data-category');
        renderizarProdutos(categoriaEscolhida);
    });
});

//FUNÇÃO: SORTEAR CONSULTORA
function sortearConsultora() {
    // Matemática do sorteio
    const indiceSorteado = Math.floor(Math.random() * consultoras.length);
    const consultora = consultoras[indiceSorteado];

    // Preenche o Modal com os dados dela
    document.getElementById('consultoraNome').innerText = consultora.nome;
    document.getElementById('consultoraFoto').src = consultora.foto;

    // Abre o Modal
    modal.classList.add('active');
}

// EVENTOS DO MODAL
btnSorteio.addEventListener('click', sortearConsultora);

fecharModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Inicia a tela mostrando todos os produtos
renderizarProdutos('todos');

//DETALHES DO PRODUTO 
const modalProduto = document.getElementById('modalProduto');
const fecharModalProduto = document.getElementById('fecharModalProduto');
const btnVoltarVitrine = document.getElementById('btnVoltarVitrine');

// Função para abrir e preencher o modal do produto
function abrirDetalhesProduto(id) {
    // Procura o produto correto pelo ID
    const produtoSelecionado = produtos.find(p => p.id === Number(id));

    if (produtoSelecionado) {
        document.getElementById('modalProdutoNome').innerText = produtoSelecionado.nome;
        document.getElementById('modalProdutoFoto').src = produtoSelecionado.imagem;
        document.getElementById('modalProdutoDescricao').innerText = produtoSelecionado.descricao;

        // Abre o modal adicionando a classe active
        modalProduto.classList.add('active');
    }
}

// Evento de clique nos botões "Ver Detalhes"
productsContainer.addEventListener('click', (evento) => {
    if (evento.target.classList.contains('view-more-btn')) {
        const produtoId = evento.target.getAttribute('data-id');
        abrirDetalhesProduto(produtoId);
    }
});

// Fechar o modal de produtos
fecharModalProduto.addEventListener('click', () => modalProduto.classList.remove('active'));
btnVoltarVitrine.addEventListener('click', () => modalProduto.classList.remove('active'));

let tempoInativo;
const tempoLimite = 3 * 60 * 1000; // 3 minutos em milissegundos
const telaVideo = document.getElementById('telaVideoDescanso'); // Você precisará criar esta div no HTML cobrindo a tela toda

function resetarTemporizador() {
    clearTimeout(tempoInativo);
    telaVideo.style.display = 'none'; // Esconde o vídeo quando há interação

    tempoInativo = setTimeout(() => {
        telaVideo.style.display = 'flex'; // Mostra o vídeo após 3 minutos
    }, tempoLimite);
}

// Escuta eventos de toque e clique no totem
window.addEventListener('mousemove', resetarTemporizador);
window.addEventListener('touchstart', resetarTemporizador);
window.addEventListener('click', resetarTemporizador);

// Inicia o contador assim que a página carrega
resetarTemporizador();

// CONTROLE DO AVISO DO MASCOTE
const mascoteAviso = document.getElementById('mascoteAviso');
const fecharAviso = document.getElementById('fecharAviso');

// Permite que o cliente feche o aviso para limpar a tela
fecharAviso.addEventListener('click', () => {
    mascoteAviso.style.display = 'none';
});

//Esconder o aviso automaticamente assim que o cliente clicar no primeiro produto
productsContainer.addEventListener('click', (evento) => {
    if (evento.target.classList.contains('view-more-btn')) {
        mascoteAviso.style.display = 'none';
    }
});