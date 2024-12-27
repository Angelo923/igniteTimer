import {STATUS_COLORS} from "../pages/History/styles.ts";
import {ReactNode} from "react";

export type TButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

export interface IButtonForm {
    color?: TButtonVariant;
}
export interface IButtonContainer {
    variant: TButtonVariant;
}

export interface IStatusColor {
    statusColor: keyof typeof STATUS_COLORS;
}

export interface ICreateCycleData {
    task: string;
    minutesAmount: number;
}

export interface ICycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptDate?: Date;
    finishedDate?: Date;
}

export interface ICyclesContext {
    cycles: ICycle[];
    activeCycle: ICycle | undefined;
    activeCycleId: string | null;
    amountSecondsElapsed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsElapsed: (seconds: number) => void;
    createNewCycle: (data: ICreateCycleData) => void;
    interruptCurrentCycle: () => void;
}

export interface ICyclesContextProvider {
    children: ReactNode;
}

export interface ICycleState {
    cycles: ICycle[];
    activeCycleId: string | null;
}

