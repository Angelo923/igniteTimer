import {STATUS_COLORS} from "../pages/History/styles.ts";

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

export interface ICycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptDate?: Date;
}