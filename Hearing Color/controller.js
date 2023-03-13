class Controller {
    constructor(channel, particleSystem) {
        this.channel = channel;
        this.addEventListeners();
        this.particleSystem = particleSystem
    }

    addEventListeners() {
        this.channel.addListener("midimessage", (event) => {
            let id = event.dataBytes[0];
            let value = map(event.dataBytes[1], 0, 127, 0, 1);

            switch (id) {
                case 0: 	// Pitch Bend
                    value = map(event.dataBytes[1], 0, 127, -1, 1);
                    this.particleSystem.setPitchBend(value);
                    break;
                case 1: 	// Modulation
                    this.particleSystem.setModulation(value);
                    break;
                case 74: 	// 2nd knob - Volume
                    this.particleSystem.setVolume(value);
                    break;
                case 71: 	// 3rd knob - Reverb
                    this.particleSystem.setReverb(value);
                    break;
                case 76: 	// 4th knob - Delay
                    this.particleSystem.setDelay(value);
                    break;
                case 77: 	// 5th knob - Distortion
                    this.particleSystem.setDistortion(value);
                    break;
                case 93: 	// 6th knob - Low Pass
                    this.particleSystem.setLowPass(value);
                    break;
                case 73: 	// 7th knob - High Pass
                    this.particleSystem.setHighPass(value);
                    break;
                case 75: 	// 8th knob
                    break;
                case 18: 	// 13th knob - Tremolo Amount
                    this.particleSystem.setAmount(value);
                    break;
                case 19:	// 11th knob - Tremolo Rate
                    this.particleSystem.setRate(value);
                    break;
                case 16: 	// 12th knob - Tremolo Phase
                    this.particleSystem.setPhase(value);
                    break;	
                case 17:	// 13th knob
                    break;
                case 91:	// 14th knob
                    break;
                case 79:	// 15th knob
                    break;
                case 72:	// 16th knob
                    break;
                default:
                    break;
            }
        });
    
        this.channel.addListener("noteon", (event) => {
            // Pitch, Velocity, Timestamp
            let note = {
                pitch: event.data[1],
                velocity: event.velocity,
                timestamp: event.timestamp
            }

            if (!((note.pitch >= 22 && note.pitch <= 29) || (note.pitch >= 48 && note.pitch <= 72))) {
                console.error("Note out of range");
                return;
            }

            this.particleSystem.setNotePressed(true);
            // Push note to array
        });

        this.channel.addListener("noteoff", (event) => {
            // Remove note from array
            this.particleSystem.setNotePressed(false);
        });
    }
}