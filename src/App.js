import axios from 'axios'
import {useState} from 'react'
import './App.css';



function App() {


const [search, setSearch] = useState("");
const [logradouro, setLogradouro] = useState("");
// const [complemento, setComplemento] = useState("");
const [bairro, setBairro] = useState("");
const [localidade, setLocalidade] = useState("");
const [uf, setUf] = useState("");
const [erro, setErr] = useState("");


const handleSearch = () => {
  if(search === "") { //verrifica se o campo esta enviando uma string vazia e não deixa o usuario enviar a requisição
    return alert("Informe um Cep Valido") 
  }
  axios.get(`https://viacep.com.br/ws/${search}/json/`)
    .then((success) => {
      if(success.data.erro === true) { // verifica se o campo foi enviado como nulo || trata o retorno true enviado pela API
        return alert("Informe um Cep Valido")
      }
      console.log("Executando SUCCESS", success);
      setLogradouro(success.data.logradouro);
      setBairro(success.data.bairro);
      setLocalidade(success.data.localidade);
      setUf(success.data.uf);
     
    })
    .catch((error) => {
      console.log("Executando CATCH", error.data);
      setErr(erro);
      setLogradouro("");
      setBairro("");
      setLocalidade("");
      setUf("");
    })
    .finally(() => {
      console.log("Executando FINALLY");
       setSearch("")
    });
}

function limparFormulario(){
                                                // Função para Limpar o campo
  document.getElementById('Cep').value=''; 
  document.getElementById('logradouro').value=''; 
  document.getElementById('bairro').value=''; 
  document.getElementById('localidade').value=''; 
  document.getElementById('bairro').value=''; 
  document.getElementById('uf').value=''; 
}


  return (

    <div className="container">
       <div className="item">
        <h1><b> Digite seu CEP </b></h1>
        <div className='conteudo'>
         <div className='input'>
            <div className='form'> 
              <input type="text"  id='Cep' placeholder="Digite um Cep" onChange={(e) => setSearch(e.target.value)} />
              <input type="text"  id='logradouro' placeholder="logradouro" value={logradouro} /> 
              <input type="text"  id='bairro' placeholder="bairro"  value={bairro} /> 
              <input type="text"  id='localidade' placeholder="localidade"  value={localidade}/>
              <input type="text"  id='uf' placeholder="uf" value={uf}/> 
              <button onClick={handleSearch}>Buscar</button>
              <button className='limpar' onClick={limparFormulario}>Limpar Dados</button>
            </div>
          </div> 
        </div>
       </div>
     </div>
  );
}

export default App;