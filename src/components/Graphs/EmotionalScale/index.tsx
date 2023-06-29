import React, {useState} from 'react';
import Scale from "../Scale";
import './style.scss'
import text from './img/text.svg'
import video from './img/video.svg'
import volume_high from './img/volume-high.svg'
import {IScaleDataType} from "../../../models/graph/inteface/scale";
import {ReactSVG} from "react-svg";
import GraphColor from "../../../models/graph/_colors";
import { cn } from "@bem-react/classname";
import {IDescriptionScale} from "../../../models/graph/inteface/IDescriptionScale";

type item = {
    seq_number: number,
    time_start: number,
    video: {
        neutral: number,
        happiness: number,
        anger: number
    },
    audio: {
        neutral: number,
        happiness: number,
        anger: number
    },
    text: {
        neutral: number,
        happiness: number,
        anger: number
    }
}
type Props = {
    values : item []
}
const CN = cn("EmotionalScale");
export default function EmotionalScale(props :Props) {
    let data = {
        video: {
            neutral: 0.31088790033522173,
            happiness: 0.1134941425858611,
            anger: 0.21956464855564162
        },
        audio: {
            neutral: 0.4709934930855798,
            happiness: 0.4409310919012528,
            anger: 0.24028107719972214
        },
        text: {
            neutral: 0.46526399818719966,
            happiness: 0.4987118248855501,
            anger: 0.8640703366803603
        }
    }
    const [activeIndex, setActiveIndex] = useState(1);
    const handleClick = (index:any) => setActiveIndex(index);
    const checkActive = (index:any, className:any) => activeIndex === index ? className : "";
    let dataAudio = props.values.map(n=> n.audio);
    let dataText = props.values.map(n=> n.text);
    let dataVideo =props.values.map(n=> n.video)
    let infVideo: IScaleDataType = ({
        item:[],
    });
    let infText: IScaleDataType = ({
        item:[],
    });
    let infAudio: IScaleDataType = ({
        item:[],
    });
    for (let dataAudioKey in dataAudio) {
        if (dataAudioKey == "0"){
            infAudio.item.push({
                title:"Нейтральная",
                value:dataAudio[dataAudioKey].neutral * 100,
                color:GraphColor.GRAY,
            });
        }
        if (dataAudioKey.toString() == "1"){
            infAudio.item.push({
                title:"Радость",
                value:dataAudio[dataAudioKey].neutral * 100,
                color:GraphColor.GREEN,
            });
        }
        if (dataAudioKey.toString() == "2"){
            infAudio.item.push({
                title:"Злость",
                value:dataAudio[dataAudioKey].neutral * 100,
                color:GraphColor.RED,
            });
        }
    }
    for (let dataTextKey in dataText) {
        if (dataTextKey == "0"){
            infText.item.push({
                title:"Нейтральная",
                value:dataText[dataTextKey].neutral * 100,
                color:GraphColor.GRAY,
            });
        }
        if (dataTextKey.toString() == "1"){
            infText.item.push({
                title:"Радость",
                value:dataText[dataTextKey].neutral * 100,
                color:GraphColor.GREEN,
            });
        }
        if (dataTextKey.toString() == "2"){
            infText.item.push({
                title:"Злость",
                value:dataText[dataTextKey].neutral * 100,
                color:GraphColor.RED,
            });
        }
    }
    for (let dataVideoKey in dataText) {
        if (dataVideoKey == "0"){
            infVideo.item.push({
                title:"Нейтральная",
                value:dataVideo[dataVideoKey].neutral * 100,
                color:GraphColor.GRAY,
            });
        }
        if (dataVideoKey.toString() == "1"){
            infVideo.item.push({
                title:"Радость",
                value:dataVideo[dataVideoKey].neutral * 100,
                color:GraphColor.GREEN,
            });
        }
        if (dataVideoKey.toString() == "2"){
            infVideo.item.push({
                title:"Злость",
                value:dataVideo[dataVideoKey].neutral * 100,
                color:GraphColor.RED,
            });
        }
    }

    return (
        <>
            <div className={CN("textBloc")}>
                <div className={CN("text")}>
                    <b className="textInfTitle"> Эмоциональность</b> - способность выражать свои мысли и идеи с помощью энергичного, живого стиля выступления, который передает позитивную эмоциональную окраску и воодушевление.
                </div>
                <div className={CN("bocksAll")}>
                    <div className={CN('blockText')}>
                        <div className={CN('block')} style={{background:"#7C8EB5"}}/>
                        <div className={CN('Text')}> нейтральная</div>
                    </div>
                    <div className={CN('blockText')}>
                        <div className={CN('block')} style={{background:"#24F19B"}}/>
                        <div className={CN('Text')}> радость</div>
                    </div>
                    <div className={CN('blockText')}>
                        <div className={CN('block')} style={{background:"#FE6972"}}/>
                        <div className={CN('Text')}> злость</div>
                    </div>
                </div>

            </div>
            <div className="tabs">
                <button
                    className={`tab ${checkActive(1, "active")}`}
                    onClick={() => handleClick(1)}
                >
                    <ReactSVG src={video}/>
                    Видео
                </button>
                <button
                    className={`tab ${checkActive(2, "active")}`}
                    onClick={() => handleClick(2)}
                >
                    <ReactSVG src={volume_high}/>
                    Аудио
                </button>
                <button
                    className={`tab ${checkActive(3, "active")}`}
                    onClick={() => handleClick(3)}
                >
                    <ReactSVG src={text}/>
                    Текст
                </button>
            </div>
            <div className="panels">
                <div className={`panel ${checkActive(1, "active")}`}>
                    <Scale component={infVideo}/>
                </div>
                <div className={`panel ${checkActive(2, "active")}`}>
                    <Scale component={infAudio}/>
                </div>
                <div className={`panel ${checkActive(3, "active")}`}>
                    <Scale component={infText}/>
                </div>
            </div>
        </>
    );
}
