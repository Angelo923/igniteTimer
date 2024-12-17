import {Play} from "phosphor-react";
import {
    CountDownContainer,
    FormContainer,
    HomeContainer, MinutesAmountInput,
    Separator,
    StartCountdownButton,
    TaskInput
} from "./styles.ts";

function Home() {
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        type="text"
                        name="task"
                        placeholder="Dê um nome para seu projeto"
                        list="task-suggestion"
                    />

                    <datalist id="task-suggestion">
                        <option value="Estudar Inglês" />
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput
                        type="number"
                        name="durante"
                        id="minutesAmount"
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}

                    />

                    <span>minutos.</span>
                </FormContainer>

                <CountDownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>

                <StartCountdownButton disabled type="submit">
                    <Play size="24"/>
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}

export default Home;