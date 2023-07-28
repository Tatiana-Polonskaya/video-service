import React, {useState} from 'react';
import {ReactSVG} from "react-svg";
import LampCharge from "../icons/lamp-charge.svg";
import {cn} from "@bem-react/classname";

import "./style.scss";

type Props={
    htemp:number,
    hgromk:number,
    hton:number,
    pemotion:number,
    penergi:number

}
const cnRecomendation = cn("recomendation");
function str(htemp:number, hgromk:number, hton:number, pemotion:number, penergi:number){
    let str=""
    let not=0;
    if (htemp<100){
        str+="Измените темп речи, но держите такую скорость, чтобы слушатели могли уловить Ваши мысли. Важно научиться говорить с четкостью и скоростью, которая позволяет удерживать внимание аудитории. "
    }else if (htemp>140){
        str+= "Увеличение темпа речи может указывать на волнение и стимулировать слушателей повысить скорость своего восприятия. Не злоупотребляйте этим - правильное использование темпа речи поможет слушателям хорошо слышать то, что Вы хотите сказать. "
    }else {
        ++not;
    }
    if(hgromk<0.4 ){
        str+="Поставьте свой голос так, чтобы его громкость соответствовала размерам аудитории, в которой Вы выступаете, и убедитесь, что каждому слушателю всё будет слышно. "
    } else if(hgromk>0.6){
        str+="Говорите с такой громкостью, чтобы Вы ощутили, что говорите громче обычного. В подавляющем большинстве случаев этой громкости будет достаточно. "
    }else {
        ++not;
    }
    if(hton<0.33 ){
        str+="Интонация (изменение тона речи) не должна быть монотонной, ее надо изменять на протяжении всего выступления. Не сдерживайте свою интонацию, стремитесь высказаться энергично - и ваша интонация будет естественна.  "
    } else if(hton>0.65 ){
        str+="Интонация (изменение тона речи) должна соответствовать содержанию того, о чем вы говорите. Интонация, не соответствующая содержанию речи, раздражает слушателей и вызывает недоверие к его словам. "
    }else {
        ++not;
    }
    if(pemotion<0.4 ){
        str+="Эмоциональность - обязательное требование к публичному выступлению, абсолютно необходимый его элемент. Слушатели должны ощущать, что Вы говорите эмоционально, взволнованно, что Вам самому не безразлично то, что вы говорите. "
    } else if(pemotion>0.9){
        str+="Эмоциональность должна быть сдержанной. Приводите факты, вызывающие у слушателей эмоции, нежели сами говорите слишком эмоционально."
    }else {
        ++not;
    }
    if(penergi< 0.5 ){
        str+="Всё выступление должно быть энергичным от начала до конца. Энергия выступления передается слушателям, она держит их в напряжении и повышает доверие к содержащейся в Вашем выступлении информации. "
    }else {
        ++not;
    }

    if (not === 5){
        str = "Динамизм касается в первую очередь интонации речи и связана с эмоциональностью, разнообразием интонационного оформления, отсутствием монотонности, точностью интонационной передачи оратором своей мысли, правильной расстановкой логических ударений и пауз, точностью передачи подтекста. Следует голосом, интонацией подчеркивать основную мысль, делать паузы до и после важных мыслей. "
    }
    return str;
}
function RecommendConn(props:Props) {
    const [active, setActive] = useState("");
    const unfold = () => {
        if (active) {
            setActive("");
        } else {
            setActive("active");
        }
    };
    return (
        <div className={cnRecomendation()}>
            <div className={cnRecomendation("header")}>
                <ReactSVG
                    className={cnRecomendation("icon")}
                    src={LampCharge}
                />
                <div className={cnRecomendation("title")}>Рекомендации</div>
                <div onClick={unfold} className={cnRecomendation("link")}>
                    Развернуть
                </div>
            </div>
            <div className={cnRecomendation("content")}>
                <p className={`${active}`}>
                    {str( props.htemp,
                        (props.hgromk)/100,
                        (props.hton)/100,
                        (props.pemotion)/100,
                        (props.penergi)/100)}
                </p>
            </div>
        </div>
    )
}

export default RecommendConn;