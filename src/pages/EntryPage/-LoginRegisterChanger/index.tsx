import { cn } from "@bem-react/classname";
import { useNavigate } from "react-router-dom";

import { PageType } from "../../../models/entry";

import Link from "../../../components/ui-kit/Link";

import "./style.scss";

interface LoginRegisterChangerProps {
    pageType: PageType;
}

const cnLoginRegisterChanger = cn("login-register-changer");

export default function LoginRegisterChanger(props: LoginRegisterChangerProps) {
    const navigate = useNavigate();
    return (
        <div className={cnLoginRegisterChanger()}>
            {props.pageType === PageType.Register ? (
                <>
                    <span>Уже есть аккаунт?</span>
                    <Link onClick={() => navigate("/login")}>Войти</Link>
                </>
            ) : (
                <>
                    <span>Еще нет аккаунта?</span>
                    <Link onClick={() => navigate("/register")}>
                        Зарегистрироваться
                    </Link>
                </>
            )}
        </div>
    );
}
