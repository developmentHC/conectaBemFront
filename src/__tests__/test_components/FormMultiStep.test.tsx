import { render, screen, fireEvent } from '@testing-library/react';
import { FormMultiStep } from '../../components/FormMultiStep';

describe('FormMultiStep', () => {
  it('renders the component with steps and navigates through them', () => {
    render(
      <>
        <FormMultiStep.Description>Teste</FormMultiStep.Description>
        <FormMultiStep.Title>Title</FormMultiStep.Title>
        <FormMultiStep.Progress progress={30} />
        <FormMultiStep.Header />
        <FormMultiStep.BackStepButton data-testid="back-btn" />
        <FormMultiStep.NeedHelpButton data-testid="help-btn" />
      </>
    );

    expect(screen.getByText('Teste')).toBeInTheDocument();
    expect(screen.getByTestId('back-btn')).toBeInTheDocument();
    expect(screen.getByTestId('help-btn')).toBeInTheDocument();
    expect(screen.getByTestId('progress')).toBeInTheDocument();
  });

  describe('BackStepButton', () => {
    it('renders the IconButton with the arrow icon', () => {
      render(<FormMultiStep.BackStepButton data-testid="back-btn" />);
      const button = screen.getByTestId('back-btn');
      expect(button).toBeInTheDocument();
      expect(button.querySelector('svg')).toBeInTheDocument();
    });

    it('passes props to IconButton', () => {
      render(
        <FormMultiStep.BackStepButton
          data-testid="back-btn"
          disabled
          aria-label="Voltar"
        />
      );
      const button = screen.getByTestId('back-btn');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-label', 'Voltar');
    });

    it('handles onClick event', () => {
      const handleClick = jest.fn();
      render(<FormMultiStep.BackStepButton data-testid="back-btn" onClick={handleClick} />);
      const button = screen.getByTestId('back-btn');
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Description', () => {
    it('renders children correctly', () => {
      render(<FormMultiStep.Description>Texto de teste</FormMultiStep.Description>);
      expect(screen.getByText('Texto de teste')).toBeInTheDocument();
    });

    it('applies custom className along with default', () => {
      render(<FormMultiStep.Description className="custom-class">Teste classe</FormMultiStep.Description>);
      const p = screen.getByText('Teste classe');
      expect(p).toHaveClass('text-gray-600');
      expect(p).toHaveClass('custom-class');
    });
  });

  describe('NeedHelpButton', () => {
    it('renders the icon correctly', () => {
      render(<FormMultiStep.NeedHelpButton data-testid="help-btn" />);
      const button = screen.getByTestId('help-btn');
      expect(button).toBeInTheDocument();
      expect(button.querySelector('svg')).toBeInTheDocument();
    });

    it('renders children when provided', () => {
      render(<FormMultiStep.NeedHelpButton data-testid="help-btn">Ajuda extra</FormMultiStep.NeedHelpButton>);
      expect(screen.getByText('Ajuda extra')).toBeInTheDocument();
      expect(screen.queryByText('Precisa de ajuda?')).not.toBeInTheDocument();
    });

    it('renders default text when no children provided', () => {
      render(<FormMultiStep.NeedHelpButton data-testid="help-btn" />);
      expect(screen.getByText('Precisa de ajuda?')).toBeInTheDocument();
    });

    it('passes props and handles click', () => {
      const handleClick = jest.fn();
      render(<FormMultiStep.NeedHelpButton data-testid="help-btn" onClick={handleClick} />);
      const button = screen.getByTestId('help-btn');
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Progress', () => {
    it('renders the LinearProgress with correct value', () => {
      render(<FormMultiStep.Progress progress={50} />);
      const progressBar = screen.getByTestId('progress');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    });

    it('accepts additional props', () => {
      render(<FormMultiStep.Progress progress={75} color="secondary" />);
      const progressBar = screen.getByTestId('progress');
      expect(progressBar).toHaveAttribute('aria-valuenow', '75');
      expect(progressBar).toHaveClass('MuiLinearProgress-colorSecondary');
    });
  });
});
