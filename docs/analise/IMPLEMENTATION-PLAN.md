# Plano de implementação - Doces da Nath

## Objetivo do MVP

Entregar uma vitrine mobile-first para o cardápio real da Doces da Nath, permitindo selecionar variantes, montar um carrinho persistido no navegador e enviar uma solicitação de pedido estruturada para o WhatsApp `5527995082631`.

O site não cria um pedido confirmado, não recebe pagamento e não controla estoque. A Nath confirma pelo WhatsApp disponibilidade, prazo, entrega, taxa e valor final quando houver personalização.

## Arquitetura recomendada

### Base

- Next.js com App Router.
- TypeScript em modo estrito.
- Tailwind CSS com tokens derivados de `DESIGN-SYSTEM.md`.
- Página principal única, com metadados e conteúdo inicial renderizados no servidor.
- Catálogo local versionado no repositório.
- Deploy na Vercel e código no GitHub.
- Sem banco de dados, autenticação, API própria ou CMS no MVP.

### Fronteira servidor/cliente

- Layout, metadados, hero, conteúdo institucional, FAQ e estrutura inicial do catálogo devem permanecer no servidor sempre que não precisarem de estado interativo.
- Catálogo filtrável, detalhe de produto, carrinho, persistência e montagem do link do WhatsApp formam uma ilha cliente bem delimitada.
- Não transformar toda a página em componente cliente por causa do carrinho.
- Leitura do `localStorage` deve acontecer somente no navegador, com estado inicial estável para evitar diferença entre servidor e cliente.

### Estado

- Contexto e reducer/hook próprio são suficientes para o MVP.
- Adotar biblioteca de estado somente se a implementação real demonstrar compartilhamento complexo; não adicionar por antecipação.
- Carrinho persistido com `schemaVersion`, migração simples e recuperação segura quando o conteúdo estiver inválido.
- Dados operacionais do pedido podem persistir localmente, mas não devem incluir informação pessoal desnecessária.

### Dados e preço

- Valores monetários em centavos inteiros.
- Preço mostrado como `a partir de` deve ser derivado da menor variante, não digitado separadamente.
- Taxa de entrega, decoração e adicionais sem regra ficam fora do subtotal.
- Produtos e variantes ausentes após uma atualização devem ser marcados para revisão ou removidos com aviso, não mantidos silenciosamente com preço antigo.
- O subtotal é sempre chamado de `subtotal dos itens` até a confirmação da Nath.

### Imagens

- Cloudinary como origem remota dos cinco assets oficiais.
- Autorizar o domínio remoto na configuração de imagens durante a implementação.
- Hero com prioridade; imagens abaixo da dobra com lazy loading.
- Fotos reais de produto associadas ao cadastro local assim que forem fornecidas.
- Dimensões/proporções sempre reservadas para evitar mudança de layout.

### Acessibilidade e overlays

- Detalhe do produto e carrinho em bottom sheets acessíveis no mobile e painel/modal no desktop.
- Foco preso no overlay, fechamento por botão e Escape, retorno do foco à origem.
- Categorias, opções, quantidade, FAQ e menu operáveis por teclado.
- Movimento reduzido desativa roller, deslocamentos e cortina prolongada.

## Organização conceitual

A estrutura abaixo é recomendada para a futura implementação, sem criar arquivos nesta etapa:

```text
app
  layout e metadados
  página principal
  estilos globais e tokens
components
  layout e navegação
  seções editoriais
  catálogo e produto
  carrinho e checkout pelo WhatsApp
  componentes de interface
data
  categorias, produtos e conteúdo do site
lib
  dinheiro, armazenamento, validação e WhatsApp
types
  produto, carrinho e conteúdo
public
  apenas assets aprovados que futuramente precisarem ser locais
docs
  briefing e análise
```

## Modelo de dados necessário

### Categorias

```text
Category
  id: identificador estável
  name: rótulo público
  slug: âncora/filtro
  order: ordem de exibição
  visible: controle editorial
```

Categorias iniciais: `bolos`, `brigadeiros-docinhos`, `kits-festa` e `caixas-presentes`. `Mais pedidos` deve ser uma flag/filtro, não uma categoria duplicada.

### Produto

```text
Product
  id: identificador estável
  slug: URL/identificador legível
  categoryId: categoria real
  name: nome oficial
  shortDescription: descrição curta
  fullDescription: opcional
  images: lista de imagens reais com alt e dimensões
  badges: somente destaques confirmados
  availability: sob encomenda, pronta entrega a confirmar, indisponível ou oculto
  leadTime: texto ou regra somente quando confirmado
  priceMode: fixo ou por variante
  fixedPriceCents: obrigatório quando preço fixo
  variants: lista quando o preço depende de tamanho/quantidade
  optionGroups: escolhas sem preço ou sujeitas à confirmação
  minimumOrder: quando aplicável
  allowsItemNotes: verdadeiro/falso
  allowsCustomization: verdadeiro/falso
  fulfillment: entrega, retirada ou confirmação no WhatsApp
  featured: flag editorial confirmada
```

### Variante

```text
ProductVariant
  id: identificador estável dentro do produto
  label: P, M, G, 25 unidades, 50 unidades ou 100 unidades
  priceCents: preço real da variante
  yieldLabel: aproximadamente 10/28/42 fatias quando aplicável
  unitCount: 25/50/100 quando aplicável
  available: disponibilidade da variante
```

### Grupo de opções

```text
OptionGroup
  id: identificador estável
  label: Sabor, mensagem, cor, ocasião ou outra escolha real
  inputType: escolha única, múltipla ou texto
  required: obrigatório ou opcional
  options: valores confirmados
  maxSelections: somente quando a regra existir
  changesPrice: falso no MVP quando não houver adicional confirmado
  confirmationRequired: sinaliza que a Nath confirma no WhatsApp
```

### Linha do carrinho

```text
CartLine
  lineId: identidade da configuração adicionada
  productId: referência ao catálogo atual
  variantId: referência à variante escolhida
  selectedOptions: escolhas confirmadas pelo usuário
  itemNotes: observação do item
  quantity: quantidade de conjuntos/produtos
  addedAt: data técnica opcional para ordenação
```

Itens só podem ser agrupados quando produto, variante, opções e observação forem idênticos.

### Estado do carrinho

```text
CartState
  schemaVersion: versão da persistência
  lines: linhas do carrinho
  fulfillmentMode: entrega, retirada ou ainda não escolhido
  desiredDate: data desejada, sem promessa automática de disponibilidade
  paymentMethod: valor vindo da lista comercial confirmada
  orderNotes: observação geral
  updatedAt: controle de validade/migração
```

Não é necessário pedir nome e telefone no MVP: a conversa acontece no próprio WhatsApp. Endereço completo não deve ser persistido sem necessidade; pode ser confirmado na conversa, salvo mudança explícita de escopo.

### Pedido para WhatsApp

```text
OrderDraft
  source: site Doces da Nath
  items: produto, variante, opções, quantidade, observação e subtotal por linha
  itemsSubtotalCents: subtotal dos itens
  fulfillmentMode: entrega ou retirada
  desiredDate: data desejada
  paymentMethod: forma selecionada
  orderNotes: observação geral
  confirmationNotice: disponibilidade, prazo, taxa e valor final dependem da Nath
```

## Cobertura do cardápio real

### Bolos

- Bolo personalizado com variantes P/R$ 125,00/~10 fatias, M/R$ 250,00/~28 fatias e G/R$ 300,00/~42 fatias.
- Sabor como escolha obrigatória a partir da lista real.
- Ocasião, mensagem, cores e preferências de decoração como observação, sujeitas à confirmação.
- Sem adicional automático de personalização.

### Brigadeiros e docinhos

- Um produto por sabor real.
- Variante obrigatória de 25, 50 ou 100 unidades com preço próprio.
- Quantidade mínima registrada como 25 unidades.
- Não permitir mistura de sabores ou limite de combinações até a Nath definir a regra.
- Confirmar o preço de 100 unidades do Brigadeiro de Ninho com Nutella antes da publicação.

### Kits festa

- Preço fixo por kit.
- Composição exibida como conteúdo do produto.
- Sabores e personalização ficam como solicitação/observação até existirem regras fechadas.

### Caixa com 12 brigadeiros

- Preço fixo de R$ 45,00.
- Status `sob encomenda ou pronta entrega a confirmar`.
- Sabores e quantidade máxima de sabores permanecem pendentes.

### Bento cake

- Preço fixo de R$ 69,90.
- Informação de aproximadamente 900 g.
- Sabores, cores e mensagem como escolhas sujeitas à confirmação.

## Regras do carrinho

1. Exigir variante antes de adicionar produtos com preço variável.
2. Permitir observação por item e observação geral.
3. Exibir subtotal por linha e subtotal dos itens.
4. Permitir aumentar, diminuir e remover itens.
5. Ao chegar a zero, remover a linha e ocultar a barra fixa quando o carrinho estiver vazio.
6. Persistir estado com versão; recuperar falhas sem quebrar a página.
7. Recalcular preços usando o catálogo atual. Um snapshot pode existir apenas para diagnóstico/migração, nunca como fonte final.
8. Não somar taxa de entrega, personalização ou adicional não confirmado.
9. Avisar claramente que o envio abre uma solicitação no WhatsApp, não uma compra confirmada.
10. Validar os campos mínimos definidos: itens, entrega/retirada, data desejada e forma de pagamento real quando essa lista for fornecida.
11. Se a forma de pagamento ainda não estiver confirmada durante o desenvolvimento, o campo deve permanecer marcado como pendente e não receber opções inventadas.
12. O botão do WhatsApp deve gerar um link codificado e legível, sem expor dados em analytics.

## Estrutura da mensagem do WhatsApp

A mensagem de pedido deve conter, nesta ordem:

1. Saudação curta e origem `site Doces da Nath`.
2. Título `Meu pedido`.
3. Cada item com quantidade, produto, variante, opções, observação e subtotal.
4. Subtotal dos itens.
5. Entrega ou retirada.
6. Data desejada.
7. Forma de pagamento selecionada.
8. Observação geral.
9. Pedido de confirmação de disponibilidade, prazo, taxa de entrega e valor final.

Contato direto e Clube VIP devem gerar mensagens separadas e menores. Não misturar itens do carrinho na mensagem do Clube VIP.

## Dependências conceituais

```text
Cardápio real
  -> modelo de produto e variante
  -> cards e detalhe do produto
  -> cálculo do carrinho
  -> mensagem do WhatsApp

Conteúdo comercial confirmado
  -> entrega/retirada e pagamento
  -> FAQ
  -> publicação

Fotos reais
  -> catálogo final
  -> detalhe do produto
  -> prova visual

Tokens e assets oficiais
  -> header e hero
  -> seções editoriais
  -> QA responsivo e performance
```

## Ordem de implementação

### Etapa 1 - Fundação técnica mínima

- Inicializar o projeto somente quando a etapa de preparação for aprovada.
- Confirmar versão atual do Next.js, gerenciador de pacotes e Tailwind no momento da execução.
- Criar estrutura mínima, TypeScript estrito, metadados base e scripts de validação.
- Não instalar biblioteca de animação ou estado sem necessidade comprovada.

**Aceite:** aplicação mínima inicia, lint/typecheck/build disponíveis e nenhuma dependência supérflua.

### Etapa 2 - Fundação de dados do catálogo

- Criar tipos de categoria, produto, variante, opção, carrinho e pedido.
- Cadastrar os 19 produtos reais e todos os preços confirmados.
- Implementar dinheiro em centavos e exibição em real.
- Criar validação de integridade do catálogo.
- Marcar o preço de Nutella como pendência de publicação, sem corrigi-lo por suposição.

**Aceite:** todos os itens do cardápio estão representados; nenhum produto do mockup foi cadastrado; IDs são únicos; preço exibido é derivado corretamente.

### Etapa 3 - Tokens, layout e identidade inicial

- Implementar paleta, tipografia provisória, espaçamento, containers, botões e foco.
- Configurar Cloudinary e proporções dos assets.
- Criar header, hero e roller único.
- Garantir que o hero continue legível se a imagem falhar.

**Aceite:** marca, proposta e CTA aparecem cedo em 390 e 430 px; sem overflow; logos não são cortadas.

### Etapa 4 - Catálogo

- Implementar categorias reais e filtros.
- Criar cards ligados ao catálogo local.
- Preparar placeholders internos apenas durante desenvolvimento, identificados como tal.
- Ajustar uma ou duas colunas por legibilidade real.

**Aceite:** filtro correto, preços/status legíveis, nenhum pudim ou produto conceitual, navegação por teclado e toque funcional.

### Etapa 5 - Detalhe do produto

- Implementar bottom sheet/painel acessível.
- Renderizar variante e opções a partir dos dados.
- Validar campos obrigatórios e adicionar uma configuração completa ao carrinho.

**Aceite:** bolo e brigadeiros exigem a variante correta; observações são preservadas; foco e fechamento funcionam.

### Etapa 6 - Carrinho persistido

- Implementar reducer/contexto, barra-resumo, drawer/bottom sheet e persistência versionada.
- Alterar quantidade, remover, agrupar configurações idênticas e recalcular subtotal.
- Tratar carrinho inválido ou antigo com recuperação segura.

**Aceite:** recarregar a página mantém itens válidos; preços vêm do catálogo atual; barra não cobre conteúdo; carrinho vazio é coerente.

### Etapa 7 - Fluxo para WhatsApp

- Adicionar entrega/retirada, data desejada, pagamento e observação geral.
- Implementar validação e mensagem codificada.
- Usar `https://wa.me/5527995082631`.
- Criar mensagens distintas para pedido, contato direto e Clube VIP.

**Aceite:** link abre o número correto; a mensagem contém todos os itens e campos; taxa/prazo não são inventados; texto continua legível com pedidos maiores.

### Etapa 8 - Conteúdo institucional

- Implementar Clube VIP, Sobre, prova/depoimentos, Como pedir, FAQ, CTA final e footer.
- Inserir somente copy, benefícios e depoimentos aprovados.
- Ocultar blocos sem conteúdo verdadeiro em vez de preencher com ficção.

**Aceite:** nenhuma promessa não confirmada; contatos corretos; página não fica longa ou repetitiva.

### Etapa 9 - Movimento e acabamento

- Implementar preloader opcional, entradas suaves e microinterações.
- Respeitar movimento reduzido.
- Remover efeito que prejudique LCP, foco, toque ou leitura.

**Aceite:** funções completas sem animação; preloader curto e não bloqueante; um único roller pausável.

### Etapa 10 - QA e publicação

- Executar lint, typecheck, testes e build.
- Fazer QA visual/funcional nas larguras definidas.
- Publicar preview na Vercel, revisar com a Nath e só então promover para produção.

**Aceite:** jornada principal funciona na URL real, metadados e imagens carregam, contatos estão confirmados e os bloqueios de publicação foram resolvidos ou os blocos afetados permanecem ocultos.

## Estratégia de testes

### Integridade dos dados

- IDs e slugs únicos.
- Todo produto ligado a uma categoria válida.
- Produto de preço fixo com preço em centavos.
- Produto por variante com ao menos uma variante válida.
- Bolo com P/M/G, rendimento e preços corretos.
- Cada brigadeiro/docinho com 25/50/100 e seus preços do cardápio.
- Nenhum item conceitual cadastrado.

### Testes unitários

- formatação de real e cálculo em centavos;
- menor preço para `a partir de`;
- identidade/agrupamento de linhas do carrinho;
- subtotal após aumentar, diminuir e remover;
- migração/limpeza do estado persistido;
- mensagem do WhatsApp para preço fixo, variante, observação e pedido com vários itens;
- mensagens separadas de pedido, contato e VIP.

### Testes de componentes e acessibilidade

- filtros e estado selecionado;
- validação de opção obrigatória;
- stepper de quantidade;
- menu, FAQ, detalhe e carrinho por teclado;
- foco inicial, retenção e retorno em overlays;
- estados vazio, indisponível e carregamento de imagem com falha.

### Jornada ponta a ponta

1. Abrir em 390 × 844.
2. Ir ao catálogo pelo hero.
3. Filtrar categoria.
4. Abrir bolo, escolher tamanho e sabor, adicionar.
5. Abrir brigadeiro, escolher quantidade, adicionar.
6. Recarregar e confirmar persistência.
7. Alterar quantidade e remover item.
8. Selecionar entrega/retirada, data, pagamento e observação.
9. Validar o número e o conteúdo do link do WhatsApp sem enviar mensagem automaticamente.
10. Repetir em 430 × 932, 768 × 1024 e 1365 × 768.

### QA visual e performance

- nenhum overflow horizontal;
- texto cabe em pills, cards, botões e barra fixa;
- hero preserva rosto e bolo;
- imagem Sobre preserva rosto, mãos e bolo;
- barra do carrinho não cobre o último conteúdo;
- layout estável durante carregamento de imagens;
- hero é priorizado e conteúdo abaixo da dobra é lazy;
- preloader não aumenta a espera percebida;
- movimento reduzido funciona;
- build de produção sem erros de console que interrompam a jornada.

## Estratégia de deploy

1. Criar repositório GitHub quando a implementação começar, preservando `docs/`.
2. Trabalhar em preview/branch antes da produção.
3. Conectar o projeto à Vercel e usar o mesmo comando de build validado localmente.
4. Não são esperados segredos no MVP; qualquer variável futura deve ficar fora do repositório.
5. Validar domínio do Cloudinary, cache, formatos e falhas de imagem.
6. Configurar title, description, idioma, canonical quando houver domínio, Open Graph, favicon aprovado, robots e sitemap proporcionais a uma página única.
7. Testar a URL publicada em celular real: navegação, persistência, WhatsApp, refresh, teclado, hero e carrinho.
8. Promover para produção somente após resolver pagamento e os demais dados que forem efetivamente exibidos.

## Principais riscos

- fotos reais de produto ainda ausentes;
- preço possivelmente inconsistente do Brigadeiro de Ninho com Nutella;
- meios de pagamento impedem concluir o seletor real;
- conteúdo do Clube VIP e depoimentos não podem ser inferidos;
- hero vertical pode perder composição no desktop sem o tratamento planejado;
- preloader e roller podem piorar performance/movimento se implementados cedo demais;
- `localStorage` pode causar estado antigo ou diferença de hidratação sem versionamento;
- link do WhatsApp pode ficar extenso com muitos itens/observações e precisa de teste real;
- barra fixa e teclado virtual podem cobrir ações no mobile;
- disponibilidade não é estoque em tempo real e precisa ser comunicada corretamente;
- imagens remotas exigem fallback para a página continuar funcional.

## Primeira tarefa de desenvolvimento recomendada

**Criar a fundação tipada do catálogo real e do carrinho, sem interface visual.**

Essa tarefa deve representar as quatro categorias, os 19 produtos, variantes, disponibilidade, observações e preços em centavos; também deve definir o contrato mínimo do carrinho e validar a integridade dos dados. Se o repositório ainda estiver vazio, a inicialização mínima do Next.js entra apenas como pré-requisito técnico para executar TypeScript e testes, sem começar o layout.

Critérios de aceite da primeira tarefa:

- nenhum produto que exista apenas nos mockups;
- bolo com P/M/G e rendimentos;
- 14 sabores de brigadeiros/docinhos com variantes 25/50/100;
- kits, caixa de 12 e bento cake representados;
- preços em centavos e `a partir de` derivado;
- pendências explícitas sem opções inventadas;
- tipos do carrinho preparados para variante, opções, observação e quantidade;
- checagens automatizadas de IDs, categorias e preços;
- nenhuma seção ou componente de produção implementado nessa tarefa.

## Quando a preparação estará concluída

A etapa de preparação é considerada concluída quando:

- os cinco documentos de análise existem e não se contradizem;
- todos os assets possuem função, posição, recorte, prioridade, fallback e pendências documentados;
- dimensões divergentes estão registradas;
- a sequência curta da página e os estados de produto/carrinho estão fechados;
- o cardápio real está coberto pelo modelo de dados;
- produtos conceituais foram excluídos do escopo;
- regras do carrinho e da mensagem do WhatsApp estão definidas;
- conteúdos pendentes estão classificados por impacto;
- critérios de aceite e testes estão definidos por etapa;
- a primeira tarefa de desenvolvimento está delimitada;
- nenhum código de produção foi criado durante esta fase.
