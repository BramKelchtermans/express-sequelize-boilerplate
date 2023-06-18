
import fs from 'fs';
import path from 'path';
import QueuableJob from '../models/QueuableJob';

class QueueExecutor {
    constructor() {
        this.runningJobs = new Set();
        this.jobsDirectory = path.join(__dirname, '../jobs');
    }

    async executeQueuedJobs() {
        try {
            const queuedJobs = await QueuableJob.findAll({ where: { status: 'queued' } });

            for (const job of queuedJobs) {
                if (!this.runningJobs.has(job.id)) {
                    this.runningJobs.add(job.id);
                    await this.executeJob(job);
                    this.runningJobs.delete(job.id);
                }
            }
        } catch (error) {
            console.error('Error executing queued jobs:', error);
        }
    }

    async executeJob(job) {
        try {
            // Update the job status to "processing"
            await job.update({ status: 'processing' });

            // Get the job file path
            const jobFilePath = path.join(this.jobsDirectory, `${job.jobName}.js`);

            // Check if the job file exists
            if (fs.existsSync(jobFilePath)) {
                // Import the job function
                const JobClass = (await import(jobFilePath)).default;

                const jobInstance = new JobClass(job.data);

                // Execute the job
                await jobInstance.fire();

                // Update the job status to "completed"
                await job.update({ status: 'completed' });
            } else {
                console.error(`Job file not found: ${job.jobName}`);

                // Update the job status to "failed"
                await job.update({ status: 'failed' });
            }
        } catch (error) {
            console.error(`Error executing job ${job.jobName}:`, error);

            // Update the job status to "failed"
            await job.update({ status: 'failed' });
        }
    }
}

export default QueueExecutor;