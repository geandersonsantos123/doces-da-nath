# Catálogo Flutuante e Navegação por Categorias

## Escopo

Esta etapa adiciona um acesso flutuante ao catálogo após a rolagem da seção principal, reorganiza o seletor de categorias em duas linhas com ícones e inclui um roller de emojis antes da oferta final.

## Implementação

- O botão flutuante aparece apenas depois que `#cardapio` deixa a área superior da página.
- A janela reutiliza o mesmo `CatalogBrowser`, os mesmos produtos e o mesmo detalhe configurável.
- Cada instância do catálogo recebe identificadores próprios para manter `tab`, `tabpanel` e controles acessíveis.
- O seletor possui cinco opções em uma grade de duas linhas, sem overflow horizontal.
- O catálogo da janela permite trocar categoria, abrir produtos, configurar opções e adicionar itens ao carrinho.
- A janela bloqueia a rolagem da página, mantém o foco interno e fecha por botão, overlay ou `Escape`.
- Quando o detalhe de produto está aberto, `Escape` fecha primeiro o detalhe e preserva a janela do catálogo.
- O botão flutuante sobe no mobile quando a barra fixa do carrinho está presente.

## Roller final

Os rollers anterior e posterior a `#cta-final` utilizam somente emojis relacionados a doces, chocolate, morangos e afeto. As faixas se movimentam em sentidos opostos. O conteúdo visual é oculto de leitores de tela e possui uma descrição textual equivalente.

## Limites preservados

Produtos, categorias, preços, cálculo, persistência, checkout e mensagens de WhatsApp não foram alterados. Nenhuma dependência foi adicionada.
