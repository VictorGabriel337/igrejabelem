const inputFoto = document.getElementById("fotoInput"); // seu input file
const reader = new FileReader();

reader.onload = function(e) {
  const base64Image = e.target.result; // imagem em base64

  const novoCadastro = {
    nome:"..." ,
    telefone:"..." ,
    // seus outros campos
    foto: base64Image, // guarda a imagem junto no cadastro
  };

  // salvar no localStorage, etc
};

if (inputFoto.files[0]) {
  reader.readAsDataURL(inputFoto.files[0]);
} else {
  // salvar cadastro sem foto ou com imagem padrão
}
