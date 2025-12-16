## Guia de Instalação

### Pré-requisitos:

- Node.js
- npm ou yarn (gerenciador de pacotes)
- Git

### Passos:

1. Clonar o repositório: `git clone https://github.com/developmentHC/conectaBemFront.git`
2. Entrar na pasta do projeto: `cd conectaBemFront`
3. Instalar as dependências do projeto: `npm install`
4. Configure as variáveis de ambiente: Crie um arquivo chamado `.env` na raiz do projeto. Ele guardará chaves de acesso a serviços externos.
5. Iniciar o servidor de desenvolvimento: `npm run dev`

## Tecnologias Principais

Essas são as principais tecnologias que você encontrará no Projeto:

- **Next.js:** A principal estrutura (framework) do projeto, usada para construir a interface de usuário com React. A versão utilizada é a 15.
- **React:** A biblioteca para construir as interfaces e componentes visuais.
- **TypeScript:** Uma extensão do JavaScript que adiciona tipagem estática, ajudando a evitar erros e a melhorar a organização do código.
- **Tailwind CSS:** Um framework de estilização CSS que permite criar layouts de forma rápida e customizada diretamente no HTML.
- **Material-UI (MUI):** Uma biblioteca de componentes React prontos para uso, que ajuda a construir uma interface bonita e consistente.
- **Prismic:** Um "Headless CMS" (Sistema de Gerenciamento de Conteúdo) usado para gerenciar o conteúdo do site, como textos e imagens, de forma independente do código.
- **React Query:** Usado para buscar, armazenar em cache e atualizar dados vindos da API, simplificando o gerenciamento de estado do servidor.
- **Zustand:** Uma biblioteca leve para gerenciar o estado global da aplicação (como informações do usuário logado).
- **Jest e React Testing Library:** Ferramentas para escrever e rodar testes automatizados para garantir que os componentes funcionem como esperado.
- **Storybook:** Uma ferramenta para desenvolver e visualizar componentes de UI de forma isolada, facilitando a criação e o teste.

## Estrutura de Pastas

A organização do código (dentro da pasta `src`) segue a estrutura:

- `src/app/`: Contém as páginas e rotas da aplicação, seguindo o padrão do App Router do Next.js.
    - `auth/`: Pasta com as páginas relacionadas à autenticação (login, registro, confirmação de código).
    - `api/`: [Não utilizada].
- `src/components/`: Componentes React reutilizáveis, como o `Header`.
- `src/features/`: Módulos de funcionalidades específicas. A funcionalidade de `auth` (autenticação), por exemplo, tem seus próprios componentes e hooks.
- `src/libs/`: Configuração de serviços externos como a API (`api.ts`) e o cliente do Prismic CMS (`prismic.ts`).
- `src/providers/`: Provedores de contexto do React, como o `MuiThemeProvider` para o tema do Material-UI e o `ReactQueryClientProvider`.
- `src/stores/`: Lógica de gerenciamento de estado com Zustand, como o `useEmailStore` para guardar o e-mail do usuário durante o fluxo de login.
- `public/`: Pasta para arquivos estáticos como imagens e ícones.
