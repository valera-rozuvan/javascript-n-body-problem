# Description

**Below description is deprecated** Need to revise this document according to new vision - this repo will serve the purpose of showing how N bodies move through space in a gravitational field.

What is this about? Ehh...

## Mission

We want people to understand how forces act on an object which has mass and velocity. The forces will be acting in a well defined area, outside of which the force will stop acting on the object.

## User interface

We will call the area to which the object will be confined to the playground. In the playground, the object will have 2-dimensions of freedom to move about. The playground sides will be hard walls against which the object can hit, and change the direction of his trajectory. The object can never escape the playground.

The user can only influence the movement trajectory of the object by positioning forces in the playground. Each force consists of a magnitude, and direction, and the area of influence. Visually the direction will be represented by an arrow. The area of influence will be represented by a dashed circle, with the arrow head on the perimeter, and the base of the arrow in the center of the circle. The magnitude will be set controlled by changing a number.

## Actors

There will be only a single object for now. The forces can be added any number of times, each with it's own properties.

## On handling bounding boxes

When I store the image initially, it is in it's bounding rectangle in it's natural rotation. When it is going to be rotated there is a chance that the new bounding rectangle will be larger than the original.

Maybe we should calculate the largest possible bounding rectangle initially, and store the original (not rotated) image in this "universal" (under the transformation of rotation) bounding rectangle.

The most true way is to build solutions and test which one is more quicker.

If we will have to perform many rotation operations, then it will be very slow to recalculate and regenerate the bounding rectangle each time.
