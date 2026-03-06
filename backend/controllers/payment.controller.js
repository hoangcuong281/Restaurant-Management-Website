import Payment from "../models/payment.model.js";

export const createPayment = async (req, res) => {
  const { order_id, amount, method, status='pending', paid_at=null } = req.body;
  const payment = { order_id, amount, method, status, paid_at };
    try {
        await Payment.create(payment);
        res.status(201).json({ message: "Payment created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating payment", error });
    }
};

export const getPayments = async (req, res) => {
    try {
        const payments = await Payment.read();
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching payments", error });
    }
};

export const updatePayment = async (req, res) => {
    const allowedFields = ['order_id', 'amount', 'method', 'status', 'paid_at'];

    const unknownFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));
    if (unknownFields.length > 0) {
        return res.status(400).json({ message: "Invalid fields in request body", unknownFields });
    }
    console.log(req.body)
    const { payment_id } = req.params;
    try {
        await Payment.update(req.body, payment_id);
        res.status(200).json({ message: "Payment updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating payment", error });
    }
};