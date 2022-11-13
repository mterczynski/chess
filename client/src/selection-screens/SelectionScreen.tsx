import styled from "styled-components";

const Container = styled.div`
    position: absolute;
    color: white;
    background-color: #4b4b4b;
    width: 100%;
    height: 100%;
    max-width: 480px;
    max-height: 300px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

interface SelectionScreenProps {
    children: React.ReactNode;
}

export const SelectionScreen = ({ children }: SelectionScreenProps) => {
    return <Container>{children}</Container>;
};
