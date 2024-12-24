import {Play, Stop} from "phosphor-react";
import {
    HomeContainer,
    StartCountdownButton,
    StopCountdownButton,
} from "./styles.ts";
import {useEffect, useState} from "react";
import {ICycle} from "../../CreateUpdate/interface.ts";
import { v4 as uuidv4 } from 'uuid';
import NewCycleForm from "./components/NewCycleForm";
import Countdown from "./components/Countdown";

// CONTROLLED = TEMPO REAL, useState()
// UNCONTROLLED = usando javascript ou html, sem controle em tempo real do que é digitado
/*
*  function register(name: string) {
*  return {
*   onChange: () => void,
*   onBlur: () => void,
*   onFocus: () => void,
*   }
* }
* */

function Home() {
    const [cycles, setCycles] = useState<ICycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function handleCreateNewCycle(data: INewCycleFormData) {
        const id = uuidv4()

        const newCycle = {
            //id: String(new Date().getTime()),
            //id: String(idLib),
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        setCycles((state) => [...state, newCycle])
        setActiveCycleId(id)
        setAmountSecondsElapsed(0)

        reset();

    }

    function handleInterruptCycle() {
        setCycles(state =>
            state.map(cycle => {
                if (cycle.id === activeCycleId) {
                    return {...cycle, interruptDate: new Date()}
                } else {
                  return cycle
            }
        }),
        )
        setActiveCycleId(null);
    }

    const currentSeconds = activeCycle ? CyclesSeconds - amountSecondsElapsed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');

    useEffect(() => {
        if (activeCycle) {
            document.title = `Ignite Timer - ${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle]);

    const task = watch('task');
    const isSubmitDisabled = !task;

    /**
     *  Props Drilling -> Quando se tem muitas propriedades apenas para comunicação entre componentes
     *  Context API -> Permite compartilharmos informações entre Vários Componentes
     */


    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

                <NewCycleForm/>

                <Countdown />

                {activeCycle ? (
                    <StopCountdownButton onClick={handleInterruptCycle} type="button">
                        <Stop size="24"/>
                        Parar
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
                    <Play size="24"/>
                    Começar
                </StartCountdownButton>)}
            </form>
        </HomeContainer>
    )
}

export default Home;