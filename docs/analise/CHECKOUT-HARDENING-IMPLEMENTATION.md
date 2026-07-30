# Endurecimento do checkout - Doces da Nath

## Resumo

Esta etapa foi implementada diretamente na branch `main`. O checkout passou a coletar o nome do cliente, substituiu o calendário nativo por seletores previsíveis de dia, mês e ano e migrou o carrinho persistido do schema 1 para o schema 2 sem apagar itens ou alterar preços.

O ajuste explícito solicitado para o catálogo também foi incluído: em dispositivos de toque, as categorias não herdam mais o hover branco de dispositivos com mouse. O toque usa champagne apenas enquanto o botão está pressionado e termina no chocolate quando a categoria é selecionada.

Nenhuma dependência foi instalada. Produtos, categorias, preços, variantes, cálculos, subtotal, reconciliação e número oficial do WhatsApp foram preservados.

`AGENTS.md` não existe no repositório.

## Arquivos criados

- `src/lib/order-date.ts`: funções puras para montar, analisar, validar, comparar e formatar datas do pedido, além da faixa dinâmica de anos.
- `docs/analise/CHECKOUT-HARDENING-IMPLEMENTATION.md`: registro desta etapa.

## Arquivos modificados

- `src/types/cart.ts`: adiciona `customerName` aos dados do pedido.
- `src/constants/commerce.ts`: incrementa o schema para 2 e centraliza a faixa futura de anos.
- `src/lib/cart-storage.ts`: valida o schema 2 em runtime e migra explicitamente o schema 1.
- `src/lib/checkout-validation.ts`: valida nome, data real e data não passada.
- `src/lib/whatsapp-message.ts`: inclui o cliente e reutiliza a formatação central de data.
- `src/components/checkout/checkout-form.tsx`: adiciona o nome e o grupo acessível de dia, mês e ano.
- `src/components/checkout/checkout-review.tsx`: mostra cliente antes dos demais dados e usa a formatação compartilhada.
- `src/app/globals.css`: estiliza o novo controle e corrige os estados de toque das categorias.
- `README.md`: atualiza o estado funcional e a lista de documentos.

## Nome do cliente

`customerName` pertence ao objeto persistido `order`. O campo aparece no início da finalização, usa `autocomplete="name"`, aceita nomes com acentos e não exige sobrenome.

- obrigatório;
- mínimo de 2 e máximo de 80 caracteres após `trim`;
- espaços iniciais são removidos durante a digitação;
- espaços finais são removidos ao sair do campo ou avançar;
- erro associado por `aria-describedby`;
- foco automático quando é o primeiro campo inválido;
- persistência após fechar, reabrir ou recarregar;
- exibição na revisão e na mensagem do WhatsApp.

## Controle de data

O `<input type="date">` e seu pop-up nativo foram removidos. Um `fieldset` agrupa três selects com labels visíveis: `Dia`, `Mês` e `Ano`.

O componente mantém seleções parciais localmente. Quando os três valores formam uma data real, `buildOrderDate` salva `YYYY-MM-DD` no carrinho. Datas como 31/02 resultam em valor inválido e não avançam. A validação aceita hoje e datas futuras, bloqueia datas passadas e não inventa prazo mínimo.

Os anos são gerados a partir do ano corrente até a constante `ORDER_DATE_FUTURE_YEARS`. A validação não impõe limite máximo comercial. Um ano futuro já persistido também é incluído na lista para não ocultar dados válidos.

Na revisão e no WhatsApp, `formatOrderDateBR` converte o valor para `DD/MM/YYYY`.

## Migração do armazenamento

Versão anterior: `1`.

Versão atual: `2`.

`deserializeCart` segue esta ordem:

1. aceita diretamente um estado válido do schema 2;
2. reconhece e valida em runtime um estado do schema 1;
3. copia integralmente itens e dados existentes para o schema 2;
4. adiciona somente `customerName: ""`;
5. retorna estado vazio seguro para JSON inválido, estrutura incompatível ou versão desconhecida.

A chave `doces-da-nath:cart:v1` foi mantida para que os dados anteriores possam ser encontrados e migrados. Quantidades, snapshots, opções, observações, recebimento, data, pagamento e notas gerais não são recalculados nem alterados durante a migração.

## Revisão e WhatsApp

A revisão apresenta `Cliente` antes de recebimento, data e pagamento. Campos vazios não são exibidos.

A seção de dados da mensagem segue este formato:

```text
📅 *DADOS DO PEDIDO*
• Cliente: Maria Silva
• Recebimento: Retirada
• Data desejada: 20/07/2026
• Pagamento: A combinar no atendimento
```

Itens, unitários, subtotais, avisos, `Subtotal dos itens`, codificação da URL, número `5527995082631` e preservação do carrinho após abrir o WhatsApp continuam iguais.

## Categorias no mobile

O hover branco agora só existe sob `@media (hover: hover) and (pointer: fine)`. Em toque:

- `-webkit-tap-highlight-color` não injeta uma cor externa;
- `touch-action: manipulation` mantém resposta direta;
- `:active` usa champagne durante a pressão;
- `aria-selected="true"` tem precedência sobre hover e active e permanece chocolate.

O mesmo comportamento vale para o catálogo principal e para a janela flutuante, pois ambos reutilizam `CatalogBrowser`.

## Acessibilidade e responsividade

- labels associados ao nome e aos três selects;
- `fieldset`, `legend` e ajuda compartilhada para a data;
- erros próximos e associados aos controles;
- primeiro erro recebe foco;
- selects com fonte de 16 px e altura mínima de 48 px;
- teclado, trap de foco, Escape e retorno ao acionador preservados;
- sem overflow do documento, drawer ou grupo de data em 320, 375, 390, 430, 768, 1024 e 1440 px.

## Validações realizadas

- nome vazio e nome com um caractere: bloqueados;
- nome com acento e espaços externos: aceito e normalizado;
- data vazia e 31/02: bloqueadas;
- 29/02/2028: aceita;
- data passada: bloqueada;
- data de hoje e data futura: aceitas;
- reload: nome e data recuperados;
- schema 1: item, quantidade, variante, opção, preço e dados do pedido preservados no schema 2;
- JSON inválido e versão desconhecida: estado vazio seguro;
- revisão: cliente e data brasileira confirmados;
- WhatsApp: cliente, subtotal, número oficial e codificação confirmados;
- categorias mobile: trocas sucessivas sem retenção do branco;
- console: sem erros ou avisos da aplicação;
- servidor local: HTTP 200;
- TypeScript, ESLint e build de produção: aprovados.

## Limitações

- a faixa de anos é uma conveniência de interface, não uma confirmação de agenda;
- disponibilidade, prazo, entrega, retirada e pagamento continuam sujeitos ao atendimento;
- a persistência continua local ao navegador e não sincroniza entre dispositivos.

## Próxima tarefa recomendada

Tratar o hero responsivo em uma etapa visual própria, sem reabrir os contratos agora endurecidos do checkout.
