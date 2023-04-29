const context = new AudioContent()

// // Signal dampening amount
// let dampening = 0.99;

class PluckProcessor extends AudioWorkletProcessor {
    static get parametersDescriptors() {
        return [
            { name: 'frequency', defaultValue: 440 },
            { name: 'dampening', defaultValue: 0.995 },
        ]
    }

    constructor() {
        super()
        this.y = null
        this.n = 0
        this.N = 0
    }

    process(inputs, outputs, parameters) {
        const output = outputs[0][0]
        const frequency = parameters.frequency[0]
        const dampening = parameters.dampening[0]

        if (this.y === null || this.N !== Math.round(sampleRate / frequency)) {
            this.N = Math.round(sampleRate / frequency);
            this.y = new Float32Array(this.N);
            for (let i = 0; i < this.N; i++) {
              this.y[i] = Math.random() * 2 - 1;
            }
        }

        for (let i = 0; i < output.length; i++) {
            this.y[this.n] = (this.y[this.n] + this.y[(this.n + 1) % this.N]) / 2;
            output[i] = this.y[this.n];
            this.y[this.n] *= dampening;
      
            this.n++;
            if (this.n >= this.N) this.n = 0;
        }

        return true
    }
}

registerProcessor('pluck-processor', PluckProcessor)