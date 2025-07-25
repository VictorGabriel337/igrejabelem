document.addEventListener('DOMContentLoaded', function () {
  const hireButtons = document.querySelectorAll('.hireMe');

  hireButtons.forEach(button => {
    button.addEventListener('click', function () {
      const card = button.closest('.card');

      // Fecha todos os outros cards
      document.querySelectorAll('.card').forEach(c => {
        if (c !== card) {
          c.classList.remove('expandido');
        }
      });

      // Alterna o card clicado (abre ou fecha)
      card.classList.toggle('expandido');
    });
  });
});


document.querySelectorAll('.rotate-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.card');
    card.classList.toggle('flipped');
  });
});
