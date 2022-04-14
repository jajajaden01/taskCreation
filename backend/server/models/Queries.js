const userTable = {
  createTable: `CREATE TABLE IF NOT EXISTS 
      users(
        id SERIAL PRIMARY KEY NOT NULL,
        firstName VARCHAR(200) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        username VARCHAR(100) NOT NULL,
        password VARCHAR(128) NOT NULL,
        status VARCHAR(50) NOT NULL,
        createdDate VARCHAR(100) NOT NULL,
        updatedDate VARCHAR(100)
        )`,
  isUserExist: 'SELECT * FROM users WHERE email = $1 AND password = $2',
};

const taskTable = {
  createTable: `CREATE TABLE IF NOT EXISTS 
      tasks(
        id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(300) UNIQUE NOT NULL,
        projectId integer[],
        employeeId integer[],
        description VARCHAR(50),
        priority VARCHAR(10),
        status INT,
        startDate VARCHAR(100),
        endDate VARCHAR(100),
        createdDate VARCHAR(100),
        updatedDate VARCHAR(100)
        )`,
  insertTask: 'INSERT INTO tasks(name, projectId, employeeId, description, priority, status, startDate, endDate, createdDate, updatedDate) VALUES($1 ,$2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
  taskExist: 'SELECT * FROM tasks WHERE name = $1',
  allTasks: 'SELECT * FROM tasks ORDER BY id DESC LIMIT 50',
};

const taskDocTable = {
  createTable: `CREATE TABLE IF NOT EXISTS 
      taskDocs(
        id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(300) UNIQUE NOT NULL,
        taskId SERIAL NOT NULL,
        fileExtension VARCHAR(300) NOT NULL,
        status INT NOT NULL,
        createdDate VARCHAR(100) NOT NULL,
        updatedDate VARCHAR(100)
        )`,
  insertTaskDoc: 'INSERT INTO taskDocs(name, taskId, fileExtension, status, createdDate, updatedDate) VALUES($1 ,$2, $3, $4, $5, $6) RETURNING *',
  allTaskDocsBytaskId: 'SELECT * FROM taskDocs WHERE taskid = $1',
};

const projectTable = {
  createTable: `CREATE TABLE IF NOT EXISTS 
      projects(
        id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(300) UNIQUE NOT NULL,
        status INT,
        createdDate VARCHAR(100),
        updatedDate VARCHAR(100)
        )`,
  allProjects: 'SELECT * FROM projects ORDER BY id DESC LIMIT 50',
};

const employeeTable = {
  createTable: `CREATE TABLE IF NOT EXISTS 
      employees(
        id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(300) NOT NULL,
        status INT,
        createdDate VARCHAR(100),
        updatedDate VARCHAR(100)
        )`,
  allEmployees: 'SELECT * FROM employees ORDER BY id DESC LIMIT 50',
};

export default {
  userTable, taskTable, taskDocTable, projectTable, employeeTable,
};
