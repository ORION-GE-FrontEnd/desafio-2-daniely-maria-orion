import { render, screen } from '@testing-library/react';
import Tarefa from '../components/Tarefa/Tarefa'

describe('Componente Tarefa', () => {
  test('renderiza input com placeholder dinâmico', () => {
    render(<Tarefa tituloPlaceholder="Digite o título" />);
    const input = screen.getByPlaceholderText('Digite o título');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  test('exibe a data de vencimento passada na prop', () => {
    render(<Tarefa dataDeVencimento="2025-06-30" />);
    const spanData = screen.getByText('2025-06-30');
    expect(spanData).toBeInTheDocument();
  });

  test('exibe a descrição da tarefa quando exibirDescricao for true', () => {
    render(<Tarefa exibirDescricao={true} />);
    const descricao = screen.getByText('Descrição da tarefa');
    expect(descricao).toBeInTheDocument();
  });

  test('não exibe a descrição da tarefa quando exibirDescricao for false', () => {
    render(<Tarefa exibirDescricao={false} />);
    const descricao = screen.queryByText('Descrição da tarefa');
    expect(descricao).not.toBeInTheDocument();
  });
});