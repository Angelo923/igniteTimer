import {IButtonForm} from "../CreateUpdate/interface.ts";
import {ButtonContainer} from "./Button.styles.ts";



function Button({color = 'primary'}: IButtonForm) {
    return <ButtonContainer variant={color}>Enviar</ButtonContainer>
}

export default Button;