export class DietController {
  constructor ({ dietModel }) {
    this.dietModel = dietModel
  }

  getByName = async (req, res) => {
    const { name } = req.params
    const diet = await this.dietModel.getByName({ name })
    if (diet) return res.status(200).json(diet)

    res.status(404).json({ message: 'Diet not found' })
  }
}
