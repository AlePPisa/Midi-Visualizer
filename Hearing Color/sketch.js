const maxParticles = 10;
let channel;
let controller;
let particleSystem;
let imgColor;

async function preload() {
	imgColor = await loadImage("images/colors.png");
}

async function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB);

	try {
		await WebMidi.enable();
	} catch(err) {
		console.error(err);
		return;
	}
	
	onWebMidiEnabled();
	particleSystem = new ParticleSystem(maxParticles, windowWidth, windowHeight, imgColor);
	controller = new Controller(channel, particleSystem)
}

function draw() {
	if (!particleSystem) return;

	particleSystem.updateSystem();
	particleSystem.display();
}

function onWebMidiEnabled() {
	// Check if at least one MIDI input is detected. If not, display warning and quit.
	if (WebMidi.inputs.length < 1) {
	  alert("No MIDI inputs detected.");
	  return;
	}
  
	// Display the index and input name of each detected MIDI input, and ask the user to select one.
	let inputIndex = prompt("Select MIDI input:\n" + WebMidi.inputs.map((input, index) => `${index}: ${input.name}`).join("\n"));
	channel = WebMidi.inputs[inputIndex].channels[1];
}