const Employee = require('../models/employeeModel');

const employeeCtrl = {
    getEmployes: async (req, res) => {
        try {
            const employes = await Employee.find();
            res.json(employes);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createEmployee: async (req, res) => {
        try {
            const { name, date_of_birth, address, shift, salary, level } = req.body;
            const employee = await Employee.findOne({ name });

            if (employee) return res.status(400).json({ msg: 'Nhân viên đã tồn tại' });

            const newEmployee = new Employee({ name, date_of_birth, address, shift, salary, level });

            await newEmployee.save();
            res.json({ msg: 'Thêm nhân viên thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteEmployee: async (req, res) => {
        try {
            await Employee.findByIdAndDelete(req.params.id);
            res.json({ msg: `Xóa thành công` });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateCategory: async (req, res) => {
        try {
            // neu user co role = 1 -> admin
            // danh cho admin them sua xoa san pham
            const { name } = req.body;
            await Category.findOneAndUpdate({ _id: req.params.id }, { name });

            res.json({ msg: 'Cập nhật thành công' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = employeeCtrl;
