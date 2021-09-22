import { Member } from "./redux/reducers/members-reducer";

const isScrum = (members: Member[], socket: string): boolean | undefined => members.find((member) => member.id === socket)?.isAdmin;

export default isScrum;