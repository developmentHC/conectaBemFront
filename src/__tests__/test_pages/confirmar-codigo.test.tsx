import ConfirmCode from '@/app/(auth)/auth/confirmar-codigo/page'
import {render, screen, fireEvent} from '@testing-library/react'
import toast from 'react-hot-toast';

// Mock do toast
jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
}));

// Mock dos componentes filhos
jest.mock('@/features/auth/components/CodeForm/CodeForm', () => ({
  CodeForm: ({ onValidationSuccess }: any) => (
    <>
      <button onClick={() => onValidationSuccess(200)}>Simular Sucesso 200</button>
      <button onClick={() => onValidationSuccess(201)}>Simular Sucesso 201</button>
    </>
  ),
}));

jest.mock('@/features/auth/components/CodeForm/TitleCode', () => ({
  TitleCode: () => <h1>Confirme seu código</h1>,
}));

jest.mock('@/features/auth/components/SuccessScreen/SuccessScreen', () => ({
  SuccessScreen: ({ title, message, redirectUrl }: any) => (
    <div>
      <h2>{title}</h2>
      <p>{message}</p>
      <span>{redirectUrl}</span>
    </div>
  ),
}));

describe('Confirmar Código Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        document.body.className = '';
    });

    it('renders the Confirmar Código page with title', () => {
        render(<ConfirmCode/>)
        expect(screen.getByText('Confirme seu código')).toBeInTheDocument();
        expect(screen.getByText('Mudar método')).toBeInTheDocument();
    })

    it('calls toast error when clicking "Mudar método"', () => {
        render(<ConfirmCode />);
        const button = screen.getByText('Mudar método');
        fireEvent.click(button);
        expect(toast.error).toHaveBeenCalledWith('Outros métodos de acesso não implementados!');
    });

    it('shows SuccessScreen after validation success with 200', () => {
        render(<ConfirmCode />);
        const simulateButton = screen.getByText('Simular Sucesso 200');

        // Antes de clicar
        expect(screen.queryByText('Código validado com sucesso!')).not.toBeInTheDocument();

        // Simula sucesso
        fireEvent.click(simulateButton);

        // Depois de clicar, SuccessScreen aparece
        expect(screen.getByText('Código validado com sucesso!')).toBeInTheDocument();
        expect(document.body.classList.contains('fullscreen-active')).toBe(true);
        expect(screen.getByText('/')).toBeInTheDocument(); // redirectUrl
    });

    it('shows SuccessScreen after validation success with 201', () => {
        render(<ConfirmCode />);
        const simulateButton201 = screen.getByText('Simular Sucesso 201');

        fireEvent.click(simulateButton201);

        expect(screen.getByText('Código validado com sucesso!')).toBeInTheDocument();
        expect(document.body.classList.contains('fullscreen-active')).toBe(true);
        expect(screen.getByText('/auth/registro')).toBeInTheDocument(); // redirectUrl = "/auth/registro"
    });

    it('removes fullscreen-active class on unmount', () => {
        const { unmount } = render(<ConfirmCode />);
        document.body.classList.add('fullscreen-active');
        unmount();
        expect(document.body.classList.contains('fullscreen-active')).toBe(false);
    });
})