import Screen from "../../../../components/Screen";
import { useLocation, useSearchParams } from "react-router-dom";

export default function Info() {
  const { state } = useLocation();

  const [searchParams] = useSearchParams();
  const interacao = state.obj;

  const type = searchParams.get("type");

  console.log(interacao);

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
      </section>
    </Screen>
  );
}
