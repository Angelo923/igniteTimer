import {CountDownContainer, Separator} from "./styles.ts";
import {useEffect, useState} from "react";
import {differenceInSeconds} from "date-fns";

function CountDown() {
    const [amountSecondsElapsed, setAmountSecondsElapsed] = useState(0)

    const CyclesSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

    useEffect(() => {
        let interval: number;

        if (activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                    new Date(),
                    activeCycle.startDate,
                )

                if (secondsDifference >= CyclesSeconds) {
                    setCycles(state =>
                        state.map(cycle => {
                            if (cycle.id === activeCycleId) {
                                return {...cycle, finishedDate: new Date()}
                            } else {
                                return cycle
                            }
                        }),
                    )

                    setAmountSecondsElapsed(CyclesSeconds)
                    clearInterval(interval)
                } else {
                    setAmountSecondsElapsed(secondsDifference)
                }
            }, 1000)
        }
        return () => {
            clearInterval(interval)
        }
    },  [activeCycle, activeCycleId, CyclesSeconds])


    return (
        <CountDownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountDownContainer>
    )
}

export default CountDown;