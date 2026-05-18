// DADOS FALSOS (MOCK) - Futuramente virão do Banco de Dados
const produtos = [
    { id: 1, nome: "Composto Antiox", categoria: "estetica", descricao: "Rejuvenescimento e brilho da pele.", imagem: "assets/imagens/MascFemPote.png" },
    { id: 2, nome: "Whey Isolado Roval", categoria: "fitness", descricao: "Ganho de massa magra com alta pureza.", imagem: "assets/imagens/MascMasFit.png" },
    { id: 3, nome: "Pré-Treino Explosão", categoria: "fitness", descricao: "Energia e foco para seus treinos.", imagem: "assets/imagens/MascFemFit.png" },
    { id: 4, nome: "Melatonina Gotas", categoria: "sono", descricao: "Para noites de sono profundo e reparador.", imagem: "assets/imagens/MascFemPote.png" },
    { id: 5, nome: "Polivitamínico", categoria: "nutricao", descricao: "Imunidade e disposição para o dia a dia.", imagem: "assets/imagens/MascMasFit.png" }
];

const consultoras = [
    { nome: "Mariana", foto: "assets/imagens/MascFem.png", whatsapp: "5581900000000" },
    { id: 2, nome: "Roberto", foto: "assets/imagens/MascMas.png", whatsapp: "5581911111111" }
];

//SELEÇÃO DE ELEMENTOS DA TELA
const productsContainer = document.querySelector('.products-container');
const categoryButtons = document.querySelectorAll('.category-btn');
const btnSorteio = document.getElementById('btnSorteio');
const modal = document.getElementById('modalConsultora');
const fecharModalBtn = document.getElementById('fecharModal');

// FUNÇÃO: RENDERIZAR PRODUTOS
function renderizarProdutos(categoriaFiltro) {
    // Limpa a tela
    productsContainer.innerHTML = '';

    // Filtra os produtos. Se for 'todos', pega o array inteiro.
    const produtosFiltrados = categoriaFiltro === 'todos' 
        ? produtos 
        : produtos.filter(produto => produto.categoria === categoriaFiltro);

    // Cria o HTML para cada produto e joga na tela
    produtosFiltrados.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" class="product-img">
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <button class="view-more-btn">Ver Detalhes</button>
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