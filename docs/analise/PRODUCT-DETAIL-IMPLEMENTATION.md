# Implementação do detalhe de produto - Doces da Nath

## Escopo entregue

Esta etapa implementa somente a configuração visual de um produto selecionado no catálogo. O detalhe lê os dados reais dos 19 produtos, resolve variantes e opções existentes, calcula preço e subtotal e valida campos obrigatórios.

Nenhum item é persistido ou adicionado a um carrinho. Não foram implementados lista de carrinho, barra fixa, checkout, WhatsApp, entrega, data, pagamento ou fotos fictícias.

## Arquivos criados

- `src/components/product-detail/product-detail-dialog.tsx`: estado, formulário, validação, cálculo, foco e composição do detalhe.
- `src/components/product-detail/product-detail-placeholder.tsx`: placeholder oficial para produtos sem foto.
- `src/components/product-detail/quantity-stepper.tsx`: controle acessível de quantidade.
- `docs/analise/PRODUCT-DETAIL-IMPLEMENTATION.md`: registro desta etapa.

## Arquivos modificados

- `src/components/catalog/catalog-browser.tsx`: seleção local do produto, abertura e fechamento do detalhe e retorno do foco.
- `src/components/catalog/product-card.tsx`: `Ver opções` agora abre o produto correspondente.
- `src/data/site-content.ts`: feedback final da configuração.
- `src/app/globals.css`: bottom sheet, modal desktop, campos, estados, footer fixo e redução de movimento.

Nenhuma dependência foi instalada. Produtos, categorias, preços, constantes comerciais e funções de cálculo não foram alterados.

## Arquitetura do detalhe

O catálogo continua sendo a única ilha cliente desta área. `CatalogBrowser` mantém apenas:

- produto selecionado;
- referência do botão que abriu o detalhe;
- estado aberto/fechado derivado da existência do produto selecionado.

`ProductDetailDialog` é montado somente enquanto um produto está aberto. Ao desmontar, todas as escolhas são descartadas. Não existe estado global, Zustand, `localStorage` ou criação de `CartItem` nesta etapa.

O detalhe mantém localmente:

- variante selecionada;
- opções de escolha selecionadas;
- valores dos grupos de texto;
- quantidade;
- observações;
- tentativa de validação;
- feedback de configuração pronta.

## Comportamento mobile

Entre 320 e 430 px, o detalhe funciona como bottom sheet:

- ocupa no máximo 90% da altura útil;
- usa cantos arredondados somente no topo e handle discreto;
- mantém título e fechar no cabeçalho;
- possui conteúdo com rolagem interna;
- mantém resumo, feedback e ação no rodapé do sheet;
- respeita a área segura inferior;
- bloqueia a rolagem da página de fundo;
- mantém a ação final com 48 px.

Em 390 × 844, a lista completa de 11 sabores do bolo permaneceu operável. O conteúdo interno rolou sem mover a página e o rodapé ficou visível durante toda a configuração.

## Comportamento desktop

A partir de 768 px, o detalhe usa modal central com overlay suave:

- placeholder à esquerda;
- informações e opções à direita;
- cabeçalho e rodapé fixos dentro do modal;
- rolagem restrita à área de configuração;
- largura máxima de 1072 px em 1440 px;
- fechamento pelo botão, clique externo ou `Escape`.

O modal não usa tema escuro. Off-white, chocolate, champagne, dourado e rosa queimado seguem os tokens existentes.

## Seleção de variantes e opções

### Bolo personalizado

- tamanho obrigatório com P, M e G;
- rendimento e preço lidos diretamente das variantes;
- sabor obrigatório com as 11 opções reais;
- ocasião e decoração, mensagem e cores usam os três grupos de texto existentes;
- observações gerais permanecem disponíveis;
- personalizações não recebem preço extra automático.

### Brigadeiros e docinhos

- cada sabor continua sendo um produto independente;
- não existe seletor de sabor;
- a única escolha obrigatória é a variante de 25, 50 ou 100 unidades;
- preço e quantidade mínima permanecem representados pelos dados atuais.

### Produtos fixos

Kits Festa, Caixa com 12 brigadeiros e Bento cake não recebem seletores inexistentes. Seus preços são resolvidos imediatamente. O bento expõe somente o grupo real de mensagem personalizada e as observações gerais.

## Validação

O botão `Validar configuração` não adiciona nem persiste nada.

- bolo sem tamanho ou sabor apresenta erros junto aos grupos;
- brigadeiro sem variante de quantidade apresenta erro;
- produtos fixos podem ser validados sem escolhas fictícias;
- a primeira pendência recebe foco após uma tentativa inválida;
- erros desaparecem conforme as escolhas são preenchidas;
- alterações posteriores removem o feedback de configuração pronta;
- uma configuração válida informa: `Configuração pronta. O carrinho será habilitado na próxima etapa.`

## Cálculo de preço

O JSX não soma preços manualmente.

- `resolveProductUnitPrice` resolve preço fixo, variante e modificadores conhecidos;
- `multiplyCents` multiplica o preço unitário pela quantidade;
- `formatBRL` apresenta unitário e subtotal no padrão brasileiro;
- quantidade mínima visual do stepper é 1;
- nenhum máximo comercial foi inventado;
- o valor não resolvido permanece como `Selecione` e subtotal `—`.

Exemplos confirmados no navegador:

| Produto/configuração | Unitário | Quantidade | Subtotal |
| --- | ---: | ---: | ---: |
| Bolo P | R$ 125,00 | 2 | R$ 250,00 |
| Ninho com Nutella, 100 unidades | R$ 145,00 | 1 | R$ 145,00 |
| Kit Festa Individual | R$ 50,00 | 2 | R$ 100,00 |
| Caixa com 12 brigadeiros | R$ 45,00 | 1 | R$ 45,00 |
| Bento cake | R$ 69,90 | 1 | R$ 69,90 |

## Tratamento de pendências

`pendingFields` é convertido em avisos de leitura, nunca em seletores inventados. O detalhe informa, conforme o produto:

- prazo e entrega/retirada a confirmar;
- limites e personalização do bolo;
- sabores de bolo, docinhos e cookies dos kits;
- sabores, limite e pronta entrega da caixa;
- sabores, cores e personalização do bento;
- confirmação do preço de 100 unidades de Ninho com Nutella.

Ao selecionar 100 unidades de Ninho com Nutella, o resumo mantém `R$ 145,00` e reforça `Valor de 100 unidades sujeito à confirmação.`

## Acessibilidade

- detalhe com `role="dialog"`, `aria-modal`, título e descrição associados;
- foco inicial no botão fechar;
- ciclo de foco entre o primeiro e o último controle;
- fechamento por `Escape`;
- fechamento por clique no overlay;
- retorno do foco ao botão `Ver opções` de origem;
- rolagem da página bloqueada enquanto aberto e restaurada ao fechar;
- `fieldset`, `legend`, radios, checkboxes, labels e mensagens associadas;
- foco movido ao primeiro campo inválido;
- stepper com rótulos claros para aumentar e diminuir;
- feedback válido em região `status` e erro em região `alert`;
- foco visível nos controles;
- animações CSS removidas com `prefers-reduced-motion`.

## Validações realizadas

- TypeScript: aprovado com `pnpm typecheck`.
- ESLint: aprovado com `pnpm lint`.
- Bolo personalizado: tamanho, sabor, textos, notas, quantidade, erro e subtotal validados.
- Brigadeiro de Ninho com Nutella: variante de 100, preço e aviso validados.
- Kit Festa Individual: preço fixo, itens, pendências, notas e subtotal validados.
- Caixa com 12 brigadeiros: preço fixo, disponibilidade e pendências validados.
- Bento cake: mensagem, notas, preço e pendências validados.
- Fechamento: botão, overlay e `Escape` aprovados.
- Foco: trap e retorno à origem aprovados.
- Responsividade: 320, 375, 390, 430, 768, 1024 e 1440 px sem overflow.
- Inspeção visual: 390 × 844 e 1440 × 900.
- Carrinho: contador permanece em zero e nenhum estado de carrinho é criado.

## Limitações atuais

- a configuração validada é descartada ao fechar;
- não existe criação de item nem carrinho visual;
- não existe persistência no navegador;
- WhatsApp, entrega, data e pagamento continuam fora do fluxo;
- produtos permanecem sem fotos reais;
- pendências comerciais continuam dependendo de confirmação da Nath;
- o detalhe não tenta resolver produtos de orçamento, pois o catálogo atual não possui esse caso.

## Próxima tarefa recomendada

Implementar o carrinho visual e local usando os snapshots e cálculos já existentes. A próxima etapa deve criar o item somente após a configuração válida, agrupar configurações equivalentes, permitir alterar quantidades e manter o contador sincronizado, ainda sem avançar para checkout ou WhatsApp até o carrinho estar validado.
