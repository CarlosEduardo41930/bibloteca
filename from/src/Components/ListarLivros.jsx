function ListarLivros(){
    return(<>
    <div className="bg-amber-400">
        
    <div>
        <h1>DASHBOARD DO BIBLIOTECÁRIO</h1>
    </div>
    <div>
        <h2>Acervo de Livros</h2>
        <p>Livros Cadastrados</p>
        <table>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Ano</th>
                    <th>Status</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Clean Code</td>
                    <td>Robert Martin</td>
                    <td>2008</td>
                    <td>Disponível</td>
                    <td>EMPRSTAR</td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
    </>)
}
export default ListarLivros