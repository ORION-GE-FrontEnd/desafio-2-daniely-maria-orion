import { render, screen } from '@testing-library/react'
import BotaoCriarTarefa from '../components/BotaoCriarTarefa/BotaoCriarTarefa'

test('renderiza o botão com o texto "Criar tarefa"', () => {
  render(<BotaoCriarTarefa onClick={() => {}} />);
  const botao = screen.getByRole('button', { name: /criar tarefa/i });
  expect(botao).toBeInTheDocument();
});

test('chama a função onClick ao clicar no botão', () => {
  const onClickMock = vi.fn();
  render(<BotaoCriarTarefa onClick={onClickMock} />);
});