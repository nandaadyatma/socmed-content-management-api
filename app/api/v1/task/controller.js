const { StatusCodes } = require("http-status-codes")
const { createTask, getAllTasks, getTaskById, updateTaskById, deleteTaskById } = require("../../../services/mongoose/task")

const createNewTask = async (req, res, next) => {
    try {
        const result = await createTask(req)

        if(result) {
            return res.status(StatusCodes.OK).json(
                {
                    error: false,
                    message: "Create new task successfully",
                    data: result
                }
            )
        }
    } catch (error) {
        next (error)
    }
}

const fetchAllTask = async (req, res, next) => {
    try {
        const result = await getAllTasks(req)

        if(result) {
            return res.status(StatusCodes.OK).json(
                {
                    error: false,
                    message: "Get all tasks successfully",
                    data: result
                }
            )
        }
    } catch (error) {
        next(error)
    }
}

const fetchTaskById = async (req, res, next) => {
    try {
        const result = await getTaskById(req)

        if(result) {
            return res.status(StatusCodes.OK).json(
                {
                    error: false,
                    message: "Get task successfully",
                    data: result
                }
            )
        }

    } catch (error) {
        next(error)
    }
}

const editTaskById = async (req, res, next) => { 
    try {
        const result = await updateTaskById(req)

        if (result) {
            return res.status(StatusCodes.OK).json(
                {
                    error: false,
                    message: "Edit task successfully",
                    data: result
                }
            )
        }
    } catch (error) {
        next(error)
    }
}


const removeTaskById = async (req, res, next) => {
    try {
        const result = await deleteTaskById(req)

        if (result) {
            return res.status(StatusCodes.OK).json(
                {
                    error: false,
                    message: "Success delete data",
                    data: result
                }
            )
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createNewTask,
    fetchAllTask,
    fetchTaskById,
    editTaskById,
    removeTaskById
}