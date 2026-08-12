import { useEffect, useState } from "react";
import Header from "./Componentes/Header"
import FormProduto from "./Componentes/FormProduto";
import ListaProduto from "./Componentes/ListaProduto";

export default function App(){
  const [produtos, setProdutos] = useState([]);
  const [mensagem, setMensagem] = useState("");

  //BUSCA OS PRODUTOS QUANDO A APLICAÇÃO É CARREGADA
  async function carregarProduto(){
    try {
      const resposta = await fetch("/api/produtos");
      const dados = await resposta.json();
      setProdutos(dados);
    }catch{
      setMensagem("Não foi possível carregar os produtos.");
    }
  }
  useEffect(() =>{
    carregarProduto();
  }, []);

  async function cadastrarProduto(produto){
    setMensagem("");

    try{
      const resposta = await fetch("/api/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
      });

      if (!resposta.ok){
        const erro = await resposta.json();
        setMensagem(erro.mensagem);
        return;
      }

      const NovoProduto = await resposta.json();

      //ATUALIZA O ESTADO SEM PRECISAR RECARREGAR A PÁGINA.
      setProdutos((produtosAtuais) => [...produtosAtuais, NovoProduto]);
      setMensagem("Produto cadastrado com sucesso");
    }catch{
      setMensagem("Não foi possivel cadastrar o produto");
    }
  }

  return(
   <>
     <Header />
      <main className="container">
        <FormProduto aoCadastrar={cadastrarProduto} />

          {mensagem &&  <p className="mensagem">{mensagem}</p> }

          <ListaProduto produtos={produtos} />

      </main>
     </>
  );
}