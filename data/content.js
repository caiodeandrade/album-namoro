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
    { id: 1, photo: "assets/photos/01.jpg", alt: "", caption: "Esse ano foi um ano de muitas conquistas", message: "Fico muito orgulhoso da gente e feliz de dividir isso com você" },
    { id: 3, photo: "assets/photos/03.jpg", alt: "", caption: "Uma ultima missão antes de encerrar um grande ciclo de muita luta", message: "Sua defesa de TCC" },
    { id: 4, photo: "assets/photos/04.jpg", alt: "", caption: "Não podia faltar nosso ritual de natal", message: "Meu momento preferido do ano" },
    { id: 6, photo: "assets/photos/06.jpg", alt: "", caption: "", message: "Passeio de barco" },
    { id: 7, photo: "assets/photos/07.jpg", alt: "", caption: "Você faz cada momento ser especial", message: "Virada de ano ao lado da melhor companhia" },
    { id: 8, photo: "assets/photos/08.jpg", alt: "", caption: "", message: "Pegando uma praia" },
    { id: 9, photo: "assets/photos/09.jpg", alt: "", caption: "", message: "Aproveitando o por do sol" },
    { id: 10, photo: "assets/photos/10.jpg", alt: "", caption: "", message: "Seu ensaio de fotos" },
    { id: 11, photo: "assets/photos/11.jpg", alt: "", caption: "", message: "Minha formatura" },
    { id: 12, photo: "assets/photos/12.jpg", alt: "", caption: "", message: "Sua formatura" },
    { id: 13, photo: "assets/photos/13.jpg", alt: "", caption: "Ainda não caiu a ficha kkkk", message: "Quando compramos nosso primeiro apê" },
  ],

  // Encerramento do site
  outro: {
    title: "Feliz 4 anos, meu amor!",
    message: "Mal posso esperar para viver resto da minha vida com você",
  },
};
