const router = require('express').Router();
const chatBotCtrl = require('../controllers/chatBotCtrl');

router.route('/chatbot').get(chatBotCtrl.getChatbot).post(chatBotCtrl.createChatbot);

router
    .route('/chatbot_position/:id')
    // .delete(auth, authAdmin, categoryCtrl.deleteCategory)
    .put(chatBotCtrl.updatePositon);

module.exports = router;
