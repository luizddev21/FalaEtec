
export default function FilterBar({ orderBy = {}, type }) {
    return(
        <form className="filters type2">
          <div className="camp">
            <h3>Ordenar por</h3>
            <div className="input">
              <select name="orderBy" id="orderBy">
                <option value="nome">Nome</option>
                <option value="sala">Sala</option>
              </select>
            </div>
            <h3>Filtrar por:</h3>
            <div className="input">
              <select name="orderBy" id="orderBy">
                <option value="" disabled>Sala</option>
              </select>
            </div>
          </div>
        </form>
    );
}