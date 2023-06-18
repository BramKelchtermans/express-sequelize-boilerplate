import ExampleJob from "../jobs/ExampleJob";
import QueueExecutor from "../jobs/queueExecutor";

const SchedulerService = {
    init: async () => {
        // Execute the jobs in the queue
        setInterval(() => {
            (new QueueExecutor()).executeQueuedJobs();
        }, 10000); // Execute queue every minute

        // (new ExampleJob()).everyFiveSeconds();
    }
}

export default SchedulerService;
