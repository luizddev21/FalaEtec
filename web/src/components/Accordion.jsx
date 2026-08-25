import { useRef, useState } from "react";
import "../assets/stylesheets/components/accordion.css";

export default function Accordion({ title, children }) {
    const [open, setOpen] = useState(false);
    const contentRef = useRef(null);

    const toggleAccordion = () => {
        setOpen((prev) => !prev);
    };

    return (
        <div className="accordion">
            <button
                className="accordion-header"
                onClick={toggleAccordion}
                aria-expanded={open}
            >
                <span>{title}</span>

                <span className={`arrow ${open ? "open" : ""}`}>
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </span>
            </button>

            <div
                ref={contentRef}
                className="accordion-content"
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