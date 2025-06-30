import React, { useState } from 'react';
import tarefasJson from '../../data/dados.json';

interface ListaDeTarefasProps {
  titulo: string;
  exibirBotaoCriarTarefas?: boolean;
  corDeFundo?: string;
  tarefas?: TarefaData[]
}

interface TarefaData {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  status: 'A fazer' | 'Em Andamento' | 'Em Revisão' | 'Concluído';
}

const ListaDeTarefas: React.FC<ListaDeTarefasProps> = ({
  titulo,
  exibirBotaoCriarTarefas = true,
  corDeFundo
}) => {
  
const [tarefas, setTarefas] = useState<TarefaData[]>(
    tarefasJson.todos.map((tarefa: string) => ({
      ...tarefa,
      status: tarefa.completed ? 'Concluído' : 'A fazer' // Conversão inicial
    }))
  );

  const corDoBotao = (titulo: string): string => {
    switch (titulo) {
      case "A fazer":
        return "bg-pink-400 hover:bg-pink-500";
      case "Em Andamento":
        return "bg-yellow-400 hover:bg-yellow-500 text-black";
      case "Em Revisão":
        return "bg-blue-400 hover:bg-blue-500";
      case "Concluído":
        return "bg-green-500 hover:bg-green-700";
      default:
        return "bg-gray-400 hover:bg-gray-500";
    }
  };

  // Agora filtra com base no status
  const tarefasFiltradas: TarefaData[] = tarefas.filter(
    tarefa => tarefa.status === titulo
  );

  const handleCriarTarefa = () => {
    const nomeTarefa = prompt("Insira o nome da nova tarefa:");
    if (nomeTarefa && nomeTarefa.trim() !== "") {
      const novaTarefa: TarefaData = {
        id: tarefas.length ? Math.max(...tarefas.map(t => t.id)) + 1 : 1,
        title: nomeTarefa.trim(),
        description: '',
        completed: titulo === "Concluído",
        status: titulo as TarefaData["status"],
      };
      setTarefas(prev => [...prev, novaTarefa]);
    } else {
      alert("Por favor, insira um nome válido para a tarefa.");
    }
  };

  const handleEditarTarefa = (id: number) => {
    const novoTitulo = prompt("Edite o nome da tarefa:");
    if (novoTitulo && novoTitulo.trim() !== "") {
      setTarefas(prev =>
        prev.map(tarefa =>
          tarefa.id === id ? { ...tarefa, title: novoTitulo.trim() } : tarefa
        )
      );
    }
  };

  const handleExcluirTarefa = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
      setTarefas(prev => prev.filter(t => t.id !== id));
    }
  };

  return (
    <div className={`rounded-lg p-4 shadow-md ${corDeFundo}`}>
      <h2 className="text-lg font-semibold mb-4">{titulo}</h2>

      <ul className="space-y-2 mb-4">
        {tarefasFiltradas.length > 0 ? (
          tarefasFiltradas.map(tarefa => (
            <li
              key={tarefa.id}
              className="bg-gray-100 p-3 rounded shadow-sm flex justify-between items-start gap-3"
            >
              <div>
                <h3 className="font-semibold">{tarefa.title}</h3>
                <p className="text-sm text-gray-700">{tarefa.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditarTarefa(tarefa.id)}
                  className="text-blue-500 hover:underline text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleExcluirTarefa(tarefa.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-400 italic">Nenhuma tarefa encontrada.</li>
        )}
      </ul>

      {exibirBotaoCriarTarefas && (
        <button
          onClick={handleCriarTarefa}
          className={`
            px-4 py-2 text-sm font-medium text-white 
            shadow-md rounded transition duration-200 ease-in-out
            ${corDoBotao(titulo)}
          `}
        >
          + Criar nova tarefa
        </button>
      )}
    </div>
  );
};

export default ListaDeTarefas;