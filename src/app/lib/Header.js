import BaseRepository from "./BaseRepository";

export default class HeaderRepository extends BaseRepository {
    static contentType = "header";
    defaultOrder = "-sys.createdAt";
}
