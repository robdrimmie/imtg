# IMTG

## Testing

I like to test in the terminal pane of my text editor but in whatever terminal, run: `npm run test:watch` to run the tests when files are saved

Tests with `(real Dice)` in their name have specific values they expect but are dependant on a real instance of Dice, typically seeded with `20`. But if the order or number of dice rolls changes - which happens often - the tests will break. So this should help identify those quickly.