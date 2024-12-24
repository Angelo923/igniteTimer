import {FormContainer, MinutesAmountInput, TaskInput} from "./styles.ts";
import * as zod from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const newCycleFormValidationSchema = zod.object({
    task: zod
        .string()
        .min(1, 'Informe a Tarefa'),
    minutesAmount: zod
        .number()
        .min(1)
        .max(60),
})

type INewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

function NewCycleForm() {
    const {register, handleSubmit, watch, reset} = useForm<INewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    return (
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
                min={1}
                max={60}
                {...register('minutesAmount', {valueAsNumber: true})}
            />

            <span>minutos.</span>
        </FormContainer>
    )
}

export default NewCycleForm;