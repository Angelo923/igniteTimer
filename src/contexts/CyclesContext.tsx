import {createContext, useReducer, useState} from "react";
import {
    ActionTypes,
    ICreateCycleData,
    ICyclesContext,
    ICyclesContextProvider,
} from "../CreateUpdate/interface.ts";
import cyclesReducer from "../reducers/cycles.ts";

export const CyclesContext = createContext({} as ICyclesContext)

export function CyclesContextProvider({
  children,
}: ICyclesContextProvider) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer,
        {
         cycles: [],
         activeCycleId: null,
        },
    )

    const [amountSecondsElapsed, setAmountSecondsElapsed] = useState(0)

    const { cycles, activeCycleId } = cyclesState
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function setSecondsElapsed(seconds: number) {
        setAmountSecondsElapsed(seconds)
    }

    function markCurrentCycleAsFinished() {

        dispatch({
            type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
            payload: {
                activeCycleId,
            },
        })
    }

    function createNewCycle(data: ICreateCycleData) {
        const id = String(new Date().getTime())
        //const id = uuidv4()

        const newCycle = {
            //id: String(new Date().getTime()),
            //id: String(idLib),
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatch({
            type: ActionTypes.ADD_NEW_CYCLE,
            payload: {
                newCycle,
            }
        })

        setAmountSecondsElapsed(0)

    }

    function interruptCurrentCycle() {

        dispatch({
            type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
            payload: {
                activeCycleId,
            },
        })
    }

    return (
        <CyclesContext.Provider value={{
            cycles,
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsElapsed,
            setSecondsElapsed,
            createNewCycle,
            interruptCurrentCycle,
        }}
        >
            {children}
        </CyclesContext.Provider>
    )
}