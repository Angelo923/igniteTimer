import styled  from "styled-components";
import {IStatusColor} from "../../CreateUpdate/interface.ts";

export const HistoryContainer = styled.main`
    flex: 1;
    padding: 3.5rem;
    
    display: flex;
    flex-direction: column;
    
    h1 {
        font-size: 1.5rem;
        color: ${props => props.theme['gray-100']};
    }
`;

export const HistoryList = styled.main`
    flex: 1;
    overflow-y: auto;
    margin-top: 2rem;
    
    table {
        width: 100%;
        border-collapse: collapse;
        min-width: 600px;
        color: ${props => props.theme['gray-100']};
        
        th {
            background-color: ${props => props.theme['gray-600']};
            padding: 1rem;
            text-align: left;
            color: ${props => props.theme['gray-100']};
            font-size: 0.875rem;
            line-height: 1.6rem;
            
            &:first-child {
                border-top-left-radius: 8px;
                padding-left: 1.5rem;
            }

            &:last-child {
                border-top-right-radius: 8px;
                padding-right: 1.5rem;
            }
        }
        td {
            background-color: ${props => props.theme['gray-700']};
            border-top: 4px solid ${props => props.theme['gray-800']};
            padding: 1rem;
            font-size: 0.875rem;
            line-height: 1.6rem;

            &:first-child {
                width: 50%;
                padding-left: 1.5rem;
            }

            &:last-child {
                padding-right: 1.5rem;
            }
        }
    }
`;

export const STATUS_COLORS = {
    yellow: 'yellow-500',
    green: 'green-500',
    red: 'red-500',
    gray: 'gray-500',
} as const;

export const Status = styled.span<IStatusColor>`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &::before {
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 9999px;
        background: ${props => props.theme[STATUS_COLORS[props.statusColor]]};
        
    }
`;