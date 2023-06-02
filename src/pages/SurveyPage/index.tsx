import { useEffect, useRef, useState } from "react";
import CheckboxQuestion from "../../components/CheckboxQuestion";
import RadioBtnQuestion from "../../components/RadioBtnQuestion";
import SurveyLayout from "../../layouts/SurveyLayout";
import "./style.scss";
import { cn } from "@bem-react/classname";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import {
    updateChoiceAnswers,
    updateAnotherAnswers,
} from "../../store/slices/survey";

import TarifPage from "./TarifPage";
import { useNavigate } from "react-router-dom";

export default function SurveyPage() {
    // const { name, lastName, birthday } = useAppSelector(
    //     (state) => state.register.personal
    // );

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const storeChoiceAnswers = useAppSelector(
        (state) => state.survey.choiceAnswers
    );
    const storeAnotherAnswers = useAppSelector(
        (state) => state.survey.anotherAnswers
    );

    enum typeQuestion {
        checkbox = "checkbox",
        radio = "radio",
    }
    enum typeStyleAnswers {
        row = "block-answers",
        column = "col-answers",
        icon_row = "icon-rows",
    }

    const question = [
        {
            id: 1,
            title: "Укажите ваш вид деятельности",
            type: typeQuestion.radio,
            icons: true,
            block_another: true,
            placeholder_another: "Введите тип деятельности",
            type_answer: typeStyleAnswers.icon_row,
            answers: [
                {
                    id: 0,
                    title: "Предпринимательство",
                    icon: "./components/Menu/icons/book.svg",
                },
                {
                    id: 1,
                    title: "Управление",
                    icon: "",
                },
                {
                    id: 2,
                    title: "Медиа",
                    icon: "",
                },
                {
                    id: 3,
                    title: "Маркетинг",
                    icon: "",
                },
                {
                    id: 4,
                    title: "Политика",
                    icon: "",
                },
                {
                    id: 5,
                    title: "Учеба",
                    icon: "",
                },
                {
                    id: 6,
                    title: "Творчество",
                    icon: "",
                },
                {
                    id: 7,
                    title: "Адвокатура",
                    icon: "",
                },
                {
                    id: 8,
                    title: "Журналистика",
                    icon: "",
                },
                {
                    id: 9,
                    title: "Актерское мастерство",
                    icon: "",
                },
                {
                    id: 10,
                    title: "Преподавание",
                    icon: "",
                },
            ],
        },
        {
            id: 2,
            title: "Для каких целей вы хотите использовать наш сервис?",
            type: typeQuestion.checkbox,
            icons: false,
            block_another: true,
            placeholder_another: "Опишите цель использования сервиса",
            type_answer: typeStyleAnswers.row,
            answers: [
                {
                    id: 0,
                    title: "Повысить уверенность в себе и в своих навыках публичного выступления",
                },
                {
                    id: 1,
                    title: "Улучшить качество презентаций в рамках учебных и профессиональных мероприятий",
                },
                {
                    id: 2,
                    title: "Подготовиться к важному профессиональному или личному мероприятию, такому как конференция, выставка, презентация проекта",
                },
            ],
        },
        {
            id: 3,
            title: "Выберите ключевые навыки, которые вы хотите развить",
            type: typeQuestion.checkbox,
            icons: false,
            block_another: true,

            placeholder_another: "Укажите желаемые для освоения навыки",
            type_answer: typeStyleAnswers.column,
            answers: [
                {
                    id: 0,
                    title: "Поработать над темпом речи",
                },
                {
                    id: 1,
                    title: "Уменьшить число слов-паразитов",
                },
                {
                    id: 2,
                    title: "Научиться уверенно говорить",
                },
                {
                    id: 3,
                    title: "Сделать речь более эмоциональной",
                },
                {
                    id: 4,
                    title: "Улучшить произношение",
                },
                {
                    id: 5,
                    title: "Избавиться от страха выступлений",
                },
                {
                    id: 6,
                    title: "Научиться красиво строить фразы",
                },
            ],
        },
        {
            id: 4,
            title: "Как вы планируете использовать наш сервис?",
            type: typeQuestion.radio,
            icons: false,
            block_another: false,
            placeholder_another: "",
            type_answer: typeStyleAnswers.row,
            answers: [
                {
                    id: 0,
                    title: "На регулярной основе",
                },
                {
                    id: 1,
                    title: "Для подготовки к конкретному выступлению",
                },
            ],
        },
        {
            id: 5,
            title: "Сколько времени вы готовы уделять подготовке?",
            type: typeQuestion.radio,
            icons: false,
            block_another: false,
            placeholder_another: "",
            type_answer: typeStyleAnswers.column,
            answers: [
                {
                    id: 0,
                    title: "Менее 30 минут в неделю",
                },
                {
                    id: 1,
                    title: "От 2 до 3 часов в неделю",
                },
                {
                    id: 2,
                    title: "От 30 минут до 1 часа в неделю",
                },
                {
                    id: 3,
                    title: "Более 3 часов в неделю",
                },
                {
                    id: 4,
                    title: "От 1 до 2 часов в неделю",
                },
            ],
        },
        {
            id: 6,
            title: "Когда вы ожидаете увидеть ощутимые результаты?",
            type: typeQuestion.radio,
            icons: false,
            block_another: false,
            placeholder_another: "",
            type_answer: typeStyleAnswers.column,
            answers: [
                {
                    id: 0,
                    title: "В течение месяца",
                },
                {
                    id: 1,
                    title: "Через полгода",
                },
                {
                    id: 2,
                    title: "Через месяц",
                },
                {
                    id: 3,
                    title: "В течение года",
                },
                {
                    id: 4,
                    title: "Через 3 месяца",
                },
            ],
        },
        {
            id: 7,
            title: "Откуда вы о нас узнали?",
            type: typeQuestion.checkbox,
            icons: false,
            block_another: true,
            placeholder_another: "Укажите  источник информации",
            type_answer: typeStyleAnswers.row,
            answers: [
                {
                    id: 0,
                    title: "Рекомендация от друга/коллеги",
                },
                {
                    id: 1,
                    title: "Из социальной сети ВКонтакте",
                },
                {
                    id: 2,
                    title: "Реклама в Яндексе",
                },
                {
                    id: 3,
                    title: "По поисковому запросу",
                },
                {
                    id: 4,
                    title: "Е-mail рассылка",
                },
                {
                    id: 5,
                    title: "СМИ",
                },
            ],
        },
    ];

    const [canMoved, setCanMoved] = useState(false);
    const [step, setStep] = useState(0);
    const allStep = 2;

    const countQuestionForStep = [2, 3, 2];

    let counts = question.length;
    let firstIndex = 0;

    const [currentQuestions, setCurrentQuestions] = useState(
        question.slice(firstIndex, countQuestionForStep[step])
    );

    let answers: (number | boolean[])[] = [];
    let anotherAnswers: string[] = [];

    for (let i = 0; i < counts; i++) {
        if (question[i].type === typeQuestion.radio) {
            answers.push(-1);
        } else {
            let temp: boolean[] = [];
            for (let j = 0; j < question[i].answers.length; j++) {
                temp.push(false);
            }
            if (question[i].block_another) {
                temp.push(false);
            }
            answers.push(temp);
        }
        anotherAnswers.push("");
    }

    const addAnswers = (answer: number | boolean[], idQuestion: number) => {
        answers =
            storeChoiceAnswers.length > 0 ? [...storeChoiceAnswers] : answers;
        answers[idQuestion] = answer;

        dispatch(updateChoiceAnswers(answers));

        let firstIndexQuestion = currentQuestions[0].id - 1;
        let lastIndex = countQuestionForStep[step] + currentQuestions[0].id - 1;
        
        let flag = 0;

        for (let i = firstIndexQuestion; i < lastIndex; i++) {
            if (typeof answers[i] === "number") {
                if (answers[i] !== -1) {
                    flag++;
                }
            } else if (Array.isArray(answers[i])) {
                let temp = answers[i] as Array<boolean>;
                if (temp.indexOf(true) !== -1) {
                    flag++;
                }
            }
        }
        setCanMoved(lastIndex - firstIndexQuestion === flag ? true : false);
    };

    const addAnotherAnswers = (idQuestion: number, answer: string) => {
        anotherAnswers =
            storeAnotherAnswers.length > 0
                ? [...storeAnotherAnswers]
                : anotherAnswers;

        anotherAnswers[idQuestion] = answer;
        dispatch(updateAnotherAnswers(anotherAnswers));
    };

    const changeStep = () => {
        if (canMoved) {
            let firstIndex = countQuestionForStep
                .slice(0, step + 1)
                .reduce((sum, elem) => sum + elem, 0);
            setStep((prev) =>  ++prev);

            if (step < allStep) {
                setCurrentQuestions(
                    question.slice(
                        firstIndex,
                        firstIndex + countQuestionForStep[step] + 1
                    )
                );
                setCanMoved(false);
            }
        }
    };

    const cnMain = cn("survey");

    return (
        <SurveyLayout>
            { step <= allStep && (<div className={cnMain()}>
                <div className={cnMain("title")}>
                    Speech Up - один сервис для многих целей
                </div>
                <div className={cnMain("description")}>
                    Пожалуйста, поделитесь своими ожиданиями по использованию
                    сервиса. Это позволит предлагать вам персонализированные
                    возможности среди обновлений.
                </div>
                <div className={cnMain("questions")}>
                    {currentQuestions.map((el, id) => (
                        <>
                            {el.type === typeQuestion.checkbox && (
                                <CheckboxQuestion
                                    key={el.id}
                                    question={el}
                                    addAnswers={addAnswers}
                                    addAnotherAnswers={addAnotherAnswers}
                                />
                            )}
                            {el.type === typeQuestion.radio && (
                                <RadioBtnQuestion
                                    key={el.id}
                                    question={el}
                                    addAnswers={addAnswers}
                                    addAnotherAnswers={addAnotherAnswers}
                                />
                            )}
                        </>
                    ))}
                </div>
                <div className={cnMain("footer")}>
                    <div className={cnMain("footer-block-btn")}>
                        <button
                            disabled={!canMoved}
                            onClick={changeStep}
                            className={cnMain("btn", { disabled: !canMoved })}
                        >
                            {(step === allStep) && (<>Завершить</>)}
                            {(step !== allStep) && (<>Далее</>)}
                        </button>
                    </div>

                    <div>
                        <b className={cnMain("footer-current-step")}>
                            {step + 1}
                        </b>{" "}
                        <b className={cnMain("footer-all-step")}>
                        / {allStep + 1}
                        </b>
                    </div>
                </div>
            </div>)} 
            {step > allStep   && (
                <TarifPage></TarifPage>
            )}
        </SurveyLayout>
    );
}