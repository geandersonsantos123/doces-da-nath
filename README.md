# Doces da Nath

MVP mobile-first da vitrine e do catálogo configurável da Doces da Nath.

## Stack

- Next.js App Router
- TypeScript estrito
- Tailwind CSS
- ESLint
- pnpm

## Comandos

```bash
pnpm dev
pnpm typecheck
pnpm lint
pnpm build
```

## Estado atual

A página inicial possui tokens globais, preloader curto por sessão, header responsivo, hero com assets oficiais, faixa de autoridade e catálogo local com 19 produtos organizados por categoria.

O detalhe de produto funciona como bottom sheet no mobile e modal no desktop, com variantes, opções reais, quantidade, observações, validação e cálculo de subtotal.

O carrinho recebe itens configurados, agrupa configurações equivalentes, permite alterar quantidades, remover ou limpar itens e persiste no navegador. O contador do header, a barra móvel e o painel lateral usam o mesmo estado.

A finalização mínima também está concluída dentro do painel: nome do cliente, recebimento, data desejada por seletores de dia, mês e ano, pagamento a combinar, observação geral, revisão reconciliada com o catálogo e mensagem codificada para o WhatsApp oficial. O schema 2 migra carrinhos anteriores sem perder itens; o fluxo não calcula entrega e não limpa o carrinho automaticamente.

O fechamento editorial da página reúne as seções Como pedir, FAQ, CTA final e footer. O conteúdo fica centralizado, as âncoras internas funcionam no header e no rodapé, e o CTA final abre o mesmo carrinho do fluxo principal.

As seções de confiança também estão concluídas: Sobre a Nath usa o retrato oficial, o Clube VIP abre uma conversa própria no WhatsApp e a prova social apresenta pontos valorizados de forma editorial, sem clientes ou depoimentos fictícios.

O refinamento de experiência deixa o preloader mais perceptível, distribui rollers editoriais pela rolagem, compacta o catálogo em grades mais eficientes, simplifica a seção Sobre a Nath e organiza a mensagem do pedido com hierarquia e emojis moderados.

O catálogo também pode ser reaberto por um botão flutuante após a seção principal. A janela reutiliza categorias, produtos, configuração e carrinho reais; o seletor de categorias usa ícones em duas linhas, sem carrossel horizontal. Rollers de emojis em sentidos opostos enquadram a oferta final.

No mobile, os botões de categoria usam feedback de pressão champagne e encerram o toque no estado selecionado chocolate, sem manter o hover branco de dispositivos com mouse.

A proposta de valor também ganhou uma seção própria de diferenciais, enquadrada por rollers editoriais e com os três pilares lado a lado. A apresentação destaca Nathaly Silva como especialista da marca, enquanto a assinatura visual do footer permanece centralizada em todos os tamanhos de tela.

Os registros das etapas estão em:

- `docs/analise/VISUAL-FOUNDATION-IMPLEMENTATION.md`
- `docs/analise/CATALOG-VISUAL-IMPLEMENTATION.md`
- `docs/analise/PRODUCT-DETAIL-IMPLEMENTATION.md`
- `docs/analise/CART-IMPLEMENTATION.md`
- `docs/analise/CHECKOUT-WHATSAPP-IMPLEMENTATION.md`
- `docs/analise/CHECKOUT-HARDENING-IMPLEMENTATION.md`
- `docs/analise/EDITORIAL-CLOSURE-IMPLEMENTATION.md`
- `docs/analise/TRUST-SECTIONS-IMPLEMENTATION.md`
- `docs/analise/UX-CONVERSION-POLISH.md`
- `docs/analise/BRAND-PILLARS-FOOTER-SPECIALIST-POLISH.md`
