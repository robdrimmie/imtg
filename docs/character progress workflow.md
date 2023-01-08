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
    - I believe this is behaving okay though that needs to be confirmed
    - and character attributes need to impact the setpoint value being used
-  progressTileScores()
    - using the overall score for each action in a tile relationship, 
      choose which tile is best for each action
    - I do not have confidence in how this is behaving

tileRelationship.progress()
- to be documented