# Implementação do carrinho - Doces da Nath

## Escopo entregue

Esta etapa conecta o detalhe configurável ao carrinho real e implementa a experiência local de revisão do pedido. O carrinho agora recebe a configuração validada, mantém contador e subtotal sincronizados, persiste no navegador e permite alterar quantidade, remover itens ou limpar tudo.

Checkout, dados do cliente, entrega ou retirada, endereço, data, horário, pagamento e WhatsApp continuam fora do escopo. A ação final permanece desabilitada com o texto `Finalização em breve`.

## Arquivos criados

- `src/components/cart/cart-provider.tsx`: estado compartilhado, hidratação, persistência e operações do carrinho.
- `src/components/cart/cart-experience.tsx`: composição da barra móvel e do painel.
- `src/components/cart/cart-mobile-bar.tsx`: resumo fixo para mobile.
- `src/components/cart/cart-drawer.tsx`: painel de revisão, edição, remoção, limpeza e estado vazio.
- `docs/analise/CART-IMPLEMENTATION.md`: registro desta etapa.

## Arquivos modificados

- `src/app/page.tsx`: instala o `CartProvider` e a experiência global do carrinho.
- `src/components/product-detail/product-detail-dialog.tsx`: cria um `CartItem` válido depois da configuração e o adiciona ao carrinho.
- `src/components/product-detail/quantity-stepper.tsx`: aceita o nome do item nos rótulos acessíveis.
- `src/components/layout/site-header.tsx`: usa contador real e abre o painel.
- `src/data/site-content.ts`: atualiza o feedback de inclusão.
- `src/app/globals.css`: estilos responsivos da barra, painel, itens e estados.
- `README.md`: atualiza o estado corrente do projeto.

Nenhuma dependência foi instalada. Produtos, categorias, preços, constantes comerciais, regras de preço e contratos de armazenamento foram preservados.

## Arquitetura do estado

`CartProvider` é a única fonte de verdade da interface. Ele expõe:

- estado completo do carrinho;
- quantidade total de unidades;
- subtotal geral em centavos;
- estado de hidratação;
- estado aberto ou fechado do painel;
- inclusão, atualização de quantidade, remoção e limpeza;
- abertura com registro do acionador e fechamento com retorno de foco.

O estado inicial usa `createEmptyCartState`. Os totais e identidades continuam sendo calculados pelas funções existentes em `src/lib/cart-calculations.ts`; o JSX não replica regras monetárias.

## Criação e agrupamento de itens

Depois de validar variante e grupos obrigatórios, o detalhe cria snapshots do produto, variante e opções selecionadas. Textos opcionais vazios não são enviados e as observações são aparadas.

Itens com o mesmo produto, variante, opções e observações normalizadas compartilham a mesma identidade e têm suas quantidades somadas por `addOrGroupCartItem`. Configurações diferentes permanecem em linhas separadas.

Após uma inclusão válida:

- o feedback informa `Item adicionado ao carrinho.`;
- o botão muda para `Adicionado ao carrinho` e fica desabilitado;
- qualquer mudança posterior na configuração libera uma nova inclusão;
- o detalhe não abre o carrinho automaticamente.

## Persistência local

O estado é salvo em `localStorage` na chave `doces-da-nath:cart:v1` somente depois da hidratação do cliente.

- `serializeCart` valida a estrutura antes de gravar;
- `deserializeCart` aceita somente o schema compatível;
- JSON inválido ou estrutura incompatível volta ao carrinho vazio;
- indisponibilidade do armazenamento não interrompe o carrinho em memória;
- recarregar a página recupera itens, configurações e quantidades.

Os campos futuros de pedido permanecem com valores vazios no contrato existente e não aparecem na interface.

## Interface mobile

Com pelo menos um item, uma barra fixa apresenta quantidade total, subtotal e `Ver carrinho`. Um espaçador equivalente evita que a barra cubra o conteúdo final da página.

Entre 320 e 767 px, o carrinho abre como bottom sheet:

- altura máxima de 92% da área útil;
- cabeçalho e rodapé estáveis;
- rolagem restrita à lista de itens;
- controles de toque com pelo menos 44 px;
- respeito à área segura inferior;
- bloqueio da rolagem de fundo;
- nenhum overflow horizontal.

## Interface desktop

A partir de 768 px, o mesmo conteúdo abre como painel lateral direito com 480 px de largura máxima e altura total. A barra móvel fica oculta a partir de 900 px, enquanto o botão do header continua disponível em todas as larguras.

O painel mantém a página visível sob um overlay suave, sem alterar a posição do catálogo e sem criar uma etapa de checkout.

## Operações do carrinho

- contador: soma unidades, não apenas linhas;
- quantidade: aceita somente inteiros positivos;
- subtotal do item: preço unitário multiplicado pela quantidade;
- subtotal geral: soma todos os itens por `calculateCartSubtotalCents`;
- remoção: exclui uma identidade configurada;
- limpeza: exige confirmação interna com `Cancelar` e `Limpar`;
- estado vazio: orienta o retorno ao cardápio;
- finalização: botão desabilitado, sem navegação e sem WhatsApp.

Variantes marcadas com confirmação de preço mantêm o valor atual e exibem `Valor sujeito à confirmação.` no item.

## Acessibilidade

- painel com `role="dialog"`, `aria-modal` e título associado;
- foco inicial no botão fechar;
- ciclo de foco entre primeiro e último controle;
- fechamento por botão, overlay e `Escape`;
- retorno do foco ao botão do header ou da barra móvel que abriu o painel;
- página de fundo sem rolagem enquanto aberto;
- rótulos de quantidade incluem o nome do produto;
- remoção usa nome acessível específico e tooltip;
- contador e botão do header comunicam item ou itens corretamente;
- estados de foco permanecem visíveis;
- animações respeitam `prefers-reduced-motion`.

## Validações realizadas

- TypeScript aprovado com `pnpm typecheck`.
- ESLint aprovado com `pnpm lint`.
- Build de produção aprovado com `pnpm build`.
- inclusão de Bolo P, sabor Chocolate 50%, textos, notas e quantidade 2;
- preço unitário de R$ 125,00 e subtotal de R$ 250,00;
- alteração para 3 unidades e subtotal de R$ 375,00;
- recuperação de 3 unidades após recarregar;
- nova inclusão idêntica agrupada em uma única linha com 4 unidades e R$ 500,00;
- cancelamento e confirmação da limpeza total;
- remoção individual e retorno ao estado vazio;
- estado vazio preservado após recarregar;
- barra móvel oculta quando vazio e visível quando preenchido;
- botão final presente, desabilitado e sem ação externa;
- fechamento por botão, overlay e `Escape`;
- foco preso no painel e devolvido ao acionador;
- responsividade em 320, 375, 390, 430, 768, 1024 e 1440 px;
- inspeção visual em 320 × 700, 390 × 844 e 1440 × 900;
- ausência de overflow horizontal nas larguras testadas;
- console do navegador sem erros da aplicação;
- servidor local respondendo HTTP 200.

## Limitações atuais

- o carrinho é local ao navegador e não sincroniza entre dispositivos;
- não há edição da configuração dentro do carrinho; para outra configuração, o usuário volta ao produto;
- fotos reais ainda não foram fornecidas, portanto o placeholder oficial continua sendo usado;
- não há cálculo de frete, prazo, data, pagamento ou disponibilidade dinâmica;
- não existe checkout nem geração de mensagem para WhatsApp;
- pendências comerciais continuam sujeitas à confirmação da Nath.

## Próxima tarefa recomendada

Modelar e implementar a etapa de finalização sem enviar ao WhatsApp ainda: dados mínimos do cliente, entrega ou retirada, endereço condicional, data desejada, horário e forma de pagamento. Essa etapa deve validar e revisar todos os dados antes de habilitar a geração da mensagem final.
