just a bulleted list of everything that happens.

character.progress()
-  progressAttributes()
    - reset character attributes
    - aggregate item modifications
    - apply modifications to character attributes
-  progressTileRelationships()
    - see tileRelationship.progress
-  progressBestTiles()
    - using the overall score for each action in a tile relationship, 
      choose which tile is best for each action
-  progressDesires()
    - for each action
      - using appropriate resource and capacity scores
      - score each possible action


tileRelationship.progress