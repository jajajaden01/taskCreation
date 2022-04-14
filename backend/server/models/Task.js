import DBConnection from './DBConnection';
import Queries from './Queries';

class Task {
  static async taskExit(name) {
    await DBConnection.query(Queries.taskTable.createTable);
    await DBConnection.query(Queries.taskDocTable.createTable);

    const { rows } = await DBConnection.query(Queries.taskTable.taskExist, [name]);

    return rows;
  }

  static async saveTask({
    name,
    projectId,
    employeeId,
    description,
    priority,
    status,
    startDate,
    endDate,
    createdDate,
    updatedDate,
  }) {
    await DBConnection.query(Queries.taskTable.createTable);
    await DBConnection.query(Queries.taskDocTable.createTable);

    const { rows } = await DBConnection.query(
      Queries.taskTable.insertTask,
      [
        name, projectId, employeeId, description,
        priority, status, startDate, endDate, createdDate, updatedDate],
    );

    return rows[0];
  }

  static async saveTaskDoc({
    name, taskId, fileExtension, status, createdDate, updatedDate,
  }) {
    await DBConnection.query(Queries.taskDocTable.createTable);

    const { rows } = await DBConnection.query(
      Queries.taskDocTable.insertTaskDoc,
      [name, taskId, fileExtension, status, createdDate, updatedDate],
    );

    return rows[0];
  }

  static async getTasks() {
    await DBConnection.query(Queries.taskTable.createTable);
    await DBConnection.query(Queries.taskDocTable.createTable);

    const { rows } = await DBConnection.query(Queries.taskTable.allTasks);

    return rows;
  }

  static async getProjects() {
    await DBConnection.query(Queries.projectTable.createTable);

    const { rows } = await DBConnection.query(Queries.projectTable.allProjects);

    return rows;
  }

  static async getEmployees() {
    await DBConnection.query(Queries.employeeTable.createTable);

    const { rows } = await DBConnection.query(Queries.employeeTable.allEmployees);

    return rows;
  }
}

export default Task;
