import {createContext, useEffect, useReducer, useState} from "react";
import {
    ICreateCycleData,
    ICyclesContext,
    ICyclesContextProvider,
} from "../CreateUpdate/interface.ts";
import cyclesReducer from "../reducers/cycles/reducer.ts";
import {
    addNewCycleAction,
    interruptCurrentCycleAction,
    markCurrentCycleAsAction
} from "../reducers/cycles/actions.ts";
import {differenceInSeconds} from "date-fns";

export const CyclesContext = createContext({} as ICyclesContext)

export function CyclesContextProvider({
  children,
}: ICyclesContextProvider) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer,
        {
         cycles: [],
         activeCycleId: null,
        },
        (initialState) => {
        const storedStateAsJSON = localStorage.getItem(
            '@ignite-timer:cycles-state-1.0.0'
        )

        if (storedStateAsJSON) {
            return JSON.parse(storedStateAsJSON);
        }

        return initialState
    },
)

    const { cycles, activeCycleId } = cyclesState
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const [amountSecondsElapsed, setAmountSecondsElapsed] = useState(() => {
        if (activeCycle) {
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }

        return 0
    })

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)
        localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
    },[cyclesState])

    function setSecondsElapsed(seconds: number) {
        setAmountSecondsElapsed(seconds)
    }

    function markCurrentCycleAsFinished() {

        dispatch(markCurrentCycleAsAction())
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

        dispatch(addNewCycleAction(newCycle))

        setAmountSecondsElapsed(0)

    }

    function interruptCurrentCycle() {

        dispatch(interruptCurrentCycleAction())
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