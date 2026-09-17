# Vino Guide

Você é um Staff Front-End Engineer, Senior Product Designer e Diretor de Arte Digital, especialista em criar interfaces premium para gastronomia, vinhos, hospitality, luxury brands e produtos digitais de alto padrão.

Você receberá como anexo os arquivos HTML e JavaScript deste aplicativo de Sommelier Digital.

Sua missão é RECRIAR COMPLETAMENTE O DESIGN DO FRONT-END, produzindo uma experiência visual radicalmente mais sofisticada, moderna, autoral e memorável, mas preservando integralmente toda a lógica e o funcionamento existentes.

REGRA FUNDAMENTAL

LEIA E ANALISE TODO O HTML E TODO O JAVASCRIPT ANTES DE IMPLEMENTAR QUALQUER ALTERAÇÃO.

As perguntas e as opções de resposta JÁ EXISTEM NO CÓDIGO e devem ser utilizadas como base obrigatória para o novo design.

Não invente perguntas.

Não invente respostas.

Não substitua textos existentes por exemplos.

Não altere a ordem das perguntas.

Não altere os valores associados às respostas.

Não altere os filtros.

Não altere as regras de negócio.

Não altere o algoritmo de recomendação.

Não invente vinhos.

Não invente informações.

Não crie dados fictícios.

O HTML, JavaScript e dados existentes são a fonte de verdade do produto.

Seu trabalho é reimaginar completamente a apresentação visual desses mesmos conteúdos e funcionalidades.

CONCEITO DO PRODUTO

O aplicativo funciona como um sommelier digital personalizado.

O usuário responde a uma sequência de perguntas objetivas. Cada resposta funciona como um filtro para entender suas preferências e, ao final, encontrar vinhos compatíveis com seu perfil.

A interface não deve parecer um formulário.

Ela deve transmitir a sensação de uma consulta personalizada com um sommelier sofisticado, conduzindo o usuário por uma jornada de descoberta.

A experiência emocional deve evoluir como:

curiosidade → descoberta → refinamento → compreensão do paladar → recomendação

e não:

pergunta → formulário → pergunta → formulário → lista de cards.

DIREÇÃO ARTÍSTICA

Crie uma estética de CONTEMPORARY WINE LUXURY.

Combine visualmente referências de:

editorial design;

revistas premium de vinho;

alta gastronomia;

restaurantes sofisticados;

hotéis boutique;

adegas contemporâneas;

rótulos de vinhos premium;

packaging de luxo;

arquitetura minimalista;

design europeu contemporâneo.

A estética deve ser:

elegante, quente, refinada, contemporânea, editorial, minimalista e autoral.

Não quero uma estética vintage.

Não quero uma estética barroca.

Não quero uma interface excessivamente clássica.

Quero luxo contemporâneo.

PROIBIDO TER APARÊNCIA GENÉRICA DE IA

O resultado NÃO pode parecer:

template de SaaS;

dashboard;

CRM;

formulário genérico;

chatbot;

aplicativo financeiro;

landing page de startup;

interface de "AI assistant";

biblioteca de componentes pronta;

design system genérico;

glassmorphism;

neon;

gradientes tecnológicos;

excesso de cards;

excesso de sombras;

excesso de elementos arredondados;

visual excessivamente tecnológico.

Não use o padrão visual típico:

fundo escuro + cards flutuantes + gradientes + bordas brilhantes + pills + sombras fortes.

Quero uma identidade visual que pareça ter sido criada especificamente para este produto.

PALETA DE CORES

A interface deve ser predominantemente bege quente / ivory / parchment.

Utilize vinho profundo e marrom claro como cores complementares.

Base sugerida:

:root {
  --bg: #F3EBDD;
  --surface: #F8F2E8;
  --surface-soft: #EDE1CF;

  --wine: #651C2A;
  --wine-dark: #42131D;
  --wine-soft: #7B3541;

  --brown: #98745B;
  --brown-light: #B99A7D;
  --brown-dark: #60483A;

  --ink: #29221E;
  --muted: #75665A;

  --line: rgba(96, 72, 56, 0.18);
}


Ajuste os valores livremente caso consiga alcançar uma harmonia visual superior.

Regra de uso

O bege deve dominar a interface.

O vinho deve funcionar como cor de assinatura.

O marrom claro deve funcionar como cor secundária.

Utilize vinho estrategicamente em:

CTAs;

estados selecionados;

números;

indicadores;

pequenos detalhes;

linhas;

microtipografia;

elementos de destaque.

Não transforme todas as telas em vinho.

TIPOGRAFIA

Crie uma combinação tipográfica editorial sofisticada.

Para títulos, utilize uma serif contemporânea, como:

Instrument Serif;

Cormorant Garamond;

DM Serif Display;

Playfair Display;

ou equivalente.

Para interface e textos:

Inter;

Manrope;

DM Sans;

Geist;

ou equivalente.

Use a serif para:

personalidade, emoção e sofisticação.

Use a sans-serif para:

clareza, navegação e informações funcionais.

Os títulos devem ter grande presença visual.

Utilize clamp() para tipografia responsiva.

LAYOUT

Crie uma composição editorial.

Não centralize absolutamente tudo.

Utilize:

espaço negativo generoso;

assimetria controlada;

grid editorial;

alinhamentos precisos;

áreas de respiro;

pequenos elementos nas margens;

tipografia em grande escala;

composição visual assimétrica quando fizer sentido.

No desktop, utilize aproximadamente um grid de 12 colunas.

No mobile, adapte a composição sem perder a identidade.

Não preencha espaços apenas porque eles existem.

O espaço vazio deve transmitir sofisticação.

TELA INICIAL

Analise o conteúdo existente no HTML e mantenha os textos e elementos funcionais reais.

Redesenhe a tela inicial para parecer uma experiência premium.

Crie uma composição com:

marca/wordmark existente;

microinformação;

título editorial;

subtítulo existente;

CTA;

pequenos detalhes gráficos.

O CTA deve ter aparência sofisticada e editorial.

Evite botões genéricos com grandes pills arredondadas.

Uma linguagem como:

Começar degustação →

pode servir de referência visual, mas não substitua o texto existente caso isso altere o conteúdo original.

FLUXO DAS PERGUNTAS

Esta é a parte mais importante do redesign.

As perguntas que já existem no HTML/JavaScript devem permanecer exatamente como estão em conteúdo e lógica.

Transforme cada pergunta em um momento visual de decisão.

Utilize um indicador de progresso elegante, baseado na quantidade real de perguntas existente.

Exemplo visual:

01 / 06

━━━━━━━━━━━━━━━━━━━━━━━━


O número deve ser calculado dinamicamente.

Não assuma quantidade fixa.

Não escreva números manualmente.

APRESENTAÇÃO DA PERGUNTA

A pergunta real existente no código deve receber grande protagonismo.

Use:

tipografia grande;

excelente espaçamento;

composição editorial;

pequena identificação da etapa;

hierarquia clara.

Não invente descrições para preencher espaço.

Se o projeto não possuir uma descrição para determinada pergunta, mantenha a composição limpa.

OPÇÕES DE RESPOSTA

As opções JÁ ESTÃO NO HTML E NO JAVASCRIPT.

Localize todas elas e preserve:

texto;

valor;

identificador;

ordem;

evento;

comportamento;

relação com os filtros.

Apenas transforme sua apresentação.

NÃO faça isto:

[ opção 1 ]
[ opção 2 ]
[ opção 3 ]
[ opção 4 ]


em cards genéricos arredondados.

Prefira uma linguagem editorial:

01    OPÇÃO REAL DO PROJETO                         →

────────────────────────────────────────────────────

02    OPÇÃO REAL DO PROJETO                         →

────────────────────────────────────────────────────

03    OPÇÃO REAL DO PROJETO                         →

────────────────────────────────────────────────────


A quantidade de opções deve ser determinada pelo código real.

Não presuma que todas as perguntas possuem a mesma quantidade de respostas.

ESTADO NORMAL DAS OPÇÕES

As opções devem ser leves, elegantes e sofisticadas.

Utilize:

fundo transparente ou superfície muito sutil;

linhas finas;

número editorial;

tipografia refinada;

seta;

espaçamento generoso.

HOVER

No desktop:

número pode mudar para vinho;

linha pode ganhar contraste;

seta deve se deslocar alguns pixels;

texto pode ter deslocamento mínimo;

pode surgir uma pequena indicação visual.

Tudo deve ser sutil.

SELEÇÃO

Ao selecionar uma opção:

preserve o evento original;

preserve a resposta original;

altere claramente o estado visual;

utilize vinho;

mostre um indicador de seleção;

aplique uma microanimação sofisticada.

O usuário deve saber imediatamente qual opção está selecionada.

No mobile, não dependa de hover.

TRANSIÇÃO ENTRE PERGUNTAS

As mudanças entre perguntas devem parecer uma única experiência contínua.

Quando o usuário selecionar uma resposta:

mantenha a lógica original;

registre a resposta normalmente;

faça a pergunta atual sair suavemente;

faça a próxima pergunta entrar;

atualize o progresso;

mantenha continuidade visual.

Utilize principalmente:

opacity
transform
clip-path


quando apropriado.

Use easing refinado:

cubic-bezier(0.22, 1, 0.36, 1)


Duração aproximada:

250ms–500ms.

Não utilize animações exageradas.

VOLTAR

Se o código existente possuir funcionalidade de voltar, preserve-a.

Redesenhe o controle como uma ação editorial discreta:

← voltar

Não transforme em botão grande.

ELEMENTOS GRÁFICOS

Adicione detalhes visuais inspirados no universo do vinho de maneira abstrata.

Prefira:

linhas;

círculos;

coordenadas;

pequenas marcações;

mapas abstratos;

linhas topográficas;

diagramas;

elementos de rótulos;

números;

formas orgânicas;

pequenos ornamentos editoriais.

Evite clichês como:

taças enormes;

uvas gigantes;

barris;

garrafas decorativas;

cachos de uva.

O universo do vinho deve ser percebido através da direção de arte, não através de ilustrações óbvias.

TEXTURA

O fundo bege pode possuir uma textura extremamente sutil semelhante a papel premium.

Utilize grain/noise de intensidade muito baixa.

Não deve parecer papel antigo.

Deve parecer:

materialidade contemporânea.

RESULTADOS

Depois das perguntas, preserve integralmente o sistema real de filtragem e recomendação do JavaScript.

Não altere:

filtros;

cálculos;

score;

dados;

regras;

lógica.

Redesenhe completamente apenas a apresentação.

A tela de resultados deve parecer o momento em que o sommelier apresenta sua seleção cuidadosamente escolhida.

REVELAÇÃO

Se o código já possuir loading/processamento, transforme visualmente essa etapa em uma pequena experiência de descoberta.

Evite simplesmente:

Loading...

com spinner genérico.

Utilize a identidade visual do produto:

linhas;

números;

transições;

tipografia;

pequenos movimentos.

Não adicione lógica desnecessária.

RECOMENDAÇÃO PRINCIPAL

Se o código possuir um resultado principal ou vinho mais compatível, dê a ele maior destaque.

A composição deve parecer editorial.

Pode utilizar:

imagem;

nome;

produtor;

região;

safra;

variedade;

informações reais disponíveis;

score real;

compatibilidade real;

CTA real.

Não invente informações ausentes.

Não transforme a recomendação em um card tradicional de SaaS.

Pense em uma página editorial de uma revista premium de vinhos.

VINHOS SECUNDÁRIOS

Os demais resultados devem ser apresentados com hierarquia visual.

Evite dezenas de cards iguais.

Utilize uma composição mais sofisticada e leve.

As informações devem vir exclusivamente dos dados existentes.

Se determinado vinho não possuir preço, não invente preço.

Se não possuir safra, não invente safra.

Se não possuir descrição, não invente descrição.

IMAGENS

Preserve as imagens existentes.

Não substitua imagens reais por placeholders.

Trate as garrafas e imagens como objetos editoriais.

Utilize:

proporções elegantes;

espaço negativo;

fundos limpos;

sombras muito sutis;

recortes sofisticados.

Evite excesso de border-radius.

COMPATIBILIDADE

Se existir score de compatibilidade, apresente-o de maneira editorial.

Evite um enorme círculo com porcentagem.

Prefira algo como:

COMPATIBILIDADE

98 ───────────────── excelente combinação


ou uma solução visual equivalente.

Utilize o valor real do sistema.

RESPONSIVIDADE

Crie uma experiência excelente em:

smartphones;

tablets;

notebooks;

desktops;

telas grandes.

Mobile

A experiência deve ser:

vertical;

confortável;

limpa;

focada;

fácil de tocar.

As perguntas devem ocupar uma boa parte da tela.

As opções devem ter áreas grandes.

O conteúdo não pode ficar apertado.

Desktop

Utilize:

grid editorial;

assimetria;

espaço negativo;

elementos periféricos;

composição mais sofisticada.

Não simplesmente aumente o layout mobile.

BOTÕES

Crie botões refinados.

CTA principal:

vinho profundo;

texto bege;

tipografia limpa;

espaçamento generoso;

pequena seta;

transição suave.

Hover:

alteração sutil de cor;

seta deslocando;

pequeno movimento.

Não use:

gradientes;

sombras pesadas;

pills gigantes;

efeitos neon.

BORDAS E CANTOS

Não aplique border-radius exagerado em todos os elementos.

Misture:

cantos retos;

pequenos raios;

linhas finas;

áreas abertas;

divisores.

O design deve parecer editorial, não uma coleção de componentes de UI.

MICROTIPOGRAFIA

Utilize pequenas labels em uppercase com letter-spacing.

Exemplos conceituais:

SOMMELIER DIGITAL

SEU PERFIL

REGIÃO

CASTA

COMPATIBILIDADE

Mas preserve os textos reais do projeto quando esses elementos já existirem.

Esses detalhes devem reforçar a identidade premium.

MICROINTERAÇÕES

Crie microinterações em:

hover;

seleção;

botões;

setas;

linhas;

transição entre perguntas;

entrada dos resultados;

elementos de progresso.

Use animações discretas.

A animação deve melhorar a experiência, não chamar atenção para si mesma.

ACESSIBILIDADE

Preserve:

navegação por teclado;

:focus-visible;

contraste;

HTML semântico;

estados de seleção claros;

áreas clicáveis adequadas;

suporte a prefers-reduced-motion.

Não remova o foco do teclado sem fornecer uma alternativa.

PERFORMANCE

Não introduza bibliotecas pesadas sem necessidade.

Priorize:

HTML semântico;

CSS moderno;

JavaScript existente;

CSS Grid;

Flexbox;

transforms;

opacity;

carregamento eficiente;

lazy loading quando apropriado.

PRESERVAÇÃO DO JAVASCRIPT

Antes de modificar qualquer estrutura, identifique todos os:

IDs;

classes;

atributos;

seletores;

eventos;

listeners;

funções;

elementos manipulados pelo JavaScript.

Se precisar alterar a estrutura HTML, preserve os hooks funcionais ou atualize cuidadosamente as referências.

O aplicativo precisa continuar funcionando exatamente como funciona atualmente.

NÃO ALTERE A REGRA DE NEGÓCIO

Não altere:

perguntas;

respostas;

filtros;

pesos;

condições;

algoritmo;

resultados;

dados;

APIs;

URLs;

armazenamento;

parâmetros;

regras de recomendação.

O objetivo é exclusivamente:

REDESIGN VISUAL + MELHORIA DA EXPERIÊNCIA.

NÃO INVENTE CONTEÚDO

Sempre que precisar de qualquer informação, procure primeiro no código existente.

Isso inclui:

perguntas;

respostas;

nomes;

descrições;

regiões;

produtores;

preços;

scores;

categorias;

imagens;

textos;

labels.

Se não existir no projeto, não invente.

NÃO INVENTE QUANTIDADES

Descubra dinamicamente no código:

número de perguntas;

número de respostas;

número de resultados;

quantidade de categorias;

quantidade de etapas.

Não codifique números arbitrários.

SISTEMA VISUAL

Organize o novo design utilizando tokens:

:root {
  --color-bg: #F3EBDD;
  --color-surface: #F8F2E8;
  --color-wine: #651C2A;
  --color-wine-dark: #42131D;
  --color-brown: #98745B;
  --color-brown-light: #B99A7D;
  --color-ink: #29221E;
  --color-muted: #75665A;

  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 40px;
  --space-2xl: 64px;
  --space-3xl: 96px;

  --ease-premium: cubic-bezier(0.22, 1, 0.36, 1);
}


Adapte esses valores conforme necessário.

CRITÉRIO DE QUALIDADE

Depois de implementar, faça uma revisão crítica completa.

Pergunte:

Isso parece um template?

Se sim, redesenhe.

Parece um SaaS?

Se sim, redesenhe.

Parece uma interface genérica de IA?

Se sim, redesenhe.

Existem cards demais?

Se sim, simplifique.

Tudo está arredondado?

Se sim, refine.

Existe espaço negativo suficiente?

Se não, aumente.

A tipografia possui personalidade?

Se não, refine.

O vinho está sendo usado como uma cor de assinatura?

Se não, corrija.

O bege domina adequadamente?

Se não, corrija.

A experiência parece uma consulta com um sommelier?

Se não, redesenhe a interação.

O resultado parece uma seleção cuidadosamente curada?

Se não, refine a hierarquia.

RESULTADO ESPERADO

Quero abrir o projeto final e ter imediatamente a sensação de:

"Isso foi cuidadosamente desenhado."

O produto deve parecer uma experiência digital de uma marca premium de vinhos.

A interface deve comunicar:

sofisticação;

confiança;

conhecimento;

exclusividade;

bom gosto;

modernidade;

cuidado;

descoberta.

Sem exageros.

Sem clichês.

Sem aparência de template.

Sem estética genérica de IA.

INSTRUÇÃO FINAL

LEIA PRIMEIRO TODO O HTML E TODO O JAVASCRIPT ANEXADOS.

Use o código existente como fonte absoluta da verdade.

Mapeie:

todas as telas;

todas as perguntas;

todas as opções;

todos os estados;

todos os eventos;

toda a lógica;

todos os filtros;

todos os resultados;

todos os dados;

todos os elementos funcionais.

Depois, reconstrua completamente a camada visual.

As perguntas e opções existentes devem ser apresentadas de uma forma completamente nova, muito mais sofisticada.

Não invente conteúdo.

Não altere a lógica.

Não simplifique o funcionamento.

Não substitua dados reais por placeholders.

Não crie funcionalidades que não existem.

Quero um redesign completo de nível profissional, com qualidade de produção, excelente UX, responsividade impecável, microinterações refinadas e uma identidade visual própria.

O resultado final deve parecer um produto criado por uma equipe de direção de arte + product design + engenharia front-end de alto nível, especificamente para uma marca contemporânea e sofisticada de vinhos.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/03fd846b-6da0-45bf-bc8c-dcae02529ed9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
