# Blueprint da página - Doces da Nath

## Decisão de arquitetura visual

A página final deve ser uma vitrine mobile-first curta, com o catálogo como núcleo. A estrutura inicial de 19 itens foi reduzida para evitar repetição de logo, rollers, CTAs e blocos institucionais.

O produto e o carrinho são estados da interface abertos sobre a página. Não entram na rolagem como seções independentes. Introdução, categorias e produtos formam uma única seção de catálogo. Informações de entrega, retirada e pagamento devem ser fundidas com "Como pedir", carrinho e FAQ, conforme o contexto.

## Classificação da estrutura inicial

| Item inicial | Classificação | Decisão |
| --- | --- | --- |
| 1. Preloader | Estado da interface; opcional no MVP | Manter como acabamento curto, implementado por último e sem bloquear o hero |
| 2. Header | Obrigatória no MVP | Manter compacto e sticky quando útil |
| 3. Hero | Obrigatória no MVP | Manter com asset oficial da Nath e CTAs cedo |
| 4. Roller de autoridade | Opcional no MVP | Manter somente uma faixa compacta com afirmações confirmadas |
| 5. Introdução ao cardápio | Remover ou fundir | Fundir ao cabeçalho do catálogo |
| 6. Categorias | Obrigatória no MVP | Integrar ao catálogo como filtros |
| 7. Produtos | Obrigatória no MVP | Núcleo comercial da página |
| 8. Detalhe do produto | Estado da interface | Bottom sheet no mobile e painel/modal no desktop |
| 9. Carrinho | Estado da interface | Barra-resumo + drawer/bottom sheet |
| 10. Clube VIP | Obrigatória no MVP, com conteúdo pendente | Manter em formato compacto; publicar apenas benefícios confirmados |
| 11. Roller secundário | Remover ou fundir | Remover para não repetir movimento; o único roller já cria ritmo |
| 12. Sobre a Nath | Obrigatória no MVP | Manter curta, humana e baseada em fatos aprovados |
| 13. Produtos ou momentos especiais | Evolução futura ou fusão | Fundir à prova real quando houver fotos; não criar seção genérica no MVP |
| 14. Depoimentos | Obrigatória no MVP conforme briefing | Publicar somente depoimentos reais autorizados; ocultar o bloco enquanto não existirem |
| 15. Como pedir | Obrigatória no MVP | Manter em três passos curtos |
| 16. Entrega, retirada e pagamento | Remover ou fundir | Distribuir entre Como pedir, carrinho e FAQ; não criar seção repetitiva |
| 17. FAQ | Obrigatória no MVP | Usar perguntas com respostas confirmadas; ampliar depois |
| 18. CTA final | Obrigatória no MVP | Adaptar ao estado do carrinho |
| 19. Footer | Obrigatória no MVP | Manter compacto com contatos reais |

## Sequência final recomendada

1. Preloader curto, como estado opcional.
2. Header compacto.
3. Hero.
4. Roller/faixa de confiança única.
5. Catálogo integrado: introdução, categorias e produtos.
6. Clube VIP compacto.
7. Sobre a Nath.
8. Prova real: depoimentos e, quando disponíveis, fotos de momentos/produtos.
9. Como pedir + informações operacionais confirmadas.
10. FAQ.
11. CTA final.
12. Footer.

Estados sobrepostos: detalhe do produto, barra do carrinho, carrinho completo e seletores auxiliares.

## 0. Preloader

- **Classificação:** estado da interface; opcional no MVP.
- **Função:** criar uma assinatura inicial breve sem mascarar carregamento lento.
- **Conteúdo principal:** logo circular oficial e fundo chocolate ou off-white.
- **CTA:** nenhum.
- **Fundo:** chocolate com logo dourada/off-white, desde que o contraste da imagem seja validado.
- **Posição:** cobre a viewport somente durante a abertura curta.
- **Asset:** logo circular; o ícone do bolo pode ser fallback.
- **Mobile:** abertura em cortina simples, respeitando áreas seguras e `prefers-reduced-motion`.
- **Desktop:** mesma lógica, sem animação mais longa.
- **Transição:** cortina em duas partes ou uma revelação vertical curta. Não aguardar download de assets e não repetir a cada navegação interna.
- **MVP:** opcional e implementado por último. Se prejudicar LCP ou acessibilidade, remover.

## 1. Header

- **Classificação:** obrigatória no MVP.
- **Função:** manter marca, navegação e acesso ao carrinho disponíveis.
- **Conteúdo principal:** menu, logo horizontal e carrinho com quantidade.
- **CTA:** acesso ao carrinho; WhatsApp pode existir dentro do menu, não como quarto elemento na barra mobile.
- **Fundo:** off-white com borda inferior champagne; versão sólida ao ficar sticky.
- **Posição:** topo da página; sticky após o primeiro movimento de rolagem se isso não reduzir demais a área útil.
- **Asset:** logo horizontal.
- **Mobile:** menu à esquerda, logo central/ótica e carrinho à direita, com alvos de toque de pelo menos 44 px.
- **Desktop:** logo à esquerda ou centro, navegação curta para Cardápio, Clube VIP, Sobre e FAQ; carrinho/WhatsApp à direita.
- **Transição:** mudança sutil de sombra ou borda ao ficar sticky, sem encolhimento brusco.
- **MVP:** obrigatório.

## 2. Hero

- **Classificação:** obrigatória no MVP.
- **Função:** explicar a marca, apresentar a Nath e levar rapidamente ao catálogo.
- **Conteúdo principal:** título literal/afetivo, uma frase curta de apoio e dois CTAs.
- **CTA primário:** `Ver cardápio`.
- **CTA secundário:** `Entrar no Clube VIP` ou `Conhecer o Clube VIP`, somente se o programa estiver confirmado.
- **Fundo:** asset oficial do hero sobre base off-white; copy em chocolate.
- **Posição dos elementos:** texto na área negativa à esquerda; Nath e bolo preservados à direita; botões abaixo da copy, sem cobrir a pessoa.
- **Asset:** hero mobile oficial.
- **Mobile:** usar proporção próxima de 9:16 com recorte controlado. O primeiro viewport deve mostrar marca, proposta e CTA e ainda sugerir que há conteúdo abaixo.
- **Desktop:** faixa ampla sem card. Manter o retrato alinhado à direita e expandir a área off-white à esquerda até existir uma imagem horizontal oficial.
- **Transição:** copy e CTA entram com opacidade/deslocamento curto depois da revelação do hero. A imagem não precisa de parallax.
- **MVP:** obrigatório.

## 3. Roller/faixa de confiança

- **Classificação:** opcional no MVP.
- **Função:** reforçar rapidamente atributos reais e criar passagem do hero para o catálogo.
- **Conteúdo principal:** somente afirmações já sustentadas, como `Produção artesanal`, `Ingredientes selecionados`, `Encomendas personalizadas` e `Atendimento pelo WhatsApp`.
- **CTA:** nenhum.
- **Fundo:** chocolate com texto off-white/champagne, ou champagne com texto chocolate.
- **Posição:** logo após o hero.
- **Asset:** ícone do bolo pode aparecer entre mensagens; demais separadores devem ser simples.
- **Mobile:** rolagem horizontal lenta e contínua apenas se o conteúdo permanecer acessível; alternativa estática com duas linhas para movimento reduzido.
- **Desktop:** faixa única, sem aumentar a velocidade.
- **Transição:** movimento constante discreto, pausável em foco/hover/toque.
- **MVP:** opcional. Não criar um segundo roller.

## 4. Catálogo integrado

- **Classificação:** obrigatória no MVP.
- **Função:** permitir descobrir, comparar, personalizar e adicionar os produtos reais.
- **Conteúdo principal:** título curto, filtros, grade/lista de produtos, disponibilidade e preço.
- **CTA por produto:** `Escolher opções` quando houver variante; `Adicionar` somente quando nenhuma escolha obrigatória existir.
- **Fundo:** off-white; pequenas alternâncias champagne podem destacar o cabeçalho, sem colocar toda a seção em card.
- **Posição dos elementos:** título e texto curto; filtros imediatamente abaixo; produtos na sequência; barra do carrinho aparece sobre o rodapé da viewport somente após o primeiro item.
- **Assets:** fotos reais de cada produto. Nenhuma imagem conceitual dos mockups entra como produto.
- **Mobile:** categorias em scroll horizontal; uma coluna como padrão seguro, com duas colunas apenas se nome, preço e botão passarem no teste de 390 px.
- **Desktop:** três ou quatro colunas conforme largura segura; filtros podem continuar horizontais.
- **Transição:** troca de categoria com fade curto; feedback imediato ao adicionar; sem animar toda a grade a cada rolagem.
- **MVP:** obrigatório.

### Categorias finais

1. Bolos.
2. Brigadeiros e docinhos.
3. Kits festa.
4. Caixas e presentes.

`Mais pedidos` é filtro editorial, não categoria de dados, e só aparece depois que a Nath confirmar quais produtos recebem esse destaque. Pudins e outros itens presentes apenas nos mockups não entram.

## Estado A. Detalhe do produto

- **Classificação:** estado da interface.
- **Função:** coletar variantes e observações necessárias antes de adicionar.
- **Conteúdo principal:** foto real, nome, descrição, disponibilidade, preço, tamanho/quantidade, sabor/opções aplicáveis, observação e quantidade de itens.
- **CTA:** `Adicionar ao carrinho` com preço calculado a partir da variante confirmada.
- **Fundo:** off-white com controles chocolate/champagne.
- **Posição:** bottom sheet no mobile; painel ou modal amplo no desktop.
- **Assets:** foto real do produto correspondente.
- **Mobile:** título e fechar no topo; conteúdo rolável; CTA acessível acima da área segura; erro junto à opção obrigatória ausente.
- **Desktop:** imagem e configuração podem ficar lado a lado dentro do painel, sem usar a estrutura estreita do mockup.
- **Transição:** entrada vertical/lateral curta, foco controlado e retorno ao card de origem ao fechar.
- **MVP:** obrigatório como função, mas não como seção da página.

## Estado B. Barra e carrinho completo

- **Classificação:** estado da interface.
- **Função:** manter contexto da compra e preparar o pedido para o WhatsApp.
- **Conteúdo principal:** itens, variantes, quantidade, observações, subtotal, entrega/retirada, data desejada, forma de pagamento e observações gerais.
- **CTA:** `Enviar pedido pelo WhatsApp` para `https://wa.me/5527995082631` com mensagem formatada.
- **Fundo:** off-white; CTA chocolate.
- **Posição:** barra-resumo fixa quando houver itens; carrinho completo em bottom sheet/drawer.
- **Assets:** miniaturas reais dos produtos; ícones funcionais de entrega, retirada, calendário, pagamento e remover.
- **Mobile:** barra reduz detalhes antes de comprimir botão; sheet com rolagem interna e área inferior segura.
- **Desktop:** drawer lateral ou painel; manter o catálogo visível ao fundo sem permitir interação enquanto aberto.
- **Transição:** barra entra após o primeiro item; badge recebe feedback discreto; remover item não desloca a página de fundo.
- **MVP:** obrigatório como função, mas não como seção da página.

## 5. Clube VIP

- **Classificação:** obrigatória no MVP conforme briefing, com copy pendente.
- **Função:** abrir uma conversa específica de entrada no Clube VIP pelo WhatsApp.
- **Conteúdo principal:** nome do clube, frase curta aprovada e benefícios reais confirmados pela Nath.
- **CTA:** `Entrar no Clube VIP pelo WhatsApp`, com mensagem diferente da mensagem de pedido.
- **Fundo:** chocolate, criando uma pausa visual após o catálogo.
- **Posição dos elementos:** copy curta e CTA; imagem decorativa somente se for asset aprovado e não representar produto inexistente.
- **Assets:** logo circular ou ícone do bolo; não usar foto de caixa conceitual como oferta real.
- **Mobile:** bloco compacto, sem ocupar uma tela inteira. Benefícios em lista curta somente após confirmação.
- **Desktop:** copy e CTA em faixa ampla; evitar uma composição promocional maior que o catálogo.
- **Transição:** entrada simples; nenhuma animação contínua sobre o bloco.
- **MVP:** estrutura obrigatória, publicação do conteúdo condicionada à validação do Clube VIP.

## 6. Sobre a Nath

- **Classificação:** obrigatória no MVP.
- **Função:** humanizar o negócio e demonstrar autoria.
- **Conteúdo principal:** título, biografia curta aprovada e três a cinco atributos reais do trabalho.
- **CTA:** `Falar com a Nath` é opcional; pode ser omitido se houver CTA WhatsApp próximo.
- **Fundo:** off-white ou champagne muito claro.
- **Posição dos elementos:** foto 4:5 e texto em sequência no mobile; retrato e texto lado a lado no desktop.
- **Asset:** imagem oficial "Sobre a Nath / especialista".
- **Mobile:** retrato com rosto, mãos e bolo visíveis; parágrafos curtos.
- **Desktop:** retrato em proporção fixa e texto com largura de leitura limitada.
- **Transição:** imagem e texto podem entrar em momentos próximos, sem desenho animado por cima da pessoa.
- **MVP:** obrigatório; história detalhada depende de aprovação da Nath.

## 7. Prova real e depoimentos

- **Classificação:** obrigatória no MVP conforme briefing, condicionada a conteúdo real.
- **Função:** reduzir insegurança mostrando experiência de clientes e produtos entregues.
- **Conteúdo principal:** depoimentos autorizados, nome reduzido/anonimizado quando necessário, contexto do pedido e foto real opcional.
- **CTA:** opcional para Instagram oficial; não criar `Ver mais feedbacks` sem um destino real.
- **Fundo:** champagne claro ou off-white alternado.
- **Posição dos elementos:** título curto; um depoimento por vez no mobile ou pequena grade no desktop; fotos reais de momentos podem acompanhar sem virar seção separada.
- **Assets:** fotos reais de produtos/entregas e depoimentos fornecidos. Não usar nomes, estrelas ou mensagens dos mockups.
- **Mobile:** scroll snap ou um card por vez, com controles acessíveis; swipe não pode ser a única navegação.
- **Desktop:** dois ou três cards, evitando prints minúsculos de WhatsApp.
- **Transição:** snap/fade curto; carrossel automático não é necessário.
- **MVP:** publicar somente quando houver material real autorizado. A ausência não bloqueia a base técnica, mas bloqueia esta seção.

## 8. Como pedir + informações operacionais

- **Classificação:** obrigatória no MVP.
- **Função:** explicar o caminho até a confirmação e alinhar expectativa sobre preço final, prazo e entrega.
- **Conteúdo principal:** três passos e informações comerciais já confirmadas.
- **CTA:** `Começar pelo cardápio`.
- **Fundo:** off-white.
- **Posição dos elementos:** três passos em lista vertical no mobile; linha de três etapas no desktop; nota operacional abaixo.
- **Assets:** ícones simples; ícone do bolo pode marcar a primeira etapa.
- **Mobile:** texto curto e números visíveis, sem cards altos.
- **Desktop:** etapas lado a lado, mantendo leitura linear.
- **Transição:** entrada leve por etapa; sem contadores animados.
- **MVP:** obrigatório.

### Passos recomendados

1. **Escolha:** navegue pelo cardápio e selecione produto e variante.
2. **Personalize:** informe sabores, detalhes e observações permitidas.
3. **Revise e envie:** confira o carrinho e envie a solicitação pelo WhatsApp; a Nath confirma disponibilidade, prazo e valor final.

### Informações que podem aparecer desde já

- pedidos são confirmados pela Nath no WhatsApp;
- a produção começa após a confirmação;
- disponibilidade e prazo são confirmados no atendimento;
- taxa de entrega depende da localização;
- decoração, adicionais ou personalizações especiais podem alterar o valor final.

Endereço, regiões, meios de pagamento, horários e antecedência mínima só entram depois de confirmados.

## 9. FAQ

- **Classificação:** obrigatória no MVP.
- **Função:** responder objeções sem repetir a página.
- **Conteúdo principal:** perguntas com respostas verificadas.
- **CTA:** nenhum dentro de cada resposta; link ao WhatsApp somente quando a resposta realmente exigir atendimento.
- **Fundo:** off-white/champagne claro.
- **Posição dos elementos:** acordeão de uma coluna.
- **Assets:** nenhum obrigatório; ícones simples de expandir/recolher.
- **Mobile:** linhas de toque de pelo menos 48 px, resposta imediatamente abaixo e foco visível.
- **Desktop:** largura de leitura limitada; não expandir para toda a tela.
- **Transição:** altura curta e respeitando movimento reduzido.
- **MVP:** obrigatório, mas deve começar apenas com perguntas que já possuem resposta real.

Perguntas confirmáveis agora: como o pedido é finalizado, se o envio pelo site confirma automaticamente o pedido e se personalizações podem alterar o valor. Perguntas sobre entrega, pagamento, antecedência e cancelamento ficam pendentes.

## 10. CTA final

- **Classificação:** obrigatória no MVP.
- **Função:** encerrar a jornada com uma ação coerente com o estado atual.
- **Conteúdo principal:** frase curta, aviso de confirmação e até dois CTAs.
- **CTA sem carrinho:** `Ver cardápio` e `Falar com a Nath`.
- **CTA com carrinho:** `Revisar pedido` como ação principal; WhatsApp somente depois da revisão mínima.
- **Fundo:** chocolate com texto off-white e detalhes champagne.
- **Posição dos elementos:** bloco amplo sem card, imediatamente antes do footer.
- **Assets:** ícone do bolo ou logo circular em tamanho moderado.
- **Mobile:** botões empilhados e texto curto.
- **Desktop:** botões lado a lado quando couberem sem alongar demais.
- **Transição:** feedback de toque/hover; sem brilho contínuo.
- **MVP:** obrigatório.

## 11. Footer

- **Classificação:** obrigatória no MVP.
- **Função:** reunir identidade, contatos e informações comerciais finais.
- **Conteúdo principal:** logo, Instagram, WhatsApp, aviso de confirmação do pedido e, depois de confirmados, horário/retirada.
- **CTA:** links para Instagram oficial e `https://wa.me/5527995082631`.
- **Fundo:** chocolate, integrado visualmente ao CTA final, mas separado semanticamente.
- **Posição dos elementos:** logo circular, contatos e nota final; sem múltiplas colunas no mobile.
- **Assets:** logo circular.
- **Mobile:** compacto e legível, respeitando área segura inferior.
- **Desktop:** até três grupos curtos, sem sitemap extenso.
- **Transição:** nenhuma necessária.
- **MVP:** obrigatório.

## Função exata dos assets oficiais

- **Logo horizontal:** header principal e menu mobile. Não repetir em todas as seções.
- **Logo circular:** preloader, footer e assinatura final. Não usar como avatar da Nath em substituição à foto.
- **Ícone do bolo:** divisor ocasional, estado vazio e detalhe de marca. Não substituir ícones funcionais de carrinho, calendário ou pagamento.
- **Hero mobile:** abertura principal, com copy na área negativa à esquerda e Nath/bolo preservados à direita.
- **Imagem de especialista:** seção Sobre a Nath, sem texto funcional sobreposto.
- **Fotos reais de produto:** catálogo, detalhe do produto, miniaturas do carrinho e prova visual.
- **Imagens conceituais:** somente referência de direção. Pudim, caixa, bolo ou depoimentos dos mockups não podem ser apresentados como oferta/prova real.

## Resultado esperado de comprimento

No mobile, a página deve parecer uma sequência de decisões, não uma coleção de apresentações. Hero e catálogo concentram a maior parte da atenção; VIP, Sobre, prova, Como pedir e FAQ ficam compactos. O segundo roller e a seção genérica de "momentos especiais" foram retirados para evitar uma página longa e repetitiva.
