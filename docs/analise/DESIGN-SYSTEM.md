# Sistema visual - Doces da Nath

## Direção da marca

A experiência deve comunicar uma confeitaria artesanal premium, delicada, humana e acessível. O resultado esperado é uma vitrine editorial com compra simples, não uma cópia de aplicativo de delivery e não uma landing page institucional longa.

Palavras de direção: **artesanal, afetiva, refinada, próxima e confiável**.

Princípios:

- produtos e a Nath são o conteúdo principal;
- o catálogo deve ser rápido de escanear e simples de operar com uma mão;
- o dourado é acabamento, não cor de leitura principal;
- a assinatura caligráfica pertence à marca, não aos controles funcionais;
- decoração deve criar ritmo sem competir com preço, produto e CTA;
- a ação comercial principal é montar o pedido e seguir para o WhatsApp.

## Paleta oficial recomendada

| Token conceitual | Cor | Uso principal |
| --- | --- | --- |
| Off-white | `#F7F4F0` | Fundo predominante e superfícies amplas |
| Chocolate | `#4B3A34` | Texto, botões principais, header/rodapé escuros |
| Champagne | `#E6D6C1` | Fundos secundários, divisores e estados suaves |
| Dourado champagne | `#CBA66A` | Linhas, ícones de marca e detalhes |
| Taupe | `#8C7B73` | Texto secundário grande, metadados e bordas selecionadas |
| Rosa queimado | `#C49A94` | Acento pontual e estados editoriais não críticos |

### Regras de distribuição

- Off-white deve ocupar a maior parte da página.
- Chocolate é a cor funcional dominante para texto e ações.
- Champagne pode alternar algumas faixas e separar conteúdo sem criar uma coleção de cards.
- Dourado deve aparecer em linhas, ícones institucionais e pequenos detalhes; não usar em parágrafos ou textos pequenos.
- Rosa queimado deve ser raro e nunca dominar uma seção inteira.
- O bloco do Clube VIP e o CTA final podem usar chocolate como fundo, desde que não se repitam em sequência.
- Estados de erro, sucesso e aviso precisam de cores semânticas próprias na implementação e também de texto/ícone; nunca depender apenas da cor.

## Contraste

As combinações abaixo são uma referência inicial e devem ser validadas novamente no navegador com o tamanho final da fonte:

- Chocolate sobre off-white: contraste alto, apropriado para texto e controles.
- Off-white sobre chocolate: contraste alto, apropriado para botões e faixas escuras.
- Chocolate sobre champagne: contraste alto, apropriado para texto.
- Champagne sobre chocolate: contraste alto, apropriado para texto e ícones.
- Dourado sobre off-white: contraste insuficiente para texto normal; usar apenas como detalhe não textual.
- Taupe sobre off-white: reservar para texto grande ou secundário após validação; não usar em informações essenciais pequenas.
- Rosa queimado sobre off-white: decorativo; não usar como texto funcional.
- Dourado sobre chocolate: aceitável apenas após validação de tamanho e peso; para botões, preferir off-white como texto.

Todos os estados de foco devem ter contorno visível em chocolate ou off-white, conforme o fundo, com espaço suficiente para não se confundir com a borda do componente.

## Tipografia

Ainda não existe uma família tipográfica oficial confirmada. A decisão definitiva fica pendente até verificar disponibilidade de arquivos, licença, pesos e qualidade de carregamento.

### Papéis tipográficos

- **Display editorial:** títulos de seção, chamada do hero e números de destaque.
- **Texto de leitura:** descrições, preços, botões, filtros, FAQ e carrinho.
- **Itálico editorial:** uma ou duas palavras afetivas em títulos; não usar em informação operacional.
- **Caligrafia:** somente dentro dos logos oficiais ou em uma assinatura aprovada. Não escolher uma fonte manuscrita para controles.

### Opções provisórias para avaliação

- Display: Cormorant Garamond, DM Serif Display ou Lora.
- Leitura: Manrope, Inter ou Source Sans 3.
- Estratégia alternativa: uma única família serifada legível combinada com uma sans do sistema, se isso reduzir peso sem perder identidade.

Antes de escolher, confirmar licença para uso web, pesos disponíveis, suporte a português e impacto no carregamento. Evitar mais de duas famílias e carregar somente os pesos realmente usados.

### Escala recomendada

- Hero: 44-56 px no mobile; 64-80 px no desktop, conforme o espaço real da imagem.
- Título de seção: 32-40 px no mobile; 44-56 px no desktop.
- Título de card/produto: 20-24 px.
- Corpo principal: 16-18 px.
- Texto secundário: 14-16 px.
- Label funcional: mínimo de 14 px, preferencialmente 15-16 px.
- Preço: 18-22 px, com peso suficiente para escaneamento.

Não escalar fonte diretamente pela largura da tela. Usar faixas estáveis por breakpoint e garantir que textos longos quebrem sem sobreposição.

## Espaçamento

Escala base recomendada:

`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96 px`

Regras:

- margem lateral mobile: 16 px em 390 px; pode chegar a 20 px em 430 px;
- espaço interno de cards: 16 px no mobile e 20-24 px no desktop;
- distância entre seções: 64-80 px no mobile e 88-120 px no desktop;
- título e texto de apoio: 12-20 px;
- texto e CTA: 20-28 px;
- itens repetidos: 12-20 px, conforme densidade;
- não usar espaçamento decorativo para compensar hierarquia tipográfica fraca.

## Largura e grid

- largura máxima geral recomendada: 1200 px;
- conteúdo editorial longo: limitar a aproximadamente 640-720 px;
- catálogo: uma coluna em telas muito estreitas e duas colunas somente quando imagem, nome, preço e botão continuarem legíveis;
- desktop: grade de três ou quatro produtos conforme a largura mínima segura do card;
- hero: faixa ampla sem card, com copy na área negativa da imagem;
- seções devem ser faixas integrais ou layouts sem moldura externa; não colocar uma seção inteira dentro de um card.

Validar no mínimo em 390 × 844, 430 × 932, 768 × 1024 e 1365 × 768.

## Raios de borda

- cards de produto e depoimento: 8 px;
- campos, seletores e botões: 6-8 px;
- imagens editoriais: 8 px ou recorte orgânico aprovado pela marca, sem excesso;
- pills de categoria: raio total, pois representam filtros compactos;
- bottom sheet: 16 px apenas nos cantos superiores;
- barra fixa do carrinho: 8 px quando flutuante; sem raio quando encostada nas bordas da viewport.

Evitar raios grandes que deixem a interface infantil ou genérica.

## Bordas e sombras

### Bordas

- borda padrão: 1 px em champagne ou variação com contraste suficiente;
- estado selecionado: chocolate, acompanhado por mudança de fundo ou ícone;
- divisores: linha fina champagne/dourado apenas quando necessário para leitura.

### Sombras

- nível 0: sem sombra para a maioria das superfícies;
- nível 1: sombra curta e suave para cards repetidos quando a borda não bastar;
- nível 2: sombra mais ampla para bottom sheet, drawer e barra do carrinho;
- não usar sombras douradas, brilho intenso ou múltiplas sombras decorativas.

Sombras devem separar níveis da interface, não simular luxo.

## Botões e áreas de toque

- altura recomendada de botão principal: 50-52 px;
- altura mínima de botão secundário: 48 px;
- área mínima de toque: 44 × 44 px;
- CTA primário: fundo chocolate, texto off-white e ícone de ação quando útil;
- CTA secundário: fundo transparente/off-white, borda chocolate e texto chocolate;
- CTA WhatsApp: manter a linguagem visual da marca; o ícone identifica o canal, sem transformar toda a página em verde;
- estados obrigatórios: padrão, hover, foco, pressionado, desabilitado e carregando;
- rótulos devem nomear a ação: `Ver cardápio`, `Adicionar ao carrinho`, `Revisar pedido`, `Enviar pedido pelo WhatsApp`.

Ícones familiares podem substituir texto apenas em ações universalmente reconhecíveis, como fechar, voltar, remover e aumentar/diminuir. Ícones menos óbvios precisam de rótulo ou tooltip no desktop.

## Cards de produto

- card representa um produto repetido; não aninhar outros cards dentro dele;
- imagem com proporção estável, nome, descrição curta, preço/`a partir de`, disponibilidade e uma ação clara;
- preço e disponibilidade devem permanecer visíveis sem abrir o detalhe;
- `Adicionar` abre o detalhe quando existir escolha obrigatória; não selecionar variante silenciosamente;
- no mobile, preferir uma coluna se duas colunas comprimirem nome, preço ou botão;
- tags como `Sob encomenda` e `Mais pedido` devem ser poucas, verificáveis e legíveis;
- usar foto real do produto correspondente. Mockups conceituais não entram no catálogo.

## Pills e seletores

- pills servem para categorias e opções curtas;
- categoria ativa: fundo chocolate e texto off-white;
- categoria inativa: fundo off-white/champagne claro, borda visível e texto chocolate;
- permitir rolagem horizontal com indicador visual de continuidade quando as categorias não couberem;
- manter área de toque mínima, sem reduzir fonte para acomodar excesso de opções;
- seleções de tamanho/quantidade com preço podem usar blocos de opção mais largos que pills;
- nenhum estado deve depender apenas da mudança de dourado.

## Bottom sheets e overlays

- detalhe do produto e carrinho são estados da interface, não seções longas na página;
- bottom sheet ocupa a parte inferior no mobile e pode virar painel lateral/modal amplo no desktop;
- cabeçalho do painel com título e botão de fechar sempre visíveis;
- alça visual é decorativa e não substitui o botão de fechar;
- rolagem interna previsível, com CTA importante em área fixa apenas quando não cobrir campos;
- bloquear a rolagem do fundo enquanto aberto;
- controlar foco, fechar por Escape no desktop e devolver o foco ao elemento que abriu;
- avisar erros junto à opção ausente, sem depender de toast;
- respeitar teclado virtual e áreas seguras do aparelho.

## Barra fixa do carrinho

- aparece somente quando existe ao menos um item;
- mostra quantidade, subtotal dos itens e comando `Revisar pedido` ou `Ver carrinho`;
- fica acima da área segura do sistema e não cobre o último produto, FAQ ou CTA;
- a página deve reservar espaço inferior equivalente à barra enquanto ela estiver visível;
- em telas pequenas, ocultar miniaturas antes de comprimir preço ou botão;
- não exibir taxa de entrega no subtotal enquanto ela depender de confirmação pelo WhatsApp;
- no desktop, pode se tornar um resumo lateral ou uma barra compacta, sem acompanhar toda a página de forma invasiva.

## Ícones e identidade

- usar o ícone oficial do bolo em divisores, estados vazios e assinatura institucional;
- usar a logo horizontal no header e a circular no preloader/footer;
- usar ícones funcionais simples e consistentes para menu, carrinho, calendário, entrega, retirada, pagamento, WhatsApp, remover e quantidade;
- manter espessura e tamanho consistentes;
- ícone decorativo recebe alt vazio ou é ignorado por leitor de tela;
- não usar o ícone detalhado do bolo como favicon sem uma versão simplificada aprovada.

## Imagens

- fotos reais dos produtos devem conduzir o catálogo e a prova visual;
- reservar a proporção de toda imagem para evitar salto de layout;
- não esticar, não desfocar e não aplicar filtros que alterem a aparência do produto;
- hero: ponto focal no rosto da Nath e no bolo; copy na área clara à esquerda;
- Sobre a Nath: preservar rosto, mãos e bolo;
- não colocar texto longo sobre fotografias;
- usar o Cloudinary para tamanhos responsivos e formatos adequados somente durante a implementação;
- manter conteúdo utilizável quando uma imagem falhar.

## Responsividade

### Mobile

- header compacto com menu, logo e carrinho;
- CTA principal cedo e catálogo a poucos gestos do hero;
- categorias em rolagem horizontal;
- produto e carrinho em bottom sheets;
- barra de carrinho respeitando área segura;
- seções empilhadas, sem tentar reproduzir as colunas largas dos mockups.

### Tablet

- catálogo pode usar duas ou três colunas;
- sheets podem ganhar largura máxima e centralização;
- Sobre a Nath pode começar a dividir imagem e texto se ambos mantiverem leitura.

### Desktop

- header com navegação curta e CTA;
- hero em faixa ampla, usando o retrato alinhado à direita até existir versão horizontal;
- catálogo em grade de três ou quatro colunas;
- detalhe do produto em painel/modal amplo e carrinho em drawer lateral;
- limitar o comprimento dos parágrafos e não ampliar decoração proporcionalmente à tela.

## Movimento e microinterações

- preloader em cortina: opcional e implementado por último; duração curta, sem esperar rede, preferencialmente uma vez por sessão;
- entradas de seção: opacidade e deslocamento leve, aproximadamente 180-320 ms;
- sheets/drawers: transição vertical ou lateral curta, com foco já preparado;
- carrinho: feedback discreto no badge e na barra ao adicionar;
- FAQ: expansão curta e previsível;
- roller: velocidade lenta, pausa em hover/foco/toque e alternativa estática para movimento reduzido;
- cards: mudança sutil de borda/sombra, sem deslocar o layout;
- animar apenas opacidade e transformação sempre que possível;
- não usar animações contínuas em várias regiões ao mesmo tempo.

Com `prefers-reduced-motion`, remover o deslocamento, interromper rollers e reduzir o preloader a uma revelação imediata. Nenhuma função pode depender da animação.

## Acessibilidade

- contraste mínimo WCAG AA para texto e controles;
- heading principal único e sequência lógica de títulos;
- foco visível e ordem natural de teclado;
- labels persistentes em campos de data, entrega/retirada, pagamento e observações;
- mensagens de erro específicas junto ao campo;
- controles de quantidade com nome acessível e estado anunciado;
- tabs de categoria com estado selecionado anunciado;
- sheets com título, foco inicial e fechamento previsível;
- alt funcional para Nath/produtos e alt vazio para ornamentos;
- swipe nunca pode ser a única forma de navegar carrosséis;
- corpo mínimo de 16 px nos fluxos de compra sempre que possível;
- não exibir afirmações genéricas como "dados protegidos" sem uma prática real que a sustente.

## Regras de uso da identidade

1. Não recolorir, deformar ou recortar as logos oficiais.
2. Não usar dourado como texto pequeno ou informação crítica.
3. Não transformar a página em uma interface predominantemente rosa.
4. Não usar fotos conceituais como prova de produto real.
5. Não inventar selo, prêmio, avaliação, depoimento ou benefício do Clube VIP.
6. Não repetir logo, ícone de bolo e ramos decorativos em todas as seções.
7. Manter a sensação premium por tipografia, espaço, fotografia e acabamento, não por efeitos pesados.
8. Confirmar fontes e licenças antes da implementação final.
