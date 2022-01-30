import primeiraImagem from '/public/images/background-0.jpg';
import segundaImagem from '/public/images/background-1.jpg';
import terceiraImagem from '/public/images/background-2.jpg';

const imagens = [
  primeiraImagem,
  segundaImagem,
  terceiraImagem,
];

export default function GerarImagensAleatorias() {
  const imagemEscolhida = Math.random(imagens.length);

  return imagens[imagemEscolhida];
}