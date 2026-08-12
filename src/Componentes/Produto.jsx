export default function Produto ({ produto}){
  
    return(

        <article>

         <h2>{produto.nome}</h2>
         <p>{produto.descricao}</p>


            <strong>
            R$ {Number(produto.preco).toFixed(2).replace(".", ".")}

            </strong>

        </article>


    )



}