import {Play} from "phosphor-react";
import {
    CountDownContainer,
    FormContainer,
    HomeContainer, MinutesAmountInput,
    Separator,
    StartCountdownButton,
    TaskInput
} from "./styles.ts";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
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
    const {register, handleSubmit, watch, reset} = useForm<INewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 5,
        }
    })

    function handleCreateNewCycle(data: INewCycleFormData) {
        console.log(data);
        reset();
    }


    const minutesAmount = watch('minutesAmount');
    const isSubmitDisabled = !minutesAmount;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        type="text"
                        placeholder="Dê um nome para seu projeto"
                        list="task-suggestion"
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
                        step={5}
                        min={5}
                        max={60}
                        {...register('minutesAmount', {valueAsNumber: true})}
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

                <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
                    <Play size="24"/>
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}

export default Home;