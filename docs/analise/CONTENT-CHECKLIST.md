# Checklist de conteúdo - Doces da Nath

## Como ler as classificações

- **Bloqueia desenvolvimento:** impede concluir uma função específica do MVP, mas não impede iniciar a base do projeto.
- **Não bloqueia desenvolvimento:** a estrutura pode ser criada com regra neutra e o conteúdo entra depois.
- **Bloqueia somente publicação:** a página pode ser construída e testada, porém a informação/seção não deve ir ao ar sem confirmação.
- **Pode ser resolvida posteriormente:** melhoria ou conteúdo que pode permanecer oculto no MVP.

## Dados confirmados

### Marca e objetivo

- [x] Nome: Doces da Nath.
- [x] Segmento: confeitaria artesanal.
- [x] Posicionamento: premium, delicado e acessível.
- [x] Uso principal da página: link da bio do Instagram.
- [x] Experiência: vitrine mobile-first com catálogo, personalização, carrinho local e envio pelo WhatsApp.
- [x] A página não deve parecer iFood nem landing institucional extensa.
- [x] Paleta oficial documentada: off-white, chocolate, champagne, dourado champagne, taupe e rosa queimado.
- [x] Direção tipográfica: títulos serifados editoriais, leitura limpa e assinatura caligráfica limitada à marca.

### Contatos oficiais

- [x] WhatsApp exibido: `+55 27 99508-2631`.
- [x] WhatsApp normalizado: `5527995082631`.
- [x] Link-base: `https://wa.me/5527995082631`.
- [x] Usos: pedido, contato direto, Clube VIP, dúvidas e personalizações.
- [x] Instagram oficial informado: `https://www.instagram.com/doces.da.nath_?igsh=MTIwZ3Q1aGFwZ3JtMA==`.
- [ ] Nome de usuário exibido: provável `@doces.da.nath_`; confirmar antes da publicação final.

### Cardápio real

- [x] Fonte principal: `docs/briefing/cardapio.md.txt`.
- [x] Categorias de dados: Bolos; Brigadeiros e docinhos; Kits festa; Caixas e presentes.
- [x] Bolo personalizado com tamanhos P, M e G, rendimentos e preços próprios.
- [x] Bolo personalizado sob encomenda, com sabores e observações de ocasião/decoração.
- [x] Quatorze produtos de brigadeiros/docinhos, cada um com preços para 25, 50 e 100 unidades.
- [x] Quantidade mínima geral documentada para esses brigadeiros/docinhos: 25 unidades.
- [x] Kit Festa Individual: R$ 50,00.
- [x] Kit Festa para 4 pessoas: R$ 85,00.
- [x] Caixa com 12 brigadeiros: R$ 45,00.
- [x] Bento cake: R$ 69,90, aproximadamente 900 g.
- [x] Pedidos sujeitos à confirmação de disponibilidade e prazo no WhatsApp.
- [x] Produção iniciada após a confirmação do pedido.
- [x] Personalizações, decoração e adicionais especiais podem alterar o valor final.
- [x] Taxa de entrega deve ser confirmada de acordo com a localização.
- [x] Caixa com 12 brigadeiros pode ser sob encomenda ou pronta entrega, conforme disponibilidade.

### MVP e tecnologia

- [x] Next.js App Router, TypeScript e Tailwind CSS.
- [x] Catálogo local inicialmente.
- [x] Carrinho persistido no navegador.
- [x] Finalização pelo WhatsApp.
- [x] Deploy previsto na Vercel e repositório no GitHub.
- [x] Sem login, pagamento online, painel administrativo, estoque em tempo real, rastreamento, sistema de entregadores ou cadastro obrigatório no MVP.

### Assets oficiais

- [x] Logo horizontal para header/navbar.
- [x] Ícone do bolo para identidade e decoração.
- [x] Logo circular para preloader/footer.
- [x] Hero mobile oficial com a Nath.
- [x] Imagem oficial Sobre a Nath.
- [x] URLs, dimensões observadas, carregamento e riscos registrados em `ASSETS-INVENTORY.md`.

## Pendências classificadas

| Informação pendente | Classificação | Impacto e decisão provisória |
| --- | --- | --- |
| Endereço ou bairro de retirada | Bloqueia somente publicação | Não exibir endereço nem instrução de retirada até confirmação |
| Regiões atendidas | Bloqueia somente publicação | O fluxo pode oferecer `Entrega`, mas deve dizer que cobertura será confirmada |
| Regra de entrega | Bloqueia somente publicação | Não prometer prazo, faixa de distância ou modalidade específica |
| Taxa de entrega | Não bloqueia desenvolvimento | Fica fora do subtotal e é confirmada pelo WhatsApp |
| Formas de pagamento aceitas | Bloqueia desenvolvimento | Impede fechar os valores reais do seletor de pagamento do carrinho |
| Horários de atendimento | Bloqueia somente publicação | Não informar disponibilidade imediata nem tempo de resposta |
| Antecedência mínima por categoria | Não bloqueia desenvolvimento | Data desejada pode ser coletada sem validação automática; prazo é confirmado pela Nath |
| Política de cancelamento/remarcação | Bloqueia somente publicação | Não criar FAQ ou aceite com regra inventada |
| Mensagem oficial de pedido no WhatsApp | Não bloqueia desenvolvimento | A estrutura técnica pode usar texto neutro; tom final deve ser aprovado |
| Mensagem de contato direto | Não bloqueia desenvolvimento | Criar contexto distinto de pedido e VIP |
| Mensagem de entrada no Clube VIP | Não bloqueia desenvolvimento | Estrutura pode ser preparada; copy final depende da proposta real do clube |
| Texto e benefícios oficiais do Clube VIP | Bloqueia somente publicação | Não publicar ofertas, lançamentos ou vantagens ainda não confirmadas |
| Depoimentos reais autorizados | Bloqueia somente publicação | Ocultar a seção até receber material verdadeiro e permissão de uso |
| Produtos marcados como `Mais pedidos` | Pode ser resolvida posteriormente | Manter o filtro oculto até a curadoria da Nath |
| Fotos reais de cada produto | Bloqueia somente publicação | Catálogo pode ser desenvolvido com placeholders internos, mas não deve ir ao ar assim |
| Regras detalhadas de personalização do bolo | Não bloqueia desenvolvimento | MVP usa observação livre e aviso de confirmação, sem preço automático |
| Sabores disponíveis nos kits | Não bloqueia desenvolvimento | Registrar `a confirmar no WhatsApp`; não criar opções falsas |
| Sabores, cores e limites do bento cake | Não bloqueia desenvolvimento | Registrar solicitação como observação sujeita à confirmação |
| Número máximo de sabores por pedido de brigadeiros | Não bloqueia desenvolvimento | Não oferecer mistura automática de sabores até a regra existir |
| Disponibilidade real de pronta entrega | Pode ser resolvida posteriormente | Usar status `a confirmar`; não prometer estoque em tempo real |
| Itens/adicionais com preço extra | Não bloqueia desenvolvimento | Não calcular adicional; valor final é confirmado pela Nath |
| Biografia oficial da Nath | Bloqueia somente publicação | Seção pode ser montada, mas texto deve ser aprovado antes de ir ao ar |
| Headline e texto final do hero | Não bloqueia desenvolvimento | A arquitetura já está definida; copy final precisa de aprovação de marca |
| Perguntas sobre entrega, pagamento, prazo e cancelamento | Bloqueia somente publicação | Publicar apenas FAQs com respostas confirmadas |
| Confirmação do usuário do Instagram | Bloqueia somente publicação | O link existe, mas o rótulo visível provável deve ser conferido |
| Fonte oficial, arquivos e licença | Não bloqueia desenvolvimento | Avaliar opções provisórias; não fixar família final sem licença/qualidade |
| Transparência das logos e do ícone | Não bloqueia desenvolvimento | Validar canal alfa em fundo claro e escuro antes do acabamento |
| Divergência de dimensão do hero | Pode ser resolvida posteriormente | URL entrega 941 × 1672 px, não 1080 × 1920; usar o arquivo real como limite |
| Divergência da foto Sobre | Pode ser resolvida posteriormente | URL entrega 1122 × 1402 px, não 1080 × 1350; proporção continua próxima de 4:5 |
| Versão horizontal do hero para desktop | Pode ser resolvida posteriormente | Usar adaptação documentada sem crop destrutivo |
| Logo vetorial/variações para fundo claro e escuro | Pode ser resolvida posteriormente | WebP atual atende a base; pedir versões oficiais para acabamento futuro |
| Favicon simplificado | Pode ser resolvida posteriormente | Ícone atual possui traço fino; não reduzir automaticamente para 16 px |
| Domínio público definitivo | Pode ser resolvida posteriormente | A Vercel pode publicar uma prévia; domínio não impede desenvolvimento |

## Inconsistências a validar

- [ ] **Brigadeiro de Ninho com Nutella:** 25 unidades por R$ 50,00; 50 por R$ 95,00; 100 por R$ 145,00. O último preço cresce apenas R$ 50,00 em relação a 50 unidades e fica abaixo de outros sabores premium. Manter o valor do cardápio como fonte, mas confirmar antes de publicar.
- [ ] **Kit Festa para 4 pessoas:** confirmar tamanho/peso aproximado do bolo incluído.
- [ ] **Bolo personalizado:** confirmar se a lista representa sabores completos, recheios ou combinações permitidas e se há limite de escolhas por bolo.
- [ ] **Caixa com 12 brigadeiros:** confirmar quantos sabores podem compor a caixa.
- [ ] **Instagram:** os mockups exibem outro formato de usuário; usar somente o link oficial e confirmar `@doces.da.nath_`.
- [ ] **Referências visuais:** aparecem pudim e outros itens que não existem no cardápio real. Não cadastrá-los.
- [ ] **Assets:** dimensões dos dois retratos diferem do informado, conforme registrado no inventário.

## Fotos necessárias

### Catálogo

- [ ] Bolo personalizado, preferencialmente com acabamento representativo e sem prometer decoração específica inclusa.
- [ ] Brigadeiro de Chocolate 50%.
- [ ] Brigadeiro de Ninho com Nutella.
- [ ] Brigadeiro de Limão.
- [ ] Brigadeiro de Ninho.
- [ ] Beijinho de coco.
- [ ] Brigadeiro de Churros.
- [ ] Casadinho.
- [ ] Brigadeiro Ferrero.
- [ ] Brigadeiro Brûlée.
- [ ] Brigadeiro de Oreo.
- [ ] Brigadeiro de Confeti.
- [ ] Brigadeiro de Paçoca.
- [ ] Surpresa de Uva.
- [ ] Brigadeiro de Café.
- [ ] Kit Festa Individual com todos os itens visíveis.
- [ ] Kit Festa para 4 pessoas com todos os itens visíveis.
- [ ] Caixa com 12 brigadeiros.
- [ ] Bento cake.

### Prova e contexto

- [ ] Duas a seis fotos reais de encomendas/momentos para apoiar prova visual.
- [ ] Fotos que representem pronta entrega somente quando esse status for verdadeiro.
- [ ] Autorização para qualquer imagem com clientes ou dados identificáveis.

### Padrão recomendado

- enquadramento consistente e claro;
- preferência por 4:5 ou 1:1 no catálogo;
- produto inteiro visível e fiel à entrega real;
- fundo compatível com a paleta, sem filtro que altere cor/sabor;
- versão com resolução suficiente para retina, sem arquivo exagerado;
- nome do produto associado de forma inequívoca à foto.

## Copies necessárias

- [ ] Headline final do hero.
- [ ] Texto curto de apoio do hero.
- [ ] Texto de introdução ao cardápio.
- [ ] Descrições finais dos produtos, revisando consistência de nomes.
- [ ] Texto oficial do Clube VIP.
- [ ] Lista de benefícios reais do Clube VIP, se houver.
- [ ] Biografia curta da Nath.
- [ ] Três a cinco atributos reais do processo/trabalho.
- [ ] Texto da seção de depoimentos/prova.
- [ ] Respostas oficiais de entrega, retirada, pagamento, antecedência e cancelamento.
- [ ] CTA final.
- [ ] Mensagem de pedido formatado para WhatsApp.
- [ ] Mensagem de contato direto com a Nath.
- [ ] Mensagem de entrada no Clube VIP.
- [ ] Aviso curto sobre confirmação de disponibilidade, prazo, taxa e valor final.

## Informações comerciais a confirmar

- [ ] Onde ocorre a retirada.
- [ ] Quais bairros/cidades/regiões recebem entrega.
- [ ] Como a entrega é combinada.
- [ ] Como a taxa é calculada ou comunicada.
- [ ] Quais formas de pagamento são aceitas.
- [ ] Quando o pagamento é realizado.
- [ ] Horários e dias de atendimento.
- [ ] Antecedência mínima para bolos, brigadeiros, kits, caixa e bento cake.
- [ ] Regra de cancelamento e remarcação.
- [ ] Condição para iniciar produção, além da confirmação já documentada, se existir.
- [ ] Limites e possíveis cobranças de personalização.

## Provas sociais necessárias

- [ ] Receber de três a seis depoimentos reais.
- [ ] Confirmar autorização de publicação.
- [ ] Remover telefone, foto de perfil, horário e qualquer dado pessoal desnecessário dos prints.
- [ ] Preferir transcrever o conteúdo com fidelidade, mantendo registro interno da origem, em vez de publicar print ilegível.
- [ ] Confirmar nome exibido ou usar primeiro nome/inicial conforme autorização.
- [ ] Não adicionar estrelas se o cliente não forneceu uma avaliação equivalente.
- [ ] Associar foto de produto ao depoimento somente quando corresponder àquele pedido.

## Validações necessárias com a Nath

1. Confirmar o preço de 100 unidades do Brigadeiro de Ninho com Nutella.
2. Confirmar formas de pagamento para fechar o carrinho.
3. Confirmar retirada, cobertura de entrega e comunicação da taxa.
4. Confirmar antecedência mínima e política de cancelamento.
5. Aprovar headline, biografia e tom geral da página.
6. Definir o que o Clube VIP realmente oferece e aprovar sua mensagem de entrada.
7. Indicar os produtos `Mais pedidos`, se o filtro for usado.
8. Entregar/aprovar fotos reais ligadas aos 19 produtos do cardápio.
9. Fornecer e autorizar depoimentos reais.
10. Confirmar sabores e limites de combinação para kits, caixa, bento e brigadeiros.
11. Confirmar o usuário visível do Instagram a partir do link oficial.
12. Validar as logos em fundo claro/escuro e informar se existem versões vetoriais.

## O que não bloqueia o início da implementação

A base do projeto, os tokens, a modelagem do catálogo, a navegação, o hero, os estados de produto/carrinho e a geração estrutural da mensagem do WhatsApp podem começar com os dados existentes. As pendências devem aparecer como campos/estados de confirmação, nunca como informação inventada.

Os pontos que impedem concluir partes específicas são: opções reais de pagamento, conteúdo final do Clube VIP, depoimentos, biografia/copies aprovadas e fotos reais de produto. Eles não impedem iniciar pela modelagem dos dados.
