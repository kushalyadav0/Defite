import {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
} from './project.service.js'

import {
  createProjectValidation,
  updateProjectValidation,
} from './project.validation.js'

import { asyncHandler } from '../../utils/asyncHandler.js'

import { sendResponse } from '../../utils/response.js'

export const createProjectController =
  asyncHandler(async (req, res) => {
    const validatedData =
      createProjectValidation.parse(req.body)

    const project = await createProject(
      validatedData
    )

    return sendResponse({
      res,
      statusCode: 201,
      message:
        'Project created successfully',
      data: project,
    })
  })

export const getProjectsController =
  asyncHandler(async (req, res) => {
    const projects = await getAllProjects()

    return sendResponse({
      res,
      message:
        'Projects fetched successfully',
      data: projects,
    })
  })

export const updateProjectController =
  asyncHandler(async (req, res) => {
    const validatedData =
      updateProjectValidation.parse(
        req.body
      )

    const project = await updateProject(
      req.params.id,
      validatedData
    )

    return sendResponse({
      res,
      message:
        'Project updated successfully',
      data: project,
    })
  })

export const deleteProjectController =
  asyncHandler(async (req, res) => {
    await deleteProject(req.params.id)

    return sendResponse({
      res,
      message:
        'Project deleted successfully',
    })
  })