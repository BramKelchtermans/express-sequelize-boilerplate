import { Job } from "./job";

class ExampleJob extends Job {
    async fire() {
        console.log("TEST");
    }
}

export default ExampleJob;