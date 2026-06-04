// DADOS FALSOS 
const produtos = [
    { id: 1, nome: "Composto Antiox", categoria: "estetica", descricao: "Rejuvenescimento e brilho da pele.", imagem: "assets/imagens/MascFemPote.png" },
    { id: 2, nome: "Whey Isolado Roval", categoria: "fitness", descricao: "Ganho de massa magra com alta pureza.", imagem: "assets/imagens/MascMasFit.png" },
    { id: 3, nome: "Pré-Treino Explosão", categoria: "fitness", descricao: "Energia e foco para seus treinos.", imagem: "assets/imagens/MascFemFit.png" },
    { id: 4, nome: "Melatonina Gotas", categoria: "sono", descricao: "Para noites de sono profundo e reparador.", imagem: "assets/imagens/MascFemPote.png" },
    { id: 5, nome: "Polivitamínico", categoria: "nutricao", descricao: "Imunidade e disposição para o dia a dia.", imagem: "assets/imagens/MascMasFit.png" }
];

const consultoras = [
    {
        nome: "Y",
        foto: "assets/imagens/MascFem.png",
        whatsapp: "5581900000000",
        genero: "feminino",
        qrCode: "assets/imagens/qrcode_fem.png" // O QR Code exclusivo dela
    },
    {
        nome: "X",
        foto: "assets/imagens/MascMas.png",
        whatsapp: "5581911111111",
        genero: "masculino",
        qrCode: "assets/imagens/qrcode_mas.png" // O QR Code exclusivo dele
    }
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

function sortearConsultora() {
    // Sorteio interno 
    const indiceSorteado = Math.floor(Math.random() * consultoras.length);
    const consultora = consultoras[indiceSorteado];

    // Altera o Título de acordo com o gênero
    const tituloModal = document.getElementById('modalConsultoraTitulo');
    if (consultora.genero === "feminino") {
        tituloModal.innerHTML = `Sua consultora é a <span id="consultoraNome">${consultora.nome}</span>`;
    } else {
        tituloModal.innerHTML = `Seu consultor é o <span id="consultorNome">${consultora.nome}</span>`;
    }

    // Atualiza a Foto e o QR Code exato da pessoa sorteada
    document.getElementById('consultoraFoto').src = consultora.foto;
    document.getElementById('qrCodeFoco').src = consultora.qrCode;

    // Monta a mensagem e o link do WhatsApp
    const mensagemAutomatica = consultora.genero === 'feminino'
        ? "Olá! Estava utilizando o totem e gostaria de falar com a farmacêutica."
        : "Olá! Estava utilizando o totem e gostaria de falar com o farmacêutico.";

    const btnWhats = document.getElementById('btnAbrirWhatsapp');
    btnWhats.href = `https://wa.me/${consultora.whatsapp}?text=${encodeURIComponent(mensagemAutomatica)}`;

    // Exibe na tela
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