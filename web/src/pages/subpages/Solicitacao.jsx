import Screen from "../../components/Screen";
import { useState, useRef } from "react";

import { api } from "../../js/api.js";

export default function Solicitacao() {
  const [form, setForm] = useState({
    title: "",
    local: "",
    sublocal: "",
    desc: "",
  });

  const page = "solicitacao";

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Nos envie uma imagem!");
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef(null);

  const clearFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(null);
    setPreview(null);
    setFileName("Nos envie uma imagem!");

    // Limpa o input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("local", form.local);
    formData.append("sublocal", form.sublocal);
    formData.append("desc", form.desc);
    formData.append("type", page);

    if (file) {
      formData.append("img", file);
    }

    return await api.createInteraction(formData);
  };

  return (
    <Screen>
      <section>
        <form onSubmit={handleSubmit} className="type2">
          <h2 className="title">Faça a sua solicitação!</h2>
          <div className="camp">
            <div className="input">
              <input
                value={form.title}
                onChange={handleChange}
                type="text"
                name="title"
                id="title"
                required
              />
              <label htmlFor="title">O que você precisa?</label>
            </div>
          </div>
          <div className="camp">
            <div className="input">
              <select
                value={form.local}
                onChange={handleChange}
                name="local"
                id="local"
                defaultValue=""
                required
              >
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
              <input
                value={form.sublocal}
                onChange={handleChange}
                type="text"
                name="sublocal"
                id="sublocal"
                required
              />
              <label htmlFor="title">Nos dê mais detalhes</label>
            </div>
          </div>
          <div className="camp">
            <div className="input textarea">
              <textarea
                value={form.desc}
                onChange={handleChange}
                name="desc"
                id="desc"
                required
              ></textarea>
              <label htmlFor="dsc">Descrição detalhada...</label>
            </div>
          </div>
          <div className="camp">
            <div className="input image">
              <input
                onChange={handleFile}
                ref={fileInputRef}
                type="file"
                name="img"
                id="img"
                accept="image/*"
              />

              <label htmlFor="img">
                {fileName} <ion-icon name="image"></ion-icon>
              </label>
            </div>
          </div>
          <div className="camp">
            {preview && (
              <button
                type="button"
                onClick={clearFile}
                className="preview-image"
              >
                <span>Desfazer</span>
                <img src={preview} alt="Pré-visualização" />
              </button>
            )}
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
