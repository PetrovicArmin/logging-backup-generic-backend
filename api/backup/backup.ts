import { exec } from "child_process";
import path from "path";

const backupDatabase = (process: NodeJS.Process) => {
    const dbName = process.env.POSTGRES_DB;
    const dbPass = process.env.POSTGRES_PASSWORD;
    let dbHost = process.env.PG_CONTAINER_NAME;

    if (process.env.NODE_ENV == 'development')
        dbHost = 'localhost';

    const dbUser = process.env.POSTGRES_USER;
    const dbPort = process.env.POSTGRES_PORT;

    const format = "backup"; // sql/backup/dump
    
    const date = new Date();
    const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}`;
    const backupFilePath = path.join(process.env.BACKUP_PATH!, `${dbName}-${currentDate}.${format}`);

    let setPasswordCommand = `set "PGPASSWORD=${dbPass}"`;

    if (process.platform != 'win32')
        setPasswordCommand = `export PGPASSWORD=${dbPass}}`;

    exec(`${setPasswordCommand} && pg_dump -h ${dbHost} -U ${dbUser} -p ${dbPort} -Fc -d ${dbName} > ${backupFilePath}`,
    (error, stdout, stderr) => {
        if (error) {
        return console.error(`exec error: ${error}`);
        };
        if (stderr) {
        return console.error(`stderr: ${stderr}`);
        };
        console.log(`Created a backup of ${dbName} at ${date.toLocaleString()} successfully: ${stdout}`);
    })
};       

export default backupDatabase;