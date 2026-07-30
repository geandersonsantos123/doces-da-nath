# Implementação da fundação visual - Doces da Nath

## Escopo entregue

Esta etapa implementa somente a primeira camada visual da página: fundação global, preloader em cortina, header responsivo, hero principal, faixa compacta de autoridade e uma área estrutural discreta para as próximas seções.

O catálogo visual, categorias, cards de produtos, detalhe, carrinho, WhatsApp, Clube VIP completo, Sobre a Nath, depoimentos, FAQ e footer completo permanecem fora deste escopo.

## Arquivos criados

- `src/data/site-content.ts`: fonte tipada das copies, navegação e URLs oficiais dos assets usados nesta etapa.
- `src/components/ui/container.tsx`: container fluido com largura máxima centralizada.
- `src/components/ui/button.tsx`: link de ação primário e secundário.
- `src/components/branding/brand-logo.tsx`: logo horizontal oficial via `next/image`.
- `src/components/branding/decorative-cake-icon.tsx`: ícone oficial do bolo para detalhe de marca.
- `src/components/branding/curtain-preloader.tsx`: preloader cliente e persistência por sessão.
- `src/components/layout/mobile-menu.tsx`: painel mobile com fechamento previsível e controle de foco.
- `src/components/layout/site-header.tsx`: header sticky, navegação e estado visual de rolagem.
- `src/components/sections/hero-section.tsx`: hero semântico com copy em HTML, CTAs e imagem oficial.
- `src/components/sections/authority-ticker.tsx`: faixa contínua com alternativa acessível.
- `docs/analise/VISUAL-FOUNDATION-IMPLEMENTATION.md`: este registro.

## Arquivos modificados

- `src/app/globals.css`: tokens, reset mínimo, estilos responsivos, foco e movimento reduzido.
- `src/app/layout.tsx`: fontes via `next/font`, metadados e estado antecipado do preloader.
- `src/app/page.tsx`: composição da primeira camada e manutenção da validação do catálogo.
- `next.config.ts`: autorização restrita do Cloudinary para `next/image`.
- `package.json` e `pnpm-lock.yaml`: inclusão de `lucide-react` para ícones funcionais.
- `README.md`: atualização do estado real do projeto.

Os arquivos de produtos, categorias, preços e constantes comerciais não foram alterados.

## Componentes e responsabilidades

### `CurtainPreloader`

- cobre a primeira entrada da sessão com fundo chocolate, logo circular e frase curta;
- inicia a saída no primeiro frame, sem aguardar rede ou impor tempo artificial;
- sobe como uma cortina e deixa de capturar cliques durante a saída;
- possui encerramento de segurança em 800 ms;
- grava uma chave em `sessionStorage` e usa um script `beforeInteractive` para impedir flash em recargas da mesma sessão;
- permanece `aria-hidden` e é removido do DOM;
- com redução de movimento, troca o deslocamento por uma remoção praticamente imediata.

### `SiteHeader` e `MobileMenu`

- header sticky com área segura, superfície integrada ao topo e estado translúcido com blur após a rolagem;
- mobile com menu, logo horizontal centralizada e carrinho visual desabilitado com contador zero;
- desktop com logo, links centrais e carrinho à direita;
- menu fecha por botão, clique no fundo, link e tecla `Escape`;
- foco entra no painel, permanece em ciclo por `Tab` e retorna ao controle de origem ao fechar.

### `HeroSection`

- contém o único `h1` da página;
- mantém eyebrow, título, apoio, confiança e os dois CTAs como HTML acessível;
- usa `#cardapio` e `#clube-vip` como destinos estruturais futuros;
- não abre WhatsApp e não simula catálogo ou carrinho;
- aplica o hero oficial como única imagem prioritária.

### `AuthorityTicker`

- apresenta uma única faixa chocolate com os cinco atributos aprovados;
- duplica o grupo somente na camada visual para criar continuidade;
- fornece uma frase equivalente única para leitores de tela;
- pausa no hover e fica estático, completo e quebrável quando há redução de movimento.

## Tokens aplicados

| Papel | Valor |
| --- | --- |
| Fundo predominante | `#F7F4F0` |
| Texto e ações | `#4B3A34` |
| Superfície secundária | `#E6D6C1` |
| Linhas e ícones decorativos | `#CBA66A` |
| Texto secundário controlado | `#8C7B73` |
| Acento pontual e badge | `#C49A94` |

Os tokens foram disponibilizados no tema do Tailwind e também como variáveis CSS. O dourado não é usado em texto pequeno funcional. O rosa queimado aparece apenas no contador do carrinho.

## Tipografia

- display editorial: `Cormorant Garamond`, pesos 500 e 600, normal e itálico;
- interface e leitura: `Manrope`, pesos 400, 500, 600 e 700;
- ambas carregadas pelo mecanismo oficial `next/font` com `display: swap`;
- a assinatura caligráfica continua restrita aos assets oficiais da marca.

## Estratégia de imagens

- o domínio permitido é somente `res.cloudinary.com`, no caminho da conta oficial documentada;
- nenhuma imagem foi baixada ou duplicada em `public`;
- todas as URLs oficiais foram preservadas sem alteração;
- a logo horizontal usa proporção 4:1 e carregamento antecipado no header, sem prioridade de LCP;
- a logo circular usa proporção 1:1 no preloader e não controla a duração da abertura;
- o ícone do bolo usa proporção 1:1, alt vazio e função decorativa;
- o hero usa a dimensão real documentada de 941 × 1672 px, `priority`, `fill` e `sizes` responsivos;
- no mobile, a imagem usa recorte controlado pela direita, mantendo rosto e bolo no primeiro viewport;
- em tablet e desktop, a imagem usa contenção proporcional, alinhamento à direita e ampliação uniforme leve ancorada na base. Isso preserva Nath e bolo sem fabricar uma versão horizontal.

## Comportamento responsivo

### Mobile

- header com 70 px, alvos mínimos de 44 px e logo limitada pela largura disponível;
- copy protegida por superfície off-white, com Nath e bolo no terço direito;
- CTAs empilhados, sem texto cortado;
- faixa de confiança no fim do hero e entrada do ticker ainda no primeiro viewport de 390 × 844;
- 320 px recebe título e altura de hero menores/maiores conforme necessário, sem sobreposição.

### Tablet

- hero passa para duas áreas visuais;
- imagem vertical é preservada por inteiro e o bolo permanece visível;
- botões ficam lado a lado quando existe largura segura;
- menu compacto continua ativo até 900 px.

### Desktop

- logo à esquerda, navegação central e carrinho à direita;
- conteúdo editorial à esquerda e retrato oficial alinhado à direita;
- altura usa uma faixa responsiva para manter a autoridade visível em telas baixas;
- o espaço negativo do asset vertical é aceito como limitação honesta, evitando crop destrutivo.

## Acessibilidade

- landmarks `header`, `main`, `section` e `nav` aplicados;
- somente um `h1` e título acessível do hero;
- textos alternativos funcionais para marca e Nath; ornamentos com alt vazio;
- foco visível em links e botões;
- menu modal com `aria-expanded`, `aria-controls`, `aria-modal`, foco inicial, ciclo de foco, `Escape` e retorno à origem;
- carrinho identificado como indisponível nesta etapa, sem comportamento incompleto;
- CTA e links possuem áreas de toque adequadas;
- conteúdo essencial não depende das palavras presentes nos assets;
- ticker animado não duplica anúncios para leitores de tela;
- `prefers-reduced-motion` interrompe o ticker e reduz transições/preloader.

## Validação executada

### Automatizada

- TypeScript: aprovado com `pnpm typecheck`.
- ESLint: aprovado com `pnpm lint`.
- Build de produção: aprovado com `pnpm build`; rota `/` gerada estaticamente.
- Servidor local: resposta HTTP 200 em `http://127.0.0.1:3000`.
- Catálogo: hashes de produtos, categorias e constantes comerciais permanecem iguais à linha de base.

### Visual e funcional

Foram medidos 320, 375, 390, 430, 768, 1024 e 1440 px. Em todos os casos:

- `scrollWidth` permaneceu igual à largura útil da página;
- nenhuma área fora do ticker apresentou overflow horizontal;
- imagens carregaram com largura natural válida;
- botões mantiveram pelo menos 44 px e seus textos couberam;
- ações ficaram separadas da faixa de confiança;
- existiu exatamente um `h1`.

Em 390 × 844, a captura inspecionada mostrou header completo, título legível, rosto e bolo preservados, os dois CTAs, linha de confiança e entrada do roller. Em 1440 × 900, a captura mostrou navegação desktop, copy editorial, retrato proporcional com bolo, CTAs e faixa completa antes da continuação da página.

Também foram testados:

- preloader visível na primeira entrada e ausente na recarga da mesma sessão;
- remoção do preloader após a transição;
- abertura do menu, fechamento por `Escape` e retorno do foco;
- CTA `Ver cardápio` atualizando a âncora;
- header assumindo o estado de rolagem;
- console do navegador sem erros ou avisos na validação final.

## Decisões tomadas

1. Não usar biblioteca de animação; transições são CSS e estado React mínimo.
2. Usar `lucide-react` apenas para ícones funcionais consistentes.
3. Tratar o carrinho como controle visual desabilitado, sem abrir uma interface incompleta.
4. Manter as copies em `site-content.ts`, sem espalhar texto institucional pelos componentes.
5. Não usar o asset Sobre a Nath nesta etapa.
6. Não cadastrar ou exibir fotos de produtos.
7. Preservar a validação do catálogo no build e não alterar os 19 produtos ou preços.

## Limitações atuais

- `#cardapio`, `#clube-vip` e `#sobre-a-nath` são apenas marcadores estruturais; as seções ainda não existem por decisão de escopo.
- o asset vertical cria mais espaço negativo no desktop do que uma foto horizontal criaria; a solução atual prioriza mostrar Nath e bolo sem deformação ou crop forte;
- a logo horizontal oficial tem traços dourados finos e contraste visual discreto em tamanho pequeno;
- o contador do carrinho permanece em zero e o botão está desabilitado;
- não há integração com WhatsApp, catálogo visual, carrinho ou conteúdo institucional completo;
- conteúdo comercial pendente continua fora da página.

## Próxima tarefa recomendada

Implementar o catálogo visual consumindo exclusivamente as quatro categorias e os 19 produtos já validados. A etapa deve criar filtros acessíveis e cards ligados aos dados reais, sem foto fictícia, sem alterar preços e sem avançar ainda para detalhe de produto ou carrinho. Fotos reais devem entrar somente quando forem fornecidas e associadas ao produto correto.
