
  window.addEventListener("DOMContentLoaded", () => {
    const nome = document.getElementById("nome").textContent || document.getElementById("nome").value;
    const nascimentoTxt = document.getElementById("nascimento").textContent || document.getElementById("nascimento").value;

    if (nome && nascimentoTxt) {
      let partes = nascimentoTxt.split(/[\/\-]/); 
      if (partes.length === 3) {
        let dia = partes[0].padStart(2, "0");
        let mes = partes[1].padStart(2, "0");
        let ano = partes[2];
        let nascimento = `${ano}-${mes}-${dia}`;

        let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
        // evita duplicar
        if (!eventos.some(ev => ev.date === nascimento && ev.title === "Aniversário de " + nome)) {
          eventos.push({
            date: nascimento,
            title: "Aniversário de " + nome
          });
          localStorage.setItem("eventos", JSON.stringify(eventos));
        }
      }
    }
  });