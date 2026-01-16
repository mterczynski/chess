# Online Multiplayer Specification

> **Constitution & Source of Truth** for all online multiplayer features  
> Last Updated: January 15, 2026

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [User Flow](#user-flow)
3. [Core Rules](#core-rules)
4. [Component Specifications](#component-specifications)
5. [API Contracts](#api-contracts)
6. [State Management](#state-management)
7. [Error Handling](#error-handling)
8. [Future Enhancements](#future-enhancements)

---

## Overview

This document defines the complete behavior, rules, and implementation details for the online multiplayer chess feature. All implementation decisions must conform to this specification.

---

## User Flow

### Complete Journey

```
┌─────────────────┐
│   Anonymous     │
└────────┬────────┘
         │
         v
┌─────────────────┐
│  Auth Screen    │ ◄── Login or Register
└────────┬────────┘
         │
         v
┌─────────────────┐
│  Lobby List     │ ◄── Shows all available lobbies
└────┬───────┬────┘
     │       │
     │       └─────► Create New Lobby
     │                     │
     v                     v
┌─────────────────┐   ┌─────────────────┐
│  Join Lobby     │   │ Create Lobby    │
│ (with password) │   │   Form          │
└────────┬────────┘   └────────┬────────┘
         │                     │
         └──────────┬──────────┘
                    v
         ┌─────────────────┐
         │   Lobby Room    │ ◄── Waiting for opponent
         └────────┬────────┘
                  │ (both players joined)
                  v
         ┌─────────────────┐
         │  Board (Game)   │ ◄── Real-time gameplay
         └─────────────────┘
```

---

## Core Rules

### RULE-001: Player Color Assignment
**First joiner = White, Second joiner = Black**

- The user who creates the lobby is Player 1 (White)
- The first user to join the lobby is Player 2 (Black)
- Color assignment is permanent for the duration of the game
- Cannot be changed or swapped

### RULE-002: Lobby States

A lobby can be in one of the following states:

1. **WAITING** - Only creator (1 player) present
2. **READY** - Both players present, game can start
3. **IN_PROGRESS** - Game is active
4. **COMPLETED** - Game finished (checkmate, stalemate, draw)

### RULE-003: Lobby Access

- Public lobbies (no password): Anyone can join
- Private lobbies (with password): Requires correct password to join
- Password validation happens server-side before SSE subscription
- Invalid password = 403 Forbidden error

### RULE-004: Real-time Updates

- SSE (Server-Sent Events) used for real-time game updates
- Client subscribes to lobby updates on enter
- Server broadcasts:
  - Move updates
  - Player join/leave events
  - Game state changes
- Client automatically reconnects on connection loss

### RULE-005: Move Validation

- All moves validated server-side by game-engine
- Invalid moves rejected with 400 Bad Request
- Client should prevent invalid moves UI-side (optimistic UI)
- Server state is source of truth

### RULE-006: Waiting State Display

- Shows animated "Waiting for opponent..." when 1/2 players
- Animation: `. → .. → ... → .` (1 second cycle)
- Disappears when second player joins
- Reappears if player leaves (future enhancement)

### RULE-007: Player Name Display

- Both player names shown at all times in lobby room
- Format:
  - **White: [Player 1 Name]**
  - **Black: [Player 2 Name]** (or "Waiting..." if not joined)
- Player's own name highlighted/bolded

---

## Component Specifications

### WaitingText Component

**Purpose**: Animated waiting indicator

**Location**: `client/src/menus/WaitingText.tsx`

**Props**: None

**Behavior**:
- Cycles through: `.` → `..` → `...` → back to `.`
- 333ms per stage (1 second full cycle)
- Uses React state + useEffect + setInterval
- Clean up interval on unmount

**Styling**:
- Color: `#888` (subtle gray)
- Font size: `1rem`
- Letter spacing: `0.1em` (for better dot visibility)

**Example Output**:
```
Waiting for opponent.
Waiting for opponent..
Waiting for opponent...
Waiting for opponent.
```

---

### LobbyRoom Component

**Purpose**: Container for game board with lobby context

**Location**: `client/src/menus/LobbyRoom.tsx`

**Props**:
```typescript
interface LobbyRoomProps {
  lobbyId: number;
  password: string;
  onBack: () => void;
}
```

**Responsibilities**:
1. Subscribe to lobby SSE updates
2. Display player names (White/Black)
3. Show waiting state if only 1 player
4. Render Board component when ready
5. Handle move submission to server
6. Display game over state

**State**:
```typescript
const [lobbyDetails, setLobbyDetails] = useState<LobbyDetailsDto | null>(null);
const [isWaiting, setIsWaiting] = useState(true);
const [error, setError] = useState<string | null>(null);
```

**Layout**:
```
┌─────────────────────────────┐
│ [← Back]     LOBBY #123     │
├─────────────────────────────┤
│ ♔ White: PlayerName1        │
│ ♚ Black: PlayerName2        │  ◄── or "Waiting..." with WaitingText
├─────────────────────────────┤
│                             │
│      Board Component        │
│                             │
└─────────────────────────────┘
```

**SSE Integration**:
```typescript
useEffect(() => {
  const eventSource = new EventSource(
    `${settings.serverURL}/lobby/${lobbyId}/game-updates`,
    { headers: { 'x-lobby-password': password } }
  );
  
  eventSource.onmessage = (event) => {
    const update: LobbyUpdateDto = JSON.parse(event.data);
    // Update local state with new game state
  };
  
  return () => eventSource.close();
}, [lobbyId, password]);
```

---

## API Contracts

### GET /lobby
**Response**: `LobbySummaryDto[]`
```typescript
{
  id: number;
  moves: number;
  gameState: GameState;
  creatorName: string;
  users: LobbyUserDto[];
  hasPassword: boolean;
}
```

### POST /lobby/:id
**Request Body**:
```typescript
{ password: string }
```
**Response**: `LobbyDetailsDto`

### SSE /lobby/:id/game-updates
**Headers**: `x-lobby-password: string`
**Stream Data**: `LobbyUpdateDto`
```typescript
{
  move: Move;
  lobby: LobbyDetailsDto;
}
```

### POST /lobby/:id/move
**Request Body**:
```typescript
{
  move: Move;
  password: string;
}
```
**Response**: `LobbyDetailsDto`

---

## State Management

### GameClientContext Extensions

Add new state for online mode:

```typescript
interface OnlineLobbyState {
  selectedLobbyId: number | null;
  lobbyPassword: string | null;
  currentScreen: 'list' | 'create' | 'room';
}
```

**Methods**:
- `selectLobby(id: number, password: string)` - Join a lobby
- `leaveLobby()` - Exit lobby room
- `setLobbyScreen(screen)` - Navigate between screens

---

## Error Handling

### Common Error Scenarios

1. **Lobby Not Found (404)**
   - Message: "This lobby no longer exists"
   - Action: Redirect to lobby list

2. **Incorrect Password (403)**
   - Message: "Incorrect password"
   - Action: Stay on lobby list, show error toast

3. **Lobby Full (400)**
   - Message: "This lobby is full"
   - Action: Stay on lobby list, disable join button

4. **Invalid Move (400)**
   - Message: "Invalid move"
   - Action: Reject move, keep current state

5. **Network Error**
   - Message: "Connection lost. Reconnecting..."
   - Action: Auto-reconnect SSE, retry up to 3 times

---

## Future Enhancements

### Phase 2 (Not in Current Scope)

- [ ] Player leave/rejoin handling
- [ ] Spectator mode
- [ ] Game clocks/timers
- [ ] Chat functionality
- [ ] Move history panel
- [ ] Undo/takeback requests
- [ ] Draw offers
- [ ] Resignation
- [ ] Game analysis/review
- [ ] ELO rating system
- [ ] Match history
- [ ] Friend system
- [ ] Tournament mode

---

## Implementation Checklist

- [ ] Create WaitingText component
- [ ] Create LobbyRoom component
- [ ] Add online state to GameClientContext
- [ ] Update LobbyList with join handler
- [ ] Update OnlineModeScreenSelector routing
- [ ] Add password prompt dialog
- [ ] Integrate Board with online moves
- [ ] Add SSE error handling
- [ ] Add loading states
- [ ] Test full flow end-to-end

---

## Notes

- This spec should be updated whenever new rules or features are added
- All PRs must reference relevant RULE-XXX numbers
- Breaking changes to this spec require team discussion
- Use this document to resolve any implementation ambiguities

