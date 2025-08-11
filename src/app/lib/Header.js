import BaseRepository from "./BaseRepository";

export default class HeaderRepository extends BaseRepository {
    static contentType = "Header";
    defaultOrder = "-sys.createdAt";
}