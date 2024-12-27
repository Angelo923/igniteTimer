import {Play, Stop} from "phosphor-react";
import {
    HomeContainer,
    StartCountdownButton,
    StopCountdownButton,
} from "./styles.ts";
import NewCycleForm from "./components/NewCycleForm";
import Countdown from "./components/Countdown";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as zod from "zod";
import {useContext} from "react";
import {CyclesContext} from "../../contexts/CyclesContext.tsx";

// CONTROLLED = TEMPO REAL, useState()
// UNCONTROLLED = usando javascript ou html, sem controle em tempo real do que é digitado


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
    const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

    const newCycleForm = useForm<INewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const { handleSubmit, watch, reset } = newCycleForm;

    function handleCreateNewCycle(data: INewCycleFormData) {
        createNewCycle(data)
        reset()
    }

    const task = watch('task');
    const isSubmitDisabled = !task;

     /*Props Drilling -> Quando se tem muitas propriedades apenas para comunicação entre componentes
     Context API -> Permite compartilharmos informações entre Vários Componentes*/

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm/>
                    </FormProvider>
                        <Countdown />
                {activeCycle ? (
                    <StopCountdownButton onClick={interruptCurrentCycle} type="button">
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