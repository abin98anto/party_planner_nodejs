"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const mongo_1 = require("./services/mongo");
const UserRouter_1 = __importDefault(require("./routes/UserRouter"));
const corsOptions_1 = require("./config/corsOptions");
const CategoryRouter_1 = __importDefault(require("./routes/CategoryRouter"));
const ProductRouter_1 = __importDefault(require("./routes/ProductRouter"));
const ProviderRoutes_1 = __importDefault(require("./routes/ProviderRoutes"));
const LocationRouter_1 = __importDefault(require("./routes/LocationRouter"));
const AddressRouter_1 = __importDefault(require("./routes/AddressRouter"));
const CartRouter_1 = __importDefault(require("./routes/CartRouter"));
const OrderRouter_1 = __importDefault(require("./routes/OrderRouter"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/", UserRouter_1.default);
app.use("/category", CategoryRouter_1.default);
app.use("/product", ProductRouter_1.default);
app.use("/provider", ProviderRoutes_1.default);
app.use("/location", LocationRouter_1.default);
app.use("/address", AddressRouter_1.default);
app.use("/cart", CartRouter_1.default);
app.use("/order", OrderRouter_1.default);
const PORT = 5000;
app.listen(PORT, () => {
    (0, mongo_1.connectDB)().then(() => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
