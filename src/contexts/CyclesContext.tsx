import {createContext, useReducer, useState} from "react";
import {
    ICreateCycleData,
    ICyclesContext,
    ICyclesContextProvider,
    ICycleState
} from "../CreateUpdate/interface.ts";

export const CyclesContext = createContext({} as ICyclesContext)

export function CyclesContextProvider({
  children,
}: ICyclesContextProvider) {
    const [cyclesState, dispatch] = useReducer(
        (state: ICycleState, action: any)=> {

        if (action.type === 'ADD_NEW_CYCLE') {
            return {
                ...state,
                cycles: [...state.cycles, action.payload.newCycle],
                activeCycleId: action.payload.newCycle.id,
            }
        }

        if (action.type === 'INTERRUPT_CURRENT_CYCLE') {
            return {
                ...state,
                cycles: state.cycles.map(cycle => {
                    if (cycle.id === state.activeCycleId) {
                        return {...cycle, interruptDate: new Date()}
                    } else {
                        return cycle
                    }
                }),
                activeCycleId: null,
            }
        }

        if (action.type === 'MARK_CURRENT_CYCLE_AS_FINISHED') {
            return {
                ...state,
                cycles: state.cycles.map(cycle => {
                    if (cycle.id === state.activeCycleId) {
                        return {...cycle, finishedDate: new Date()}
                    } else {
                        return cycle
                    }
                }),
                activeCycleId: null,
            }
        }

        return state
    }, {
        cycles: [],
        activeCycleId: null,
    })

    const [amountSecondsElapsed, setAmountSecondsElapsed] = useState(0)

    const { cycles, activeCycleId } = cyclesState
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function setSecondsElapsed(seconds: number) {
        setAmountSecondsElapsed(seconds)
    }

    function markCurrentCycleAsFinished() {

        dispatch({
            type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
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
            type: 'ADD_NEW_CYCLE',
            payload: {
                newCycle,
            }
        })

        setAmountSecondsElapsed(0)

    }

    function interruptCurrentCycle() {

        dispatch({
            type: 'INTERRUPT_CURRENT_CYCLE',
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