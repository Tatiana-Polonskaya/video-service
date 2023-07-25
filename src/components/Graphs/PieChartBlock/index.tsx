import React from "react";
import "./style.scss";
import { ReactSVG } from "react-svg";
import { IPieChart } from "../../../models/graph/inteface/IPieChart";
import art from "./img/artColor.svg";
import scientific from "./img/scientificColor.svg";
import officialBusiness from "./img/officialBusinessInColor.svg";
import journalistic from "./img/journalisticColor.svg";
import colloquial from "./img/colloquialColor.svg";
interface IComponentProps {
    component: IPieChart;
}
function paint(item: (string | number)[], img: string) {
    let precen = Number(item[0]);
    let procent;
    if (precen > 9 && precen < 100) {
        procent = precen.toString()[0];
    } else if (precen <= 5) {
        procent = "00";
    } else if (precen >= 100) {
        procent = "10";
    } else {
        procent = "0";
    }

    return (
        <div className="PieChart">
            <div className="imgPieChartScintific">
                <ReactSVG className={"imkPie" + procent} src={img} />
            </div>
            <p className="textPieChart">{item[1]}</p>
            <p className="precentPieChart">{Number(item[0]).toFixed(2)}%</p>
        </div>
    );
}
export default function PieChartBlock(props: IComponentProps) {
    let artInf = [props.component.artistic.valueOf(), "художественный"];
    let colloquialInf = [props.component.colloquial.valueOf(), "разговорный"];
    let journalisticInf = [
        props.component.official.valueOf(),
        "официально-деловой",
    ];
    let scientificInf = [props.component.scientific.valueOf(), "научный"];
    let officialBusinessInf = [
        props.component.publicistic.valueOf(),
        "публицистический",
    ];
    return (
        <>
            <div className="textPieChartBlock">
                <b className="textInfTitle">Единство стиля </b> - использование
                определенного набора слов и выражений в зависимости от жанра,
                формата и стиля речи, с целью достижения определенных
                коммуникативных целей.
            </div>

            <div className="allPieChart">
                {paint(scientificInf, scientific)}
                {paint(officialBusinessInf, officialBusiness)}
                {paint(journalisticInf, journalistic)}
                {paint(colloquialInf, colloquial)}
                {paint(artInf, art)}
            </div>
        </>
    );
}
