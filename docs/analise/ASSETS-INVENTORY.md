# Inventário de assets - Doces da Nath

## Escopo e fonte

Este inventário consolida os cinco assets oficiais informados para o projeto. As URLs abaixo são as fontes originais e não devem ser alteradas no cadastro documental.

A inspeção foi feita diretamente nas URLs, sem mover ou baixar os arquivos para `public/`. As dimensões e os pesos marcados como "observados" vieram da resposta atual do Cloudinary em 17 de julho de 2026. Isso permitiu identificar duas divergências entre as dimensões informadas no briefing e os arquivos efetivamente entregues pelas URLs.

As sete imagens conceituais continuam em `referencias-visuais/`, embora o briefing cite `docs/referencias-visuais/`. Elas orientam composição e comportamento, mas não são assets de produção nem fonte de produtos reais.

## Visão geral

| Asset | Papel | Dimensão observada | Proporção | Peso observado | Carregamento recomendado |
| --- | --- | ---: | ---: | ---: | --- |
| 01. Logo horizontal | Identidade | 1080 × 270 px | 4:1 | 59.116 bytes | Cedo, em versão reduzida |
| 02. Ícone do bolo | Identidade e decoração | 1080 × 1080 px | 1:1 | 86.058 bytes | Tardio, salvo uso inicial indispensável |
| 03. Logo circular | Identidade | 1080 × 1080 px | 1:1 | 130.466 bytes | Versão pequena no preloader; lazy no footer |
| 04. Hero mobile | Conteúdo e identidade | 941 × 1672 px | Aproximadamente 9:16 | 100.198 bytes | Prioridade máxima |
| 05. Sobre a Nath | Conteúdo e autoridade | 1122 × 1402 px | Aproximadamente 4:5 | 129.700 bytes | Lazy loading |

Todos os arquivos respondem como `image/webp` e possuem cache público imutável no Cloudinary.

## Asset 01 - Logo horizontal da navbar

**URL oficial:**

`https://res.cloudinary.com/dm9mnc97u/image/upload/v1784323290/ChatGPT_Image_17_de_jul._de_2026_18_20_08_1_x89pld.webp`

- **Função principal:** identificar a marca de forma legível no header, menu mobile e assinaturas horizontais.
- **Classificação:** identidade; não é conteúdo editorial nem simples decoração.
- **Melhor posição:** centro ou início do header, conforme a distribuição de menu e carrinho. Pode reaparecer no menu mobile, mas não deve ser repetida em excesso.
- **Mobile:** usar uma derivação pequena, com largura visual aproximada entre 150 e 190 px, sem comprimir a área dos botões de menu e carrinho.
- **Desktop:** pode crescer moderadamente, mantendo o header compacto; faixa visual aproximada entre 190 e 240 px.
- **Proporção original observada:** 1080 × 270 px, proporção 4:1.
- **Possibilidade de recorte:** não recomendada. O ícone, o nome e a palavra "Confeitaria" formam uma assinatura única.
- **Área que não pode ser cortada:** todo o desenho, especialmente o ícone à esquerda, as extremidades do nome e as linhas inferiores.
- **Ponto focal:** conjunto central da assinatura; não há um único ponto isolado.
- **Fundo transparente:** visualmente parece preparado para sobreposição, mas o canal alfa não foi confirmado nesta etapa. Confirmar antes da implementação final.
- **Contraste adicional:** o dourado perde força sobre off-white e champagne. Testar em tamanho real; se ficar fraco, usar superfície mais clara, uma variante chocolate da marca ou outro arquivo oficial, sem aplicar sombra pesada.
- **Texto alternativo sugerido:** `Doces da Nath Confeitaria`, quando o logo for a identificação acessível principal. Usar alt vazio se o mesmo nome já estiver disponível no link ou título adjacente.
- **Prioridade:** alta, porém abaixo do hero. Deve carregar cedo em uma versão ajustada ao tamanho real do header.
- **Lazy loading:** não, quando estiver no header inicial. Repetições abaixo da dobra podem ser lazy.
- **Risco de legibilidade:** caligrafia fina e subtítulo espaçado podem perder leitura em larguras muito pequenas.
- **Risco de desempenho:** baixo no arquivo atual, mas é desnecessário entregar 1080 px para uma marca exibida perto de 200 px.
- **Transformações Cloudinary:** recomendado gerar larguras adequadas ao header, com qualidade e formato automáticos, sem ampliar acima da fonte.
- **Fallback necessário:** nome textual acessível da marca e, se fornecida, uma versão oficial em SVG ou PNG transparente. O header não deve perder altura nem navegação se a imagem falhar.

## Asset 02 - Ícone do bolo

**URL oficial:**

`https://res.cloudinary.com/dm9mnc97u/image/upload/v1784323352/9924fb9a-f91f-47ca-8976-c767a5abe91b_1_uqobra.webp`

- **Função principal:** criar continuidade visual entre seções e reforçar a assinatura da marca.
- **Classificação:** identidade quando usado como símbolo da marca; decoração quando usado como divisor ou detalhe.
- **Melhor posição:** divisores, estados vazios do catálogo/carrinho, detalhe central de transição e bloco final. Em botões funcionais, preferir ícones simples e reconhecíveis; este símbolo pode acompanhar, mas não substituir o significado da ação.
- **Mobile:** usar entre 24 e 48 px em detalhes e até cerca de 72 px em um divisor destacado. Evitar miniaturizar a ponto de perder os traços.
- **Desktop:** pode chegar a 64-96 px em transições, mantendo bastante espaço ao redor.
- **Proporção original observada:** 1080 × 1080 px, proporção 1:1.
- **Possibilidade de recorte:** somente o espaço externo excedente, se confirmado visualmente; não cortar laço, prato ou base.
- **Área que não pode ser cortada:** silhueta completa do bolo e pedestal.
- **Ponto focal:** centro geométrico do bolo.
- **Fundo transparente:** necessário para os usos previstos, mas não confirmado tecnicamente nesta etapa. A inspeção mostra uma superfície clara uniforme; verificar se é transparência ou fundo incorporado.
- **Contraste adicional:** os traços dourados são finos. Sobre off-white, o ícone deve ser maior ou possuir variante chocolate. Não usar como único indicador de estado.
- **Texto alternativo sugerido:** alt vazio em divisores e detalhes. Em uso informativo isolado: `Símbolo de bolo da Doces da Nath`.
- **Prioridade:** baixa ou média, conforme a primeira ocorrência.
- **Lazy loading:** sim para usos abaixo da dobra. Uma versão pequena pode ser antecipada somente se entrar em estado vazio visível ou transição inicial.
- **Risco de legibilidade:** alto em favicon de 16 px e em botões pequenos por causa dos detalhes finos.
- **Risco de desempenho:** baixo no peso atual, mas alto se o arquivo de 1080 px for repetido sem redimensionamento.
- **Transformações Cloudinary:** recomendado criar versões pequenas e nítidas para 32, 48, 64 e 96 px, preservando proporção.
- **Fallback necessário:** ícone funcional da biblioteca escolhida ou divisor textual/linha simples. Para favicon, provavelmente será necessária uma versão oficial simplificada e testada em 16, 32 e 48 px.

## Asset 03 - Logo circular

**URL oficial:**

`https://res.cloudinary.com/dm9mnc97u/image/upload/v1784326884/a2b3eabb-ea2e-46fc-8837-a715521129f6_1_bkapxg.webp`

- **Função principal:** assinatura institucional compacta para preloader, footer e encerramentos.
- **Classificação:** identidade.
- **Melhor posição:** centro do preloader e topo do footer escuro. Pode funcionar como avatar institucional, desde que não substitua uma foto real quando o contexto pedir a Nath.
- **Mobile:** no preloader, usar uma versão reduzida que apareça imediatamente e não atrase a abertura; no footer, aproximadamente 88-120 px.
- **Desktop:** aproximadamente 120-180 px, sem competir com o conteúdo principal.
- **Proporção original observada:** 1080 × 1080 px, proporção 1:1.
- **Possibilidade de recorte:** não. O contorno circular e as palavras fazem parte da marca.
- **Área que não pode ser cortada:** circunferência completa, textos superior e inferior e símbolo central.
- **Ponto focal:** símbolo de bolo no centro, apoiado pelo texto circular.
- **Fundo transparente:** necessário para preloader e footer; aparência sugere sobreposição, mas o canal alfa permanece pendente de confirmação.
- **Contraste adicional:** funciona melhor sobre chocolate. Em fundo off-white, os traços dourados podem ficar discretos demais.
- **Texto alternativo sugerido:** `Logo circular da Doces da Nath Confeitaria`, quando informativo; alt vazio se o nome da marca já estiver presente no mesmo bloco.
- **Prioridade:** média. Se usado no preloader, carregar uma versão pequena cedo, sem competir com a prioridade do hero e sem fazer o preloader esperar a imagem.
- **Lazy loading:** sim no footer. Não no preloader, caso essa experiência seja mantida.
- **Risco de legibilidade:** as letras circulares perdem definição em tamanhos pequenos; não usar como favicon sem teste.
- **Risco de desempenho:** moderado para um elemento de marca, pois o arquivo original tem 1080 px e cerca de 130 KB.
- **Transformações Cloudinary:** recomendado gerar versão pequena para preloader/footer e permitir formato/qualidade automáticos.
- **Fallback necessário:** ícone do bolo ou nome textual da marca. O preloader deve encerrar por tempo curto e seguro mesmo se este asset falhar.

## Asset 04 - Hero mobile

**URL oficial:**

`https://res.cloudinary.com/dm9mnc97u/image/upload/v1784327786/9e008be6-736f-4ae2-881f-c76420f940d1_smv0q2.webp`

- **Função principal:** apresentar a Nath, o universo da confeitaria e a identidade visual logo na abertura.
- **Classificação:** conteúdo e identidade; não é decoração genérica.
- **Melhor posição:** hero mobile, ocupando a área visual principal e servindo como fundo editorial para título, texto curto e CTA.
- **Mobile:** preservar a proporção próxima de 9:16 e aproveitar a área negativa à esquerda para a copy. O container pode ser um pouco mais baixo que a imagem completa, desde que rosto, tronco e bolo permaneçam visíveis. A copy não deve cobrir a Nath nem o bolo.
- **Desktop:** ainda não existe uma versão horizontal oficial. Até que exista, usar o retrato como camada alinhada à direita dentro de uma faixa ampla off-white, com texto na área limpa e sem esticar a foto. Não aplicar `cover` em um hero muito largo se isso cortar a Nath ou o bolo.
- **Proporção informada:** 1080 × 1920 px, 9:16.
- **Proporção observada na URL:** 941 × 1672 px, aproximadamente 9:16. A diferença deve ser registrada e validada com a fonte do asset.
- **Possibilidade de recorte:** moderada apenas nas bordas e no espaço negativo. Evitar recorte agressivo vertical ou à direita.
- **Área que não pode ser cortada:** rosto e cabelo da Nath, mãos/torso suficientes para leitura humana e o bolo decorado no canto inferior direito.
- **Ponto focal:** rosto da Nath, seguido pelo bolo; ponto de enquadramento sugerido próximo ao lado direito e à metade superior.
- **Fundo transparente:** não necessário; trata-se de uma fotografia/composição completa.
- **Contraste adicional:** a área esquerda é clara e aceita texto chocolate. Validar contraste sobre a imagem real; se necessário, usar uma camada sólida off-white discreta, sem transformar a copy em card e sem cobrir elementos importantes.
- **Texto alternativo sugerido:** `Nath, confeiteira da Doces da Nath, ao lado de um bolo decorado.`
- **Prioridade:** máxima. É o principal candidato a LCP e deve ser o único asset de imagem com prioridade alta.
- **Lazy loading:** não.
- **Risco de legibilidade:** copy longa ou botões largos podem invadir a figura no mobile. A composição exige teste em 390 e 430 px.
- **Risco de desempenho:** controlado no peso atual, mas a versão original não deve ser ampliada nem entregue em largura exagerada. O preloader não pode atrasar este carregamento.
- **Transformações Cloudinary:** recomendado servir larguras próximas de 640, 828 e no máximo a largura real da fonte, com qualidade e formato automáticos. Não ampliar além de 941 px.
- **Fallback necessário:** fundo off-white, copy e CTAs completamente utilizáveis sem a imagem. Uma futura foto horizontal oficial é o fallback ideal para desktop; a foto da seção Sobre não deve ser promovida automaticamente a hero sem aprovação.

## Asset 05 - Sobre a Nath / especialista

**URL oficial:**

`https://res.cloudinary.com/dm9mnc97u/image/upload/v1784327795/1441de50-bdec-497c-bd6f-dfa78c9f4e4f_bxb8sm.webp`

- **Função principal:** humanizar a marca e reforçar autoridade, cuidado artesanal e autoria.
- **Classificação:** conteúdo e prova de identidade.
- **Melhor posição:** seção "Sobre a Nath", próxima a uma biografia curta e atributos reais do trabalho.
- **Mobile:** exibir em 4:5, em largura total do container, antes ou logo após o título. Não sobrepor parágrafos sobre a foto.
- **Desktop:** composição em duas áreas dentro da mesma seção, com retrato 4:5 e texto ao lado, sem transformar a imagem em card decorativo.
- **Proporção informada:** 1080 × 1350 px, 4:5.
- **Proporção observada na URL:** 1122 × 1402 px, aproximadamente 4:5. A diferença deve ser confirmada com a fonte do asset.
- **Possibilidade de recorte:** pequeno recorte lateral e de fundo é aceitável; recorte vertical agressivo não.
- **Área que não pode ser cortada:** rosto, mãos e bolo. Esses três elementos contam a história de autoria e produto.
- **Ponto focal:** rosto da Nath e bolo de chocolate, ambos centralizados na leitura da imagem.
- **Fundo transparente:** não necessário.
- **Contraste adicional:** não colocar texto funcional sobre a imagem. O fundo e o retrato já possuem contraste suficiente para uso editorial adjacente.
- **Texto alternativo sugerido:** `Nath, confeiteira da Doces da Nath, segurando um bolo de chocolate.`
- **Prioridade:** média/baixa, pois aparece abaixo do catálogo.
- **Lazy loading:** sim.
- **Risco de legibilidade:** baixo quando a imagem é usada sem texto sobreposto; o bolo pode desaparecer se o container ficar baixo demais.
- **Risco de desempenho:** moderado; reservar a proporção 4:5 e entregar uma largura compatível com o container.
- **Transformações Cloudinary:** recomendado usar larguras responsivas, qualidade e formato automáticos, sem ampliar acima de 1122 px.
- **Fallback necessário:** manter título, texto e CTA da seção legíveis mesmo sem foto. Solicitar outra versão oficial somente se o recorte desktop não funcionar.

## Estratégia consolidada de carregamento

1. O hero mobile é o único asset com prioridade máxima e não deve usar lazy loading.
2. A logo horizontal deve carregar cedo, em largura reduzida, mas não deve disputar prioridade com o hero.
3. A logo circular só deve carregar cedo se o preloader permanecer no MVP. Mesmo assim, usar uma derivação pequena e nunca fazer a abertura esperar por ela.
4. O ícone do bolo e a foto "Sobre a Nath" podem usar lazy loading quando estiverem abaixo da dobra.
5. Todas as imagens devem reservar proporção/dimensões antes de carregar: 4:1, 1:1, 1:1, aproximadamente 9:16 e aproximadamente 4:5, respectivamente.
6. O hero para 390-430 px deve receber uma versão próxima da largura física necessária, considerando densidade de tela, mas limitada aos 941 px disponíveis. Não entregar ou ampliar uma versão de 1920 px de altura por padrão se uma derivação menor atender.
7. Cloudinary poderá aplicar largura responsiva, qualidade automática e formato automático. As transformações serão definidas somente na implementação e os originais documentados permanecerão intactos.
8. Uma versão desktop horizontal do hero é desejável, mas não bloqueia o início do desenvolvimento. Até ela existir, a adaptação deve preservar o retrato alinhado à direita sobre uma faixa off-white e evitar crop destrutivo.
9. No Next.js, o domínio remoto do Cloudinary precisará ser autorizado na configuração de imagens ou tratado por outra estratégia segura. Essa configuração pertence à implementação futura.
10. Se o Cloudinary ou uma imagem falhar, conteúdo, navegação, CTA e carrinho devem continuar utilizáveis. Imagens nunca podem definir a única forma de acessar uma ação.

## Riscos e pendências gerais

- Confirmar se os assets 01, 02 e 03 possuem transparência real ou fundo incorporado.
- Confirmar por que as dimensões observadas dos assets 04 e 05 diferem das dimensões informadas.
- Solicitar, se existir, logo vetorial e variações oficiais para fundo claro e escuro.
- Criar ou receber uma versão simplificada do símbolo para favicon; o asset atual é detalhado demais para uso automático em 16 px.
- Solicitar uma versão horizontal do hero para desktop somente se a adaptação documentada não preservar qualidade.
- Fotos reais dos produtos ainda são necessárias. As imagens dos mockups conceituais não podem ocupar cards como se fossem itens reais do cardápio.
- Validar os recortes finais em 390 × 844, 430 × 932, 768 × 1024 e 1365 × 768 durante a implementação.
