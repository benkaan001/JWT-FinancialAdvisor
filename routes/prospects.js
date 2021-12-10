const router = require('express').Router();

const {
    getAllProspects,
    getProspect,
    createProspect,
    updateProspect,
    deleteProspect} = require('../controllers/prospects');

router.route('/').post(createProspect).get(getAllProspects);
router.route('/:id').get(getProspect).delete(deleteProspect).patch(updateProspect);

module.exports = router;
