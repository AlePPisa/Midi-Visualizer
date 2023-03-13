class ParticleSystem {
    constructor(numParticles, windowWidth, windowHeight) {
        /* Effects */
        
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;

        // Tembolo
        this.amount = 0;
        this.phase = 0;
        this.rate = 0;
        
        // Other Effects
        this.volume = 0;
        this.reverb = 0;
        this.delay = 0;
        this.distortion = 0;
        this.lowPass = 0;
        this.highPass = 0;

        // Wabs
        this.pitchBend = 0;
        this.modulation = 0;

        /* Particle System */
        this.numParticles = numParticles;
        this.particles = [];

        this.notePressed = false;
    }

    initParticles() {
        for (let i = 0; i < this.numParticles; i++) {
            this.particles.push(new Particle());
        }
    }

    updateSystem() {
        
    }

    display() {
        console.log("Dispaly")
        background(0, 0, 0, 1 - this.reverb);
        fill(255*this.lowPass, 0, 255*this.lowPass, 255 * (30 + this.highPass));
        
        let x = this.windowWidth/2 + random(-this.distortion*10, this.distortion*10);
        let y = this.windowHeight/2 + random(-this.distortion*10, this.distortion*10);
        let w = 100 + map(this.volume, 0, 1, 0, 20);
        let h = 100 + map(this.volume, 0, 1, 0, 20);
        
        ellipse(x, y, w, h);
    }

    setNotePressed(valueBool) {
        this.notePressed = valueBool;
    }

    setPitchBend(pitchBend) {
        if(pitchBend < -1 || pitchBend > 1) {
            console.error("Pitch Bend must be between -1 and 1");
            return;
        }

        this.pitchBend = pitchBend;
    }

    setModulation(modulation) {
        if(modulation < 0 || modulation > 1) {
            console.error("Modulation must be between 0 and 1");
            return;
        }

        this.modulation = modulation;
    }

    setAmount(amount) {
        if (amount < 0 || amount > 1) {
            console.error("Temolo Amount must be between 0 and 1");
            return;
        };

        this.amount = amount;
    }

    setPhase(phase) {
        if (phase < 0 || phase > 1) {
            console.error("Tremolo Phase must be between 0 and 1");
            return;
        };

        this.phase = phase;
    }

    setRate(rate) {
        if (rate < 0 || rate > 1) {
            console.error("Tremolo Rate must be between 0 and 1");
            return;
        };

        this.rate = rate;
    }

    setVolume(volume) {
        if (volume < 0 || volume > 1) {
            console.error("Volume must be between 0 and 1");
            return;
        };
        
        this.volume = volume;
    }

    setReverb(reverb) {
        if (reverb < 0 || reverb > 1) {
            console.error("Reverb must be between 0 and 1");
            return;
        };
        
        this.reverb = reverb;
    }

    setDelay(delay) {
        if (delay < 0 || delay > 1) {
            console.error("Delay must be between 0 and 1");
            return;
        };

        this.delay = delay;
    }

    setDistortion(distortion) {
         if (distortion < 0 || distortion > 1) {
            console.error("Distortion must be between 0 and 1");
            return;
        };
        this.distortion = distortion;
    }

    setLowPass(lowPass) {
        if (lowPass < 0 || lowPass > 1) {
        console.error("Low Pass must be between 0 and 1");
        return;
        };
    
        this.lowPass = lowPass;
    }

    setHighPass(highPass) {
        if (highPass < 0 || highPass > 1) {
            console.error("High Pass must be between 0 and 1");
            return;
        };
        
        this.highPass = highPass;
    }
}

class Particle {
    constructor(x, y) {
        // Position
        this.x = x;
        this.y = y;

        // Velocity
        this.vx = 0;
        this.vy = 0;

        // Acceleration
        this.ax = 0;
        this.ay = 0;

        // Color
        this.r = 0;
        this.g = 0;
        this.b = 0;

        // Size
        this.size = 0;

        // Life
        this.life = 0;
    }
}