import { collection, getDocs, addDoc, doc, deleteDoc  } from 'firebase/firestore';
import { db } from './firebase/config.js';
import { useEffect, useState, useRaf } from 'react';
export default App;

function App() {
  const [listaTarefa, setListaTarefa] = useState([]);
  const [tarefaInput, setTarefaInput] = useState('');
  const [abrirEditarId, setAbrirEditarId] = useState(null)
  const [inputEditar, setInputEditar] = useState(null)
 
  async function buscarTarefas() {
    const querySnapshot = await getDocs(collection(db, 'tarefas'));
    let lista = [];

    querySnapshot.forEach((doc) => {
      const item= {
        id: doc.id,
        ...doc.data(),
      }
      lista.push(item);
    });

    setListaTarefa(lista);
  }
  function editarTarefa(tarefaId){}

  function abrirEditar(tarefa){
    if (tarefa.id != abrirEditarId){
      setAbrirEditarId(tarefa.id)
    }else{
      setAbrirEditarId(null)
    }
  }

  async function apagarItem(tarefa){
    await deleteDoc(doc(db, "tarefas", tarefa.id));
  }

  async function salvarTarefa() {
    if (tarefaInput.trim() === '') {
      alert('seu burro num tem nada escrevido');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'tarefas'), {
        nome: tarefaInput,
      });
      setTarefaInput('');
      console.log('Id da tarefa', docRef.id);
    } catch (e) {
      console.error('Erro ao adiciona tarefa: ', e);
    }
  }

  useEffect(() => {
    buscarTarefas();
  });

  return (
    <>
      <h1>Lista tarefa</h1>
      <div>
        <label htmlFor="addTarefa">Adicionar Tarefa</label>
        <br />
        <input
          type="txt"
          id="addTarefa"
          value={tarefaInput}
          onChange={(e) => {
            setTarefaInput(e.target.value);
          }}
        />
        <button onClick={salvarTarefa}>Adicionar</button>
      </div>
      <ul>
        {listaTarefa.map((tarefa, index) => (
          <li key={index}>{tarefa.nome}{' '} 
          { tarefa.id == abrirEditarId ?
            <div>
              <input type="text"  value={tarefa.nome} onChange={(e)=>{setInputValue(e.target.value)}} />
              <button onClick={() => {editarTarefa(tarefa.id)}}>Salvar</button>
            </div> : <></>
          }
          <button onClick={() => abrirEditar(tarefa)}>e</button>
          <button onClick={() => apagarItem(tarefa)}>x</button>
          </li>
        ))}
      </ul>
    </>
  );
}

