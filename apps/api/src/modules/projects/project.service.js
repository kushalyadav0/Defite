import { Project } from './project.model.js'

export const createProject = async (
  payload
) => {
  return Project.create(payload)
}

export const getAllProjects = async () => {
  return Project.find().sort({
    createdAt: -1,
  })
}

export const updateProject = async (
  id,
  payload
) => {
  return Project.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
    }
  )
}

export const deleteProject = async (id) => {
  return Project.findByIdAndDelete(id)
}