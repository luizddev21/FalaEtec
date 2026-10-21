// Estrutura do formulário de resposta administrativa. As ações visuais ficam
// aqui; a tela que usa o componente controla quando a janela é exibida.
export default function ReplyModal() {
  return (
      <section className="reply-modal">
        <form className="type2">
          <div className="camp">
            <div className="input textarea">
              <textarea name="reply" id="reply" required></textarea>
              <label htmlFor="reply">Digite aqui a sua resposta</label>
            </div>
          </div>
          <div className="camp">
            <div className="input">
              <button className="danger">Cancelar</button>
            </div>
            <div className="input">
              <button className="default">Enviar</button>
            </div>
          </div>
        </form>
      </section>
  );
}
