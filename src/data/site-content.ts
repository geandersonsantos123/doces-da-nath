import { ORDER_MIN_LEAD_DAYS } from "@/constants/commerce";

export type SiteNavigationItem = {
  label: string;
  href: `#${string}`;
};

export const BRAND_ASSETS = {
  horizontalLogo:
    "/assets/cloudinary/ChatGPT_Image_17_de_jul._de_2026_18_20_08_1_x89pld.webp",
  cakeIcon:
    "/assets/cloudinary/9924fb9a-f91f-47ca-8976-c767a5abe91b_1_uqobra.webp",
  circularLogo:
    "/assets/cloudinary/a2b3eabb-ea2e-46fc-8837-a715521129f6_1_bkapxg.webp",
  hero:
    "/assets/cloudinary/9e008be6-736f-4ae2-881f-c76420f940d1_smv0q2.webp",
  aboutNath:
    "/assets/cloudinary/1441de50-bdec-497c-bd6f-dfa78c9f4e4f_bxb8sm.webp",
  vipClubSeal:
    "/assets/cloudinary/a2b3eabb-ea2e-46fc-8837-a715521129f6_1_bkapxg.webp",
} as const;

export const SITE_CONTENT = {
  brandName: "Doces da Nath",
  navigation: [
    { label: "Cardápio", href: "#cardapio" },
    { label: "Sobre a Nath", href: "#sobre-a-nath" },
    { label: "Festival", href: "#festival-de-fatias" },
    { label: "Clube VIP", href: "#clube-vip" },
    { label: "FAQ", href: "#faq" },
  ] satisfies readonly SiteNavigationItem[],
  preloader: {
    message: "Preparando algo especial para você",
  },
  hero: {
    eyebrow: "CONFEITARIA ARTESANAL • FEITA COM AFETO",
    titleLead: "Doces que transformam momentos em",
    titleEmphasis: "memórias afetivas.",
    support:
      "Bolos, doces e experiências artesanais preparados com cuidado, sabor e atenção em cada detalhe.",
    primaryAction: {
      label: "Ver cardápio",
      href: "#cardapio",
    },
    secondaryAction: {
      label: "Conhecer o Clube VIP",
      href: "#clube-vip",
    },
    trust:
      "Encomendas personalizadas • Retirada ou entrega • Atendimento pelo WhatsApp",
    imageAlt:
      "Nathaly Silva segurando um bolo artesanal da Doces da Nath",
  },
  authority: [
    "Produção artesanal",
    "Ingredientes selecionados",
    "Apresentação cuidadosa",
    "Encomendas especiais",
    "Feito com carinho",
  ],
  rollers: {
    pillarsTop: [
      "Feito com afeto",
      "Sabor artesanal",
      "Detalhes que encantam",
    ],
    pillarsBottom: [
      "Cuidado em cada pedido",
      "Receitas artesanais",
      "Momentos memoráveis",
    ],
    about: [
      "Cuidado em cada detalhe",
      "Sabor com memória",
      "Feito com afeto",
      "Apresentação delicada",
    ],
    order: [
      "Encomendas especiais",
      "Sabores artesanais",
      "Momentos para celebrar",
      "Seu pedido com carinho",
    ],
  },
  catalog: {
    eyebrow: "ESCOLHA SEU MOMENTO DOCE",
    title: "O que você gostaria de saborear hoje?",
    support:
      "Explore nosso cardápio, escolha seus favoritos e monte seu pedido de forma simples.",
    unavailableFeaturedLabel: "Em breve",
    floatingActionLabel: "Abrir cardápio completo",
    floatingActionShortLabel: "Cardápio",
    windowEyebrow: "CARDÁPIO COMPLETO",
    windowTitle: "Escolha seus doces",
  },
  productDetail: {
    addedFeedback: "Item adicionado ao carrinho.",
  },
  brandPillars: {
    eyebrow: "DIFERENCIAIS",
    titleLead: "Nossos 3 pilares",
    titleConnector: "aqui na",
    support:
      "Cada pedido une sabor, cuidado e apresentação para transformar doces artesanais em momentos memoráveis.",
    items: [
      {
        title: "Feito com afeto",
        description:
          "Cada pedido é preparado com cuidado, pensando no sabor, na apresentação e no momento de quem vai receber.",
      },
      {
        title: "Sabor artesanal",
        description:
          "Receitas, combinações e acabamentos pensados para entregar um doce bonito, marcante e gostoso de verdade.",
      },
      {
        title: "Detalhes que encantam",
        description:
          "Da escolha dos sabores à apresentação final, tudo é tratado com atenção para transformar o pedido em experiência.",
      },
    ],
  },
  aboutNath: {
    eyebrow: "SOBRE A NATH",
    title: "Por trás de cada doce, existe cuidado.",
    portraitCaption:
      "A Nath cuida de cada pedido como parte de uma celebração.",
    name: "Nathaly Silva",
    role: "Confeiteira por trás da Doces da Nath",
    paragraphs: [
      "A Doces da Nath nasceu do cuidado em transformar receitas artesanais em momentos especiais.",
      "Cada pedido é pensado com atenção aos sabores, à apresentação e à ocasião de quem recebe. Mais do que doces bonitos, a Nath prepara experiências com sabor, presença e memória afetiva.",
    ],
    imageAlt:
      "Nathaly Silva, especialista da Doces da Nath, ao lado de um bolo decorado",
    action: {
      label: "Ver cardápio",
      href: "#cardapio",
    },
  },
  festival: {
    eyebrow: "Um ritual doce de fim de semana",
    title: "Sexta e sábado têm sabor de fatia.",
    description:
      "Nosso Festival de Fatias é feito para transformar seu fim de semana. Consulte os sabores da semana e garanta a sua com antecedência.",
    schedule: [
      {
        label: "Toda sexta e sábado",
        icon: "calendar",
      },
      {
        label: "A partir das 18h",
        icon: "clock",
      },
      {
        label: "Enquanto durar o estoque",
        icon: "stock",
      },
    ],
    cta: "Quero reservar minha fatia",
    microcopy:
      "O envio da mensagem inicia o atendimento. Sabores, quantidade e reserva dependem da confirmação da Nath.",
    whatsappMessage:
      "Olá, Nath! Vim pelo site e quero reservar uma fatia no Festival de Fatias. Poderia me informar os sabores disponíveis para sexta ou sábado e confirmar a disponibilidade?",
    images: {
      mobile: "/images/festival-de-fatias/festival-de-fatias-mobile.jpg",
      desktop: "/images/festival-de-fatias/festival-de-fatias-desktop.jpg",
    },
    imageAlt:
      "Banner do Festival de Fatias da Doces da Nath com diferentes fatias de bolo artesanais",
  },
  vipClub: {
    eyebrow: "NOVIDADES EM PRIMEIRA MÃO",
    title: "Entre para o Clube VIP da Nath",
    lead: "Receba novidades, promoções e sabores especiais direto no WhatsApp.",
    description:
      "O Clube VIP é o espaço para quem quer acompanhar de perto as produções da Nath, saber quando a agenda abrir, aproveitar condições especiais e descobrir sabores exclusivos antes de todo mundo.",
    benefits: [
      {
        title: "Promoções especiais",
        description:
          "Ofertas e condições divulgadas primeiro para quem está no grupo.",
      },
      {
        title: "Avisos de agenda",
        description:
          "Saiba quando a agenda abrir e se programe com antecedência.",
      },
      {
        title: "Sabores exclusivos",
        description:
          "Novidades, testes e combinações especiais para quem acompanha de perto.",
      },
      {
        title: "Pronta entrega",
        description:
          "Receba avisos quando houver doces disponíveis para retirada ou entrega rápida.",
      },
    ],
    actionLabel: "Entrar no Clube VIP",
    actionHref: "https://tally.so/r/Xx7JlY",
  },
  socialProof: {
    eyebrow: "PROVA SOCIAL",
    title: "Carinho que aparece nos detalhes",
    support:
      "Feedbacks reais de quem já experimentou os doces da Nath e voltou querendo mais.",
    items: [
      {
        quote: [
          "Amei o bolo, voltarei sempre! 👏👏",
          "Muito bom 😋😋",
          "Hoje foi Ferrero Rocher.",
        ],
        signature: "Cliente da Nath",
      },
      {
        quote: [
          "Que bolo gostoso, meu Deus do céu!",
          "Que delícia de bolo, virei cliente! ❤️",
          "Pena que não deu nem tempo de tirar foto pra postar.",
        ],
        signature: "Cliente da Nath",
      },
      {
        quote: [
          "Que delícia de bolo! Comprei a fatia de ferrero na pracinha e quero te dizer BOLO GOSTOSO MEU DEUS DO CÉU.",
        ],
        signature: "Cliente da Nath",
      },
      {
        quote: [
          "Menina, você tem mãos de fada!",
          "Juro que nunca comi nada tão gostoso na minha vida. 🥹",
        ],
        signature: "Cliente da Nath",
      },
      {
        quote: [
          "Comprei ontem na pracinha, meu Deus que delícia. Amei! 😍",
        ],
        signature: "Cliente da Nath",
      },
    ],
    closing: "Obrigada por fazerem parte da nossa história!",
  },
  howToOrder: {
    eyebrow: "DO CARDÁPIO AO ATENDIMENTO",
    title: "Como fazer seu pedido",
    support:
      "Escolha seus doces favoritos, revise os detalhes e envie tudo para a Nath pelo WhatsApp.",
    steps: [
      {
        number: "01",
        title: "Escolha no cardápio",
        description:
          "Veja as opções disponíveis e escolha o produto que combina com o seu momento.",
      },
      {
        number: "02",
        title: "Configure os detalhes",
        description:
          "Selecione tamanho, sabor, quantidade e informe observações quando necessário.",
      },
      {
        number: "03",
        title: "Revise o carrinho",
        description:
          "Confira os itens, quantidades e subtotal antes de continuar.",
      },
      {
        number: "04",
        title: "Envie pelo WhatsApp",
        description:
          "Finalize com os dados mínimos e envie a mensagem pronta para a Nath confirmar disponibilidade, entrega e pagamento.",
      },
    ],
    notice: "O pedido só é confirmado após o atendimento da Nath pelo WhatsApp.",
  },
  faq: {
    eyebrow: "INFORMAÇÕES IMPORTANTES",
    title: "Dúvidas frequentes",
    support:
      "Algumas informações são combinadas diretamente no atendimento para garantir disponibilidade e personalização.",
    items: [
      {
        question: "O pedido é confirmado automaticamente pelo site?",
        answer:
          "Não. O site organiza as informações e envia o pedido pelo WhatsApp. A confirmação acontece durante o atendimento da Nath.",
      },
      {
        question: "A taxa de entrega já está incluída?",
        answer:
          "Não. O subtotal exibido considera apenas os itens escolhidos. A disponibilidade e a taxa de entrega são confirmadas no atendimento.",
      },
      {
        question: "Posso retirar o pedido?",
        answer:
          "Sim, a retirada pode ser combinada no atendimento. Local e horário serão confirmados pela Nath.",
      },
      {
        question: "Posso pedir personalização?",
        answer:
          "Sim. Você pode informar observações no produto ou no pedido. Personalizações, cores, mensagens e detalhes especiais são confirmados no atendimento.",
      },
      {
        question: "As formas de pagamento já estão definidas?",
        answer:
          "Ainda não foram publicadas no site. Por enquanto, a forma de pagamento fica como “a combinar no atendimento”.",
      },
      {
        question: "Com quanto tempo de antecedência devo pedir?",
        answer: `Pedidos devem ser feitos com pelo menos ${ORDER_MIN_LEAD_DAYS} dias de antecedência. Informe a data desejada no pedido para a Nath confirmar a disponibilidade.`,
      },
      {
        question: "Os preços podem mudar?",
        answer:
          "Os valores do cardápio são usados para montar o subtotal. Itens marcados com confirmação ou personalizações especiais podem ser ajustados no atendimento.",
      },
    ],
  },
  finalCta: {
    eyebrow: "SEU MOMENTO, DO SEU JEITO",
    title: "Pronta para adoçar seu momento?",
    support:
      "Monte seu pedido com calma e envie tudo organizado para a Nath pelo WhatsApp.",
    primaryAction: {
      label: "Ver cardápio",
      href: "#cardapio",
    },
    secondaryAction: "Abrir carrinho",
  },
  footer: {
    brandStatement:
      "Doces feitos com carinho para transformar momentos em memórias afetivas.",
    navigationLabel: "Navegação",
    navigation: [
      { label: "Cardápio", href: "#cardapio" },
      { label: "Como pedir", href: "#como-pedir" },
      { label: "FAQ", href: "#faq" },
    ] satisfies readonly SiteNavigationItem[],
    contactLabel: "Fale com a Nath",
    instagram: {
      label: "@doces.da.nath_",
      href: "https://www.instagram.com/doces.da.nath_?igsh=MTIwZ3Q1aGFwZ3JtMA==",
    },
    whatsapp: {
      label: "+55 27 99508-2631",
      href: "https://wa.me/5527995082631",
    },
    contactHelp:
      "Para pedidos, prefira montar o carrinho e enviar a mensagem pronta pelo site.",
    confirmationNotice:
      "Pedidos, disponibilidade, entrega, retirada, pagamento e personalizações são confirmados pelo atendimento.",
    rights: "© 2026 Doces da Nath. Todos os direitos reservados.",
  },
} as const;
