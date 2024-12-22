import {HeaderContainer} from "./styles.ts";
import igniteLogo from '../../assets/Logo.svg'
import {Scroll, Timer} from "phosphor-react";
import {NavLink} from "react-router-dom";

function Header() {
    return (
        <HeaderContainer>
            <span>
                <img
                    src={igniteLogo}
                    alt="Logo do Ignite, dois triangulos seguidos a 45 graus na cor verde"/>
            </span>
            <nav>
                <NavLink
                    to="/"
                    title="Timer"
                >
                    <Timer size={24}/>
                </NavLink>
                <NavLink
                    to="/history"
                    title="History"
                >
                    <Scroll size={24}/>
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}

export default Header;