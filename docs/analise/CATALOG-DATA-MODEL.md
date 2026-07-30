# Modelo de dados do catálogo - Doces da Nath

## Objetivo

Esta fundação representa o cardápio real da Doces da Nath sem depender da interface. Produtos, variantes, opções, preços, pendências e carrinho são tipados e podem ser consumidos futuramente pelo catálogo visual, bottom sheet e fluxo do WhatsApp.

Nenhuma foto de mockup, produto fictício, depoimento ou dado comercial não confirmado foi cadastrado.

## Categorias

O catálogo possui exatamente quatro categorias principais:

| ID | Nome público | Quantidade atual |
| --- | --- | ---: |
| `bolos` | Bolos | 1 |
| `brigadeiros-docinhos` | Brigadeiros e docinhos | 14 |
| `kits-festa` | Kits Festa | 2 |
| `caixas-produtos-individuais` | Caixas e produtos individuais | 2 |

`Mais pedidos` não é uma categoria. Futuramente será um filtro derivado de `featured: true`. Como a Nath ainda não confirmou os destaques, todos os 19 produtos estão com `featured: false`.

## Produtos cadastrados

O catálogo contém exatamente 19 produtos:

1. Bolo personalizado.
2. Brigadeiro de Chocolate 50%.
3. Brigadeiro de Ninho com Nutella.
4. Brigadeiro de Limão.
5. Brigadeiro de Ninho.
6. Beijinho de coco.
7. Brigadeiro de Churros.
8. Casadinho.
9. Brigadeiro Ferrero.
10. Brigadeiro Brûlée.
11. Brigadeiro de Oreo.
12. Brigadeiro de Confeti.
13. Brigadeiro de Paçoca.
14. Surpresa de Uva.
15. Brigadeiro de Café.
16. Kit Festa Individual.
17. Kit Festa para 4 pessoas.
18. Caixa com 12 brigadeiros.
19. Bento cake.

Pudim, sobremesas dos mockups e categorias sazonais não foram cadastrados.

## Tipos de preço

O contrato suporta quatro tipos discriminados:

- `fixed`: preço final fixo cadastrado em centavos.
- `variant`: preço resolvido pela variante obrigatória.
- `from`: preço inicial conhecido, podendo exigir confirmação posterior.
- `quote`: sem preço automático; depende de orçamento.

Todos os valores são inteiros em centavos. Exemplos usados no catálogo:

- bolo P: `12500`;
- Kit Festa Individual: `5000`;
- bento cake: `6990`.

O preço inicial de produtos por variante é derivado da variante mais barata por `getProductStartingPriceCents`. Ele não é duplicado nos dados.

## Variantes

### Bolo personalizado

O tamanho é um grupo de variante obrigatório:

| Variante | Rendimento aproximado | Preço |
| --- | ---: | ---: |
| P | 10 fatias | 12500 |
| M | 28 fatias | 25000 |
| G | 42 fatias | 30000 |

O sabor é um grupo de opção obrigatória e contém os 11 sabores do cardápio. Ocasião, mensagem e cores são campos de texto opcionais, sem modificador automático de preço e sujeitos à confirmação.

### Brigadeiros e docinhos

Cada sabor é um produto independente. Todos possuem as variantes obrigatórias de 25, 50 e 100 unidades e registram quantidade mínima de 25 unidades.

O Brigadeiro de Ninho com Nutella preserva os valores informados:

- 25 unidades: `5000`;
- 50 unidades: `9500`;
- 100 unidades: `14500`.

A variante de 100 unidades, o tipo de preço e o campo `price_confirmation` indicam que o valor de R$ 145,00 precisa ser confirmado. Nenhum valor foi corrigido por inferência.

## Opções reutilizáveis

Os grupos de opção suportam:

- `single`: uma escolha entre opções conhecidas;
- `multiple`: várias escolhas, com limite obrigatório;
- `text`: conteúdo livre, sem lista de opções.

Cada opção conhecida pode possuir um modificador em centavos. Atualmente todos os modificadores são zero porque não existem adicionais com preço confirmado.

Sabores de kits, caixa e bento não foram transformados em seletores. Permanecem como pendências estruturadas até a Nath definir os valores válidos e limites.

## Disponibilidade

O contrato aceita:

- `made_to_order`;
- `ready_or_made_to_order`;
- `ready_to_deliver`;
- `temporarily_unavailable`;
- `hidden`.

Bolos, brigadeiros, kits e bento estão como `made_to_order`. A caixa com 12 brigadeiros está como `ready_or_made_to_order`, com a disponibilidade de pronta entrega marcada como pendência. Nenhum status `ready_to_deliver` foi usado como garantia.

## Campos pendentes

`pendingFields` usa uma união tipada, evitando textos avulsos espalhados pela aplicação. Os dados atuais registram, conforme o produto:

- prazo;
- detalhes de entrega/retirada;
- limite de sabores do bolo;
- preço de personalização;
- sabores de bolo, docinhos e cookies dos kits;
- sabores e limite de sabores da caixa;
- sabores e cores do bento;
- regras de personalização;
- disponibilidade de pronta entrega;
- preço pendente de confirmação.

Todos os produtos exigem confirmação pelo WhatsApp, mas esta tarefa não implementa o link ou a mensagem.

## Imagens

Todos os produtos possuem `images: []`. O tipo já suporta URL, texto alternativo, largura e altura, porém nenhuma URL falsa ou imagem conceitual foi adicionada.

## Estrutura do carrinho

O carrinho separa configuração persistida de valores derivados:

- `CartProductSnapshot`: identificação mínima do produto no momento da inclusão;
- `CartVariantSnapshot`: variante e preço selecionados;
- `CartSelectedOption`: grupo, valor e modificador de preço;
- `CartItem`: produto, variante, opções, quantidade e observação;
- `CartItemTotals`: preço unitário e subtotal calculados;
- `CartOrderDetails`: entrega/retirada, data, pagamento e observação geral;
- `CartState`: versão do schema, itens e dados gerais.

O subtotal não é persistido como fonte de verdade. Ele é calculado por funções puras a partir do preço resolvido e da quantidade.

## Agrupamento de itens

`createCartItemIdentity` normaliza e compara:

1. produto;
2. variante;
3. opções, independentemente da ordem recebida;
4. observação normalizada.

`addOrGroupCartItem` soma quantidades apenas quando esses quatro elementos são iguais. Itens com observações diferentes permanecem separados.

## Funções monetárias

- `formatBRL`: formata centavos no padrão brasileiro.
- `addCents`: soma somente inteiros não negativos.
- `multiplyCents`: multiplica centavos por inteiro não negativo.
- `getProductStartingPriceCents`: obtém o preço inicial sem duplicação.
- `resolveProductUnitPrice`: resolve preço fixo, variante, `from` ou orçamento.
- `sumPriceModifiers`: soma adicionais conhecidos.
- `calculateCartItemTotals`: calcula preço unitário e subtotal.
- `calculateCartSubtotalCents`: soma os subtotais do carrinho.

Valores negativos, fracionários, infinitos ou acima do limite seguro geram erro antes de entrar no cálculo.

## Persistência

O schema atual usa `CART_SCHEMA_VERSION = 1`.

- `serializeCart` aceita somente uma estrutura compatível e retorna JSON.
- `deserializeCart` recebe texto e valida toda a estrutura relevante.
- JSON inválido, versão incompatível ou campos corrompidos retornam um carrinho vazio seguro.
- os módulos não acessam `window` nem `localStorage`;
- a integração real com o navegador será adicionada junto ao estado cliente do carrinho.

Datas são persistidas como texto e não como objetos `Date`, mantendo o estado serializável.

## Validação do catálogo

`assertCatalogIsValid` é executado pela página mínima durante o build. O build falha quando encontra:

- IDs ou slugs duplicados;
- categoria inválida;
- preço negativo, fracionário ou inseguro;
- produto por variante sem variantes/grupo obrigatório;
- variantes ou opções duplicadas;
- grupos de opção incoerentes;
- quantidade diferente de 19 produtos;
- bolo sem P/M/G, rendimentos ou preços corretos;
- quantidade diferente de 14 brigadeiros/docinhos;
- brigadeiro sem variantes 25/50/100;
- preço de Nutella alterado ou sem marcação de confirmação;
- produto fictício de pudim;
- `featured: true` sem confirmação;
- produto que não exija confirmação pelo WhatsApp.

## Casos unitários a automatizar

Não havia ferramenta de testes no projeto e nenhuma biblioteca foi instalada nesta tarefa. Os próximos testes devem cobrir:

- `formatBRL(6990)` retorna `R$ 69,90`;
- subtotal de item com quantidade maior que um;
- subtotal do carrinho com vários itens;
- resolução de variante válida, ausente e inexistente;
- soma de modificadores;
- agrupamento de itens iguais;
- separação de itens com observações diferentes;
- serialização e desserialização válidas;
- JSON inválido e versão incompatível retornando carrinho vazio;
- catálogo real passando em todas as validações;
- alteração intencional de ID, preço ou quantidade fazendo a validação falhar.

## Decisões tomadas

- Modelo único de produto para todas as categorias.
- Variantes genéricas para tamanho e quantidade.
- Grupos reutilizáveis para escolha e texto.
- Preço inicial derivado, sem campo duplicado.
- Pendências representadas por valores tipados.
- Snapshots mínimos no carrinho, com subtotais derivados.
- Persistência sem dependência do navegador.
- Todos os destaques desativados até confirmação real.
- Validação comercial incorporada ao build sem instalar biblioteca de testes.

## Limitações atuais

- fotos reais dos 19 produtos ainda não foram fornecidas;
- formas de pagamento ainda não estão definidas;
- sabores e limites de kits, caixa e bento ainda estão pendentes;
- preço de 100 unidades de Ninho com Nutella precisa de confirmação;
- pronta entrega da caixa depende de confirmação;
- prazo e regras de entrega/retirada não estão fechados;
- não existe integração com `localStorage`, WhatsApp ou interface visual nesta etapa.

## Próximos passos

1. Confirmar as pendências comerciais, especialmente pagamento e preço de Nutella.
2. Adicionar uma infraestrutura de testes quando isso fizer parte do escopo.
3. Implementar os tokens visuais e a estrutura mínima do site.
4. Construir o catálogo consumindo exclusivamente estes dados.
5. Integrar o estado cliente e o armazenamento real sem mover cálculos para a interface.
