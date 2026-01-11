import styled from "styled-components";
import { settings } from "../settings";

const NavbarContainer = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    align-items: center;
    gap: 1rem;
    background: rgba(255, 255, 255, 0.95);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 100;
`;

const UserName = styled.span`
    font-weight: 600;
    color: #333;
`;

const SignOutButton = styled.button`
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
    border-radius: 6px;
    border: 1px solid #dc3545;
    background: #dc3545;
    color: #fff;
    font-weight: 500;
    cursor: pointer;
    transition:
        background 0.2s,
        border-color 0.2s;

    &:hover {
        background: #c82333;
        border-color: #bd2130;
    }
`;

export const UserNavbar = () => {
    const getUserName = () => {
        const token = localStorage.getItem(settings.localStorageKeys.jwt);
        if (!token) return null;
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.name;
        } catch {
            return null;
        }
    };

    const userName = getUserName();

    const handleSignOut = () => {
        localStorage.removeItem(settings.localStorageKeys.jwt);
        // Trigger storage event for same tab
        window.dispatchEvent(new Event("storage"));
    };

    if (!userName) return null;

    return (
        <NavbarContainer>
            <UserName>{userName}</UserName>
            <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
        </NavbarContainer>
    );
};
