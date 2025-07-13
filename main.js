 document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault(); // Impede o envio tradicional do formulário

        const nome = document.getElementById('nome').value;
        const nascimento = document.getElementById('Nascimento').value;
        const natural = document.getElementById('nacionalidade').querySelector('input').value;

        // Formatação da mensagem
        const mensagem = `*Ficha de Cadastro*\n\nNome: ${nome}\nData de Nascimento: ${nascimento}\nNatural de: ${natural}`;

        // Número do WhatsApp (coloque o DDD e número desejado aqui)
        const numero = '5515988031611'; // Ex: 55 + DDD + número

        // Link do WhatsApp com mensagem
        const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

        // Abre o WhatsApp em nova aba
        window.open(link, '_blank');
    });

