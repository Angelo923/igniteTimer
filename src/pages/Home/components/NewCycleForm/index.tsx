import {FormContainer, MinutesAmountInput, TaskInput} from "./styles.ts";
import {useContext} from "react";
import {useFormContext} from "react-hook-form";
import {CyclesContext} from "../../../../contexts/CyclesContext.tsx";


/*function register(name: string) {
 return {
  onChange: () => void,
  onBlur: () => void,
  onFocus: () => void,
  }
}*/

function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext)
    const { register } = useFormContext()

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