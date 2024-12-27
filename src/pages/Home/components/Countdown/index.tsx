import {CountDownContainer, Separator} from "./styles.ts";
import {useContext, useEffect} from "react";
import {differenceInSeconds} from "date-fns";
import {CyclesContext} from "../../../../contexts/CyclesContext.tsx";

function CountDown() {
    const {
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsElapsed,
        setSecondsElapsed,
    } = useContext(CyclesContext)

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
                    markCurrentCycleAsFinished()
                    setSecondsElapsed(CyclesSeconds)
                    clearInterval(interval)
                } else {
                    setSecondsElapsed(secondsDifference)
                }
            }, 1000)
        }
        return () => {
            clearInterval(interval)
        }
    },  [activeCycle, activeCycleId, CyclesSeconds, setSecondsElapsed])

    const currentSeconds = activeCycle ? CyclesSeconds - amountSecondsElapsed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');

    useEffect(() => {
        if (activeCycle) {
            document.title = `Ignite Timer - ${minutes}:${seconds}`
        }
    }, [
        minutes,
        seconds,
        activeCycle,
        markCurrentCycleAsFinished,
    ]);

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