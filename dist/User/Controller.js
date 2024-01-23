import User from "./User.js";
import httpStatus from "http-status";
export const addUser = async (req, res) => {
    try {
        const { userName, team } = req.body;
        await User.create({
            userName: userName,
            team: team,
        });
        res.status(httpStatus.OK).json({ result: "user add successfuly" });
    }
    catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({ result: error.message });
    }
};
export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({
            userName: userName,
            password: password,
        });
        if (user === null)
            res
                .status(httpStatus.OK)
                .json({ message: "user name or password is invalid" });
        res.status(httpStatus.OK).json({ result: user, token: user });
    }
    catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({ result: error.message });
    }
};
//# sourceMappingURL=Controller.js.map