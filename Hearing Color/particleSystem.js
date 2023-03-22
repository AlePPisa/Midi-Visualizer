class ParticleSystem {
    constructor(numParticles, windowWidth, windowHeight) {
        /* Constants */
        this.MIN_SIZE = 30;
        this.MAX_SIZE = 70;

        this.MIN_OPACITY = 30;
        this.MAX_OPACITY = 255;

        this.MIN_HZ_RATE = 0.05;
        this.MAX_HZ_RATE = 90;
 
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

        this.initParticles();
    }

    initParticles() {
        for (let i = 0; i < this.numParticles; i++) {
            const hue = random(240, 290);
            this.particles.push(new Particle(random(0, this.windowWidth), random(0, this.windowHeight), hue,  this));
        }
    }

    updateSystem() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].updateParticle();
        }
    }

    display() {
        const opacity = map(this.reverb, 0, 1, this.MAX_OPACITY, this.MIN_OPACITY);
        background(0, 0, 11, opacity);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].drawParticle();
        }
    }

    setNotePressed(valueBool) {
        this.notePressed = valueBool;
    }

    setPitchBend(pitchBend) {
        if(pitchBend < -1 || pitchBend > 1) {
            console.error("Pitch Bend must be between -1 and 1");
            return;
        }

        console.log("Pitchbend: ", pitchBend)
        this.pitchBend = pitchBend;
    }

    setModulation(modulation) {
        if(modulation < 0 || modulation > 1) {
            console.error("Modulation must be between 0 and 1");
            return;
        }

        console.log("Modulation: ", modulation);
        this.modulation = modulation;
    }

    setAmount(amount) {
        if (amount < 0 || amount > 1) {
            console.error("Temolo Amount must be between 0 and 1");
            return;
        };

        console.log("Amount: ", amount);
        this.amount = amount;
    }

    setPhase(phase) {
        if (phase < 0 || phase > 1) {
            console.error("Tremolo Phase must be between 0 and 1");
            return;
        };

        console.log("Phase: ", phase);
        this.phase = phase;
    }

    setRate(rate) {
        if (rate < 0 || rate > 1) {
            console.error("Tremolo Rate must be between 0 and 1");
            return;
        };

        console.log("Rate: ", rate);
        this.rate = rate;
    }

    setVolume(volume) {
        if (volume < 0 || volume > 1) {
            console.error("Volume must be between 0 and 1");
            return;
        };
        
        console.log("Volume: ", volume);
        this.volume = volume;
    }

    setReverb(reverb) {
        if (reverb < 0 || reverb > 1) {
            console.error("Reverb must be between 0 and 1");
            return;
        };
        
        console.log("Reverb: ", reverb);
        this.reverb = reverb;
    }

    setDelay(delay) {
        if (delay < 0 || delay > 1) {
            console.error("Delay must be between 0 and 1");
            return;
        };

        console.log("Delay: ", delay)
        this.delay = delay;
    }

    setDistortion(distortion) {
         if (distortion < 0 || distortion > 1) {
            console.error("Distortion must be between 0 and 1");
            return;
        };

        console.log("Distortion: ", distortion)
        this.distortion = distortion;
    }

    setLowPass(lowPass) {
        if (lowPass < 0 || lowPass > 1) {
        console.error("Low Pass must be between 0 and 1");
        return;
        };
    
        console.log("Lowpass: ", lowPass);
        this.lowPass = lowPass;
    }

    setHighPass(highPass) {
        if (highPass < 0 || highPass > 1) {
            console.error("High Pass must be between 0 and 1");
            return;
        };
        
        console.log("Highpass: ", highPass)
        this.highPass = highPass;
    }
}

class Particle {
    constructor(x, y, hue, parentParticleSystem) {
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

        this.hue = hue;

        // Life
        this.life = 0;

        this.parentParticleSystem = parentParticleSystem;
    }

    updateParticle() {
        const brightness = map(this.parentParticleSystem.highPass, 0, 1, 0, 100);
        const saturation = map(this.parentParticleSystem.lowPass, 0, 1, 0, 100);

        fill(this.hue, saturation, brightness);
        noStroke();
    
        //TODO: Make oscillation lerp values so there is now erid jump
        let rateSpeed = map(this.parentParticleSystem.rate, 0, 1, this.parentParticleSystem.MIN_HZ_RATE, this.parentParticleSystem.MAX_HZ_RATE);
        let oscillation = sin(millis() * rateSpeed * 2 * PI / (1000 * 10));

        this.x += random(-this.parentParticleSystem.distortion*10, this.parentParticleSystem.distortion*10);
        this.y += random(-this.parentParticleSystem.distortion*10, this.parentParticleSystem.distortion*10);
        this.size = map(this.parentParticleSystem.volume, 0, 1, this.parentParticleSystem.MIN_SIZE, this.parentParticleSystem.MAX_SIZE) * (1 + oscillation * this.parentParticleSystem.amount);
    }

    drawParticle() {
        console.log(this.x, this.y, this.size, this.size);
        ellipse(this.x, this.y, this.size, this.size);
    }
}