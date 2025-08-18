
  document.querySelector(".formCadastro").addEventListener("submit", function(e) {
    e.preventDefault(); // não deixa recarregar a página

    const nome = document.getElementById("nome").value;
    const nascimento = document.getElementById("nascimento").value; // yyyy-mm-dd

    if (nome && nascimento) {
      // Salva no localStorage (pra comunicar com o calendário)
      let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
      eventos.push({
        date: nascimento,
        title: "Aniversário de " + nome
      });
      localStorage.setItem("eventos", JSON.stringify(eventos));

      alert("Cadastro enviado e aniversário adicionado no calendário!");
      this.reset(); // limpa formulário
    }
  });

