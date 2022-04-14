import Task from '../models/Task';
import Helper from '../helpers/theHelper';

class TaskController {
  static async createTask(req, res) {
    try {
      const dataExist = await Task.taskExit(req.body.name);
      if (dataExist[0]) return res.status(409).json({ status: res.statusCode, error: 'Sorry! This task already exist.' });

      const newTask = {
        ...req.body,
        projectId: [...req.body.projectId],
        employeeId: req.body.employeeId ? [...req.body.employeeId] : [],
        priority: req.body.priority || 'low',
        status: req.body.status || 0,
        createdDate: Helper.currentDate(),
        updatedDate: '',
      };
      const isSaved = await Task.saveTask(newTask);

      let isDocSaved = null;
      if (isSaved) {
        const generatedName = Date.now();
        const newDoc = {
          name: `taskId-${isSaved.id}-${generatedName}`,
          taskId: isSaved.id,
          fileExtension: 'pdf',
          status: 1,
          createdDate: Helper.currentDate(),
          updatedDate: '',
        };

        isDocSaved = await Task.saveTaskDoc(newDoc);
      }

      return res.status(201).json({
        status: res.statusCode,
        data: {
          task: isSaved,
          taskDocs: isDocSaved,
          message: 'Created a new task, Successfuly',
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: res.statusCode,
        error: err.message,
      });
    }
  }

  static async viewTasks(req, res) {
    try {
      const tasks = await Task.getTasks();

      if (!tasks) {
        return res.status(404).json({ status: res.statusCode, message: 'Sorry! there are no Tasks.' });
      }

      return res.status(200).json({ status: res.statusCode, data: tasks });
    } catch (err) {
      return res.status(500).json({
        status: res.statusCode,
        error: err.message,
      });
    }
  }

  static async viewProjects(req, res) {
    try {
      const projects = await Task.getProjects();

      if (!projects) {
        return res.status(404).json({ status: res.statusCode, message: 'Sorry! there are no Projects.' });
      }

      return res.status(200).json({ status: res.statusCode, data: projects });
    } catch (err) {
      return res.status(500).json({
        status: res.statusCode,
        error: err.message,
      });
    }
  }

  static async viewEmployees(req, res) {
    try {
      const employees = await Task.getEmployees();

      if (!employees) {
        return res.status(404).json({ status: res.statusCode, message: 'Sorry! there are no Employees.' });
      }

      return res.status(200).json({ status: res.statusCode, data: employees });
    } catch (err) {
      return res.status(500).json({
        status: res.statusCode,
        error: err.message,
      });
    }
  }
}

export default TaskController;
