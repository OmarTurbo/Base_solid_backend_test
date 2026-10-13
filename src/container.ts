import { Container } from "inversify";
import { authModule } from "./modules/auth/auth.container";
import { userModule } from "./modules/user/user.container";
import { messageModule } from "./modules/message/message.container";
import { excelModule } from "./modules/excel/excel.container";
import { floorModule } from "./modules/floor/floor.container";

const container = new Container();

container.load(authModule, userModule, messageModule, excelModule, floorModule);

export { container };