import { cn } from "@bem-react/classname";

import "./style.scss";
import NoPhoto from "./assets/no-photo.png";

type Props = {
    imageUrl?: string;
    displayName?: string;
};

const cnProfilePreview = cn("profile-preview");

export default function ProfilePreview(props: Props) {
    return (
        <div className={cnProfilePreview()}>
            <img
                className={cnProfilePreview("photo")}
                src={props.imageUrl || NoPhoto}
                alt="Avatar"
            />
            <div>
                {props.displayName ? (
                    <>
                        <span>Добрый день,</span>
                        <br />
                        <span>{props.displayName}</span>
                    </>
                ) : (
                    <span>Добрый день!</span>
                )}
            </div>
        </div>
    );
}
