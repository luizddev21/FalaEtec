import Screen from "../../../../components/Screen";
import { useLocation, useSearchParams } from "react-router-dom";
import api from "../../../../js/api.js"
import Rating from "@mui/material/Rating";

export default function Info() {
  const { state } = useLocation();

  const interacao = state.obj;
  const props = state.props ? state.props : null;

  console.log(props.urlImg)

  return (
    <Screen>
      <section>
        {Object.entries(interacao).map(([key, data]) => {
          return (
            <div key={key} className="camp">
              <div className="output">
                <p className="label">{key}</p>
                <p className="value">{data}</p>
              </div>
            </div>
          );
        })}
        {
          props?.urlImg !== undefined ?
            props?.urlImg !== null &&
            <div key="Imagem" className="camp">
              <div className="output">
                <p className="label">Imagem</p>
                <img
                  src={`${api.API_URL}${props.urlImg}`}
                  alt="Imagem da solicitação"
                />
              </div>
            </div>
            : props?.level !== undefined &&
            props?.level !== null &&
            <div key="Nota" className="camp">
              <div className="output">
                <p className="label">Nota</p>
                <Rating
                  sx={{ fontSize: "3rem" }}
                  value={props.level}
                  readOnly
                />
              </div>
            </div>
        }
      </section>
    </Screen>
  );
}
