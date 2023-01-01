This is not a great doc or anything but I keep coming across the same two basic math problems and forgetting how to do them.

So in one circumstance I am trying to get a modifier that makes something more likely to happen the more it increases.. those words don't make sense and thus my problems here.

In the other case, I need to get an average.

So the average is used for comparison purposes and the 0 bad 2+ good scale is used for decision-making purposes

that's perhaps the best articulation I've gotten of it yet.

this document eventually won't be dicsussion and will just be reference.

## Averages are for comparison purposes

So determining whether or not an attribute is enough or what an attribute score is. 

Attributes range in value from 0 - 100. In theory there could be a value curve such that a value around 60 or so is actually _best_ and the extremes are worse but for now I'm going linear bad to good. 

This is an averages, so values are added together and the sum is divided by the number of values. 

## 0 bad 2+ good scale is used for decision making purposes

for scoring. values are multiplied throughout. 1 is neutral because it doesn't change the value. 0 is bad because it is extreme. There are no negatives and no upper limit.

## from percentage to score
in Modifiers.js@convertPercentageToScore

most of the time just send in the percent, that is the typical 50% = 1.0 behaviour. but the setpoint can change, with the example I've been using a lot being a setpoint of 90 spreads 1-90 across 0.0 - 0.9999..., and 91 - 100 across [1.1, 1.2, .., 1.9, 2.0]

it's a graph, two lines with different slops at the set point.

it might be possible to generalize into an arbitrary number of set points to make a variety of interesting curves for future tasks

## Challenges

Express "higher energy = higher desire to adventure"

Higher energy is relative to the character's max. If their max is 3 and they are at 3, they are good to go. 

The easiest translation is just straight up percent. 

3/3 = 100% = 1.0
2/3 = 66% = .66666...
1/3 = 33% = .33333...
0/3 = 0% = 0.0

The thing that concerns me here is that it shouldn't always be a _deterrant_ to adventuring, sometimes it should boost. I'm energtic! I want to go adventuring! woo hoo yay hooray I feel great!

So 50% needs to equal 1. I need to convert from a percentage to a modifier. 

Ideally in such a way that I can change the neutral point. Maybe 90 is the neutral point and everything above it encourages the activity - needs to be > 1.0 - and everything below it discourages the activity - needs to be < 1.0. 

I guess then just the percent * 2 right? 

3/3 = 100% = 1.0        * 2 = 2.0 
2/3 = 66% = .66666...   * 2 = 1.33333...
1/3 = 33% = .33333...   * 2 = 0.66666...
0/3 = 0% = 0.0          * 2 = 0.0

So that doesn't give me that adjustable neutral point but it gets me through this specific situation. 

had this thought elsewehere:

```
What I am going to try next is to break it into two separate calculations. Continuing to articulate poorly, if the setpoint is 90 and the value being input is between 0-90 then I can figure out the value I want as a basic percent. So like, 80/90 = .888...

And if the input is between 91 - 100 then it might be 1 + ([input - set point] / [100 - set point]) (92-90) / (100-90) + 1 = 1.2

I don't know yet if it generalizes as well as I hope it does
```

convertToScore(toConvert, setPoint = .5, base = 1.0) {
  if(toConvert > setPoint) {
    // top half so ([input - set point] / [100 - set point]) (92-90) / (100-90) + 1 = 1.2
    return 1 + ((toConvert - setPoint) / (base - setPoint))
  }

  // bottom half, so input / set point
  return toConvert / setPoint
}

in Modifiers.js@convertPercentageToScore