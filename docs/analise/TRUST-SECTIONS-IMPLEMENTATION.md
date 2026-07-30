# Seções de confiança e Clube VIP - implementação

## Resumo

A etapa 09 foi implementada diretamente na branch `main`, que estava limpa e sincronizada com `origin/main` antes da alteração. A entrega adiciona três blocos depois do catálogo e antes de Como pedir:

1. `#sobre-a-nath`;
2. `#clube-vip`;
3. `#prova-social`.

Catálogo, produtos, preços, detalhe, carrinho, checkout, reconciliação e mensagem do pedido não foram alterados. Nenhuma dependência foi adicionada.

## Arquivos criados

- `src/components/sections/about-nath-section.tsx`;
- `src/components/sections/vip-club-section.tsx`;
- `src/components/sections/social-proof-section.tsx`;
- `docs/analise/TRUST-SECTIONS-IMPLEMENTATION.md`.

## Arquivos modificados

- `src/data/site-content.ts`: asset, copies, benefícios, CTA e conteúdo editorial;
- `src/app/page.tsx`: substituição dos marcadores futuros pelas seções reais na ordem aprovada;
- `src/app/globals.css`: composição clara/chocolate/clara e responsividade;
- `README.md`: atualização do estado atual e referência desta etapa.

## Conteúdo e arquitetura

As três seções são Server Components. Todo o conteúdo fixo permanece centralizado em `src/data/site-content.ts`; os componentes cuidam somente da estrutura semântica e da apresentação.

A página segue esta sequência:

```text
navbar chocolate glass
hero
catálogo
Sobre a Nath
Clube VIP
prova social
Como pedir
FAQ
CTA final
footer
```

Os links já existentes no header e no hero passaram a alcançar seções reais. Nenhuma lógica da navbar precisou ser alterada.

## Sobre a Nath

A seção usa a imagem oficial:

```text
https://res.cloudinary.com/dm9mnc97u/image/upload/v1784327795/1441de50-bdec-497c-bd6f-dfa78c9f4e4f_bxb8sm.webp
```

O asset é renderizado com `next/image`, dimensões proporcionais a 1122 x 1402 px, carregamento preguiçoso padrão e sem `priority`. O enquadramento preserva rosto, expressão e produto, sem crop agressivo. O texto alternativo é `Nath segurando uma sobremesa artesanal da Doces da Nath`.

O bloco mantém fundo claro, texto editorial, três atributos e CTA de retorno ao cardápio.

## Clube VIP

O Clube VIP funciona como uma pausa visual chocolate entre duas áreas claras. O bloco reutiliza dourado e champagne nos detalhes, tem contraste alto e não usa imagem conceitual de produto.

O CTA usa `createWhatsAppOrderUrl`, helper já existente e preservado. A mensagem é exclusiva do Clube VIP:

```text
Olá, Nath! Vim pelo site da Doces da Nath e quero entrar no Clube VIP para receber novidades, promoções e sabores especiais.
```

O destino usa o número oficial `5527995082631`, abre em nova aba e não contém itens, subtotal, dados ou qualquer trecho da mensagem de pedido.

## Prova social

A prova social não simula prints, falas literais ou avaliações individuais. Não há fotos de clientes, nomes inventados, avatares, horários, aspas ou `blockquote`.

Os três cards apresentam pontos editoriais valorizados: apresentação, sabor e atendimento. As estrelas são decorativas e não são anunciadas como uma nota coletada. A assinatura genérica `Clientes da Nath` não identifica pessoas específicas.

## Decisão visual

- Sobre a Nath: superfície off-white clara, retrato em destaque e cards delicados;
- Clube VIP: bloco chocolate premium, compacto e com boa respiração;
- prova social: retorno ao off-white, cards alinhados e dourado somente nos detalhes;
- navbar: permanece chocolate glass e ganha continuidade cromática com o VIP sem criar um bloco escuro contínuo.

No tablet e desktop, Sobre usa duas colunas com retrato e título alinhados pelo topo. O VIP divide conteúdo e benefícios. A prova social usa três cards de dimensões estáveis. No mobile, os elementos seguem uma coluna e mantêm alvos de toque confortáveis.

## Acessibilidade

- hierarquia `h2` e `h3` preservada;
- landmarks e títulos associados por `aria-labelledby`;
- imagem da Nath com texto alternativo descritivo;
- ícones decorativos ocultos de leitores de tela;
- CTA externo com nome acessível e aviso de nova aba;
- foco visível no CTA do Clube VIP;
- cards compreensíveis sem depender das estrelas;
- nenhuma informação depende apenas de cor.

## Validação

- TypeScript: aprovado;
- ESLint: aprovado;
- build de produção: aprovado;
- servidor local: HTTP 200;
- console: sem erros da aplicação;
- âncoras do hero e header: aprovadas;
- mensagem do Clube VIP: número, texto e separação do pedido aprovados;
- larguras 320, 375, 390, 430, 768, 1024 e 1440 px: sem overflow horizontal;
- inspeção visual em 390 x 844, 768 x 1024 e 1440 x 900: aprovada;
- barra móvel com item ativo: aprovada;
- carrinho usado no QA: limpo e confirmado vazio após recarregar;
- arquivos críticos e manifests: hashes preservados.

## Limitações

- `AGENTS.md` não existe no repositório;
- `docs/analise/PRODUCT-BUILD-DASHBOARD.md` não existe;
- os cards são prova social editorial, não substituem depoimentos reais autorizados;
- fotos reais de produtos ainda não foram fornecidas;
- SEO avançado, QA final de produção e deploy continuam fora desta etapa.

## Próxima tarefa recomendada

A próxima etapa deve reunir fotos reais, SEO e acabamento final. Depois disso, executar QA final de produção e deploy, sem reabrir os contratos já validados do fluxo comercial.
