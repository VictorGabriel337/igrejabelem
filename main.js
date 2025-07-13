 document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault(); // Impede o envio tradicional do formulário

        const nome = document.getElementById('nome').value;
        const nascimento = document.getElementById('Nascimento').value;
        const natural = document.getElementById('nacionalidade').querySelector('input').value;
        const rg = document.getElementById('rg').value;
        const cpf = document.getElementById('cpf').value;
        const telefone = document.getElementById('telefone').value;
        const genero = document.getElementById('genero').value;
        const estadoCivil = document.getElementById('estado-civil').value;
        const Datacasamento = document.getElementById('data-casamento').value;
        const conjuge = document.getElementById('conjuge').value;
        const dataBatismo = document.getElementById('data-batismo').value;
        const igrejaBatismo = document.getElementById('igreja-batismo').value;
        const igrejaAnterior = document.getElementById('igreja-anterior').value;
        const pastor = document.getElementById('pastor').value;
        const servir = document.getElementById('servir').value;



        // Formatação da mensagem
        const mensagem = `*Ficha de Cadastro*\n\nNome: ${nome}\nData de Nascimento: ${nascimento}\nNatural de: ${natural}`;

        // Número do WhatsApp (coloque o DDD e número desejado aqui)
        const numero = '5515996665132'; // Ex: 55 + DDD + número

        // Link do WhatsApp com mensagem
        const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

        // Abre o WhatsApp em nova aba
        window.open(link, '_blank');
    });

