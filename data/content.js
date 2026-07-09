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
    {
      id: 1,
      photo: "assets/photos/01.jpg",
      alt: "",
      caption: "Início do nosso ano",
      message: "Olho para esse ano e vejo muito mais do que conquistas. Vejo tudo o que plantamos ao longo dos últimos anos finalmente dando frutos. E não consigo imaginar alguém melhor para viver tudo isso ao meu lado."
    },
    {
      id: 3,
      photo: "assets/photos/03.jpg",
      alt: "",
      caption: "Sua defesa de TCC",
      message: "Eu conheço cada noite de estudo, cada insegurança e cada esforço que te trouxe até aqui. Ver você apresentar seu TCC foi assistir, de camarote, a mais uma vitória sua."
    },
    {
      id: 4,
      photo: "assets/photos/04.jpg",
      alt: "",
      caption: "Natal em família",
      message: "Nosso Natal já virou tradição. Estar ao seu lado, cercado das pessoas que amamos, é uma daquelas coisas simples que fazem a vida parecer completa."
    },
  
    {
      id: 6,
      photo: "assets/photos/06.jpg",
      alt: "",
      caption: "Passeio de barco",
      message: "Depois de 4/5 longos anos de faculdade chegou a tão merecida temporada de ir pra praia descansar"
    },
    {
      id: 7,
      photo: "assets/photos/07.jpg",
      alt: "",
      caption: "Virada do ano",
      message: "Alguns fazem promessas para o ano novo. Eu só agradeci por você estar ali."
    },
    {
      id: 10,
      photo: "assets/photos/10.jpg",
      alt: "",
      caption: "Seu ensaio de fotos",
      message: "É impossível olhar para essas fotos sem sentir orgulho da mulher incrível que você se tornou."
    },
    {
      id: 11,
      photo: "assets/photos/11.jpg",
      alt: "",
      caption: "Minha formatura",
      message: "Receber meu diploma foi especial. Procurar você na plateia e saber que esteve comigo durante todo esse caminho tornou aquele momento inesquecível."
    },
    {
      id: 12,
      photo: "assets/photos/12.jpg",
      alt: "",
      caption: "Sua formatura",
      message: "Ver você subir naquele palco foi emocionante. Eu sabia o quanto aquele diploma representava e senti como se aquela conquista também fosse um pouquinho nossa."
    },
    {
      id: 13,
      photo: "assets/photos/13.jpg",
      alt: "",
      caption: "Nosso primeiro apê",
      message: "Talvez essa seja a foto que melhor representa este ano. Não compramos apenas um apartamento; demos um dos maiores passos da nossa história e começamos a construir o lugar que um dia chamaremos de lar."
    },
  ],

  // Encerramento do site
  outro: {
    title: "Feliz 4 anos, meu amor!",
    message: "Mal posso esperar para viver resto da minha vida com você",
  },
};
