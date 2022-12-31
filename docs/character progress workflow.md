just a bulleted list of everything that happens.

character.progress()
-  progressAttributes()
    - reset character attributes
    - aggregate item modifications
    - apply modifications to character attributes
    - I feel pretty comfortable that this works though it isn't under meaningful test coverage
-  progressTileRelationships()
    - see tileRelationship.progress
    - I feel pretty comfortable that this works though it isn't under meaningful test coverage
-  progressActionScores()
    - for each action
      - using appropriate resource and capacity scores
      - score each possible action
    - I do not have confidence in how this is behaving
-  progressTileScores()
    - using the overall score for each action in a tile relationship, 
      choose which tile is best for each action
    - I do not have confidence in how this is behaving

tileRelationship.progress()
- to be documented

