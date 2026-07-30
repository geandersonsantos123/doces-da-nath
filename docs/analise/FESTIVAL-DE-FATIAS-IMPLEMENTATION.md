# Festival de Fatias - Implementacao

## Resumo

A secao permanente "Festival de Fatias" foi inserida imediatamente antes do
Clube VIP. Ela apresenta a agenda semanal e leva o visitante ao WhatsApp com
uma mensagem exclusiva de consulta e reserva, sem interagir com catalogo,
carrinho ou checkout.

## Posicao na pagina

Ordem relevante:

1. Sobre a Nath.
2. Faixa editorial existente.
3. Festival de Fatias.
4. Clube VIP.
5. Prova social.

A ancora publica e `#festival-de-fatias`, com compensacao para o header fixo.
O mesmo destino foi adicionado a lista central de navegacao antes do Clube VIP.
O fechamento do menu mobile foi ajustado para restaurar a rolagem da pagina
antes de navegar ate a ancora, evitando que o bloqueio do painel interrompa o
salto.

## Componente

Foi criado:

`src/components/sections/festival-slices-section.tsx`

O componente e renderizado no servidor, nao possui estado, timer, verificacao
de dia, controle de estoque, carrossel ou dependencia adicional.

## Conteudo

Toda a copy, agenda, caminhos de imagem e mensagem do WhatsApp estao
centralizados em `SITE_CONTENT.festival`.

Mensagem utilizada:

`Ola, Nath! Vim pelo site e quero reservar uma fatia no Festival de Fatias. Poderia me informar os sabores disponiveis para sexta ou sabado e confirmar a disponibilidade?`

O helper `createWhatsAppOrderUrl`, de `src/lib/whatsapp-url.ts`, foi reutilizado.
Assim, o telefone oficial e a codificacao continuam centralizados. O CTA abre
uma nova aba e deixa claro que a disponibilidade depende da confirmacao da
Nath.

## Assets locais

### Mobile

- Origem: `https://res.cloudinary.com/dhbrxzt5a/image/upload/v1784946409/13c76150-780a-48e3-a8df-ad1738d54fde_rjvbd9.jpg`
- Caminho: `public/images/festival-de-fatias/festival-de-fatias-mobile.jpg`
- Dimensoes: 1122 x 1402 px
- Tamanho: 368597 bytes (359,96 KiB)

### Desktop

- Origem: `https://res.cloudinary.com/dhbrxzt5a/image/upload/v1784946409/a5c36f3d-6c73-4703-b329-62d1b8b79316_nokgrg.jpg`
- Caminho: `public/images/festival-de-fatias/festival-de-fatias-desktop.jpg`
- Dimensoes: 1536 x 1024 px
- Tamanho: 435125 bytes (424,93 KiB)

Os arquivos foram armazenados sem recorte ou recompressao. O componente usa
`next/image`, dimensoes reais, carregamento tardio padrao e `sizes`
responsivo. O asset vertical aparece abaixo de 768 px; a partir desse ponto,
e usado o asset horizontal.

## Layout

### Mobile

A hierarquia e: eyebrow, titulo, divisor, descricao, banner, tres informacoes
operacionais, CTA e microcopy. Em 390 e 430 px, os cards ficam na mesma linha.
Em larguras menores, o grid pode empilhar para preservar legibilidade e evitar
overflow.

### Tablet e desktop

Entre 768 e 1023 px, a composicao permanece empilhada e usa o banner
horizontal. A partir de 1024 px, a secao passa para duas colunas: conteudo a
esquerda e imagem a direita, com proporcao visual aproximada de 45/55.

## Transicao visual

O Festival usa fundo off-white, bordas champagne e CTA chocolate. O espacamento
inferior separa a oferta de reserva do Clube VIP, que preserva seu fundo
chocolate, selo, beneficios e formulario.

## Acessibilidade

- `section` identificada por `aria-labelledby`.
- `h2` proprio e hierarquia semantica.
- Texto alternativo objetivo para os banners.
- Agenda em lista semantica e com rotulo acessivel.
- Icones decorativos acompanhados de texto.
- CTA com nome acessivel e indicacao de nova aba.
- Foco visivel e contraste baseado nos tokens da marca.
- Preferencia de movimento reduzido preservada pelo CSS global existente.

## Responsividade e performance

Foram previstos os pontos de verificacao em 320, 390, 430, 768, 900, 1024 e
1440 px. As imagens reservam espaco pelas dimensoes intrinsecas e nao usam
`priority`, video, carrossel ou JavaScript de estado.

## Arquivos

Criados:

- `src/components/sections/festival-slices-section.tsx`
- `public/images/festival-de-fatias/festival-de-fatias-mobile.jpg`
- `public/images/festival-de-fatias/festival-de-fatias-desktop.jpg`
- `docs/analise/FESTIVAL-DE-FATIAS-IMPLEMENTATION.md`

Modificados:

- `src/app/page.tsx`
- `src/data/site-content.ts`
- `src/app/globals.css`
- `src/components/layout/mobile-menu.tsx`

## Limitacoes

Os banners oficiais possuem texto incorporado e tamanho superior ao ideal para
uma unica imagem editorial. Eles foram preservados integralmente conforme o
material aprovado. Sabores, quantidades e estoque continuam sujeitos a
confirmacao humana no WhatsApp.
