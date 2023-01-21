# Math

notes: 
- Modifiers.spec.js has tests that create arrays of setpoints that are a helpful reference

This is not a great doc or anything but I keep coming across the same two basic math problems and forgetting how to do them.

graphing calculator tool that seems good: https://www.desmos.com/calculator

```
2x = y
| 
|  /
| /
|/______
 
-2x = y 
\   |
 \  |
  \ |
__ \|__
    |  

-2x + 2 = y 
 |\   
 | \  
 |  \ 
_|___\__
 |       
```



## Terminology

Score: 0.0 - 2.0+ type value. 0 is bad, 2 is good more than 2 is great. < 0 is impossible

TBD: something to call attribute values. It might be "values". 0 - 100, whole numbers. Attributes, d100 rolls, etc.

## Notes

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
in Modifiers.js@convertPercentageToScore, Modifiers.js@convertPercentageToScoreLowerIsBetter

most of the time just send in the percent, that is the typical 50% = 1.0 behaviour. but the setpoint can change, with the example I've been using a lot being a setpoint of 90 spreads 1-90 across 0.0 - 0.9999..., and 91 - 100 across [1.1, 1.2, .., 1.9, 2.0]

it's a graph, two lines with different slops at the set point.

it might be possible to generalize into an arbitrary number of set points to make a variety of interesting curves for future tasks

## Challenges

in most of this stuff, x is the percent/value, y is the score
### Express "low resources = higher desire to rest"
the `Express "higher energy = higher desire to adventure"` section was written first. This document is kind of a mess to me because I'm not being chronological but it should be a reference document not a log so eventually this messiness will be edited out. 

So I wonder if this is adding some form of directionality or something to the percentageToScore thing. Stating only "50% = 1" includes the assumption that 0% = 0.0 and 100% = 2.0, but what if 100% = 0.0 and 0% = 2.0? Directionality.

`higherIsBetter = true` is an unexpressed assumption. 

So the logic of the conversion when higher is better is to break the scale into two scales, graph two lines with different slopes based on the set point. The same thing has to happen but in this case if the set point is 90, then `99% = 0.1` and `91% = 0.9` and then everything below 90 gets spread across 1.00000..1 to 2.0

so is it like, a complete logic inversion? just going to write that

that didn't work. 

so, flipped around the function comment:

```
	  convert from a percentage/average type thing to a 2.0+ - 0.0 score modifier type thing

	  if set point is .5 then 50% becomes 1.0 0% becomes 2.0. 100% becomes 1.0. etc along the scale.

	  that's the standard so defaults support it but the setpoint can be changes so that for example
	  90% becomes 1.0. 91 - 100 then are [0.9, 0.8, .., 0.1, 0.0] and 89 - 0 are spread across 1.0 - 2.0
```

so what's the logic for the basic thing. higher is better is 2x = y. so is it 1/2x = y? 

2(.5) = 1
1/2(.5) = 0.25

so... no.

.25 = 1.5
.75 = 0.5

Or think about it from a graph perspective. y axis is "goodness" so in the normal case the y value increases as it goes left to right. In this case it should decrease as it goes left to right. 

So we can decrease x by doing -2x = y right? 

-2(.25) = -0.5
-2(.75) = -1.5

-2(.25) + 2 = 1.5
-2(.75) + 2 = 0.5

I mean that's kind of a shitty way to do it. That is like the line descending along the left-side of the y axis and then just shifting it over 2 units to achieve a line that is going up? Or? no it would be like a V shape thing, the left side going down as it approaches 0 and the right side going up, and then just shifting the center point of that V along the x-axis so that it lookes like it is coming down but it would go weird I think?

I want 

Okay I have since convinced myself that that is actually exactly correct. That is a line with a slope that goes from y (score) = 2.0 to y = 0.0 while x (percent/value) increases from 0 to 1. 

So that's going to be like the... bottom half of this function I think? And then the top half. 

it isn't just x = y at that point?

no it is different than that and relatively early-on algebra that I don't understand well any more. 

So come at this from another angle then

it is `-2x + 2 = y` that is the part I need for probably the below-the-threshold (I've been saying "bottom" which is fine but I wanted to be explicit at least once) side and then it's something something about percentages for the top side. 

So for higher-is-better, 82/90 is how the bottom value is calculated. Hmm this might not actually be right, I'm looking at it now - oh the thing that tricked me is that 90/90 is 100% but this is the 0.0 - 2.0 scale. That's what I want it to be. 

So then in this case I need to do 82/ hmm. It's always going to be higher. 

Like if the threshold is 10, then the bottom half is `-2(.1) + 2 = 1.8` well actually 10 would equal 1, 9 would be `-2(.09) + 2 = 1.82` and `-2(.01) + 2 = 1.98` so that's working out just fine. 

So then how do I get the value of x with the setpoint involved?

for the higher is better way, it is `1 + ([input - set point] / [100 - set point]) (92-90) / (100-90) + 1 = 1.2`

so set point is 10 in example above. input is 9 (.09) and 1 (.01)

```
9 - 10 / 100 - 10
1 / 90 = 0.011111...
```

that isn't looking like something that is helpful. 

So if bottom is best and threshold is 10, 0-9% are scored in the 1-2 range so something needs to be inverted somewhere and I'm struggling with that.

0 = 2.0
1 = 1.9
..
9 = 1.1

big steps, units take up a lot of space. 

the stuff above is not working out just fine, it's not the right range at all. because the .09 isn't x. Oh yes it is, but the -2 isn't because the setpoint is different. 

so 1/10, the percent / setpoint is 0.1. 2-0.1 = 1.9.

9/10 = .9. 2.0 - .9 = 1.1. That is what I want. How do I express that? This is bottom half. 

for top half, working out for 11, just slightly worse than 1, right? so I need the 1 from there and the 90 from the 10-100 space. 

(input - set point) / (base - threshold)

(11 - 10) / (100 - 10) = 0.01111111111

1 - (11 - 10) / (100 - 10) = 0.9888888889

this is a thing!



### Express "higher energy = higher desire to adventure"

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

### Work with an array of setpoints of unknown length


Now here is the case for multiple setpoints though. If I add a third setpoint I then introduce diminishing returns. I guess each setpoint toggles the direction. can they go up and up and up with decreasing whatevers? yes.

I guess the lines between setpoints approach each other. There's an implict 0.0 as the first setpoint and 1.0 as the last and then it is a curve with increasing resolution

setpoints = [15,30]

so a line is drawn from (0,0) to (1/3y, 15) and then 

points:
(0,0)             (1/3y, 15)
(1/3y, 15)        (2/3y, 30)
(2/3y, 30)        (   y, 100)

so setpoints.length + 1 = number of lines to be drawn

do returns diminish though if y is evenly split? 

so all my logic above is built on the setpoint being... something. But I'm not sure what. 

see: plan.md entry 20230108 1038