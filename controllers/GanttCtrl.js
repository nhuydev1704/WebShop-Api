const Gantt = require('../models/ganttModel');
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const queryObj = { ...this.queryString }; //queryString= req.query
        // console.log({ before: queryObj }) // before delete page

        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach((el) => delete queryObj[el]);

        // console.log({ after: queryObj }) // after delete page

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, (match) => '$' + match);

        //gte = greater than or equal
        //lte = lesser than or equal
        //lt = lesser than
        //gt  = greater than
        this.query.find(JSON.parse(queryStr));

        return this;
    }
}

const ganttCtrl = {
    getGantts: async (req, res) => {
        let ganttReturn;
        try {
            const features = new APIfeatures(Gantt.find(), req.query).filtering();
            const gantts = await features.query;
            const oneGantt = await Gantt.find({ username: '123' });
            if (req.query?.username) {
                if (gantts && gantts.length > 0) {
                    ganttReturn = [...gantts, ...oneGantt];
                } else {
                    ganttReturn = await Gantt.find({ is_type: { $ne: 'root' }, createdAt: { $gt: '1637720281515' } });
                }
            } else {
                ganttReturn = gantts.filter((item) => item.username == 'root');
            }

            // console.log('🚀 ~ file: GanttCtrl.js ~ line 35 ~ getGantts: ~ gantts', gantts);
            res.json(ganttReturn);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createGantt: async (req, res) => {
        try {
            // neu user co role = 1 -> admin
            // danh cho admin them sua xoa san pham
            const { id, start_date, end_date, type, progress, parent, text, is_type, username } = req.body;
            const gantt = await Gantt.findOne({ id });

            if (gantt) return res.status(400).json({ msg: 'Task tồn tại' });

            const newGantt = new Gantt({ id, start_date, end_date, type, progress, parent, text, is_type, username });

            await newGantt.save();
            res.json({ msg: 'Thêm thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteGantt: async (req, res) => {
        try {
            await Gantt.findByIdAndDelete(req.params.id);
            res.json({ msg: `Xóa thành công` });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateGantt: async (req, res) => {
        try {
            // neu user co role = 1 -> admin
            // danh cho admin them sua xoa san pham
            const { text, progress, start_date, end_date, is_type, username } = req.body;
            await Gantt.findOneAndUpdate(
                { _id: req.params.id },
                { text, progress, start_date, end_date, is_type, username }
            );

            res.json({ msg: 'Cập nhật thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = ganttCtrl;
