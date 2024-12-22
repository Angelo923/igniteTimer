import {Play, Stop} from "phosphor-react";
import {
    CountDownContainer,
    FormContainer,
    HomeContainer, MinutesAmountInput,
    Separator,
    StartCountdownButton, StopCountdownButton,
    TaskInput
} from "./styles.ts";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import {useEffect, useState} from "react";
import {ICycle} from "../../CreateUpdate/interface.ts";
import { v4 as uuidv4 } from 'uuid';
import {differenceInSeconds} from "date-fns";

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

const newCycleFormValidationSchema = zod.object({
    task: zod
        .string()
        .min(1, 'Informe a Tarefa'),
    minutesAmount: zod
        .number()
        .min(5)
        .max(60),
})

type INewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

function Home() {
    const [cycles, setCycles] = useState<ICycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsElapsed, setAmountSecondsElapsed] = useState(0)

    const {register, handleSubmit, watch, reset} = useForm<INewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    useEffect(() => {
        let interval: number;
        if (activeCycle) {
            interval = setInterval(() => {
                setAmountSecondsElapsed(
                    differenceInSeconds(new Date(), activeCycle.startDate),
                )
            }, 1000)

            return () => {
                clearInterval(interval)
            }
        }
    },  [activeCycle])

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
        setCycles(cycles.map(cycle => {
            if (cycle.id === activeCycleId) {
                return {...cycle, interruptDate: new Date()}
            } else {
                return cycle
            }
        }),
        )
        setActiveCycleId(null);
    }

    const CyclesSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
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

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        list="task-suggestion"
                        placeholder="Dê um nome para seu projeto"
                        disabled={!!activeCycle}
                        {...register('task')}
                    />

                    <datalist id="task-suggestion">
                        <option value="Estudar Inglês" />
                        <option value="Estudar Espanhol" />
                        <option value="Estudar React" />
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput
                        type="number"
                        id="minutesAmount"
                        placeholder="00"
                        disabled={!!activeCycle}
                        step={5}
                        min={5}
                        max={60}
                        {...register('minutesAmount', {valueAsNumber: true})}
                    />

                    <span>minutos.</span>
                </FormContainer>

                <CountDownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountDownContainer>

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