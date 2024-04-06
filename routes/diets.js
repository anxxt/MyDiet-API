import { Router } from 'express'

import { DietController } from '../controllers/diets.js'

export const createDietRouter = ({ dietModel }) => {
  const dietsRouter = Router()

  const dietController = new DietController({ dietModel })

  dietsRouter.get('/:name', dietController.getByName)

  return dietsRouter
}
