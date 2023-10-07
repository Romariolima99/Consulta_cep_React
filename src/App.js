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

  return (

    <div className="container">
       <div className="item">
        <h1><b> Digite seu CEP </b></h1>
        <div className='conteudo'>
         <div className='input'>
         {/* <input type="text"  placeholder="Digite um Cep" onChange={(e) => setSearch(e.target.value)} /> */}

           {/* <p>{`Endereço : ${logradouro}`}</p>
            <p>{'Complemento = '+complemento}</p>
            { <p>{`Bairro : ${bairro}`}</p> }
            <p>{`Cidade : ${localidade}`}</p>
            <p>{`Unidade federativa : ${uf}`}</p> */}
            {/* <button onClick={handleSearch}>Buscar</button>  */}

            <div className='form'> 
              <input type="text"  placeholder="Digite um Cep" onChange={(e) => setSearch(e.target.value)} />
              <input type="text"  placeholder="logradouro" value={logradouro} /> 
              <input type="text"  placeholder="bairro"  value={bairro} /> 
              <input type="text"  placeholder="localidade"  value={localidade}/>
              <input type="text"  placeholder="uf" value={uf}/> 
              <button onClick={handleSearch}>Buscar</button>
            </div>
          </div>
            
        </div>
       </div>
     </div>




  );
}

export default App;