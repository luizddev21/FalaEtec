import Screen from "../../components/Screen";
import { useEffect, useState } from "react";

export default function Solicitacao() {

  // Lógica de envio de formulário

  const [form, setForm] = useState({
    
  })

  return (
    <Screen>
      <section>
        <form action="" className="type2">
              <h2 className="title">Faça a sua solicitação!</h2>
              <div className="camp">
                <div className="input">
                  <input type="text" name="title" id="title" required />
                  <label htmlFor="title">O que você precisa?</label>
                </div>
              </div>
              <div className="camp">
                <div className="input">
                  <select name="local" id="local" defaultValue="" required>
                    <option value="" disabled>
                      Local
                    </option>
                    <option value="sala">Sala</option>
                    <option value="laboratorio">Laboratório</option>
                    <option value="biblioteca">Biblioteca</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>
              <div className="camp">
                <div className="input">
                  <input type="text" name="sub-local" id="sub-local" required />
                  <label htmlFor="title">Nos dê mais detalhes</label>
                </div>
              </div>
              <div className="camp">
                <div className="input textarea">
                  <textarea name="message" id="message" required></textarea>
                  <label htmlFor="message">Descrição detalhada...</label>
                </div>
              </div>
              <div className="camp">
                <div className="input image">
                  <input type="file" name="img" id="img" />
                  <label htmlFor="img">Nos envie uma imagem! <ion-icon name="image"></ion-icon></label>
                </div>
              </div>
              <div className="camp">
                <div className="input">
                  <button className="default">Enviar</button>
                </div>
              </div>
        </form>
      </section>
    </Screen>
  );
}