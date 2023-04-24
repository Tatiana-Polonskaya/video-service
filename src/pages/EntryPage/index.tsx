import { ReactSVG } from "react-svg";
import { cn } from "@bem-react/classname";

import EntryPageBusiness from "./-Business";
import EntryPagePersonal from "./-Personal";

import RegImage from "./assets/reg-image.svg";

import "./style.scss";
import { useState } from "react";

const cnEntryPage = cn("entry-page");

enum PageState {
    Personal,
    Business,
}

type RadioItemProps = {
    condition: boolean;
    changer: React.ChangeEventHandler<HTMLInputElement>;
    label: string;
};

const RadioItem = (props: RadioItemProps) => (
    <label>
        <input
            type="radio"
            checked={props.condition}
            onChange={props.changer}
        />
        <span>{props.label}</span>
    </label>
);

const PageHelper = ({ state }: { state: PageState }) =>
    ({
        [PageState.Personal]: <EntryPagePersonal />,
        [PageState.Business]: <EntryPageBusiness />,
    }[state]);

export default function EntryPage() {
    const [pageState, setPageState] = useState(PageState.Personal);

    return (
        <div className={cnEntryPage()}>
            <div className={cnEntryPage("main")}>
                <div>
                    <RadioItem
                        condition={pageState === PageState.Personal}
                        changer={() => setPageState(PageState.Personal)}
                        label="Для себя"
                    />
                    <RadioItem
                        condition={pageState === PageState.Business}
                        changer={() => setPageState(PageState.Business)}
                        label="Для бизнеса"
                    />
                    <PageHelper state={pageState} />
                </div>
            </div>
            <ReactSVG src={RegImage} />
        </div>
    );
}
