// const Category = require('../models/categoryModel');
// const Products = require('../models/productModel');
const Chatbots = require('../models/chatbotModel');

const chatBotCtrl = {
    getChatbot: async (req, res) => {
        try {
            const chatbot = await Chatbots.find();
            res.json(chatbot);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createChatbot: async (req, res) => {
        try {
            const { type, data, position, id, id_source, id_target, input_user } = req.body;

            const newChatBot = new Chatbots({ type, data, position, id, id_source, id_target, input_user });

            await newChatBot.save();
            res.json({ msg: 'Thêm thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updatePositon: async (req, res) => {
        try {
            const { position } = req.body;
            await Chatbots.findOneAndUpdate({ id: req.params.id }, { position });

            // res.json({ msg: 'Cập nhật thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // deleteCategory: async (req, res) => {
    //     try {
    //         // neu user co role = 1 -> admin
    //         // danh cho admin them sua xoa san pham
    //         const products = await Products.findOne({ category: req.params.id });
    //         if (products) return res.status(400).json({ msg: 'Hãy xóa sản phẩm liên quan đến danh mục.' });

    //         await Category.findByIdAndDelete(req.params.id);
    //         res.json({ msg: `Xóa thành công` });
    //     } catch (err) {
    //         return res.status(500).json({ msg: err.message });
    //     }
    // },
    // updateCategory: async (req, res) => {
    //     try {
    //         // neu user co role = 1 -> admin
    //         // danh cho admin them sua xoa san pham
    //         const { name } = req.body;
    //         await Category.findOneAndUpdate({ _id: req.params.id }, { name });

    //         res.json({ msg: 'Cập nhật thành công' });
    //     } catch (err) {
    //         return res.status(500).json({ msg: err.message });
    //     }
    // },
};

module.exports = chatBotCtrl;
