document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  // ===== cadastro.html =====
  if (path.includes("cadastro.html")) {
    const form = document.querySelector(".formCadastro");
    const containerCards = document.querySelector(".container-cards");

    function criarCard(cadastro) {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");

      cardDiv.innerHTML = `
        <div class="card-inner">
          <div class="card-content front">
            <div class="name-profession">
              <span class="name">${cadastro.nome.split(" ")[0]}</span>
              <span class="cargo">${cadastro.cargo || "Membro"}</span>
            </div>
            <div class="cardexp">
              <div class="dados">
                <span>Nome</span>
                <h4 class="nome">${cadastro.nome}</h4>
                <span>Data de nascimento</span>
                <h4 class="nascimento">${cadastro.nascimento}</h4>
                <span>Telefone</span>
                <h4 class="telefone">${cadastro.telefone}</h4>
                <span>Natural de:</span>
                <h4 class="natural">${cadastro.natural}</h4>
              </div>
            </div>
          </div>

          <div class="card-content back">
            <div class="dados">
              <div class="item"><span>Sexo</span><h4 class="sexo">${cadastro.sexo}</h4></div>
              <div class="item"><span>Estado civil</span><h4 class="estado-civil">${cadastro.estadoCivil}</h4></div>
              <div class="item"><span>Conjugue</span><h4 class="Conjugue">${cadastro.conjugue}</h4></div>
              <div class="item"><span>Endereço</span><h4 class="endereço">${cadastro.endereco}</h4></div>
              <div class="item"><span>Bairro</span><h4 class="bairro">${cadastro.bairro}</h4></div>
              <div class="item"><span>Cidade</span><h4 class="cidade">${cadastro.cidade}</h4></div>
              <div class="item"><span>CEP</span><h4 class="cep">${cadastro.cep}</h4></div>
              <div class="item"><span>Batismo</span><h4 class="batismo">${cadastro.batismo}</h4></div>
              <div class="item"><span>Data de emissão</span><h4 class="emissão">${cadastro.dataEmissao}</h4></div>
            </div>
          </div>
        </div>
      `;

      return cardDiv;
    }

    function mostrarCards() {
      const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
      if (containerCards) {
        containerCards.innerHTML = "";
        cadastros.forEach(cadastro => {
          const card = criarCard(cadastro);


          
          containerCards.appendChild(card);

           form.reset();

    // **Aqui, adiciona o reload da página**
    window.location.reload();
        });
      }
    }

 
    if (form) {
     form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById("foto");
  const file = fileInput.files[0];

  let fotoBase64 = null;

  if (file) {
    fotoBase64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const novoCadastro = {
    nome: document.getElementById("nome").value,
    nascimento: document.getElementById("Nascimento").value,
    telefone: document.getElementById("telefone").value,
    natural: document.querySelector("#nacionalidade input").value,
    sexo: document.getElementById("genero").value,
    estadoCivil: document.getElementById("casamento").value,
    conjugue: document.getElementById("conjuge").value,
    endereco: document.getElementById("endereco").value,
    bairro: document.getElementById("bairro").value,
    cidade: document.getElementById("cidade").value,
    cep: document.getElementById("cep").value,
    batismo: document.getElementById("data-batismo").value,
    dataEmissao: new Date().toLocaleDateString("pt-BR"),
    cargo: document.getElementById("servir").value || "Membro",
    foto: fotoBase64
  };

  try {
    const resposta = await fetch("http://localhost:5000/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(novoCadastro)
    });

    
    if (!resposta.ok) {
      throw new Error("Erro ao cadastrar no backend.");
    }

    const resultado = await resposta.json();
    console.log("✅ Cadastro salvo:", resultado);

    // SALVAR NO localStorage
    const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    cadastros.push(novoCadastro);
    localStorage.setItem("cadastros", JSON.stringify(cadastros));

    // Adiciona o card visualmente na página de cadastro
   if (containerCards) {
  const card = criarCard(novoCadastro);
  containerCards.appendChild(card);
}
    form.reset();
  } catch (erro) {
    console.error("❌ Erro no envio:", erro);
    // alert("Erro ao enviar os dados para o servidor.");
  }
});

      mostrarCards();
    }
  }

  // ===== card.html =====
  if (path.includes("card.html")) {
    const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    const container = document.querySelector(".container .content");

    if (container) {
      container.innerHTML = "";

      cadastros.forEach(cadastro => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card");

        cardDiv.innerHTML = `
          <div class="card-inner">
            <div class="card-content front">
              <div class="image">
                <img src="${cadastro.foto || '/img/avatar.png'}" alt="" class="foto">
                <img src="img/logotipoSF.png" alt="" class="logo">
              </div>

              <div class="social-media">
                <i class="fa-solid fa-phone"></i>
                <a href="https://wa.me/${cadastro.telefone}" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
                <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cadastro.endereco)}" target="_blank"><i class="fa-solid fa-house"></i></a>
              </div>

              <div class="name-profession">
                <span class="name">${cadastro.nome.split(" ")[0]}</span>
                <span class="cargo">${cadastro.cargo || "Membro"}</span>
              </div>

              <div class="cardexp">
                <div class="info">
                  <h3>Igreja Evangélica Belém</h3>
                  <span>Rua Rio de Janeiro 147 - JD Tarumã - Jundiai / SP</span>
                  <span>CEP: 13.216-570 CNPJ: 30.614.856/0001-07</span><br>
                  <span>Fone(11) 98583-5359</span>
                </div>
                <div class="dados">
                  <span>Nome</span>
                  <h4 class="nome">${cadastro.nome}</h4>
                  <span>Data de nascimento</span>
                  <h4 class="nascimento">${cadastro.nascimento}</h4>
                  <span>Telefone</span>
                  <h4 class="telefone">${cadastro.telefone}</h4>
                  <span>Natural de:</span>
                  <h4 class="natural">${cadastro.natural}</h4>
                </div>
              </div>

              <div class="frente-verso">
                <i class="fa-solid fa-rotate rotate-btn"></i>
              </div>

              <div class="button">
                <button class="aboutMe">Sobre</button>
                <button class="carteira">Carteira</button>
              </div>
            </div>

            <div class="card-content back">
              <div class="info">
                <h3>Igreja Evangélica Belém</h3>
                <span>Rua Rio de Janeiro 147 - JD Tarumã - Jundiai / SP</span>
                <span>CEP: 13.216-570 CNPJ: 30.614.856/0001-07</span><br>
                <span>Fone(11) 98583-5359</span>
              </div>

              <div class="social-media">
                <i class="fa-solid fa-phone"></i>
                <a href="https://wa.me/${cadastro.telefone}" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
                <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cadastro.endereco)}" target="_blank"><i class="fa-solid fa-house"></i></a>
              </div>

              <div class="dados">
                <div class="item"><span>Sexo</span><h4 class="sexo">${cadastro.sexo}</h4></div>
                <div class="item"><span>Estado civil</span><h4 class="estado-civil">${cadastro.estadoCivil}</h4></div>
                <div class="item"><span>Conjugue</span><h4 class="Conjugue">${cadastro.conjugue}</h4></div>
                <div class="item"><span>Endereço</span><h4 class="endereço">${cadastro.endereco}</h4></div>
                <div class="item"><span>Bairro</span><h4 class="bairro">${cadastro.bairro}</h4></div>
                <div class="item"><span>Cidade</span><h4 class="cidade">${cadastro.cidade}</h4></div>
                <div class="item"><span>CEP</span><h4 class="cep">${cadastro.cep}</h4></div>
                <div class="item"><span>Batismo</span><h4 class="batismo">${cadastro.batismo}</h4></div>
                <div class="item"><span>Data de emissão</span><h4 class="emissão">${cadastro.dataEmissao}</h4></div>
              </div>

              <div class="button">
                <div class="button-back">
                  <button class="aboutMe">Sobre</button>
                  <button class="hireMe">Carteira</button>
                </div>
              </div>

              <div class="frente-verso">
                <i class="fa-solid fa-rotate rotate-btn"></i>
              </div>
            </div>
          </div>
        `;

        container.appendChild(cardDiv);
      });
    }
  }
});


// Supondo que você tenha uma função para criar os cards, ou que eles já existam no DOM:
const container =  document.querySelector(".container");
if(container){
container.addEventListener("click", (event) => {
  // Verifica se o clique foi no botão "Carteira" (classe 'carteira' ou 'hireMe')
  if (event.target.classList.contains("carteira") || event.target.classList.contains("hireMe")) {
    const card = event.target.closest(".card");
    if (!card) return;

    // Toggle na classe 'expandido' para abrir/fechar o card
    card.classList.toggle("expandido");
  }

  // Opcional: se clicar no botão de girar o card, faz o flip
  if (event.target.classList.contains("rotate-btn")) {
    const card = event.target.closest(".card");
    if (!card) return;

    card.classList.toggle("flipped");
  }
});
}
