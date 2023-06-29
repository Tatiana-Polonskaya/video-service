/* eslint-disable jsx-a11y/anchor-is-valid */
import { cn } from "@bem-react/classname";

import "./style.scss";

import { useState } from "react";

import NonMonotonyGraph from "../../../../../Graphs/NonMonotony";
import data from "../../../../../../plugs/non-monotony.json";
import { NonMonotonyType } from "../../../../../../models/graph/monotony";
import GraphColor from "../../../../../../models/graph/_colors";
import Invisible from "../../../../../Dropdown/-Invisible";

// import { IBreakdown } from "../../../models/IBreakdown";
// import { IСitation } from "../../../models/ICitation";

type Props = {
    // name?: string;
    graphs: Graph[];
    //     state: string;
};

type Graph = {
    link?: string;
    graph?: string;
};

const cnNonMon = cn("nonmonotony");
// const cnCitation = cn("citation");

type Line = {
    type: string;
    color: string;
};
type propsLine = {
    typeLine: Line[];
};

export default function SecondaryNonMonotony(props: Props) {
    // это лучше через useEffect сделать?
    const choiseLinks = (ind: number) => {
        const linkEl = document.querySelectorAll(".nonmonotony-item");
        linkEl.forEach((el) => el.classList.remove("nonmonotony-choise"));
        linkEl[ind].classList.add("nonmonotony-choise");
        setGraph(ind);
        return;
    };
    let NonMonLIne: propsLine = {
        typeLine: [
            {
                type: "основной график",
                color: GraphColor.ORANGE,
                // color: "linear-gradient(32.08deg, #2477F4 0%, #3A86FA 100%)",
            },
            {
                type: "среднее значение",
                color: "#7C8EB5",
            },
        ],
    };
    const color = [GraphColor.BLUE, GraphColor.RED, GraphColor.ORANGE];
    // сюда передавать значение графика
    // изначально поставить 2
    const [graph, setGraph] = useState(0);
    return (
        <>
            <div className={cnNonMon("marker")}>
                <p className={cnNonMon("description")}>
                    <b className={cnNonMon("description-bold")}>
                        Немонотонность
                    </b>{" "}
                    - способность выражать мысли и идеи с помощью разнообразных
                    интонаций и тонов голоса, избегая повторения и
                    однообразности речи.
                </p>
                <div className={cnNonMon("list")}>
                    {/* вот тут надо решить вопрос с блоками цветов */}
                    {NonMonLIne.typeLine.map((el, ind) => (
                        <div key={ind} className={cnNonMon("color")}>
                            <div
                                className={cnNonMon("color-item")}
                                style={{
                                    background:
                                        ind === 0 ? color[graph] : "#7C8EB5",
                                }}
                            ></div>
                            <div className={cnNonMon("text")}>{el.type}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={cnNonMon("analysis")}>
                <span className={cnNonMon("set")}>Параметры:</span>
                <ul className={cnNonMon("menu")}>
                    {props.graphs.map((el, ind) => (
                        <li
                            key={ind}
                            className={
                                ind === 0
                                    ? cnNonMon("item", cnNonMon("choise"))
                                    : cnNonMon("item")
                            }
                        >
                            <a
                                className={cnNonMon("link")}
                                onClick={() => {
                                    choiseLinks(ind);
                                }}
                            >
                                {el.link}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={cnNonMon("graph")}>
                {/* сюда передавать state для того тчобы отображать 1 график */}
                <NonMonotonyGraph
                    data={data.data.values}
                    param={
                        // топорно, подумать как сделать красиво
                        graph === 0
                            ? NonMonotonyType.RATE
                            : graph === 1
                            ? NonMonotonyType.VOLUME
                            : NonMonotonyType.TONE
                        // : graph === 3
                        // ? NonMonotonyType.TONE
                        // : null
                    }
                />
            </div>
        </>
    );
}