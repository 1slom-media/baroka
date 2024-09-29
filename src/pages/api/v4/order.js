import axios from "axios";
import Cors from "cors";

const cors = Cors({
  methods: ["POST"],
  origin: "*",
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  if (req.method === "POST") {
    if (!req.body?.phone) {
      res
        .status(400)
        .json({ message: "Buyurtmachi telefon raqami kiritilmadi!" });
    } else {
      const payload = { phone: req.body.phone };
      if (req.body?.stream) {
        payload["stream"] = parseInt(req.body.stream);
      }
      if (req.body?.name) {
        payload["name"] = req.body.name;
      } else {
        payload["name"] = " mijozi";
      }
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/order/add/v1`,
          payload
        );
        res.status(200).json(response?.data);
      } catch (error) {
        res
          .status(400)
          .json(
            error?.response?.data
              ? error?.response?.data
              : { message: "Nomalum xatolik yuzberdi!" }
          );
      }
    }
  } else {
    res.status(400).json({ message: "Ushbu so'rov turi qabul qilinmaydi!" });
  }
}
