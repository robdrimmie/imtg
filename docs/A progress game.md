```mermaid
flowchart TD
    A{is game started};

    B1[B start game.md];
    B2[autoplay turns];

    CHAR[progress characters];

    PART[progress party.md];

    STOR[update stores];

    VEND[progress vendors];

    F{all win conditions returned?}

    G((game is won))

    A -- NO --> B1;
    A -- YES --> CHAR;

    B1 --> B2;
    B2 --> CHAR;

    CHAR --> PART;

    PART --> VEND;

    VEND --> STOR;

    STOR --> F;

    F -- NO --> A;
    F -- YES --> G;
```