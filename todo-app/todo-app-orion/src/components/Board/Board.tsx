import ListaDeTarefas from '../ListaDeTarefas/ListaDeTarefas';
import Footer from "../Footer/Footer";
import listas from '../../data/listas_tarefa.json'

const Board = () => {
    type Lista = {
        titulo: string;
        exibirBotaoCriarTarefas: boolean;
        corDeFundo: string;
    };

    return (
        <>
            <div className="bg-white min-h-screen">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <h1 className="text-black font-bold text-2xl sm:text-3xl md:text-4xl" data-cy="board-title">Board</h1>
                    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6" data-cy="board-main-content">
                        {(listas as Lista[]).map((lista, index) => (
                            <ListaDeTarefas
                                key={index}
                                titulo={lista.titulo}
                                exibirBotaoCriarTarefas={lista.exibirBotaoCriarTarefas}
                                corDeFundo={lista.corDeFundo}
                            />
                        ))}
                    </main>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Board;