document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const backendURL = "https://igrejabelem.onrender.com";

  // ===== cadastro.html =====
  if (path.includes("cadastro.html")) {
    const form = document.querySelector(".formCadastro");
    const containerCards = document.querySelector(".container-cards");
    // if (!container) return;

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
            <div class="frente-verso">
              <i class="fa-solid fa-rotate rotate-btn"></i>
            </div>
            <div class="button">
              <button class="aboutMe">Sobre</button>
              <button class="carteira">Carteira</button>
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
      return cardDiv;
    }

  async function mostrarCards() {
  try {
    const resposta = await fetch(`${backendURL}/cadastros`);
    // const resposta = await fetch("http://localhost:5000/cadastros");
    const cadastros = await resposta.json();
    if (!Array.isArray(cadastros)) {
      throw new Error("Resposta inválida do backend");
    }

    if (containerCards) {
      containerCards.innerHTML = "";
      cadastros.forEach(cadastro => {
        const card = criarCard(cadastro);
        containerCards.appendChild(card); // ✅ corrigido
      });
    }
  } catch (erro) {
    console.error("Erro ao buscar cadastros:", erro);
  }
}

    // function mostrarCards() {
    //   // const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    //   if (containerCards) {
    //     containerCards.innerHTML = "";
    //     cadastros.forEach(cadastro => {
    //       const card = criarCard(cadastro);
    //       containerCards.appendChild(card);
    //     });
    //   }
    // }

    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const fileInput = document.getElementById("foto");
        const file = fileInput ? fileInput.files[0] : null;

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
          nascimento: document.getElementById("nascimento").value,
          telefone: document.getElementById("telefone").value,
          natural: document.querySelector("#naturalidade input").value,
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
          const resposta = await fetch(`${backendURL}/cadastrar`, {
            //  const resposta = await fetch("http://localhost:5000/cadastrar", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(novoCadastro)
          });

          if (!resposta.ok) {
            throw new Error("Erro ao cadastrar no backend.");
          }

          // Adiciona o card visualmente na página de cadastro
          if (containerCards) {
            const card = criarCard(novoCadastro);
            containerCards.appendChild(card);
          }
          form.reset();
        } catch (erro) {
          console.error("❌ Erro no envio:", erro);
        }
      });

      mostrarCards();
    }
  }

  // ===== card.html =====
  if (path.includes("card.html")) {
    fetch(`${backendURL}/cadastros`)
    // fetch("http://localhost:5000/cadastros")
      .then(response => response.json())
      .then(cadastros => {

          console.log("🔎 Conteúdo da resposta da API:", cadastros);

  if (!Array.isArray(cadastros)) {
    throw new Error("Resposta da API não é um array");
  }

        const container = document.querySelector(".container .content");
        container.innerHTML = "";

        cadastros.forEach(cadastro => {
          const cardDiv = document.createElement("div");
          cardDiv.classList.add("card");

          cardDiv.innerHTML = `
            <div class="card-inner">
              <div class="card-content front">
                <div class="image">
                <img src="${cadastro.foto ? cadastro.foto : '/img/avatar.png'}" alt="" class="foto">
                  <img src="img/logotipoSF.png" alt="" class="logo">
                </div>
                <div class="social-media">
                  <i class="fa-solid fa-phone"></i>
                  <a href="https://wa.me/${cadastro.telefone}" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
                  <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cadastro.endereco)}" target="_blank"><i class="fa-solid fa-house"></i></a>
                </div>
                <div class="name-profession">
                  <span class="name">${cadastro.nome?.split(" ")[0]}</span>
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
          // container.innerHTML += cardHTML;
          container.appendChild(cardDiv);
        });
      })
      .catch(erro => {
        console.error("Erro ao buscar cadastros do servidor:", erro);
      });

    // Eventos de clique para expandir/girar os cards
    const mainContainer = document.querySelector(".container");
    if (mainContainer) {
      mainContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("carteira") || event.target.classList.contains("hireMe")) {
          const card = event.target.closest(".card");
          if (!card) return;
          card.classList.toggle("expandido");
        }
        if (event.target.classList.contains("rotate-btn")) {
          const card = event.target.closest(".card");
          if (!card) return;
          card.classList.toggle("flipped");
        }
      });
    }
  }
});