import { useEffect, useState } from "react";
import styled from "styled-components";

const WaitingContainer = styled.span`
    color: #888;
    font-size: 1rem;
    letter-spacing: 0.1em;
`;

/**
 * Animated waiting indicator that cycles through . → .. → ... → .
 * Complies with RULE-006 from ONLINE_MULTIPLAYER_SPEC.md
 */
export const WaitingText = () => {
    const [dots, setDots] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev % 3) + 1);
        }, 333); // 333ms per stage = 1 second full cycle

        return () => clearInterval(interval);
    }, []);

    return (
        <WaitingContainer>
            Waiting for opponent{".".repeat(dots)}
        </WaitingContainer>
    );
};
