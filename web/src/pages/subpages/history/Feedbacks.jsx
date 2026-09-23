import { useEffect, useState } from "react";
import Screen from "../../../components/Screen";
import api from "../../../js/api.js";

export default function Feedbacks() {
    const [fbList, setFbList] = useState([]);

    const type = ""

    useEffect(() => {
        setFbList(async () => {
            const response = await api.apiFetch("/interaction/get-all", { body: type });
            return await response.json();
        });
    }, []);

    console.log(fbList);

    return(
        <Screen>
            <ul className="feedbacks-list"></ul>
        </Screen>
    )
}