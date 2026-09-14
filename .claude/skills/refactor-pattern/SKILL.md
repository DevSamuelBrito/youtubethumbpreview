---
name: padroes-codigo-frontend-manutencao
description: Padrões de organização e qualidade de código do frontend (Next.js + TypeScript + MUI + React Query) extraídos do módulo de Manutenção deste projeto. Use como referência ao pedir para uma IA refatorar/organizar telas em outro projeto no mesmo estilo.
---

# Padrões de código do Frontend — baseado no módulo de Manutenção

Este documento descreve, com exemplos reais, como o código de uma feature típica é
organizado neste projeto (referência: `src/views/manutencao`, `src/hooks/manutencao`,
`src/types/manutencao`, `src/services/manutencao`). Use este arquivo como prompt/anexo
ao pedir para uma IA refatorar telas de outro projeto seguindo o mesmo padrão.

O objetivo não é só estética — é manter uma separação clara de responsabilidades:
**view (orquestra) → hook (estado + dados) → service (chamada de API) → types
(contratos) → styles (visual)**, cada um em seu arquivo.

---

## 1. Formatação mecânica (não é opinião, é config do projeto)

Prettier (`.prettierrc`):
- `semi: false` — sem ponto e vírgula no fim das linhas (arquivos antigos com `;`
  são legado, não o padrão a seguir).
- `singleQuote: true`, `jsxSingleQuote: true`
- `printWidth: 120`, `tabWidth: 2`
- `trailingComma: "none"`
- `arrowParens: "avoid"` — `x => x` em vez de `(x) => x` quando há um único parâmetro

ESLint (`.eslintrc.js`), regras que moldam o "respiro" do código:
- `import/order` com `newlines-between: "always-and-inside-groups"` → **sempre uma
  linha em branco entre grupos de import**, inclusive dentro do mesmo grupo quando
  cada import tem seu próprio comentário de categoria.
- `import/newline-after-import` → 1 linha em branco depois do último import.
- `padding-line-between-statements` → linha em branco obrigatória depois de
  declarações `const/let/var` antes de qualquer outra coisa, e ao redor de
  funções/blocos multilinha.
- `newline-before-return` → sempre uma linha em branco antes de `return`.
- `lines-around-comment` → linha em branco antes de comentários de bloco/linha
  (exceto no início de bloco/objeto/array).

Isso explica o "respiro" característico do código: **imports comentados e
separados por linha em branco, return sempre isolado, blocos lógicos separados
por linha em branco em vez de comentários longos.**

---

## 2. Organização de imports

Imports são agrupados por categoria, cada grupo com um comentário curto em
minúsculo e uma linha em branco entre grupos. Ordem observada: bibliotecas
externas → hooks → componentes → colunas de grid → types → api/services →
utils/constants → styles.

```ts
//react
import { useState, useCallback } from 'react'

//react-query
import { keepPreviousData, useQuery } from '@tanstack/react-query'

//redux
import { useSelector } from 'react-redux'

import type { RootState } from '@/store'

//hooks
import { useSmartInvalidate } from '@/hooks/manutencao/shared/useSmartInvalidate'

//types
import type { Equipamento } from '@/types/manutencao/Equipamentos/TypesEquipamentos'

//api
import { BuscarEquipamentos } from '@/services/manutencao/Equipamentos/equipamentos'
```

Em componentes de view, o mesmo padrão aparece com grupos adicionais
(`//mui`, `//components`, `//columns`, `//hooks`, `//styles`):

```tsx
'use client';

//mui
import { useMediaQuery, useTheme } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

//components
import Loading from "@/components/loading";
import CustomToolbarEquipamentos from "./components/CustomToolbarEquipamentos";

//columns
import { UseEquipamentosColumns } from "./ColumnsDataGridEquipamentos";

//hooks
import { useEquipamento } from "@/hooks/manutencao/Equipamento/useEquipamento";
import { usePermissao } from '@/hooks/auth/usePermissao';

import { ACESSOS } from '@/constants/acessos';
```

Regras práticas:
- Um comentário por **categoria**, não por import individual.
- `import type { ... }` sempre que for só tipo (`@typescript-eslint/consistent-type-imports`
  é `error` no projeto).
- Path alias `@/...` para tudo fora da própria feature; import relativo (`./`, `../`)
  só dentro da mesma pasta de feature.

---

## 3. Estrutura de pastas por feature

Cada tela do módulo segue o mesmo esqueleto (`src/views/manutencao/<Feature>/`):

```
Equipamentos/
├── index.tsx                          # view: orquestra hook + componentes visuais
├── ColumnsDataGridEquipamentos.tsx     # definição das colunas do DataGrid, separado
├── Types/
│   └── TypesEquipamentos.ts           # props dos componentes DESSA feature
├── components/
│   ├── AllModalEquipamentos.tsx       # agregador: decide qual modal renderizar
│   ├── ModalEquipamento.tsx           # modal de criar/editar (form)
│   ├── ModalEquipamentoForm.tsx       # só os campos do formulário
│   ├── ModalAlterarStatusEquipamento.tsx
│   ├── ModalRemoverEquipamento.tsx
│   ├── ConfirmEquipamentosFormModal.tsx
│   ├── CustomToolbarEquipamentos.tsx  # toolbar do grid (filtros, botão criar)
│   └── styles/
│       └── CadastroEquipamentoModal.styles.ts
└── __tests__/
    └── Equipamento.test.tsx
```

Espelhando a view, existe um hook dedicado fora de `views/`:

```
src/hooks/manutencao/Equipamento/
├── useEquipamento.ts                  # estado da tela (grid, filtros, modais)
└── modalEquipamento/
    └── useModalEquipamento.ts         # estado só do modal (form deps, submit)
```

E os tipos de domínio (reutilizáveis por qualquer feature que fale de
"Equipamento") ficam centralizados fora de `views/`:

```
src/types/manutencao/Equipamentos/TypesEquipamentos.ts
src/services/manutencao/Equipamentos/equipamentos.ts
```

**Regra geral:** telas simples (grid + CRUD) usam 1 hook (`useX`). Telas maiores
(ex.: Detalhes da OS, Plano de Manutenção) quebram em **um hook por sub-seção**
(`useChecklistOSSection`, `useControleTempoOSManutencao`, `useHistoricoOS`,
`useGerenciarStatusOS`...) em vez de um hook gigante fazendo tudo.

---

## 4. View (`index.tsx`): só orquestra, não tem lógica

A view nunca faz fetch nem guarda estado de negócio — ela só chama o hook e
distribui os valores para os componentes visuais.

```tsx
const Equipamentos = () => {
    const { podeAlterar } = usePermissao(ACESSOS.MANUTENCAO_EQUIPAMENTOS);

    const {
        loading,

        equipamentosData,
        totalRegistros,
        paginationModel,
        setPaginationModel,

        openModalEquipamento,
        setOpenModalEquipamento,
        modeEquipamento,
        selectDataRow,
        handleOpenCreateEquipamento,
        handleOpenEditEquipamento,

        idEquipamentoAlterarStatus,
        openModalAtualizarStatusEquipamento,
        handleOpenAtualizarStatusEquipamento,
        handleCloseAlterarStatusModal,
        // ...
    } = useEquipamento();

    return (
        <>
            <Loading loading={loading} />
            <DataGrid rows={equipamentosData} columns={columns} /* ... */ />
            <AllModalEquipamentos /* props */ />
        </>
    );
}
```

Note a desestruturação do hook **agrupada em blocos por linha em branco**, na
mesma ordem em que o hook os retorna: dados do grid → filtros → estado do modal
de criar/editar → estado do modal de status → estado do modal de remover. Isso
espelha o `return` do hook (ver seção 5) e facilita achar onde cada coisa vem.

---

## 5. Hook de tela: estado de servidor separado de estado de UI

O hook de uma feature (`useX.ts`) concentra **tudo** que a view precisa, mas
internamente separa com comentários curtos:

1. **Estado de servidor** — sempre via `useQuery` (React Query), nunca
   `useState` + `useEffect` manual para buscar dado de API.
2. **Estado de UI** — `useState` para modais abertos, linha selecionada, modo
   create/edit, filtros digitados, paginação.
3. **Handlers** — funções `handleX`/`onX`, memorizadas com `useCallback` quando
   passadas para baixo ou usadas em dependências.

```ts
export const useEquipamento = () => {
  const token = useSelector((state: RootState) => state.auth.token)
  const smartInvalidate = useSmartInvalidate()

  //modais
  const [openModalEquipamento, setOpenModalEquipamento] = useState<boolean>(false)

  //estado para definir se é criação ou edição
  const [modeEquipamento, setModeEquipamento] = useState<'create' | 'edit'>('create')
  const [selectDataRow, setSelectDataRow] = useState<Equipamento | null>(null)

  //filter
  const [codigoExternoOuNomeFilterTerm, setCodigoExternoOuNomeFilterTerm] = useState<string | undefined>(undefined)
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined)

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ---- estado de servidor: fica isolado numa única useQuery ----
  const equipamentosQuery = useQuery({
    queryKey: ['equipamentos', paginationModel.page, paginationModel.pageSize, codigoExternoOuNomeFilterTerm, statusFilter],
    queryFn: () => BuscarEquipamentos({
      pagina: paginationModel.page + 1,
      tamanhoPagina: paginationModel.pageSize,
      status: statusFilter,
      codigoExternoOuNome: codigoExternoOuNomeFilterTerm
    }),
    enabled: !!token,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: false,
    meta: { errorMessage: 'Erro ao buscar equipamentos' },
    select: (data): { itens: Equipamento[]; total: number } => ({
      itens: data?.dados?.itens ?? [],
      total: data?.dados?.total ?? 0
    })
  })

  // dados "achatados" derivados da query — a view nunca acessa .data direto
  const loading = equipamentosQuery.isLoading
  const equipamentosData = equipamentosQuery.data?.itens ?? []
  const totalRegistros = equipamentosQuery.data?.total ?? 0

  const handleOpenEditEquipamento = (row: Equipamento) => {
    setModeEquipamento('edit')
    setSelectDataRow(row)
    setOpenModalEquipamento(true)
  }

  // ... demais handlers

  return {
    loading,

    equipamentosData,
    totalRegistros,
    paginationModel,
    setPaginationModel,

    openModalEquipamento,
    setOpenModalEquipamento,
    modeEquipamento,
    selectDataRow,
    handleOpenCreateEquipamento,
    handleOpenEditEquipamento,

    // ... resto agrupado por assunto, na mesma ordem declarada acima
  }
}
```

Padrões-chave a replicar:
- **Nunca** `axios`/`fetch` direto dentro da view ou do hook — sempre via função
  de `services/` chamada dentro de `queryFn`/`mutationFn`.
- `select` do `useQuery` já devolve a forma "pronta pro componente" (`itens`,
  `total`), a view não sabe nada sobre o envelope de resposta da API
  (`data?.dados?.itens`).
- Invalidação de cache centralizada num hook compartilhado (`useSmartInvalidate`)
  em vez de repetir `queryClient.invalidateQueries` em cada tela.
- `return` do hook agrupado nos mesmos blocos lógicos da declaração dos estados
  (grid/dados, filtros, modal A, modal B, modal C...), sempre com linha em
  branco entre blocos — nunca uma lista plana sem separação.
- Em telas com mais de ~1 responsabilidade grande, quebrar em hooks menores
  (`useModalEquipamento` para o hook do modal, separado de `useEquipamento` para
  o hook da listagem) em vez de um hook único fazendo tudo.

---

## 6. Interfaces e types: local vs global, e por quê

Existem **dois lugares** para tipos, e a escolha não é aleatória:

### a) Tipo de domínio + schema de validação → `src/types/<modulo>/<Entidade>/`
Fica aqui tudo que representa a **entidade de negócio** e pode ser reaproveitado
por mais de uma tela (o formato que vem da API, o schema Zod do formulário e o
tipo inferido do formulário ficam juntos no mesmo arquivo):

```ts
//zod
import { z } from 'zod'

export interface Equipamento {
  codigo: number
  codigoExterno: string
  nome: string
  // ...
}

export const equipamentoSchema = z.object({
  nome: z.string().min(1, 'O Nome é obrigatório').min(3, 'O Nome deve ter no mínimo 3 caracteres'),
  tipoEquipamento: z.string().min(1, 'Selecione um Tipo'),
  // ...
})

export type EquipamentoForm = z.infer<typeof equipamentoSchema>
```

### b) Props de componente da tela → `src/views/<modulo>/<Feature>/Types/`
Fica aqui o que só existe **naquela tela específica** — props de modal, de
toolbar, de colunas do grid. Nunca inline dentro do `.tsx` quando a interface é
usada por props de componente (ajuda a view a ficar enxuta e o tipo a ser
reaproveitado por quem for testar/mocar o componente):

```ts
import type { Equipamento, EquipamentoForm, EquipamentoIntegracaoField } from '@/types/manutencao/Equipamentos/TypesEquipamentos'

export interface CustomToolbarEquipamentosProps {
  isMobile: boolean
  handleOpenCreateEquipamento: () => void
  codigoExternoOuNomeFilterTerm: string | undefined
  setCodigoExternoOuNomeFilterTerm: (term: string) => void
  onFilterEquipamentos: (codigoExternoOuNomeFilter?: string, statusFilter?: string) => void
  onClearFilters: () => void
}

export interface ModalEquipamentoProps {
  open: boolean
  onClose: () => void
  mode: 'create' | 'edit'
  dataRow?: Equipamento
}

interface BaseEquipamentoModalProps {
  open: boolean
  onClose: () => void
  idEquipamento: number | null
}

export interface ModalAlterarStatusEquipamentoProps extends BaseEquipamentoModalProps {}
export interface ModalRemoverEquipamentoProps extends BaseEquipamentoModalProps {}
```

Regra prática: **se a interface descreve props de um componente React, ela vai
para `types/` (local da feature) e é importada — nunca declarada dentro do
próprio `.tsx` do componente.** Interfaces só ficam inline quando são
estritamente internas a uma função (ex.: shape de um parâmetro auxiliar), e
mesmo assim é raro no projeto.

Quando duas interfaces compartilham campos (`open`, `onClose`), extrai-se uma
`Base...Props` e as outras usam `extends`, em vez de repetir os campos.

---

## 7. Componentização de modais e formulários

- **Agregador de modais**: cada feature com vários modais (criar/editar, alterar
  status, remover, confirmação) tem um componente `AllModalsX.tsx` que só decide
  *qual* modal está aberto e repassa props — a view importa só esse agregador,
  não cada modal individualmente.
- **Form separado da casca do modal**: `ModalEquipamento.tsx` cuida de
  abrir/fechar, `react-hook-form` e submit; os campos em si ficam em
  `ModalEquipamentoForm.tsx`, que recebe `register`/`control`/`errors` via props
  (tipadas em `ModalEquipamentoFormProps`). Isso deixa o form reutilizável/testável
  isolado da orquestração do modal.
- **Validação sempre via Zod + `react-hook-form`**, usando o hook compartilhado
  `useFormWithSchema<TForm>({ schema, defaultValues })` em vez de configurar
  `useForm` + `zodResolver` manualmente em cada tela.
- **Estilos do modal** ficam em `components/styles/X.styles.ts` usando
  `styled()` do MUI, nunca `sx` inline repetido — só `sx` pontual para ajustes
  únicos daquele elemento.

---

## 8. Camada de serviço (`services/`): só HTTP, sem regra de UI

```ts
export const BuscarEquipamentos = async ({ pagina = 1, tamanhoPagina = 10, status, codigoExternoOuNome }: BuscarEquipamentosParams) => {
  const response = await apiLocalGI.get(manutencaoApi.listarEquipamentos, {
    params: { Page: pagina, Pagesize: tamanhoPagina, Ativo: status, CodigoExternoOuNome: codigoExternoOuNome }
  })

  return response.data
}
```

- Uma função por endpoint, nome no padrão `VerboEntidade` (`BuscarX`, `CriarX`,
  `AtualizarX`, `DeletarX`) — verbo em português, PascalCase.
- Sempre retorna `response.data` cru; quem decide o "shape" final para a UI é o
  `select` do `useQuery` no hook, não o service.
- URLs/rotas vêm de um arquivo de config (`configs/manutecaoApi`), nunca
  hardcoded na função.
- Validações que dependem de contexto de usuário (ex.: `validateCodUser`) ficam
  no service, perto do payload que elas protegem — não espalhadas pela view.

---

## 9. Nomenclatura

- Componentes: `PascalCase` (`ModalEquipamento`, `CustomToolbarEquipamentos`).
- Hooks: `useAlgumaCoisa`, sempre prefixo `use`.
- Handlers: `handleX` (ação local) vs `onX` (prop recebida de fora / callback
  repassado) — a view usa `handleOpenEditEquipamento` internamente e repassa
  como `onEdit` para o componente de colunas, por exemplo.
- Estados booleanos de modal: `openModalX` / `setOpenModalX`.
- Nomes de domínio em português, alinhados ao vocabulário do negócio
  (`Equipamento`, `PlanoManutencao`, `codigoExterno`), mesmo em código — não se
  traduz para inglês "genérico".
- Arquivo de colunas de grid sempre separado: `ColumnsDataGridX.tsx`, exportando
  um hook/factory `UseXColumns({ onEdit, onDelete, ... })`.

---

## 10. Checklist rápido para aplicar isso em outro projeto

Ao pedir para uma IA refatorar uma tela seguindo este padrão, peça explicitamente:

- [ ] Imports agrupados por categoria com comentário curto (`//react`, `//mui`,
      `//hooks`, `//types`, `//api`...) e linha em branco entre grupos.
- [ ] `import type` para tudo que é só tipo.
- [ ] Um hook por tela/sub-seção (`useX.ts`) concentrando estado de servidor
      (`useQuery`/`useMutation`) e estado de UI (`useState`), com os dois
      claramente separados por comentário.
- [ ] `select` do `useQuery` devolvendo já o formato que a UI consome — view
      nunca acessa envelope cru da API.
- [ ] Props de componente em `interface` própria, em arquivo `types/` da
      feature — nunca tipo inline dentro do `.tsx` do componente.
- [ ] Tipo de domínio + schema de validação (Zod) juntos, em `types/<modulo>/<entidade>/`,
      reaproveitável por qualquer tela que fale daquela entidade.
- [ ] Chamada HTTP isolada em `services/`, uma função por endpoint, sem lógica
      de UI nem de estado.
- [ ] Modais quebrados em componentes pequenos + um agregador `AllModalsX` que
      decide qual está aberto.
- [ ] Estilos MUI via `styled()` em arquivo `styles/X.styles.ts` colocado perto
      do componente, não inline repetido.
- [ ] `return` do hook e desestruturação na view sempre agrupados em blocos por
      assunto, com linha em branco entre blocos, na mesma ordem dos dois lados.
- [ ] Sem `;` no fim das linhas, aspas simples, sem vírgula final — se o outro
      projeto já tiver Prettier próprio, adaptar para a config dele em vez de
      forçar esta.
