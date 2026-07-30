# Analise inicial - Doces da Nath

## 1. Resumo executivo

O projeto Doces da Nath deve nascer como uma vitrine mobile-first de confeitaria artesanal premium, pensada para ser o link principal da bio do Instagram. A experiencia nao deve parecer um marketplace nem uma landing page longa e institucional; o caminho certo e um catalogo afetivo, visual, rapido de navegar e com carrinho leve que prepara o pedido para o WhatsApp.

As referencias visuais apresentam uma identidade consistente: base off-white, chocolate profundo, champagne/dourado suave, rose gold pontual, tipografia serifada editorial, assinatura caligrafica e icones lineares delicados. O ponto mais forte e a sensacao de cuidado artesanal. O risco principal e reproduzir composicoes muito densas ou decorativas demais para uma implementacao real em 390px.

O MVP recomendado deve priorizar: header compacto, hero com a Nath, catalogo filtravel por categorias, detalhe de produto em bottom sheet/painel, carrinho persistido no navegador, selecao de entrega/retirada, data desejada, observacoes, forma de pagamento, Clube VIP, sobre a Nath, depoimentos reais, como pedir, FAQ e CTA final para WhatsApp.

O cardapio real nao inclui todos os itens conceituais das referencias, como pudins. Portanto, a implementacao deve usar apenas produtos confirmados no briefing ou marcar itens futuros como indisponiveis/internos. WhatsApp, Instagram, endereco de retirada, regioes atendidas, formas de pagamento, horarios e politica de cancelamento ainda precisam ser fornecidos.

## 2. Analise individual de cada referencia

### 01 - Hero mobile

**Secao ou estado representado:** abertura da home, com header, hero, CTA principal, CTA secundario e faixa de beneficios.

**Objetivo estrategico:** comunicar em poucos segundos que a Doces da Nath e uma confeitaria artesanal feita por uma pessoa real, gerar confianca pela imagem da confeiteira e levar o usuario para o cardapio ou para o Clube VIP.

**Hierarquia visual:** logo no topo; slogan pequeno em caixa alta; titulo grande serifado; palavra enfatizada em italico; texto de apoio; botoes; foto da Nath como elemento emocional dominante; barra inferior com beneficios.

**Posicao dos elementos:** header fixo ou sticky no topo, menu a esquerda, logo central, carrinho a direita; texto do hero a esquerda; Nath ocupando a lateral direita e parte inferior; botoes empilhados; beneficios em faixa inferior.

**Componentes necessarios:** `Header`, `CartBadge`, `HeroSection`, `PrimaryButton`, `SecondaryButton`, `BenefitStrip`, `DecorativeIcon`, imagem responsiva da Nath.

**Cores e contrastes:** fundo off-white; texto chocolate; dourado/champagne em linhas e icones; rose suave em detalhes. O botao primario chocolate tem bom contraste com texto claro. O botao secundario precisa manter borda suficientemente visivel.

**Tipografia e escala:** display serifado grande para o titulo; italico editorial para enfase; sans ou serif de leitura para paragrafo; assinatura caligrafica apenas no logo/nome, sem usar em blocos longos.

**Comportamento esperado no mobile:** primeiro viewport deve mostrar marca, proposta, imagem humana e CTA sem exigir rolagem excessiva. Em telas menores, a imagem da Nath deve ser recortada com ponto focal no rosto e bolo, sem cobrir os botoes.

**Animacoes e microinteracoes possiveis:** preloader em cortina abrindo para revelar o hero; entrada suave do logo, titulo e botoes por opacidade/translate; contador do carrinho com pequena escala ao adicionar item; respeitar `prefers-reduced-motion`.

**O que deve ser mantido:** presenca da Nath, tom artesanal premium, CTA "Ver cardapio", CTA "Clube VIP", header simples e beneficios de encomenda/retirada/WhatsApp.

**O que precisa ser corrigido ou simplificado:** reduzir elementos decorativos se competirem com a foto; garantir que o hero nao fique alto demais; nao depender de texto longo antes do CTA; usar foto otimizada real, com dimensoes reservadas.

### 02 - Cardapio mobile

**Secao ou estado representado:** catalogo com categorias, cards de produto e resumo de carrinho fixo no rodape.

**Objetivo estrategico:** permitir escolha rapida de doces, mostrar preco inicial e incentivar adicionar ao carrinho sem entrar em um fluxo complexo.

**Hierarquia visual:** titulo editorial; filtros em pills horizontais; grade de produtos com imagem grande; etiqueta de status; nome; descricao curta; preco; botao adicionar; barra de carrinho como elemento persistente.

**Posicao dos elementos:** header no topo; filtros logo abaixo do titulo; cards em duas colunas na referencia; barra de carrinho fixa abaixo.

**Componentes necessarios:** `CategoryTabs`, `ProductGrid`, `ProductCard`, `ProductBadge`, `AddButton`, `CartSummaryBar`, miniaturas do carrinho.

**Cores e contrastes:** categoria ativa em chocolate; categorias inativas com fundo claro e borda champagne; cards off-white com borda suave; preco em tom dourado/chocolate. Contraste geral bom, mas texto pequeno em badges precisa cuidado.

**Tipografia e escala:** titulo serifado medio/grande; nomes de produto em serif; descricoes em fonte de leitura; preco com peso maior. Em 390px, duas colunas podem apertar texto e botoes.

**Comportamento esperado no mobile:** filtros com scroll horizontal e estado ativo claro; cards provavelmente em uma coluna ou duas colunas apenas se o texto couber; botao "Adicionar" deve abrir detalhe quando houver variacoes obrigatorias, nao adicionar silenciosamente.

**Animacoes e microinteracoes possiveis:** troca de categoria com fade curto; botao adicionar com feedback; barra do carrinho entrando quando houver primeiro item; miniaturas animando discretamente.

**O que deve ser mantido:** filtros horizontais, imagem forte do produto, preco "a partir de", resumo fixo do carrinho e linguagem visual refinada.

**O que precisa ser corrigido ou simplificado:** a referencia inclui categorias/produtos conceituais nao presentes no cardapio real, como pudins. A grade em duas colunas deve ser validada em 390px; se ficar apertada, usar uma coluna com cards mais comerciais. Evitar barra fixa cobrindo conteudo no final da pagina.

### 03 - Produto e carrinho mobile

**Secao ou estado representado:** detalhe de produto com selecao de opcoes e carrinho aberto em painel/bottom sheet.

**Objetivo estrategico:** permitir personalizacao do produto e revisao do pedido antes do envio pelo WhatsApp.

**Hierarquia visual:** imagem do produto e nome em destaque; opcoes por grupos; quantidade; botao grande de adicionar; bottom sheet do carrinho com itens, subtotal, campos operacionais e CTA WhatsApp.

**Posicao dos elementos:** topo com voltar/logo/carrinho; imagem e copy do produto; seletores em pills; stepper de quantidade; CTA horizontal; carrinho ocupa a parte inferior como painel elevado.

**Componentes necessarios:** `ProductDetailSheet`, `OptionGroup`, `VariantSelector`, `QuantityStepper`, `CartDrawer`, `CartItemRow`, `FulfillmentSelector`, `DateSelector`, `PaymentSelector`, `WhatsAppCheckoutButton`.

**Cores e contrastes:** opcoes selecionadas em chocolate com texto claro; opcoes inativas claras com borda; painel do carrinho off-white; CTA chocolate. Bom padrao para estados.

**Tipografia e escala:** nome de produto grande; subtitulos de opcoes em caixa alta menor; corpo legivel. O carrinho precisa evitar tres colunas apertadas em telas reais.

**Comportamento esperado no mobile:** produto deve abrir em bottom sheet ou rota/painel acessivel; opcoes obrigatorias impedem adicionar sem selecao; carrinho deve permitir alterar quantidade e remover; campos de entrega/data/pagamento podem abrir sheets menores.

**Animacoes e microinteracoes possiveis:** sheet deslizando de baixo; handle discreto; transicao de selecao em pills; confirmacao visual ao adicionar; fechamento por botao, gesto e Escape no desktop.

**O que deve ser mantido:** bottom sheet como padrao principal, resumo antes do WhatsApp, informacao de entrega/retirada, data desejada e pagamento antes do envio.

**O que precisa ser corrigido ou simplificado:** a referencia esta muito larga visualmente para um celular comum; na implementacao, o detalhe deve ser pensado para 390px. Campos como entrega/data/pagamento devem ter labels claros e validacao. "Seus dados estao protegidos" so deve aparecer se houver politica minima coerente; como o MVP nao coleta cadastro obrigatorio, usar mensagem mais simples.

### 04 - Clube VIP mobile

**Secao ou estado representado:** bloco promocional escuro para entrada no Clube VIP via WhatsApp.

**Objetivo estrategico:** capturar relacionamento recorrente e levar usuarios interessados a receber novidades, cardapios sazonais, pronta entrega e edicoes limitadas.

**Hierarquia visual:** fundo chocolate; logo no topo; separador central; titulo grande claro; texto explicativo; lista de beneficios com checks; imagem de caixa premium; CTA WhatsApp.

**Posicao dos elementos:** header no topo escuro; texto alinhado a esquerda; produto/caixa como imagem lateral/inferior; beneficios em lista; CTA proximo do fim do bloco.

**Componentes necessarios:** `VipSection`, `BenefitList`, `WhatsAppVipButton`, imagem de caixa/brigadeiros, separadores decorativos.

**Cores e contrastes:** chocolate profundo com texto claro; dourado/champagne nos checks e botao; rose/champagne na imagem. Contraste bom se o texto nao cair sobre areas ruidosas da foto.

**Tipografia e escala:** titulo serifado amplo; italico para "por perto"; corpo sem ser pequeno; lista com leitura facil.

**Comportamento esperado no mobile:** bloco deve funcionar como pausa visual entre catalogo e secoes institucionais; CTA deve abrir WhatsApp com mensagem distinta de entrada no Clube VIP, nao com mensagem de pedido.

**Animacoes e microinteracoes possiveis:** revelacao do bloco por fade; checks entrando em cascata curta; brilho muito sutil no botao; nada de movimento pesado sobre a foto.

**O que deve ser mantido:** fundo chocolate, foco em exclusividade acessivel, beneficios objetivos e CTA via WhatsApp.

**O que precisa ser corrigido ou simplificado:** evitar prometer ofertas/condicoes especiais se isso nao for real. Confirmar texto do Clube VIP com a Nath. Usar imagem real ou asset aprovado; se for imagem conceitual, nao apresentar como produto existente.

### 05 - Sobre a Nath mobile

**Secao ou estado representado:** apresentacao da confeiteira, bastidores e pilares de valor.

**Objetivo estrategico:** transformar a marca em rosto, reforcar confianca, tecnica e cuidado artesanal.

**Hierarquia visual:** foto grande da Nath; eyebrow "Sobre a Nath"; selo/box "conheca quem esta por tras"; titulo editorial; texto curto; lista de atributos; CTA "Falar com a Nath".

**Posicao dos elementos:** header no topo; foto em moldura arredondada a esquerda/superior; bloco de texto ao lado na referencia; card horizontal de atributos abaixo; assinatura no rodape da secao.

**Componentes necessarios:** `AboutSection`, `PortraitImage`, `ValueList`, `WhatsAppButton`, `DecorativeBranch`, `SignatureMark`.

**Cores e contrastes:** off-white e chocolate, linhas champagne, icones rose/champagne. A foto clara combina bem com fundo claro, mas precisa borda/forma para nao sumir.

**Tipografia e escala:** titulo serifado com italicos; texto em corpo medio; lista com icones e labels. Em mobile real, foto e texto devem empilhar.

**Comportamento esperado no mobile:** foto primeiro ou titulo primeiro dependendo da rolagem; texto curto para nao virar biografia longa; CTA opcional, ja que o carrinho/WhatsApp aparece em outras partes.

**Animacoes e microinteracoes possiveis:** foto com entrada suave; desenho decorativo aparecendo discretamente; itens da lista revelando por scroll.

**O que deve ser mantido:** humanizacao da Nath, atributos concretos e linguagem afetiva sem exagero.

**O que precisa ser corrigido ou simplificado:** nao inventar historia detalhada sem briefing. Reduzir molduras e decoracoes se prejudicarem performance ou leitura. Confirmar foto final e texto real da Nath.

### 06 - Depoimentos mobile

**Secao ou estado representado:** prova social com faixa de valores e carrossel de feedbacks.

**Objetivo estrategico:** reduzir inseguranca antes do pedido mostrando experiencia positiva de clientes.

**Hierarquia visual:** faixa escura com atributos; eyebrow; titulo grande; cards de feedback; estrelas; controles de carrossel; CTA "Ver mais feedbacks"; mensagem de privacidade.

**Posicao dos elementos:** faixa horizontal logo abaixo do header; titulo amplo; tres cards lado a lado na referencia; navegacao por setas e dots; CTA central inferior.

**Componentes necessarios:** `TrustTicker`, `TestimonialsCarousel`, `TestimonialCard`, `CarouselControls`, `FeedbackCta`.

**Cores e contrastes:** faixa chocolate com texto claro; cards claros com sombra/borda suave; estrelas douradas. Bom contraste, mas cards com prints precisam ser legiveis.

**Tipografia e escala:** titulo editorial grande; cards com texto de leitura. Os exemplos usam nomes e mensagens que podem ser ficticios.

**Comportamento esperado no mobile:** em 390px, exibir um card por vez ou carrossel com peek lateral; permitir swipe; setas podem ser escondidas ou mantidas pequenas; dots acessiveis.

**Animacoes e microinteracoes possiveis:** ticker horizontal lento para atributos; carrossel com swipe nativo/snap; pausa em interacao; respeitar movimento reduzido.

**O que deve ser mantido:** prova social visual, atributos de qualidade e carrossel controlavel.

**O que precisa ser corrigido ou simplificado:** publicar apenas depoimentos reais autorizados. Se nao houver depoimentos, substituir temporariamente por prova visual de produtos/processo, sem nomes inventados. Evitar usar prints que exponham dados pessoais.

### 07 - Como pedir, FAQ e CTA mobile

**Secao ou estado representado:** explicacao final do fluxo de pedido, duvidas frequentes, CTA final e rodape.

**Objetivo estrategico:** remover objecoes finais e encaminhar o usuario para catalogo ou WhatsApp.

**Hierarquia visual:** titulo "Seu pedido em poucos passos"; cards numerados; FAQ em acordeao; bloco final escuro com CTA principal e secundario; rodape com Instagram/WhatsApp.

**Posicao dos elementos:** passos em cards verticais; FAQ logo abaixo; CTA final como bloco chocolate; rodape compacto.

**Componentes necessarios:** `HowToOrderSteps`, `FaqAccordion`, `FinalCta`, `Footer`, `SocialLinks`.

**Cores e contrastes:** inicio claro com texto chocolate; CTA final escuro com texto claro e botao dourado. Boa diferenciacao de encerramento.

**Tipografia e escala:** titulo serifado; numeros grandes em circulos suaves; perguntas em corpo medio; CTA final com frase curta e emocional.

**Comportamento esperado no mobile:** acordeoes devem abrir/fechar com toque e teclado; CTA "Ver o cardapio" volta para catalogo; CTA "Falar pelo WhatsApp" abre conversa ou carrinho se houver itens.

**Animacoes e microinteracoes possiveis:** passos entrando por scroll; acordeao com altura suave e curta; CTA final com hover/tap discreto; transicao de icones decorativos entre secoes.

**O que deve ser mantido:** passos simples, FAQ direto e dois CTAs finais.

**O que precisa ser corrigido ou simplificado:** responder FAQ somente com dados confirmados. Perguntas sobre antecedencia, entrega e pagamento dependem de informacoes ainda ausentes. Evitar duplicar CTA WhatsApp se o usuario ja tiver carrinho cheio sem revisar pedido.

## 3. Sistema visual consolidado

**Direcao:** confeitaria artesanal premium, delicada, humana e acessivel. A pagina deve parecer uma vitrine de Instagram refinada com carrinho leve, nao um app de delivery generico.

**Paleta recomendada:**

- Fundo principal: off-white quente.
- Texto principal: chocolate escuro.
- Superficie clara: champagne muito claro.
- Primaria: chocolate.
- Destaque: dourado suave/champagne.
- Detalhe pontual: rose gold.
- Estados: verde apenas para confirmacoes discretas; vermelho/terracota para erro, com texto alem da cor.

**Tipografia:**

- Display serifada editorial para titulos.
- Italico editorial para palavras afetivas pontuais.
- Fonte de leitura limpa para paragrafo, preco, botoes e formularios.
- Assinatura caligrafica apenas em marca/logo ou detalhe, nunca em texto funcional.

**Iconografia:** icones lineares finos relacionados a bolo, presente, coracao, WhatsApp, calendario, retirada/entrega, pagamento e lixeira. Manter consistencia de espessura.

**Imagem:** fotos reais da Nath e dos produtos devem conduzir a experiencia. Imagens conceituais so devem ser usadas como referencia ou asset temporario aprovado, nunca como prova de produto se nao forem reais.

**Layout:** mobile-first em 390px, com container fluido, areas de toque confortaveis, barra do carrinho respeitando area segura e secoes com respiro. Evitar cards dentro de cards.

## 4. Estrutura final recomendada da pagina

1. Preloader curto com abertura em cortina.
2. Header compacto com menu, logo e carrinho.
3. Hero com imagem da Nath, proposta, CTA "Ver cardapio" e CTA "Clube VIP".
4. Faixa de beneficios: encomendas personalizadas, retirada/entrega, atendimento pelo WhatsApp.
5. Catalogo com categorias e cards de produtos.
6. Detalhe de produto em bottom sheet/painel.
7. Barra/resumo de carrinho fixa quando houver itens.
8. Carrinho completo em drawer/bottom sheet.
9. Clube VIP.
10. Sobre a Nath.
11. Depoimentos ou prova visual real.
12. Como pedir.
13. FAQ.
14. CTA final.
15. Rodape compacto com Instagram, WhatsApp, informacoes de atendimento e aviso de confirmacao.

## 5. Mapa de componentes

- `AppHeader`: menu, logo, carrinho e badge.
- `MobileMenu`: links de ancora, Clube VIP, WhatsApp e fechamento acessivel.
- `CurtainPreloader`: abertura inicial curta, desligada/reduzida com `prefers-reduced-motion`.
- `HeroSection`: proposta, imagem da Nath, CTAs e beneficios.
- `BenefitStrip`: beneficios compactos.
- `CategoryTabs`: filtros horizontais por categoria.
- `ProductGrid`: renderizacao de cards por categoria.
- `ProductCard`: imagem, status, nome, descricao, preco inicial e acao.
- `ProductDetailSheet`: opcoes, variacoes, observacoes e adicionar ao carrinho.
- `OptionGroup`: seletor de sabor, tamanho, quantidade ou configuracao.
- `QuantityStepper`: controle de quantidade.
- `CartSummaryBar`: resumo fixo com total, miniaturas e acesso ao carrinho.
- `CartDrawer`: lista, subtotal, entrega/retirada, data, pagamento, observacoes e CTA WhatsApp.
- `CheckoutFieldSheet`: seletores auxiliares para entrega, data e pagamento.
- `VipSection`: chamada para Clube VIP.
- `AboutSection`: historia curta e pilares.
- `TestimonialsSection`: depoimentos reais ou prova visual.
- `HowToOrderSection`: passo a passo.
- `FaqAccordion`: perguntas frequentes.
- `FinalCta`: fechamento com cardapio e WhatsApp.
- `Footer`: redes, contato e informacoes comerciais.

## 6. Modelo de dados dos produtos

### Categorias finais recomendadas

1. **Bolos**: bolo personalizado.
2. **Brigadeiros e docinhos**: brigadeiros, beijinho, casadinho, surpresa de uva.
3. **Kits festa**: kit individual e kit para 4 pessoas.
4. **Caixas e presentes**: caixa com 12 brigadeiros e bento cake.
5. **Mais pedidos**: filtro dinamico/curadoria, nao categoria de dados obrigatoria.

Categorias como Pudins e Especiais so devem entrar se houver produtos confirmados. A referencia visual usa pudim, mas o cardapio atual nao traz esse item.

### Estrutura recomendada

```ts
type Product = {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  shortDescription: string;
  fullDescription?: string;
  images: ProductImage[];
  badges?: ProductBadge[];
  availability: AvailabilityStatus;
  leadTimeLabel: string;
  priceMode: "fixed" | "variant" | "from" | "quote";
  basePriceCents?: number;
  variants?: ProductVariant[];
  optionGroups?: ProductOptionGroup[];
  minOrderQuantity?: number;
  allowsNotes: boolean;
  allowsCustomization: boolean;
  fulfillmentModes: ("pickup" | "delivery" | "confirm_on_whatsapp")[];
};
```

### Variacoes

- Bolo personalizado: tamanho P/M/G com precos; sabor/recheio obrigatorio; observacoes para ocasiao, mensagem, cores e decoracao.
- Brigadeiros/docinhos: quantidade 25/50/100 unidades como variante de preco; sabor esta no proprio produto; quantidade minima 25 unidades.
- Kits festa: preco fixo; selecao/confirmacao de sabores de bolo, docinhos e cookies pelo atendimento.
- Caixa com 12 brigadeiros: preco fixo; sabores a confirmar; pronta entrega ou encomenda conforme disponibilidade.
- Bento cake: preco fixo; sabores, cores e mensagem personalizada a confirmar.

### Adicionais

Ainda nao ha adicionais com preco confirmado. Para o MVP, tratar como observacoes ou solicitacoes sujeitas a confirmacao pelo WhatsApp. Nao somar valor de decoracao especial, entrega ou personalizacao sem regra confirmada.

### Disponibilidade

- `made_to_order`: sob encomenda.
- `ready_or_made_to_order`: pronta entrega ou encomenda conforme disponibilidade.
- `unavailable`: produto visivel mas indisponivel, se a Nath quiser manter vitrine.
- `hidden`: produto fora do catalogo.

### Regras de preco

- Valores devem ser armazenados em centavos.
- Produtos com tamanhos/quantidades usam preco por variante.
- Produtos com "a confirmar" nao devem ter calculo automatico de adicional.
- Taxa de entrega deve ficar fora do subtotal do MVP enquanto depender de localizacao.
- O total exibido deve ser "subtotal dos itens"; pedido final sujeito a confirmacao pelo WhatsApp.

### Informacoes necessarias para o carrinho

- Produto, imagem, categoria.
- Variante escolhida e preco.
- Quantidade do item no carrinho.
- Opcoes selecionadas.
- Observacoes do item.
- Subtotal por item.
- Subtotal geral.
- Modo de recebimento: retirada, entrega ou a confirmar.
- Data desejada.
- Forma de pagamento.
- Observacoes gerais do pedido.

### Informacoes necessarias para WhatsApp

- Saudacao e contexto: pedido vindo pelo site Doces da Nath.
- Lista de itens com quantidade, produto, variante, opcoes e observacoes.
- Subtotal dos itens.
- Entrega ou retirada.
- Data desejada.
- Forma de pagamento.
- Observacoes gerais.
- Aviso: pedido sujeito a confirmacao de disponibilidade, prazo e taxa de entrega.

## 7. Fluxo completo do usuario

1. Usuario abre link da bio.
2. Preloader curto revela a home.
3. Usuario entende a proposta no hero e toca em "Ver cardapio".
4. Usuario navega por categorias.
5. Usuario toca em um produto ou em adicionar.
6. Se houver variacoes obrigatorias, abre detalhe/bottom sheet.
7. Usuario escolhe tamanho/quantidade/sabor e adiciona ao carrinho.
8. Barra do carrinho aparece com subtotal e quantidade.
9. Usuario revisa carrinho.
10. Usuario informa entrega/retirada, data desejada, pagamento e observacoes.
11. Usuario toca em "Enviar pedido pelo WhatsApp".
12. WhatsApp abre com mensagem formatada.
13. Nath confirma disponibilidade, prazo, entrega e valor final.

## 8. Comportamento do carrinho

- Persistir carrinho em `localStorage` com versao de schema.
- Recalcular subtotal a partir dos dados locais atuais, nao apenas do snapshot salvo.
- Permitir aumentar, diminuir e remover item.
- Ao chegar a zero itens, esconder barra fixa e limpar carrinho se apropriado.
- Agrupar itens iguais somente se produto, variante, opcoes e observacoes forem iguais.
- Validar opcoes obrigatorias antes de adicionar.
- Manter dados operacionais do pedido: entrega/retirada, data, pagamento e observacoes gerais.
- Nao solicitar cadastro obrigatorio.
- Botao WhatsApp deve ficar desabilitado ou pedir correcao quando faltar dado essencial definido para o MVP.
- Exibir aviso de confirmacao porque disponibilidade, prazo, personalizacao, taxa de entrega e producao dependem da Nath.

## 9. Estrategia de animacoes

- **Preloader:** cortina curta, no maximo o suficiente para assinatura visual; nao bloquear carregamento real por vaidade.
- **Entrada das secoes:** opacity + translate leve, com duracao curta.
- **Rollers automaticos:** usar faixas/tickers de atributos ou produtos em velocidade baixa; pausar em interacao; evitar carrossel obrigatorio para conteudo critico.
- **Cards:** hover/tap sutil, sem deslocar layout.
- **Bottom sheets:** slide vertical com easing suave e foco controlado.
- **Carrinho:** badge com feedback discreto ao adicionar item.
- **FAQ:** acordeao com transicao curta.
- **Transicoes decorativas:** icones/linhas entre secoes, sem excesso de elementos absolutos.
- **Acessibilidade:** respeitar `prefers-reduced-motion` e oferecer experiencia completa sem depender de animacao.

## 10. Riscos e inconsistencias identificadas

- As imagens estao em `referencias-visuais/`, mas o pedido citou `docs/referencias-visuais/`.
- Cardapio real nao inclui pudim, embora a referencia 02 e 03 usem pudim como exemplo.
- WhatsApp esta "A informar"; sem ele nao ha finalizacao real.
- Instagram, endereco de retirada, regioes atendidas, formas de pagamento e horarios estao "A informar".
- Depoimentos da referencia nao devem ser usados sem confirmacao/autorizacao.
- Algumas referencias usam composicoes densas que podem ficar apertadas em 390px.
- Barra fixa do carrinho pode cobrir conteudo se nao houver padding inferior/area segura.
- Promessas do Clube VIP, como ofertas e condicoes especiais, precisam ser verdadeiras.
- Taxa de entrega e prazos nao podem ser calculados automaticamente sem regra confirmada.
- Imagens conceituais nao devem substituir fotos reais de produtos se o objetivo for venda.

## 11. Informacoes que ainda precisam ser fornecidas

- Numero de WhatsApp com DDD.
- Instagram oficial.
- Endereco ou bairro de retirada.
- Cidades/bairros/regioes atendidas.
- Regras de entrega e taxa, mesmo que seja "a combinar".
- Formas de pagamento aceitas.
- Horarios de atendimento.
- Prazo minimo recomendado para bolos, docinhos, kits e bento cake.
- Politica de cancelamento/remarcacao.
- Fotos reais dos produtos e da Nath em qualidade adequada.
- Logo em arquivo vetorial ou PNG transparente, se existir.
- Texto real do Clube VIP.
- Depoimentos reais autorizados.
- Produtos que devem aparecer como "mais pedidos".
- Produtos de pronta entrega, se houver.

## 12. Arquitetura inicial recomendada

Stack definida pelo briefing:

- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- Deploy na Vercel.
- Repositorio no GitHub.
- Catalogo local inicialmente.
- Carrinho persistido no navegador.
- Finalizacao pelo WhatsApp.

Organizacao sugerida:

```txt
app/
  layout.tsx
  page.tsx
  globals.css
components/
  layout/
  sections/
  catalog/
  cart/
  ui/
data/
  products.ts
  site-content.ts
lib/
  whatsapp.ts
  money.ts
  cart-storage.ts
types/
  product.ts
  cart.ts
public/
  images/
  icons/
docs/
  briefing/
  analise/
```

Recomendacao tecnica: manter componentes de servidor por padrao e isolar interatividade do catalogo/carrinho em componentes cliente. Para o carrinho, usar estado local com hook/contexto simples; Zustand so vale se o estado se espalhar demais.

## 13. Ordem ideal de implementacao

1. Confirmar dados comerciais ausentes minimos: WhatsApp, pagamento, retirada/entrega e Instagram.
2. Criar base Next.js + TypeScript + Tailwind, se ainda nao existir.
3. Definir tokens visuais: cores, tipografia, raios, sombras, espacamento e icones.
4. Modelar dados locais do cardapio.
5. Implementar header, hero e beneficios.
6. Implementar catalogo por categorias.
7. Implementar detalhe do produto com variacoes obrigatorias.
8. Implementar carrinho persistido e resumo fixo.
9. Implementar geracao da mensagem para WhatsApp.
10. Implementar Clube VIP, Sobre, Depoimentos, Como pedir, FAQ e CTA final.
11. Adicionar preloader, rollers e microanimacoes.
12. Fazer QA mobile/desktop, acessibilidade basica, build e ajuste fino.
13. Preparar deploy Vercel e validar URL real.

## 14. Definicao clara do que pertence ao MVP

### Dentro do MVP

- Pagina unica mobile-first.
- Header compacto com menu e carrinho.
- Hero com Nath e CTAs.
- Catalogo local por categorias.
- Produtos com imagens, descricao, preco e status.
- Selecao de variacoes confirmadas.
- Observacoes por produto.
- Carrinho persistido no navegador.
- Alterar quantidades e remover itens.
- Entrega ou retirada.
- Data desejada.
- Forma de pagamento.
- Observacoes gerais do pedido.
- Mensagem formatada para WhatsApp.
- Clube VIP via WhatsApp.
- Sobre a Nath.
- Depoimentos reais ou bloco alternativo de prova visual.
- Como pedir.
- FAQ.
- CTA final.
- Animações leves e preloader curto.
- Deploy na Vercel.

### Fora do MVP

- Login.
- Pagamento online.
- Painel administrativo.
- Banco de dados.
- Estoque em tempo real.
- Rastreamento do pedido.
- Sistema de entregadores.
- Cupom automatico.
- Calculo automatico de taxa de entrega por endereco.
- Cadastro obrigatorio de cliente.
- Analytics avancado ou remarketing.

## 15. Recomendacao objetiva da primeira tarefa de desenvolvimento

A primeira tarefa de desenvolvimento deve ser **modelar o catalogo local e os tipos TypeScript de produto/carrinho**, antes de desenhar componentes. Isso reduz retrabalho porque o fluxo inteiro depende das variacoes, precos, disponibilidade, observacoes e informacoes que serao enviadas ao WhatsApp.

Entrega esperada da primeira tarefa:

- `types/product.ts`
- `types/cart.ts`
- `data/products.ts`
- `lib/money.ts`
- um checklist de dados ainda pendentes para produtos com "a confirmar"

Somente depois disso vale montar o layout do hero/catalogo, porque os componentes visuais precisam nascer conectados ao cardapio real, nao aos produtos conceituais das referencias.
