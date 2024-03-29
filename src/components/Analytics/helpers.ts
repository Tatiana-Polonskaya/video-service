import { Dispatch, SetStateAction, createContext } from "react";
import { ClarityDataItem } from "../../models/graph/clarity";
import { ConnectivityDataItem } from "../../models/graph/connectivity";
import GraphColor from "../../models/graph/_colors";
import { ExpressivenessDataItem } from "../../models/graph/expressiveness";
import { ConfidenceDataItem } from "../../models/graph/confidence";

export const ValueTime = createContext({
    currentTime: {} as number,
    setCurrentTime: (() => {}) as Dispatch<SetStateAction<number>>,
    updateTime: (() => {}) as Dispatch<SetStateAction<number>>,
});

const getColorClarityLine = (value: string) => {
    switch (value) {
        case "sounds":
            return GraphColor.RED;
        case "basic":
            return GraphColor.DARKGRAY;
        case "trembling":
            return GraphColor.BLUE;
        default:
            return GraphColor.DARKGRAY;
    }
};

export const convertClarityDataLine = (
    raw: ClarityDataItem
): BrickedGraphItem => ({
    id: raw.seq_number,
    text: raw.text,
    // value: raw.value, /// REMOVE THIS
    time: raw.time_start,
    color: getColorClarityLine(raw.type),
});

type BrickedGraphItem = {
    id: number;
    text: string;
    time: number;
    color: string;
};

const getColor = (value: number) => {
    switch (value) {
        case 0:
            return GraphColor.RED;
        case 1:
            return GraphColor.GRAY;
        case 2:
            return GraphColor.GREEN;
        default:
            return GraphColor.GRAY;
    }
};

export const convertConnectivityDataLine = (
    raw: ConnectivityDataItem
): BrickedGraphItem => ({
    id: raw.seq_number,
    text: raw.text,
    // value: raw.value, /// REMOVE THIS
    time: raw.time_start,
    color: getColor(raw.value),
});

const getMaxExpressivenessValueForColor = (
    anger: number,
    neutral: number,
    happiness: number
) => {
    return anger > neutral && anger > happiness
        ? GraphColor.RED
        : neutral > anger && neutral > happiness
        ? GraphColor.GRAY
        : GraphColor.GREEN;
};

export const convertExpressivenessDataLine = (
    raw: ExpressivenessDataItem
): BrickedGraphItem => ({
    id: raw.seq_number,
    text: raw.text === null ? "" : raw.text,
    // value: raw.value, /// REMOVE THIS
    time: raw.time_start,
    color: getMaxExpressivenessValueForColor(
        raw.anger,
        raw.neutral,
        raw.happiness
    ),
});

type ConvertArr = {
    value: number;
    color: string;
    position: string | number;
    width: number;
    desc?: string;
};
export const convertConfidenceArr = (
    items: ConfidenceDataItem[]
): ConvertArr[] => {
    const highLevel: number = 0.8;
    const lowLevel: number = 0.5;
    const resArr: ConvertArr[] = [];

    const getColorConfidence = (value: number) => {
        if (value > highLevel) {
            return {
                color: GraphColor.LIGHTGREEN,
                position: "10px",
                desc: "Высокая уверенность",
            };
        } else if (value > lowLevel) {
            return {
                color: GraphColor.YELLOW,
                position: "25px",
                desc: "Средняя уверенность",
            };
        } else {
            return {
                color: GraphColor.LIGHTRED,
                position: "38px",
                desc: "Низкая уверенность",
            };
        }
    };

    items.forEach((el, ind) => {
        if (ind === 0) {
            // resArr.push({ value: el.value, ...getColor(el.value), width: 1 });
            resArr.push({
                value: el.confidence,
                ...getColorConfidence(el.confidence),
                width: 1,
            });
        } else if (
            // (el.value < lowLevel &&
            (el.confidence < lowLevel &&
                resArr[resArr.length - 1].value < lowLevel) ||
            // (el.value > highLevel &&
            (el.confidence > highLevel &&
                resArr[resArr.length - 1].value > highLevel) ||
            // (el.value < highLevel &&
            (el.confidence < highLevel &&
                // el.value > lowLevel &&
                el.confidence > lowLevel &&
                resArr[resArr.length - 1].value < highLevel &&
                resArr[resArr.length - 1].value > lowLevel)
        ) {
            resArr[resArr.length - 1].width += 1;
        } else {
            // resArr.push({ value: el.value, ...getColor(el.value), width: 1 });
            resArr.push({
                value: el.confidence,
                ...getColorConfidence(el.confidence),
                width: 1,
            });
        }
    });
    return resArr;
};
