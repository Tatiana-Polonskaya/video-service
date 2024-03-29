import { Fragment, useRef, useState } from "react";
import "./style.scss";
import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";

import { IQuestion, typeQuestion } from "../../models/survey";
import { LocalAnswer } from "../../store/slices/survey";

type Props = {
    question: IQuestion;
    addAnswers: Function;
};

export default function RadioBtnQuestion(props: Props) {
    const cnMain = cn("radio-main");

    const choices = [...props.question.choices].sort(
        (a, b) => Number(a.another) - Number(b.another)
    );

    const [selectedOption, setSelectedOption] = useState<string>();
    const anotherValue = useRef<HTMLInputElement>(null);

    function handleChange(id: string) {
        setSelectedOption(id);
        const isAnother = choices.filter((el) => el.id === id)[0].another;

        if (!isAnother) {
            if (anotherValue && anotherValue.current)
                anotherValue.current!.value = "";
            props.addAnswers({
                id_question: props.question.id,
                type_question: typeQuestion.radio,
                id_choices: [id],
                another_choices: "",
            } as LocalAnswer);
        }
    }

    const changeAnotherAnswer = (id: string) => {
        if (anotherValue && anotherValue.current!.value.length !== 0) {
            props.addAnswers({
                id_question: props.question.id,
                type_question: typeQuestion.radio,
                id_choices: [id],
                another_choices: anotherValue.current!.value,
            } as LocalAnswer);
        }
    };

    return (
        <div className={cnMain()}>
            <h3 className={cnMain("title")}>{props.question.title}</h3>
            <div className={cnMain(`${props.question.type_choice}`)}>
                {choices.map((el, index) => (
                    <Fragment key={index}>
                        {!el.another && (
                            <div
                                key={el.id}
                                className={cnMain(
                                    `${props.question.type_choice}-item`,
                                    {
                                        checked: selectedOption === el.id,
                                    }
                                )}
                            >
                                {props.question.icons && (
                                    <ReactSVG
                                        src={process.env.PUBLIC_URL + el.icon}
                                        className={cnMain(
                                            `${props.question.type_choice}-item-icon`
                                        )}
                                    />
                                )}

                                <label
                                    className={cnMain(
                                        `${props.question.type_choice}-item-label`
                                    )}
                                >
                                    <input
                                        type="radio"
                                        value={el.id}
                                        checked={selectedOption === el.id}
                                        className={cnMain(
                                            `${props.question.type_choice}-item-label-radio`
                                        )}
                                        onChange={() => handleChange(el.id)}
                                    />
                                    <div
                                        className={cnMain(
                                            `${props.question.type_choice}-item-label-custom-radio__label`
                                        )}
                                    >
                                        <strong>{el.title}</strong>
                                    </div>
                                </label>
                            </div>
                        )}
                        {el.another && (
                            <div className={cnMain("another")}>
                                <label className={cnMain("another-label")}>
                                    <input
                                        type="radio"
                                        value={el.id}
                                        className={cnMain(
                                            "another-label-radio"
                                        )}
                                        checked={selectedOption === el.id}
                                        onChange={() => handleChange(el.id)}
                                    />
                                    <div
                                        className={cnMain(
                                            "another-label-custom-radio__label"
                                        )}
                                    >
                                        <strong>Другое:</strong>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder={el.title}
                                        className={cnMain(
                                            "another-label-input-text"
                                        )}
                                        disabled={selectedOption !== el.id}
                                        ref={anotherValue}
                                        onChange={() =>
                                            changeAnotherAnswer(el.id)
                                        }
                                    />
                                </label>
                            </div>
                        )}
                    </Fragment>
                ))}
            </div>
        </div>
    );
}
