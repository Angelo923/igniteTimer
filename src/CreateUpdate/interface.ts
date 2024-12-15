export type TButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

export interface IButtonForm {
    color?: TButtonVariant;
}
export interface IButtonContainer {
    variant: TButtonVariant;
}