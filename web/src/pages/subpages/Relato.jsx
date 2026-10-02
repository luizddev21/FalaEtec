import Screen from "../../components/Screen";
import { useState } from "react";
import api from "../../js/api.js";
import Message from "../../components/Message.jsx";
import { useNavigate } from "react-router-dom";

import "../../assets/stylesheets/pages/relato.css"

function ChoiceButtons({ options, nextStep }) {
  return (
    <div className="buttons">
      {options.map(([text, name, value]) => (
        <button
          key={text}
          className="default"
          type="button"
          onClick={() => nextStep(name, value)}
        >
          {text}
        </button>
      ))}
    </div>
  );
}

function Question({ children, options, nextStep }) {
  return (
    <div className="camp">
      <div className="input">
        <label>{children}</label>

        <ChoiceButtons options={options} nextStep={nextStep} />
      </div>
    </div>
  );
}

function TextQuestion({
  name,
  label,
  value,
  placeholder,
  handleChange,
  setStep,
}) {
  return (
    <div className="camp">
      <div className="input column">
        <label htmlFor={name}>{label}</label>

        <div className="buttons">
          <textarea
            name={name}
            id={name}
            value={value}
            onChange={(e) => handleChange(name, e.target.value)}
            placeholder={placeholder}
          />

          <button
            className="default"
            type="button"
            onClick={() => setStep((prev) => prev + 1)}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

function SendButton() {
  return (
    <div className="camp">
      <div className="input">
        <div className="buttons">
          <button className="submit default" type="submit">
            Enviar relato
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Relato() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  // Loading
  const [loading, setLoading] = useState(false);

  const page = "relato";

  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    title: "",
    otherTitle: "",
    desc: "",
    date: "",
    attendance: 0,
    anonymous: 0,
  });

  const handleChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = (name, value) => {
    handleChange(name, value);
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "title",
      form.title === "outro" ? form.otherTitle : form.title,
    );

    formData.append("desc", form.desc);
    formData.append("date", form.date);
    formData.append("attendance", form.attendance);
    formData.append("anonymous", form.anonymous);
    formData.append("type", page);

    try {
      setLoading(true);
      await api.createInteraction(formData);
      navigate("/confirm");
    } catch (error) {
      console.error("Erro ao tentar enviar interação: ", error);
      setError("Erro ao tentar enviar interação.");
    } finally {
      setLoading(false);
    }
  };

  const isOther = form.title === "outro";

  const descriptionStep = isOther ? 3 : 2;
  const dateStep = isOther ? 4 : 3;
  const attendanceStep = isOther ? 5 : 4;

  const sendStep = isOther
    ? form.anonymous === 1
      ? 5
      : 6
    : form.anonymous === 1
      ? 4
      : 5;

  return (
    <Screen fullscreen={true} loading={loading}>
      {error !== "" && <Message type="error" message={error} />}
      <section className={`relato ${step % 2 === 0 ? "blue" : "green"}`}>
        <form onSubmit={handleSubmit} className="type3">
          {/* ANÔNIMO */}
          {step === 0 && (
            <div className="camp">
              <div className="input">
                <label>Gostaria que o seu relato fosse anônimo?</label>

                <span className="warning">
                  Caso seja necessário podemos verificar sua identidade, porém
                  ao saber que o relato é anônimo você fica seguro de qualquer
                  revelação ou algo relacionado à você.
                </span>

                <ChoiceButtons
                  nextStep={nextStep}
                  options={[
                    ["Sim", "anonymous", 1],
                    ["Não", "anonymous", 0],
                  ]}
                />
              </div>
            </div>
          )}

          {/* SOBRE QUEM É */}
          {step === 1 && (
            <Question
              nextStep={nextStep}
              options={[
                ["Professor", "title", "professor"],
                ["Aluno", "title", "aluno"],
                ["Funcionário", "title", "funcionário"],
                ["Outro", "title", "outro"],
                ["Prefiro não informar", "title", "prefiro não informar"],
              ]}
            >
              Sobre quem é o relato?
            </Question>
          )}

          {/* OUTRO */}
          {step === 2 && isOther && (
            <div className="camp">
              <div className="input column">
                <label htmlFor="otherTitle">Sobre quem é o relato?</label>

                <div className="buttons">
                  <input
                    type="text"
                    id="otherTitle"
                    value={form.otherTitle}
                    onChange={(e) => handleChange("otherTitle", e.target.value)}
                    placeholder="Digite aqui..."
                    autoFocus
                  />

                  <button
                    type="button"
                    className="default"
                    disabled={!form.otherTitle.trim()}
                    onClick={() => setStep((prev) => prev + 1)}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DESCRIÇÃO */}
          {step === descriptionStep && (
            <TextQuestion
              name="desc"
              label="Pode nos contar o que aconteceu?"
              value={form.desc}
              placeholder="Escreva aqui..."
              handleChange={handleChange}
              setStep={setStep}
            />
          )}

          {/* DATA */}
          {step === dateStep && (
            <Question
              nextStep={nextStep}
              options={[
                ["Hoje", "date", "hoje"],
                ["Ontem", "date", "ontem"],
                ["Há mais tempo", "date", "há mais tempo"],
                ["Prefiro não informar", "date", "prefiro não informar"],
              ]}
            >
              Quando isso aconteceu?
            </Question>
          )}

          {/* ACOMPANHAMENTO */}
          {step === attendanceStep && form.anonymous === 0 && (
            <Question
              nextStep={nextStep}
              options={[
                ["Sim", "attendance", 1],
                ["Não", "attendance", 0],
              ]}
            >
              Gostaria de acompanhamento?
            </Question>
          )}

          {/* ENVIAR */}
          {step === sendStep && <SendButton />}
        </form>
      </section>
    </Screen>
  );
}
