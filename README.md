# Object3D-Demo

If you move the cursor over the canvas, you can pan the camera following your cursor allowing you to look around, the camera automatically resets
once the cursor leaves the canvas. Along with panning the camera, you can rotate the camera around the scene using the "a" and "d" keys,
raise and lower the camera using the up and down arrow keys, and zoom in and out using the "w" and "s" keys. The viewer can even interact with
the fish monster by using the "Page Up" and "Page Down" keys which move the fish monster block in the y direction.

In order to create this animation, a JavaScript class was created to help create each 3d object. In the class file
there are multiple functions that each prepare the object for being rendered. when an object is called in the initialization
file, the class pulls vertice, index, texture coordinate, and color information before binding buffers and calculating face normals.
After this has been done, a function to attach shaders to the object, followed by a function that transforms the object using a
modelview matrix, and finally a function to transform the object using a projection matrix are run. Once all objects have been created,
the initialize file calls the render function, which in turn calls the class render function for each object. In this render function,
variables are attached and the shapes are drawn one by one. two directional light sources were created, originating from the back towards
the right as well as one from the front on the left side. through using transform matrices, objects in this animation are able to translate,
rotate, and scale. These objects will do so by themselves but the scene can be slightly interacted with by the viewers. 