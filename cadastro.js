
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const nascimento = document.getElementById('Nascimento').value;
    const natural = document.getElementById('nacionalidade').querySelector('input').value;
    const telefone = document.getElementById('telefone').value;
    const genero = document.getElementById('genero').value;
    const estadoCivil = document.getElementById('casamento').value;
    const dataCasamento = document.getElementById('data-casamento').value;
    const conjugue = document.getElementById('conjugue').value;

    // Dados dos filhos
  let filhos = [];
const nomesFilhos = document.querySelectorAll('.nome-filho');
const datasFilhos = document.querySelectorAll('.data-nascimento-filho');

nomesFilhos.forEach((inputNome, index) => {
    const nome = inputNome.value.trim();
    const nascimento = datasFilhos[index]?.value.trim() || '';
    if (nome || nascimento) {
        filhos.push(`👶 ${nome} - ${nascimento}`);
    }
});

    // Endereço
    const endereco = document.getElementById('endereco').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const numeroEndereco = document.getElementById('Num-endereco').value;
    const cep = document.getElementById('cep').value;

    // Eclesiásticos
    const dataBatismo = document.getElementById('data-batismo').value;
    const igrejaBatismo = document.getElementById('igreja-batismo').value;
    const igrejaAnterior = document.getElementById('igreja-anterior').value;
    const pastor = document.getElementById('pastor').value;
    const servir = document.getElementById('servir').value;

    const mensagem = `*Ficha de Cadastro*\n
🧍 Nome: ${nome}
🎂 Nascimento: ${nascimento}
🌍 Natural de: ${natural}
📞 Telefone: ${telefone}
⚧️ Gênero: ${genero}
💍 Estado civil: ${estadoCivil}
📅 Data de casamento: ${dataCasamento}
❤️ Cônjuge: ${conjugue}

👶 *Filhos:*
${filhos.join('\n')}

🏠 *Endereço:*
📍 Rua: ${endereco}, Nº: ${numeroEndereco}
🏘️ Bairro: ${bairro} - Cidade: ${cidade}
📮 CEP: ${cep}

⛪ *Dados Eclesiásticos:*
📅 Batismo: ${dataBatismo}
🏛️ Igreja: ${igrejaBatismo}
⛪ Igreja anterior: ${igrejaAnterior}
🙋 Pastor: ${pastor}
🙏 Exercer alguma função: ${servir}
`;

    const numero = '+5511985677575'; // Insira o número de destino
    const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, '_blank');
});

// Estilo para labels flutuantes
document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll(".inputBox input");

    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            if (input.value.trim() !== "") {
                input.classList.add("preenchido");
            } else {
                input.classList.remove("preenchido");
            }
        });
    });
});

// Máscara para datas
function aplicarMascaraData(input) {
    input.addEventListener('input', function () {
        let valor = input.value.replace(/\D/g, '');
        if (valor.length > 8) valor = valor.slice(0, 8);

        let formatado = '';
        if (valor.length >= 5) {
            formatado = valor.slice(0, 2) + '/' + valor.slice(2, 4) + '/' + valor.slice(4);
        } else if (valor.length >= 3) {
            formatado = valor.slice(0, 2) + '/' + valor.slice(2);
        } else {
            formatado = valor;
        }

        input.value = formatado;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const camposData = document.querySelectorAll(
      'input[id*="data"], input[id*="Nascimento"], input[id*="data-batismo"], input.data-nascimento-filho'
    );
    camposData.forEach((input) => aplicarMascaraData(input));
});


// 
const formCadastro =  document.getElementById('form-cadastro');
if(formCadastro){
formCadastro.addEventListener('submit', function (e) {
  e.preventDefault();

  const novoCadastro = {
    nome: document.getElementById('nome').value,
    nascimento: document.getElementById('nascimento').value,
    telefone: document.getElementById('telefone').value,
    natural: document.getElementById('natural').value,
    sexo: document.getElementById('sexo').value,
    estadoCivil: document.getElementById('estadoCivil').value,
    conjugue: document.getElementById('conjugue').value,
    endereco: document.getElementById('endereco').value,
    bairro: document.getElementById('bairro').value,
    cidade: document.getElementById('cidade').value,
    cep: document.getElementById('cep').value,
    batismo: document.getElementById('batismo').value,
    dataEmissao: document.getElementById('dataEmissao').value
  };

  // Recupera os cadastros anteriores
  const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

  // Adiciona o novo cadastro
  cadastros.push(novoCadastro);

  // Salva no localStorage
  localStorage.setItem('cadastros', JSON.stringify(cadastros));

  // Redireciona para a página de cards
  window.location.href = 'card.html';
});
}


document.addEventListener("DOMContentLoaded", function () {
  const inputFoto = document.getElementById("foto");
  const nomeArquivoSpan = document.getElementById("nome-arquivo");

  if (inputFoto && nomeArquivoSpan) {
    inputFoto.addEventListener("change", function () {
      const nome = this.files[0] ? this.files[0].name : "Nenhum arquivo selecionado";
      nomeArquivoSpan.textContent = nome;
    });
  }
});