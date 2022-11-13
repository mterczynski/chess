import styled from "styled-components";

export const Button = styled.button<{ background?: string; color?: string }>`
    cursor: pointer;
    font-size: 28px;
    margin-right: 0.5em;
    margin-left: 0.5em;
    background: ${({ background }) => background};
    color: ${({ color }) => color};
`;
