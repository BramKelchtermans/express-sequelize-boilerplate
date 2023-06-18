import ExampleJob from "../jobs/example_job";

const SchedulerService = {
    init: async () => {
        (new ExampleJob()).everyFiveSeconds();
    }
}

export default SchedulerService;
