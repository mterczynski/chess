import styled from "styled-components";

/**
 * A styled button component for consistent UI across the app.
 *
 * @component
 * @param {boolean} [gray] - If true, renders a gray button variant. Otherwise, renders the primary blue button.
 * @example
 * <Button>Submit</Button>
 * <Button gray>Cancel</Button>
 */
export const Button = styled.button<{ gray?: boolean }>`
    padding: 0.7rem 1.5rem;
    border-radius: 6px;
    border: none;
    background: ${({ gray }) => (gray ? "#ccc" : "#2d8cff")};
    color: ${({ gray }) => (gray ? "#222" : "#fff")};
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
        background: ${({ gray }) => (gray ? "#bbb" : "#1861ad")};
    }
`;
