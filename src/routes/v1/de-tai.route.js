import express from 'express'
import validate from '../../middleware/validate'
import deTaiValidation from '../../validations/de-tai.validation'
import deTaiCtrl from '../../controllers/de-tai.controller'

const router = express.Router()

router
  .route('/')
  .post(validate(deTaiValidation.createDeTai), deTaiCtrl.createDeTai)
  .get(validate(deTaiValidation.getDeTais), deTaiCtrl.getDeTais)

router
  .route('/:deTaiId')
  .get(validate(deTaiValidation.getDeTai), deTaiCtrl.getDeTai)
  .patch(validate(deTaiValidation.updateDeTai), deTaiCtrl.updateDeTai)
  .delete(validate(deTaiValidation.deleteDeTai), deTaiCtrl.deleteDeTai)

export default router
