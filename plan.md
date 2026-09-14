# Plano de Implementação — YouTube Thumbnail Preview

## 1. Objetivo do projeto

Ferramenta web para criadores de conteúdo testarem como uma thumbnail vai ficar dentro da interface real do YouTube (home), antes de publicar o vídeo. O usuário sobe uma ou mais imagens em um painel de controle lateral, preenche nome do vídeo e nome do canal, e vê o resultado renderizado em uma réplica fiel da home do YouTube (sem logo/marca).

Não há backend com persistência (banco de dados, autenticação, etc.). Tudo roda client-side, em memória, durante a sessão do navegador.

## 2. Stack técnica

- **Framework**: Next.js (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS (ou CSS Modules — decidir na Fase 1, priorizando fidelidade visual ao YouTube)
- **Fonte**: Roboto (fonte oficial usada pelo YouTube)
- **Estado**: React Context + `useState`/`useReducer` (sem backend, sem API externa)
- **Upload de imagem**: local, via `FileReader`/`URL.createObjectURL`, sem envio a servidor

## 3. Escopo funcional (MVP)

1. Réplica fiel da **home do YouTube** (header, sidebar de navegação esquerda, grid de vídeos), sem logo nem nome da marca.
2. **Painel de controle** (sidebar própria, fora da réplica) com:
   - Botão "+" para adicionar uma thumbnail (upload de imagem)
   - Lista de thumbnails adicionadas; cada item com:
     - Input "Nome do vídeo"
     - Input "Nome do canal"
   - A **primeira thumbnail da lista** sempre substitui o vídeo em destaque na réplica do YouTube
   - Select **PC / Mobile** — altera apenas o preview da réplica do YouTube (não a página inteira)
   - Toggle de **tema claro/escuro** — aplicado apenas dentro do container da réplica, replicando os dois temas reais do YouTube

### Ponto em aberto (decidir antes ou durante a Fase 4)
Quando houver mais de uma thumbnail na lista: as demais (além da primeira) devem aparecer como vídeos normais no grid da home, ou o MVP foca em **um único vídeo em destaque** por vez, mantendo as outras apenas guardadas na lista do painel? Sugestão: assumir que sim, as demais thumbnails populam os próximos cards do grid, na mesma ordem da lista — mas confirmar antes de implementar essa parte.

## 4. Estrutura de pastas (Next.js App Router)

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                 # monta <YoutubePreview /> + <ControlSidebar />
│   └── globals.css
├── components/
│   ├── youtube-preview/         # réplica do YouTube (componentes "burros", só recebem props)
│   │   ├── YoutubeHeader.tsx
│   │   ├── YoutubeSidebarNav.tsx  # navbar esquerda real do YouTube
│   │   ├── VideoGrid.tsx
│   │   ├── VideoCard.tsx
│   │   └── index.tsx
│   ├── control-panel/           # sidebar de controle da ferramenta
│   │   ├── ThumbnailUploader.tsx
│   │   ├── ThumbnailListItem.tsx
│   │   ├── DeviceSelect.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── index.tsx
│   └── ui/                      # componentes puros, só estado de UI local (não sabem de domínio)
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Select.tsx
├── hooks/                       # estado central da aplicação (fonte da verdade, já que não há server)
│   ├── useThumbnails.ts         # lista de thumbnails, add/remove/update título/canal
│   ├── useTheme.ts              # dark/light
│   └── useDevicePreview.ts      # pc/mobile
├── types/
│   ├── thumbnail.ts             # Thumbnail { id, imageUrl, videoTitle, channelName }
│   └── ui.ts                    # DeviceMode = 'pc' | 'mobile'; ThemeMode = 'dark' | 'light'
├── styles/
│   ├── youtube-theme.css        # variáveis de cor extraídas do YouTube real (dark e light)
│   └── tokens.ts                # espaçamentos, tipografia, tamanhos
└── lib/
    └── utils.ts                 # helpers (gerar id, formatação, etc.)
```

**Observação sobre os hooks**: como não há backend/API real neste projeto, os hooks (`useThumbnails`, `useTheme`, `useDevicePreview`) atuam como a camada central de estado da aplicação (equivalente ao que seria estado de servidor em um projeto com backend). Os componentes de `youtube-preview/` e `control-panel/` devem ser o mais "burros" possível, recebendo dados e callbacks via props, sem lógica de estado própria além de estado puramente visual (ex: hover, campo em foco).

## 5. Fluxo de dados

```
Provider (Context) no page.tsx, usando os hooks
   ↓
useThumbnails() → thumbnails[], addThumbnail(), updateTitle(id, value), updateChannel(id, value), removeThumbnail(id)
   ↓                                              ↓
ControlPanel (consome o hook,              YoutubePreview (consome thumbnails[]:
dispara updates)                            thumbnails[0] = vídeo em destaque,
                                             thumbnails[1..n] = grid, se aplicável)

useTheme() e useDevicePreview() → controlam classes/atributos aplicados
somente no container da <YoutubePreview />, nunca na página inteira.
```

## 6. Fases de implementação

### Fase 1 — Fundação
- Setup do projeto Next.js + TypeScript + Tailwind (ou CSS Modules)
- Definir `types/thumbnail.ts` e `types/ui.ts`
- Levantar tokens de cor, tipografia e espaçamento do YouTube real (tema dark e light), documentar em `styles/tokens.ts` e `styles/youtube-theme.css`
- Configurar fonte Roboto

### Fase 2 — Réplica estática do YouTube
- Header (barra de busca, ícones — sem logo)
- Sidebar de navegação esquerda (Home, Shorts, Inscrições, etc.)
- Grid de vídeos com dados mockados (estáticos), cuidando de fidelidade visual: cores, fontes, espaçamento, proporções de thumbnail, truncamento de texto, etc.

### Fase 3 — Painel de controle
- Componente de upload de thumbnail (`ThumbnailUploader`) usando `useThumbnails`
- Lista dinâmica de thumbnails (`ThumbnailListItem`) com inputs de nome do vídeo e nome do canal
- Ações de adicionar/remover/editar refletindo no estado central

### Fase 4 — Integração painel ↔ réplica
- Primeira thumbnail da lista substitui o vídeo em destaque da réplica
- Resolver o ponto em aberto da seção 3 (demais thumbnails no grid ou não)
- Garantir atualização em tempo real: qualquer edição no painel reflete imediatamente na réplica

### Fase 5 — Tema e Device Preview
- `useTheme`: aplica tema dark/light **apenas** dentro do container da réplica do YouTube
- `useDevicePreview`: redimensiona/reestiliza **apenas** o container da réplica (não afeta o restante da página, incluindo o próprio painel de controle)

### Fase 6 — Polimento visual
- Comparação lado a lado com o YouTube real (dark e light, desktop e mobile) para ajuste fino de cores, fonte, espaçamentos e proporções
- Revisão de responsividade do painel de controle em si (não confundir com o select PC/Mobile, que é só do preview)

## 7. Critérios de fidelidade visual

- Réplica não deve conter logo nem nome "YouTube" em nenhum lugar
- Cores, tipografia (Roboto) e espaçamentos devem seguir o padrão real do YouTube nos dois temas
- Estrutura do grid, proporção das thumbnails (16:9) e truncamento de título/nome de canal devem seguir o comportamento real do YouTube