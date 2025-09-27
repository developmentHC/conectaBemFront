# Cobertura de Testes Automatizados

Este projeto possui uma suíte de testes abrangente utilizando **Jest** e **Testing Library** para garantir a qualidade dos principais fluxos e componentes da aplicação. Abaixo está um resumo do que cada teste cobre:

## Testes de Componentes

- **Header**
  - Renderização do logo e navegação.
  - Exibição de menus conforme o tipo de usuário (paciente/profissional).
  - Funcionamento do menu mobile (abrir/fechar).
  - Botão de login e navegação para autenticação.
  - Submenus e interações de mouse.
  - Botão de voltar e busca.

- **Footer**
  - Renderização das seções e links principais do rodapé.

- **FormMultiStep**
  - Renderização dos passos, títulos, descrições e barra de progresso.
  - Funcionamento dos botões de navegação e ajuda.
  - Props customizadas e eventos de clique.

- **DropdownMenu**
  - Renderização do menu dropdown com itens filhos.

- **SearchInput**
  - Renderização do campo de busca com placeholder e ícone.

- **CodeInput**
  - Renderização dos campos de input para código.
  - Navegação automática entre campos.
  - Chamada do callback ao completar o código.
  - Formatação para aceitar apenas dígitos.
  - Exposição de métodos via ref.

- **SocialNetwork**
  - Renderização dos botões de login social (Google e Facebook).
  - Chamada correta das funções de autenticação ao clicar nos botões.

## Testes de Páginas

- **Auth**
  - Renderização da página de autenticação.
  - Fluxo de login com chamada à API e atualização do estado global.
  - Tratamento de erros da API.

- **Registro**
  - Renderização da página de registro.
  - Abertura de modal ao selecionar tipo de cadastro (paciente/profissional) e exibição dos textos corretos.

- **Registro Paciente**
  - Renderização da página e do formulário de cadastro de paciente.
  - Preenchimento dos campos e navegação entre etapas.
  - Exibição do progresso.

- **Registro Profissional**
  - Renderização da página de cadastro de profissional.

- **Confirmar Código**
  - Renderização da página de confirmação de código.
  - Simulação de sucesso e erro na validação do código.
  - Exibição de tela de sucesso e manipulação de classes no body.

- **Endereços**
  - Renderização da página de endereços.
  - Exibição de lista de endereços e informações detalhadas.

---

## Observações

- Os testes cobrem tanto renderização quanto interações do usuário.
- São utilizados mocks para dependências externas (ex: API, autenticação, hooks).
- O objetivo é garantir que os principais fluxos da aplicação estejam funcionando conforme esperado.