// Edite este arquivo para preencher os textos do site.
// Cada campo tem um placeholder indicando o que escrever ali.

const ALBUM_DATA = {
  // Cabeçalho / abertura do site
  hero: {
    title: "Sofia & Caio",
    subtitle: "4 anos",
    // Data de início do namoro, usada só como texto de referência (formato livre)
    date: "10/07/2022",
  },

  // Carta de abertura (seção intro)
  intro: "Alguns anos passam. Outros mudam a nossa história.\n\nEste foi o ano em que vimos florescer tudo aquilo que, por tanto tempo, construímos com paciência, esforço e muito amor. Cada conquista teve um significado maior porque nunca foi sobre chegar lá, mas sobre chegar junto com você.\n\nEste álbumzinho é a lembrança de um ano inesquecível, não apenas pelas vitórias, mas por ser uma prévia de tudo que estamos construindo juntos.",

  // Uma entrada por foto, na ordem em que aparecem no scroll (já ordenadas
  // cronologicamente pelas fotos originais em assets/photos/01.jpg..14.jpg).
  sections: [
    { id: 1, photo: "assets/photos/01.jpg", alt: "", caption: "Início de ano", message: "Esse ano foi um ano de muitas conquistas. Fico muito orgulhoso da gente e feliz de dividir isso com você." },
    { id: 3, photo: "assets/photos/03.jpg", alt: "", caption: "Sua defesa de TCC", message: "Uma última missão antes de encerrar um grande ciclo de muita luta. Te vi vencer, e não podia estar mais orgulhoso." },
    { id: 4, photo: "assets/photos/04.jpg", alt: "", caption: "Natal em família", message: "Não podia faltar nosso ritual de natal — meu momento preferido do ano." },
    { id: 6, photo: "assets/photos/06.jpg", alt: "", caption: "Passeio de barco", message: "Só a gente, o mar e a certeza de que qualquer lugar é bom quando é com você." },
    { id: 7, photo: "assets/photos/07.jpg", alt: "", caption: "Virada do ano", message: "Você faz cada momento ser especial. Fechar o ano ao lado da melhor companhia." },
    { id: 8, photo: "assets/photos/08.jpg", alt: "", caption: "Um dia de praia", message: "Sol, sal e você — a combinação perfeita para recarregar as energias." },
    { id: 9, photo: "assets/photos/09.jpg", alt: "", caption: "Pôr do sol", message: "Alguns momentos a gente só quer congelar no tempo. Esse foi um deles." },
    { id: 10, photo: "assets/photos/10.jpg", alt: "", caption: "Seu ensaio de fotos", message: "Ver você brilhar na frente das câmeras é um dos meus prazeres favoritos." },
    { id: 11, photo: "assets/photos/11.jpg", alt: "", caption: "Minha formatura", message: "Fechei um ciclo importante com você na plateia — isso fez toda diferença." },
    { id: 12, photo: "assets/photos/12.jpg", alt: "", caption: "Sua formatura", message: "Assistir você conquistar mais essa foi um dos momentos mais orgulhosos da minha vida." },
    { id: 13, photo: "assets/photos/13.jpg", alt: "", caption: "Nosso primeiro apê", message: "Ainda não caiu a ficha, kkkk. Começamos oficialmente a construir nosso lar." },
  ],

  // Encerramento do site
  outro: {
    title: "Feliz 4 anos, meu amor!",
    message: "Mal posso esperar para viver resto da minha vida com você",
  },
};
