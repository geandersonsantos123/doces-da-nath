# Fechamento editorial - implementação

## Resumo

A etapa 08 conclui o fechamento editorial do MVP com quatro blocos integrados à página inicial:

- Como pedir;
- FAQ;
- CTA final;
- footer semântico.

O trabalho preserva catálogo, detalhe de produto, carrinho, checkout e geração do pedido para WhatsApp. Nenhuma dependência foi adicionada e nenhuma regra comercial foi criada.

## Escopo entregue

### Como pedir

A seção `#como-pedir` apresenta o fluxo real em quatro passos: escolher no cardápio, configurar, revisar o carrinho e enviar pelo WhatsApp. O aviso final deixa explícito que o pedido depende da confirmação da Nath no atendimento.

### FAQ

A seção `#faq` usa `details` e `summary` nativos, sem estado em JavaScript. As sete respostas cobrem confirmação do pedido, taxa de entrega, retirada, personalização, pagamento, antecedência e possível alteração de preços sem inventar regras ainda não fornecidas.

### CTA final

A seção `#cta-final` oferece duas ações:

- `Ver cardápio`, com navegação para `#cardapio`;
- `Abrir carrinho`, ligado ao mesmo estado e ao mesmo painel do carrinho existente.

### Footer

O footer usa o logo oficial, frase institucional, links internos, Instagram e WhatsApp oficiais, orientação de uso do carrinho, aviso de confirmação no atendimento e direitos de 2026.

Links oficiais utilizados:

- Instagram: `https://www.instagram.com/doces.da.nath_?igsh=MTIwZ3Q1aGFwZ3JtMA==`;
- WhatsApp: `https://wa.me/5527995082631`.

## Arquitetura

Os blocos editoriais permanecem Server Components. A única fronteira cliente nova é o botão do CTA que chama `openCart` pelo contexto já existente. Essa divisão evita hidratação desnecessária no conteúdo estático e não duplica lógica do carrinho.

Todo o texto, os passos, as perguntas, os links e os avisos foram centralizados em `src/data/site-content.ts`. Os componentes apenas estruturam e apresentam esses dados.

## Arquivos criados

- `src/components/sections/how-to-order-section.tsx`;
- `src/components/sections/faq-section.tsx`;
- `src/components/sections/final-cta-section.tsx`;
- `src/components/sections/final-cta-cart-button.tsx`;
- `src/components/layout/site-footer.tsx`;
- `docs/analise/EDITORIAL-CLOSURE-IMPLEMENTATION.md`.

## Arquivos alterados

- `src/data/site-content.ts`: conteúdo e links da etapa;
- `src/app/page.tsx`: ordem final dos blocos e integração com o footer;
- `src/app/globals.css`: estilos responsivos e estados de foco dos novos blocos;
- `README.md`: estado atual e referência desta entrega.

Em `globals.css`, `body` passou de `min-width: 20rem` para `min-width: 0`. A correção elimina overflow real em 320 px quando a barra de rolagem do sistema ocupa parte da largura disponível.

## Decisões de interface

- A seção Como pedir usa cards compactos com numeração e ícones para facilitar leitura sequencial.
- O FAQ permanece em uma única coluna para manter perguntas e respostas fáceis de examinar.
- O CTA final é uma faixa de contraste alto, sem competir com o catálogo.
- O footer é compacto, sem repetir links para seções ainda não entregues.
- Os marcadores estruturais `#clube-vip` e `#sobre-a-nath` foram preservados para os links já existentes no header e no hero, mas continuam sem conteúdo nesta etapa por restrição de escopo.
- O espaço móvel do carrinho acompanha a cor do footer para evitar uma faixa visual desconectada no fim da página.

## Acessibilidade e comportamento

- Hierarquia de títulos preservada com `h2` nas seções e `h3` nos passos.
- Landmarks semânticos para seções, navegação, informações complementares e footer.
- FAQ operável por teclado com controles nativos.
- Estados de foco visíveis em links, botões e perguntas.
- Links externos identificam abertura em nova aba no nome acessível.
- O botão final do carrinho informa `aria-controls` e `aria-expanded` a partir do estado real do painel.
- O footer mantém espaço suficiente para a barra fixa do carrinho no mobile.

## Validação executada

- TypeScript: aprovado;
- ESLint: aprovado;
- build de produção: aprovado;
- servidor local: HTTP 200;
- console do navegador: sem erros;
- âncoras do header, menu móvel, CTA e footer: aprovadas;
- FAQ nativo: abertura e leitura aprovadas;
- CTA `Abrir carrinho`: abertura e retorno de foco aprovados;
- larguras 320, 375, 390, 430, 768, 1024 e 1440 px: sem overflow;
- footer com carrinho vazio e com barra móvel ativa: aprovado;
- carrinho usado no QA: limpo e confirmado vazio após recarregar.

## Limitações e pendências

- `AGENTS.md` não existe no repositório no momento da etapa.
- `docs/analise/PRODUCT-BUILD-DASHBOARD.md` também não existe.
- Clube VIP, Sobre a Nath e Depoimentos continuam fora desta entrega.
- Fotos reais, SEO avançado, sitemap, robots, QA final de produção e deploy continuam pendentes.
- Horários, endereço, política de cancelamento, taxa de entrega e formas de pagamento não foram definidos nem inferidos.

## Próxima etapa recomendada

A etapa 09 deve agrupar Sobre a Nath, Clube VIP e Depoimentos. Antes da implementação, são necessários o texto biográfico aprovado, a proposta real do Clube VIP, depoimentos autorizados e os respectivos materiais visuais.
