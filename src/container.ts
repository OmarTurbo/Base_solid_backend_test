import { Container } from "inversify";
import { authModule } from "./modules/auth/auth.container";
import { userModule } from "./modules/user/user.container";
import { messageModule } from "./modules/message/message.container";
import { excelModule } from "./modules/excel/excel.container";
import { floorModule } from "./modules/floor/floor.container";
import { unitModule } from "./modules/unit/unit.container";

const container = new Container();

container.load(authModule, userModule, messageModule, excelModule, floorModule, unitModule);

export { container };