# Guia para Criação de Testes Automatizados

Este guia tem como objetivo orientar desenvolvedores a criar testes automatizados padronizados para o projeto, garantindo qualidade, legibilidade e manutenção do código.

---

## 1. Estrutura dos Testes

- Todos os testes devem ficar na pasta `src/__tests__`.
- Separe os testes por tipo:
  - **test_components**: para componentes isolados.
  - **test_pages**: para páginas completas.
  - **test_features**: para funcionalidades específicas.

---

## 2. Ferramentas Utilizadas

- **Jest**: framework de testes.
- **@testing-library/react**: para renderização e interação com componentes React.
- **@testing-library/jest-dom**: para matchers customizados (ex: `toBeInTheDocument`).

---

## 3. Boas Práticas

- **Nomeie os arquivos** de teste com o mesmo nome do componente/página seguido de `.test.tsx`.
- **Descreva** o que está sendo testado usando `describe` e `it`/`test`.
- **Prefira testes de comportamento** (o que o usuário vê/faz) ao invés de implementação interna.
- **Utilize mocks** para dependências externas (API, hooks, navegação, etc).
- **Evite testar detalhes de implementação** que podem mudar facilmente.

---

## 4. O que deve ser testado

- **Renderização**: O componente/página renderiza corretamente?
- **Interações**: Botões, inputs, menus, navegação, etc.
- **Fluxos principais**: O usuário consegue completar as ações esperadas?
- **Mensagens e feedbacks**: Mensagens de erro, sucesso, carregamento, etc.
- **Acessibilidade**: Labels, roles, placeholders, etc.

---

## 5. Exemplo de Teste Padrão

````tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { MeuComponente } from '@/components/MeuComponente'

describe('MeuComponente', () => {
  it('renderiza o título corretamente', () => {
    render(<MeuComponente />)
    expect(screen.getByText('Título do Componente')).toBeInTheDocument()
  })

  it('chama a função ao clicar no botão', () => {
    const onClickMock = jest.fn()
    render(<MeuComponente onClick={onClickMock} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClickMock).toHaveBeenCalled()
  })
})
````

## 6. Como rodar os testes

Para rodar todos os testes do projeto, utilize o comando:

```bash
yarn test
```

ou

```bash
npm run test
```

Para gerar o relatório de cobertura de testes, utilize:

```bash
yarn coverage
```

ou

```bash
npm run coverage
```