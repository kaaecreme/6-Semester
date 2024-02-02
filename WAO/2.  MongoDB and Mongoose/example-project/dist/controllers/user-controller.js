"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../src/user");
const usersConnection = mongoose_1.default.createConnection("mongodb://root:example@localhost:27020");
const UserModel = usersConnection.model("User", user_1.schema);
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield UserModel.find({}).lean().exec();
    res.json(result);
});
const read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    let result = yield UserModel.find({ _id: uid });
    res.json(result);
});
exports.Users = {
    list,
    read,
};
