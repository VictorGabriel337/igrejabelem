window.addEventListener("DOMContentLoaded", () => {
  const nomeEl = document.getElementById("nome");
  const nascimentoEl = document.getElementById("nascimento");

  if (nomeEl && nascimentoEl) {
    const nome = nomeEl.textContent.trim();
    const nascimentoTxt = nascimentoEl.textContent.trim();

    if (nome && nascimentoTxt) {
      let partes = nascimentoTxt.split(/[\/\-]/); // suporta "26/01/2001" ou "26-01-2001"
      if (partes.length === 3) {
        let dia = partes[0].padStart(2, "0");
        let mes = partes[1].padStart(2, "0");

        let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

        // evita duplicar
        if (!eventos.some(ev => ev.dia === dia && ev.mes === mes && ev.title === "Aniversário de " + nome)) {
          eventos.push({
            dia: dia,
            mes: mes,
            title: "Aniversário de " + nome
          });
          localStorage.setItem("eventos", JSON.stringify(eventos));
        }
      }
    }
  }
});
