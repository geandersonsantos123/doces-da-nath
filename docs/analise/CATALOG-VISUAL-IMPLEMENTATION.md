# Implementação visual do catálogo - Doces da Nath

## Escopo entregue

Esta etapa implementa somente a apresentação visual e a filtragem local do catálogo. A seção consome as quatro categorias e os 19 produtos já validados, sem alterar dados comerciais, preços, constantes ou regras de carrinho.

Foram entregues:

- introdução editorial da seção `#cardapio`;
- divisor com o ícone oficial de bolo;
- abas acessíveis por categoria;
- regra segura para o filtro editorial `Mais pedidos`;
- contagem de resultados por filtro;
- grade responsiva de produtos;
- cards ligados aos dados reais;
- preço inicial derivado pelas funções existentes;
- disponibilidade e uma informação comercial secundária por card;
- placeholder premium para produtos ainda sem foto;
- feedback visual e acessível para a ação `Ver opções`.

Não foram implementados detalhe de produto, modal, bottom sheet, seleção de variantes, carrinho, persistência no navegador, WhatsApp, checkout ou novas seções institucionais.

## Arquivos criados

- `src/components/catalog/catalog-browser.tsx`: estado local dos filtros, navegação por teclado, contagem e feedback da ação.
- `src/components/catalog/product-card.tsx`: apresentação do produto, disponibilidade, preço derivado e placeholder.
- `src/components/sections/catalog-section.tsx`: composição de servidor da introdução e do catálogo.
- `docs/analise/CATALOG-VISUAL-IMPLEMENTATION.md`: registro desta implementação.

## Arquivos modificados

- `src/app/page.tsx`: substituição do marcador vazio `#cardapio` pela seção real.
- `src/app/globals.css`: estilos do catálogo, estados, responsividade e redução de movimento.
- `src/data/site-content.ts`: copy centralizada da seção e mensagem de feedback.

Nenhuma dependência foi adicionada. O projeto reutiliza `next/image`, React e os ícones já disponíveis em `lucide-react`.

## Comportamento do catálogo

O catálogo inicia em `Bolos`, pois nenhum dos 19 produtos possui `featured: true`. O filtro `Mais pedidos` permanece visível e desabilitado, acompanhado da indicação discreta `Em breve`. Nenhum destaque foi inventado.

As categorias usam os IDs reais dos dados. Somente o rótulo visual da última aba foi condensado para `Caixas e individuais`, sem renomear a categoria ou alterar seu contrato.

Contagens confirmadas:

| Filtro | Produtos |
| --- | ---: |
| Bolos | 1 |
| Brigadeiros e docinhos | 14 |
| Kits Festa | 2 |
| Caixas e individuais | 2 |
| Total do catálogo | 19 |

Produtos com disponibilidade `hidden` não são renderizados. O catálogo atual não possui itens ocultos, portanto os 19 produtos permanecem representáveis pelas quatro abas.

## Cards e preços

Cada card apresenta, nesta ordem:

1. área visual estável em proporção 1:1;
2. placeholder champagne com ícone oficial e texto `Imagem em breve`;
3. disponibilidade principal;
4. nome e descrição curta limitada a três linhas;
5. preço inicial ou fixo;
6. uma informação secundária;
7. ação `Ver opções`.

Os valores não são montados manualmente na interface. `getProductStartingPriceCents` resolve o menor valor conhecido e `formatBRL` aplica a formatação brasileira.

- produtos por variante usam `A partir de`;
- produtos de preço fixo exibem somente o valor final cadastrado;
- o bolo informa `Preço por tamanho`;
- brigadeiros e docinhos informam `Preço por quantidade`;
- itens personalizáveis podem informar `Personalizável`;
- Brigadeiro de Ninho com Nutella informa `Valor sujeito à confirmação`.

## Ação visual

`Ver opções` não abre detalhe, não seleciona variante e não adiciona item. Ao ser acionado:

- o próprio botão muda para `Opções em breve`, dando retorno imediato no ponto de interação;
- uma mensagem acessível informa que a configuração pertence à próxima etapa e que nenhum item foi adicionado;
- nenhum modal, drawer, alerta do navegador ou carrinho é criado.

Ao trocar de categoria, esse retorno é limpo.

## Responsividade

- 320 a 430 px: uma coluna e abas em rolagem horizontal sem quebra de linha;
- 768 e 1024 px: duas colunas;
- 1440 px: três colunas;
- cards mantêm proporção, conteúdo alinhado e ação com 48 px de altura mínima;
- o trilho de categorias permanece em uma linha e o foco move a aba ativa para a área visível;
- a página não apresenta overflow horizontal fora do movimento interno e controlado das abas e do ticker existente.

## Acessibilidade e movimento

- abas usam `tablist`, `tab`, `tabpanel`, `aria-selected` e `aria-controls`;
- setas esquerda/direita, `Home` e `End` percorrem somente filtros disponíveis;
- `Mais pedidos` comunica indisponibilidade com `aria-disabled` e estado nativo desabilitado;
- contagem e feedback usam regiões `aria-live="polite"`;
- foco permanece visível e preserva o formato das abas;
- placeholders decorativos não duplicam o nome do produto para leitores de tela;
- troca de grade usa somente uma entrada curta em CSS;
- `prefers-reduced-motion` remove a animação da grade.

## Validações executadas

- TypeScript: aprovado com `pnpm typecheck`.
- ESLint: aprovado com `pnpm lint`.
- Navegação do CTA `Ver cardápio`: destino `#cardapio` confirmado.
- Filtros por clique: aprovados.
- Filtros por teclado: setas, `Home` e `End` aprovados.
- Contagens 1, 14, 2 e 2: confirmadas no navegador.
- Aviso do Ninho com Nutella: confirmado.
- Feedback `Opções em breve`: confirmado sem modal ou adição.
- Larguras 320, 375, 390, 430, 768, 1024 e 1440 px: sem overflow da página.
- Inspeção visual: realizada em 390 × 844, 768 × 1024 e 1440 × 900.
- Console do navegador: sem erros ou avisos de aplicação.
- Produtos, categorias e constantes comerciais: hashes SHA-256 preservados.

## Limitações atuais

- os produtos continuam sem fotos reais por decisão de integridade do catálogo;
- `Mais pedidos` depende de uma curadoria confirmada pela Nath;
- `Ver opções` é apenas um estado visual de preparação;
- nenhuma variante ou opção pode ser escolhida nesta etapa;
- não existe carrinho, persistência ou finalização pelo WhatsApp;
- disponibilidade e preço continuam sujeitos às pendências já registradas no modelo de dados.

## Próxima tarefa recomendada

Implementar o detalhe do produto em bottom sheet no mobile e painel acessível no desktop, usando as variantes e opções reais já modeladas. Essa etapa deve validar escolhas obrigatórias, calcular o preço com as funções existentes e preparar um item configurado, ainda sem avançar automaticamente para o WhatsApp.
