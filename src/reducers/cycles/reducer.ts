import { ICycleState } from "../../CreateUpdate/interface.ts";
import { ActionTypes } from "./actions.ts";
import {produce} from "immer";

function cyclesReducer(state: ICycleState, action: any) {
    switch (action.type) {
        case ActionTypes.ADD_NEW_CYCLE:
            /*            return {
                            ...state,
                            cycles: [...state.cycles, action.payload.newCycle],
                            activeCycleId: action.payload.newCycle.id,
                        }*/
            return produce(state, (draft) => {
                draft.cycles.push(action.payload.newCycle);
                draft.activeCycleId = action.payload.newCycle.id;
            })
        case ActionTypes.INTERRUPT_CURRENT_CYCLE:
            /*            return {
                ...state,
                cycles: state.cycles.map(cycle => {
                    if (cycle.id === state.activeCycleId) {
                        return {...cycle, interruptDate: new Date()}
                    } else {
                        return cycle
                    }
                }),
                activeCycleId: null,
            }*/
        {
            const currentCycleIndex = state.cycles.findIndex(cycle => {
                return cycle.id === state.activeCycleId
            })

            if (currentCycleIndex === -1) {
                return state
            }

            return produce(state, (draft) => {
                draft.activeCycleId = null
                draft.cycles[currentCycleIndex].interruptDate = new Date()
            })
        }
        case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
            /*return {
                ...state,
                cycles: state.cycles.map(cycle => {
                    if (cycle.id === state.activeCycleId) {
                        return {...cycle, finishedDate: new Date()}
                    } else {
                        return cycle
                    }
                }),
                activeCycleId: null,
            }*/
        {
            const currentCycleIndex = state.cycles.findIndex(cycle => {
                return cycle.id === state.activeCycleId
            })

            if (currentCycleIndex === -1) {
                return state
            }

            return produce(state, (draft) => {
                draft.activeCycleId = null
                draft.cycles[currentCycleIndex].finishedDate = new Date()
            })
        }

        default:
            return state
    }
}

export default cyclesReducer;