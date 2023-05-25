# Midi-Visualizer 
For a more in depth showcase of the project please visit: [Hearing Color](https://mikahassaly.weebly.com/interactive-exibiton.html).

![GIF 1](/Hearing%20Color/images/GIF_Presentation_VEMS.gif)

Midi-Visualizer is a [p5.js](https://p5js.org/) visualization project using [webmidi.js](https://webmidijs.org/). The goal was to create a particle system visualizer for a MIDI controller, in this case a [[[INSERT BRAND OF KEYBOARD HERE]]]. The particles would react to the music played as well as dynamically change in response to different knob inputs.

## End Result
---
The following are some pictures and GIFs regarding the final product. Once again please refer to: [Hearing Color](https://mikahassaly.weebly.com/interactive-exibiton.html), for a more detailed overview of the finished project.

![Picture 1](/Hearing%20Color/images/VEMS_Display_MIDI_Input.png)

![Picture 2](/Hearing%20Color/images/VEMS_Display.png)

![GIF 2](/Hearing%20Color/images/VEMS_Presentation.gif)

## Features
---
### Midi Controller Support
Connect any MIDI controller into the software and instantiate a channel using webmid.js. Note that particle system functionality is limited to specific models as for the time being.

### Particle System
Displays particles based on specific MIDI input. Note that this section has been specifically coded to support the Arturia Mini Lab MIDI keyboard, and a generalization is part of the extensions we wish to implement.

### Control Particle Properties using MIDI Knobs
It is possible to manipulate the following properties of the particle system:  
- **Volume:** Affects the physical size of the particle.
- **Reverb:** Affects the opacity of the background, effectivley creating a trail effect for the particles.
- **Distortion:** Affects random particle movement, creates a shake effect the more distortion is applied.
- **Low Pass:** Affects the color of the particle.
- **High Pass:** Affects the color of the particle.
- **Tremolo:**
    - **Amount:** Affects the amount that rate willl influence the particles, how much the particles are allowed to oscillate. Behaves like a gate.
    - **Rate:** How fast the particles oscillate in size. The higher the rate the faster they oscillate.

### Image Based Color System
The colors of the particle system are sampled from an image in order to achieve a natural selection of colors. As such it is only a matter of changing the picture to change the pallete of the particles on the screen. Note that bluring the image will grant better results as the colors flow better into each other.

## Possible Improvements & Future Work
---
The following are improvements that have been recognized and would like to be pursued:

- As it stands the project is made specifically for the Arturia Mini Lab MIDI keyboard. Changing this so that it supports different MIDI controllers is one of our top priorities.

- Currently the project is implemented using Javascript, this is because webmidi.js and p5.js do not have proper TypeScript support as of the current date (6th of May, 2023). We believe the project would be heavily improved by porting it to Typescript. Most classes would have proper code completion, and the developer experience would improve greatly. 

- We would also like to improve the UI and UX regarding interactions with knobs. Right now when using a knob to change a value the only feedback recieved is visual (qualitative), and comes directly from the particle system display. As useful as this can be it is also detremental as some changes are more subtle and build from complex interactions between several different properties. Having a quantitative display to see what the value is being set to could prove to be extremely helpful.

- Performance could be greatly improved. Currently there are no optimization methods implemented on the particle system. Taking action on this could vastly improve the project by increasing the number of particles it can handle. One simple possible improvement could be pursued by separating the screenspace into sections and updating each section periodically. 