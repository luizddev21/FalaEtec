// Preferência local de visualização: salva a escolha e aplica a classe que
// seleciona as variáveis de cor definidas na folha global.
import { useState } from "react";
import "../assets/stylesheets/components/colorBlindnessSelector.css";

const STORAGE_KEY = "colorBlindnessFilter";

const filters = [
  "normal",
  "protanopia",
  "protanomalia",
  "deuteranopia",
  "deuteranomalia",
  "tritanopia",
  "tritanomalia",
  "acromatopsia",
  "acromatomalia",
];

export default function ColorBlindnessSelector() {
  const [colorBlindnessFilter, setColorBlindnessFilter] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || "normal";
  });

  function handleChange(e) {
    // Atualiza o armazenamento, o tema da página e o valor selecionado.
    const filter = e.target.value;

    localStorage.setItem(STORAGE_KEY, filter);

    document.documentElement.classList.remove(...filters);
    document.documentElement.classList.add(filter);

    setColorBlindnessFilter(filter);
  }

  return (
    <>
    <label className="visually-hidden" htmlFor="colorBlindnessFilterSelector">Filtro de cores</label>
    <select
      id="colorBlindnessFilterSelector"
      name="colorBlindnessFilterSelector"
      className="colorBlindnessFilterSelector"
      value={colorBlindnessFilter}
      onChange={handleChange}
    >
      <option value="normal">Filtros de daltonismo</option>

      <option value="protanopia">
        Protanopia (ausência de cones vermelhos)
      </option>

      <option value="protanomalia">
        Protanomalia (sensibilidade reduzida ao vermelho)
      </option>

      <option value="deuteranopia">
        Deuteranopia (ausência de cones verdes)
      </option>

      <option value="deuteranomalia">
        Deuteranomalia (sensibilidade reduzida ao verde)
      </option>

      <option value="tritanopia">
        Tritanopia (ausência de cones azuis)
      </option>

      <option value="tritanomalia">
        Tritanomalia (sensibilidade reduzida ao azul)
      </option>

      <option value="acromatopsia">
        Acromatopsia (visão em tons de cinza)
      </option>

      <option value="acromatomalia">
        Acromatomalia (forma parcial da acromatopsia)
      </option>
    </select>
    </>
  );
}
