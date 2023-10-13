import axios from 'axios'
import {useState} from 'react'
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {


const [search, setSearch] = useState("");
const [logradouro, setLogradouro] = useState("");
// const [complemento, setComplemento] = useState("");
const [bairro, setBairro] = useState("");
const [localidade, setLocalidade] = useState("");
const [uf, setUf] = useState("");
const [erro, setErr] = useState("");




const handleSearch = () => {
  if(search === "") { //verifica se o campo esta enviando uma string vazia e não deixa o usuario enviar a requisição
    notifyError();
  }

  axios.get(`https://viacep.com.br/ws/${search}/json/`)
    .then((success) => {
      if(success?.data?.erro &&  success?.data?.erro === true  )  { // verifica se o campo foi enviado com um cep invalido  || trata o retorno true enviado pela API
        return notifyCepInvalido();
      }
      
      if (success.status === 200) {
        notifySucess();
      }

      setLogradouro(success.data.logradouro);
      setBairro(success.data.bairro);
      setLocalidade(success.data.localidade);
      setUf(success.data.uf);
     
    })
    .catch((error) => {
      setErr(erro);
      setLogradouro("");
      setBairro("");
      setLocalidade("");
      setUf("");

      notifyStatus400();


    })
    
}

function limparFormulario(){
                                              
  setLogradouro('')
  setBairro('')
  setLocalidade('')
  setUf('')
  setSearch('')

}

function notifyError(){
  toast.error("O campo não pode ser enviado vazio")

}

// function notifyAlert(){
//   toast.warn("Numero de caracteres invalidos")

// }

function notifyCepInvalido(){
  toast.error("Digite um Cep Valido")

}

function notifyStatus400(){
  toast.error("Cep Invalido")

}

const notifySucess = () =>  {
  toast.success("Consulta realizada com sucesso", {
  className: 'custom-toast',

  
})
};

  return (
    <>
      <ToastContainer  position="top-center" bodyStyle={{width:'100vw'}} />
    <div className="container">
       <div className="item">
        <h1><b> Digite seu CEP </b></h1>
        <div className='conteudo'>
         <div className='input'>
            <div className='form'> 
              <input type="text"  id='Cep' placeholder="Digite um Cep" onChange={(e) => setSearch(e.target.value)} value={search} />
              <input type="text"  id='logradouro' placeholder="Logradouro" value={logradouro} readOnly/> 
              <input type="text"  id='bairro' placeholder="Bairro"  value={bairro} readOnly/> 
              <input type="text"  id='localidade' placeholder="Localidade"  value={localidade} readOnly/>
              <input type="text"  id='uf' placeholder="Uf" value={uf} readOnly/> 
              <button onClick={handleSearch}>Buscar</button>
              <button className='limpar' onClick={limparFormulario}>Limpar Dados</button>
            </div>
          </div> 
        </div>
       </div>
     </div>
     </>
  );
}

export default App;