const express = require('express')

const router = express.Router()
const controllerLoja = require('../controllers/lojas-controller')
const checa_token = require('../middlewares/checa-token')

router.post("/",(req,res) => controllerLoja.create(req,res))
router.post('/', (req,res) => controllerLoja.login(req,res))
router.get('/',(req,res) => controllerLoja.list(req,res))
router.get('/refresh-token', checa_token,(req,res) => controllerLoja.novoToken(req,res))
router.get('/:id', (req,res) =>controllerLoja.getId(req,res))
router.put('/:id', checa_token, (req,res) =>controllerLoja.update(req,res))

module.exports = router