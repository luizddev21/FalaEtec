// Pergunta expansível do FAQ: o estado controla a resposta e useId liga o
// botão ao painel correspondente para navegação acessível.
import { useId, useRef, useState } from "react";
import "../assets/stylesheets/components/accordion.css";

export default function Accordion({ title, children }) {
    const [open, setOpen] = useState(false);
    const contentRef = useRef(null);
    const panelId = `accordion-panel-${useId()}`;

    const toggleAccordion = () => {
        // Alterna a resposta sem navegar para outra página.
        setOpen((prev) => !prev);
    };

    return (
        <div className="accordion">
            <button
                className="accordion-header"
                onClick={toggleAccordion}
                aria-expanded={open}
                aria-controls={panelId}
            >
                <span>{title}</span>

                <span className={`arrow ${open ? "open" : ""}`}>
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </span>
            </button>

            <div
                ref={contentRef}
                id={panelId}
                className="accordion-content"
                aria-hidden={!open}
                inert={!open}
                style={{
                    maxHeight: open
                        ? `${contentRef.current?.scrollHeight}px`
                        : "0px",
                }}
            >
                <div className="accordion-inner">
                    {children}
                </div>
            </div>

        </div>
    );
}
